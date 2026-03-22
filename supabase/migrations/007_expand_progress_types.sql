-- Expand the type CHECK constraint to include topic_quiz and level_exam.
-- These types were already being written by the app but rejected silently
-- due to the old constraint. Non-destructive: no existing rows are affected.
-- Run via Supabase Dashboard > SQL Editor.

ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS user_progress_type_check;

ALTER TABLE public.user_progress ADD CONSTRAINT user_progress_type_check
  CHECK (type IN ('objective', 'resource', 'quiz', 'topic_quiz', 'level_exam'));
