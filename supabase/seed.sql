-- Enable the pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Insert dummy User (Alex)
INSERT INTO users (id, email, name, profile_pic, tagline, bio, level, sc_balance)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'alex@example.com',
  'Alex Chen',
  'https://ui-avatars.com/api/?name=Alex&background=random',
  'Passionate Developer',
  'I love building React applications and swapping knowledge with others!',
  'Advanced',
  150
) ON CONFLICT (id) DO NOTHING;

-- Insert another dummy User (Samantha)
INSERT INTO users (id, email, name, profile_pic, tagline, bio, level, sc_balance)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'sam@example.com',
  'Samantha Lee',
  'https://ui-avatars.com/api/?name=Sam&background=random',
  'Digital Illustrator',
  'Specializing in Procreate and Adobe Illustrator.',
  'Intermediate',
  80
) ON CONFLICT (id) DO NOTHING;

-- Insert Skills
INSERT INTO skills (id, provider_id, title, category, type, duration_hours, sc_cost, rating, review_count)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  '11111111-1111-1111-1111-111111111111',
  'Advanced React Patterns & Performance',
  'Coding',
  'Online',
  2,
  24, -- Advanced (12 SC/hr) * 2 = 24
  4.9,
  12
) ON CONFLICT (id) DO NOTHING;

INSERT INTO skills (id, provider_id, title, category, type, duration_hours, sc_cost, rating, review_count)
VALUES (
  '10000000-0000-0000-0000-000000000002',
  '22222222-2222-2222-2222-222222222222',
  'Mastering Digital Illustration in Procreate',
  'Art',
  'Online',
  3,
  24, -- Intermediate (8 SC/hr) * 3 = 24
  4.8,
  8
) ON CONFLICT (id) DO NOTHING;
