-- User Approvals System
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
--
-- After running this migration, set yourself as admin:
--   1. Go to Supabase Dashboard > Authentication > Users
--   2. Click your user > Edit
--   3. Under "app_metadata", add: { "role": "admin" }
--   4. Then insert your own approval row as approved:
--      INSERT INTO public.user_approvals (id, email, display_name, status)
--      VALUES ('<YOUR_USER_UUID>', '<YOUR_EMAIL>', '<YOUR_NAME>', 'approved')
--      ON CONFLICT (id) DO UPDATE SET status = 'approved';

-- ============================================================
-- TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_approvals (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT        NOT NULL,
  display_name  TEXT,
  status        TEXT        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'approved', 'denied')),
  requested_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at   TIMESTAMPTZ,
  reviewed_by   UUID        REFERENCES auth.users(id)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.user_approvals ENABLE ROW LEVEL SECURITY;

-- Users can read their own row
CREATE POLICY "users_read_own"
  ON public.user_approvals FOR SELECT
  USING (auth.uid() = id);

-- Admin can read all rows (role = 'admin' in app_metadata)
CREATE POLICY "admin_read_all"
  ON public.user_approvals FOR SELECT
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Admin can update status
CREATE POLICY "admin_update_status"
  ON public.user_approvals FOR UPDATE
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Authenticated users can insert their own row (trigger does this, but belt-and-suspenders)
CREATE POLICY "users_insert_own"
  ON public.user_approvals FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- TRIGGER: auto-create pending row on every new signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user_approval()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_approvals (id, email, display_name, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'name',
      split_part(NEW.email, '@', 1)
    ),
    'pending'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_approval();
