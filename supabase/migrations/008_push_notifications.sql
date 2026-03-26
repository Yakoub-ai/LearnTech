-- Push subscription storage (one device per row)
CREATE TABLE push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, endpoint)
);

-- Notification preferences (one row per user)
CREATE TABLE notification_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  study_reminders_enabled BOOLEAN DEFAULT false,
  reminder_time TIME DEFAULT '18:00',
  reminder_days TEXT[] DEFAULT ARRAY['mon','tue','wed','thu','fri'],
  admin_signup_alerts BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own subscriptions"
  ON push_subscriptions FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users manage own preferences"
  ON notification_preferences FOR ALL
  USING (auth.uid() = user_id);

-- Allow service role (Edge Functions) to read admin subscriptions
CREATE POLICY "Service role reads all subscriptions"
  ON push_subscriptions FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role reads all preferences"
  ON notification_preferences FOR SELECT
  USING (auth.role() = 'service_role');
