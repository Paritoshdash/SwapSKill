-- Enum Types
CREATE TYPE user_level AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');
CREATE TYPE skill_category AS ENUM ('Coding', 'Art', 'Music', 'Cooking', 'Language', 'Fitness', 'Others');
CREATE TYPE skill_type AS ENUM ('Online', 'Offline');
CREATE TYPE session_status AS ENUM ('pending', 'accepted', 'active', 'completed', 'disputed', 'cancelled');
CREATE TYPE tx_type AS ENUM ('purchase', 'earned', 'spent', 'escrow_hold', 'escrow_release', 'bonus');

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
  sc_balance INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  referral_code TEXT UNIQUE,
  streak_count INTEGER DEFAULT 0,
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
  provider_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  category skill_category NOT NULL,
  type skill_type NOT NULL,
  duration_hours NUMERIC NOT NULL,
  sc_cost INTEGER NOT NULL,
  rating NUMERIC DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Sessions Table
CREATE TABLE sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seeker_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  provider_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE NOT NULL,
  status session_status DEFAULT 'pending',
  sc_held_in_escrow INTEGER NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  location_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Transactions Table
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  tx_type tx_type NOT NULL,
  description TEXT,
  reference_id UUID, -- Can refer to a session or payment intent
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE UNIQUE NOT NULL,
  reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
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
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users RLS
CREATE POLICY "Public profiles are viewable by everyone." ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON users FOR UPDATE USING (auth.uid() = id);

-- Skills RLS
CREATE POLICY "Skills are viewable by everyone." ON skills FOR SELECT USING (true);
CREATE POLICY "Users can insert their own skills." ON skills FOR INSERT WITH CHECK (auth.uid() = provider_id);
CREATE POLICY "Users can update own skills." ON skills FOR UPDATE USING (auth.uid() = provider_id);
CREATE POLICY "Users can delete own skills." ON skills FOR DELETE USING (auth.uid() = provider_id);

-- Sessions RLS
CREATE POLICY "Users can view their own sessions." ON sessions FOR SELECT USING (auth.uid() = seeker_id OR auth.uid() = provider_id);
CREATE POLICY "Seekers can create sessions." ON sessions FOR INSERT WITH CHECK (auth.uid() = seeker_id);
CREATE POLICY "Users can update status of own sessions." ON sessions FOR UPDATE USING (auth.uid() = seeker_id OR auth.uid() = provider_id);

-- Transactions RLS (Read-only for users, backend creates them)
CREATE POLICY "Users can view their own transactions." ON transactions FOR SELECT USING (auth.uid() = user_id);

-- Reviews RLS
CREATE POLICY "Reviews are viewable by everyone." ON reviews FOR SELECT USING (true);
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
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_session_id ON reviews(session_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);

-- Atomic RPC: Book Session
CREATE OR REPLACE FUNCTION public.book_session(
  p_seeker_id UUID,
  p_provider_id UUID,
  p_skill_id UUID,
  p_sc_cost INTEGER
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_balance INTEGER;
  v_session_id UUID;
BEGIN
  -- 1. Check Seeker Balance
  SELECT sc_balance INTO v_balance FROM users WHERE id = p_seeker_id FOR UPDATE;
  
  IF v_balance < p_sc_cost THEN
    RAISE EXCEPTION 'Insufficient Skill Credits.';
  END IF;

  -- 2. Deduct Balance
  UPDATE users SET sc_balance = sc_balance - p_sc_cost WHERE id = p_seeker_id;

  -- 3. Create Session (active / escrow)
  INSERT INTO sessions (seeker_id, provider_id, skill_id, status, sc_held_in_escrow)
  VALUES (p_seeker_id, p_provider_id, p_skill_id, 'active', p_sc_cost)
  RETURNING id INTO v_session_id;

  -- 4. Record Transaction
  INSERT INTO transactions (user_id, amount, tx_type, description, reference_id)
  VALUES (p_seeker_id, p_sc_cost, 'escrow_hold', 'SC held in escrow for session booking', v_session_id);

  RETURN v_session_id;
END;
$$;

-- Atomic RPC: Release Escrow
CREATE OR REPLACE FUNCTION public.release_escrow(
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

  -- 3. Credit Provider
  UPDATE users SET sc_balance = sc_balance + v_session.sc_held_in_escrow WHERE id = v_session.provider_id;

  -- 4. Record Transaction
  INSERT INTO transactions (user_id, amount, tx_type, description, reference_id)
  VALUES (v_session.provider_id, v_session.sc_held_in_escrow, 'escrow_release', 'Escrow released for completed session', p_session_id);

  RETURN TRUE;
END;
$$;
