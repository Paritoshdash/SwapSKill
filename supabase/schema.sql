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
