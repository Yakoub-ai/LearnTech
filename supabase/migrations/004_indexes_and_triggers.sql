-- Index on user_approvals.status to speed up admin pending-count queries
CREATE INDEX IF NOT EXISTS user_approvals_status_idx ON user_approvals (status);

-- Auto-update updated_at on user_progress rows
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
