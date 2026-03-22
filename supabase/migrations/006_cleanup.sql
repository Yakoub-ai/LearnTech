-- Migration 006: Schema cleanup
-- Removes orphaned tables from the original schema (001_initial_schema.sql)
-- that were superseded by the user_progress table (002_user_progress.sql).
--
-- The hooks useSupabaseProgress.js and progressSync.js that wrote to these
-- tables were never wired into any app component and are now deleted.
-- All live progress data is in the user_progress table.
--
-- BEFORE RUNNING: verify row counts are acceptable to discard:
--   SELECT count(*) FROM progress;      -- legacy checklist rows
--   SELECT count(*) FROM quiz_scores;   -- legacy quiz score rows
--   SELECT count(*) FROM profiles;      -- legacy profile rows
--   SELECT count(*) FROM lab_progress;  -- should be 0

-- Safe to drop immediately (confirmed 0 rows in production)
DROP TABLE IF EXISTS public.lab_progress;

-- Drop these after confirming the rows are legacy test data, not real user data:
-- DROP TABLE IF EXISTS public.progress;
-- DROP TABLE IF EXISTS public.quiz_scores;
-- DROP TABLE IF EXISTS public.profiles;

-- Also drop the original profile-creation function (trigger already replaced in 001_user_approvals.sql):
-- DROP FUNCTION IF EXISTS public.handle_new_user();
