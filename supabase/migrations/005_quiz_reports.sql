-- Quiz Reports
-- Allows users to flag quiz questions with errors/issues for admin review.
-- Also updates user_progress type constraint to include topic_quiz and level_exam.

-- 1. Update the type constraint on user_progress to allow new types
ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS user_progress_type_check;
ALTER TABLE public.user_progress
  ADD CONSTRAINT user_progress_type_check
    CHECK (type IN ('objective', 'resource', 'quiz', 'topic_quiz', 'level_exam'));

-- 2. Create quiz_reports table
CREATE TABLE IF NOT EXISTS public.quiz_reports (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id        TEXT NOT NULL,
  level          TEXT NOT NULL,
  topic_id       TEXT,
  question_text  TEXT NOT NULL,
  question_index INTEGER NOT NULL,
  reason         TEXT NOT NULL CHECK (reason IN ('incorrect_answer', 'ambiguous_question', 'outdated_info', 'other')),
  details        TEXT,
  status         TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'resolved', 'dismissed')),
  reviewed_by    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at    TIMESTAMPTZ
);

ALTER TABLE public.quiz_reports ENABLE ROW LEVEL SECURITY;

-- Users can insert their own reports and read their own reports
CREATE POLICY "users_own_quiz_reports_insert" ON public.quiz_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_quiz_reports_select" ON public.quiz_reports
  FOR SELECT USING (auth.uid() = user_id);

-- Admin full access
CREATE POLICY "admin_full_quiz_reports" ON public.quiz_reports
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Index for admin dashboard queries
CREATE INDEX IF NOT EXISTS quiz_reports_status_idx ON public.quiz_reports (status, created_at DESC);
CREATE INDEX IF NOT EXISTS quiz_reports_role_idx ON public.quiz_reports (role_id, level);
