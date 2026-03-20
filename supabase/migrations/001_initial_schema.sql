-- profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('role', 'language')),
  item_id TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'mid', 'senior')),
  item_type TEXT NOT NULL CHECK (item_type IN ('objective', 'resource')),
  item_index INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, category, item_id, level, item_type, item_index)
);

-- quiz_scores table
CREATE TABLE quiz_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('role', 'language')),
  item_id TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'mid', 'senior')),
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  scored_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, category, item_id, level)
);

-- lab_progress table
CREATE TABLE lab_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_id TEXT NOT NULL,
  step_index INTEGER NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lab_id, step_index)
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies: users can only access their own data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can delete own profile" ON profiles FOR DELETE USING (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own progress" ON progress FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own quiz scores" ON quiz_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz scores" ON quiz_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own quiz scores" ON quiz_scores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own quiz scores" ON quiz_scores FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own lab progress" ON lab_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own lab progress" ON lab_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own lab progress" ON lab_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own lab progress" ON lab_progress FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
