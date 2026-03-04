-- Enum Types
CREATE TYPE user_level AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');
CREATE TYPE skill_category AS ENUM ('Coding', 'Art', 'Music', 'Cooking', 'Language', 'Fitness', 'Others');
CREATE TYPE skill_type AS ENUM ('Online', 'Offline');
CREATE TYPE session_status AS ENUM ('pending', 'accepted', 'active', 'completed', 'disputed', 'cancelled');

-- Users Table
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  name TEXT NOT NULL,
  profile_pic TEXT,
  tagline TEXT,
  bio TEXT,
  level user_level DEFAULT 'Beginner',
  completed_swaps INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE,
  streak_count INTEGER DEFAULT 0,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Auto-insert into users table on GoTrue signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, profile_pic)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'profile_pic', 'https://ui-avatars.com/api/?name=' || COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)) || '&background=random')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Skills Table
CREATE TABLE skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  provider_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  category skill_category NOT NULL,
  type skill_type NOT NULL,
  duration_hours NUMERIC NOT NULL,
  rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  search_vector tsvector GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || category::text)) STORED,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Sessions Table
CREATE TABLE sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seeker_id UUID REFERENCES users(id) NOT NULL,
  provider_id UUID REFERENCES users(id) NOT NULL,
  skill_id UUID REFERENCES skills(id) NOT NULL,
  status session_status DEFAULT 'pending',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  location_details TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) UNIQUE NOT NULL,
  reviewer_id UUID REFERENCES users(id) NOT NULL,
  reviewee_id UUID REFERENCES users(id) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Profiles Update Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users RLS
CREATE POLICY "Public profiles are viewable by everyone." ON users FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Users can insert their own profile." ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON users FOR UPDATE USING (auth.uid() = id);

-- Skills RLS
CREATE POLICY "Skills are viewable by everyone." ON skills FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Users can insert their own skills." ON skills FOR INSERT WITH CHECK (auth.uid() = provider_id);
CREATE POLICY "Users can update own skills." ON skills FOR UPDATE USING (auth.uid() = provider_id AND deleted_at IS NULL);
CREATE POLICY "Users can delete own skills." ON skills FOR DELETE USING (auth.uid() = provider_id AND deleted_at IS NULL);

-- Sessions RLS
CREATE POLICY "Users can view their own sessions." ON sessions FOR SELECT USING ((auth.uid() = seeker_id OR auth.uid() = provider_id) AND deleted_at IS NULL);
CREATE POLICY "Seekers can create sessions." ON sessions FOR INSERT WITH CHECK (auth.uid() = seeker_id);
CREATE POLICY "Users can update status of own sessions." ON sessions FOR UPDATE USING ((auth.uid() = seeker_id OR auth.uid() = provider_id) AND deleted_at IS NULL);

-- Reviews RLS
CREATE POLICY "Reviews are viewable by everyone." ON reviews FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Users can insert reviews for their sessions." ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Auto-update Skill Ratings Trigger
CREATE OR REPLACE FUNCTION public.update_skill_rating()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_skill_id UUID;
  v_avg_rating NUMERIC;
  v_count INTEGER;
BEGIN
  -- Get the skill_id from the session
  SELECT skill_id INTO v_skill_id FROM sessions WHERE id = NEW.session_id;

  -- Calculate new average
  SELECT ROUND(AVG(rating)::numeric, 1), COUNT(*) INTO v_avg_rating, v_count
  FROM reviews r
  JOIN sessions s ON r.session_id = s.id
  WHERE s.skill_id = v_skill_id;

  -- Update the skill
  UPDATE skills SET rating = v_avg_rating, review_count = v_count WHERE id = v_skill_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_review_created ON reviews;
CREATE TRIGGER on_review_created
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE PROCEDURE public.update_skill_rating();

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_skills_provider_id ON skills(provider_id);
CREATE INDEX IF NOT EXISTS idx_sessions_seeker_id ON sessions(seeker_id);
CREATE INDEX IF NOT EXISTS idx_sessions_provider_id ON sessions(provider_id);
CREATE INDEX IF NOT EXISTS idx_reviews_session_id ON reviews(session_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);

-- Search and Unique Indexes
CREATE INDEX IF NOT EXISTS idx_skills_search ON skills USING GIN(search_vector);
CREATE UNIQUE INDEX idx_unique_active_skill ON skills (provider_id, title) WHERE deleted_at IS NULL;

-- Atomic RPC: Book Session (Trust Mode)
CREATE OR REPLACE FUNCTION public.book_session(
  p_seeker_id UUID,
  p_provider_id UUID,
  p_skill_id UUID
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_session_id UUID;
BEGIN
  -- Create Session (no balance checks required)
  INSERT INTO sessions (seeker_id, provider_id, skill_id, status)
  VALUES (p_seeker_id, p_provider_id, p_skill_id, 'active')
  RETURNING id INTO v_session_id;

  RETURN v_session_id;
END;
$$;

-- Atomic RPC: Complete Session (Trust Mode)
CREATE OR REPLACE FUNCTION public.complete_session(
  p_session_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_session RECORD;
BEGIN
  -- 1. Fetch Session
  SELECT * INTO v_session FROM sessions WHERE id = p_session_id FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Session not found.';
  END IF;

  IF v_session.status = 'completed' THEN
    RAISE EXCEPTION 'Session is already completed.';
  END IF;

  -- 2. Update Session Status
  UPDATE sessions SET status = 'completed' WHERE id = p_session_id;

  -- 3. Increment completed_swaps for both parties
  UPDATE users SET completed_swaps = COALESCE(completed_swaps, 0) + 1 WHERE id IN (v_session.seeker_id, v_session.provider_id);

  RETURN TRUE;
END;
$$;

-- Audit Logs Table
CREATE TABLE audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  changed_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
-- Admin only policy:
CREATE POLICY "Super Admins can view audit logs" ON audit_logs FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Audit Trigger Function
CREATE OR REPLACE FUNCTION public.audit_trigger_func()
RETURNS trigger AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO public.audit_logs (table_name, record_id, action, old_data, changed_by)
        VALUES (TG_TABLE_NAME::TEXT, OLD.id, TG_OP, row_to_json(OLD)::JSONB, auth.uid());
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.audit_logs (table_name, record_id, action, old_data, new_data, changed_by)
        VALUES (TG_TABLE_NAME::TEXT, NEW.id, TG_OP, row_to_json(OLD)::JSONB, row_to_json(NEW)::JSONB, auth.uid());
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO public.audit_logs (table_name, record_id, action, new_data, changed_by)
        VALUES (TG_TABLE_NAME::TEXT, NEW.id, TG_OP, null, row_to_json(NEW)::JSONB, auth.uid());
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_users_trigger AFTER INSERT OR UPDATE OR DELETE ON users FOR EACH ROW EXECUTE PROCEDURE public.audit_trigger_func();
CREATE TRIGGER audit_skills_trigger AFTER UPDATE OR DELETE ON skills FOR EACH ROW EXECUTE PROCEDURE public.audit_trigger_func();
CREATE TRIGGER audit_sessions_trigger AFTER UPDATE OR DELETE ON sessions FOR EACH ROW EXECUTE PROCEDURE public.audit_trigger_func();
