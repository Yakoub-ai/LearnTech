-- User Progress Sync
-- Run this in Supabase Dashboard > SQL Editor
-- This enables per-user progress to be visible in the admin dashboard.
-- Progress is dual-written: localStorage (primary) + Supabase (for admin visibility).

CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id     TEXT NOT NULL,
  level       TEXT NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('objective', 'resource', 'quiz')),
  item_key    TEXT NOT NULL,
  value       JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role_id, level, type, item_key)
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Users can read/write their own progress
CREATE POLICY "users_own_progress" ON public.user_progress
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Admin can read all progress
CREATE POLICY "admin_read_all_progress" ON public.user_progress
  FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
