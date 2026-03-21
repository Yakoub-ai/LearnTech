-- User Events (Usage Analytics)
-- Run this in Supabase Dashboard > SQL Editor
-- Tracks page views, quiz completions, resource clicks, and role visits
-- for aggregated usage statistics in the admin dashboard.

CREATE TABLE IF NOT EXISTS public.user_events (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type  TEXT NOT NULL,
  event_data  JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;

-- Users can insert their own events
CREATE POLICY "users_insert_own_events" ON public.user_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin can read all events
CREATE POLICY "admin_read_all_events" ON public.user_events
  FOR SELECT USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Useful index for time-based queries
CREATE INDEX IF NOT EXISTS idx_user_events_created_at ON public.user_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_type ON public.user_events(event_type);
CREATE INDEX IF NOT EXISTS idx_user_events_user_id ON public.user_events(user_id);
