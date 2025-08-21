-- Tooza Link Database Schema
-- Tables for stock investment links website

-- 1. Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  type VARCHAR(50) DEFAULT 'site' CHECK (type IN ('site', 'youtube')),
  icon VARCHAR(10),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Sites table
CREATE TABLE sites (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  category VARCHAR(100) REFERENCES categories(name) ON UPDATE CASCADE,
  tags TEXT[],
  tips TEXT,
  difficulty VARCHAR(50) DEFAULT 'normal' CHECK (difficulty IN ('easy', 'normal', 'hard')),
  is_user_submitted BOOLEAN DEFAULT false,
  submitted_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. YouTube channels table
CREATE TABLE youtube_channels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  category VARCHAR(100) REFERENCES categories(name) ON UPDATE CASCADE,
  difficulty VARCHAR(50) DEFAULT 'normal' CHECK (difficulty IN ('easy', 'normal', 'hard')),
  tips TEXT,
  is_user_submitted BOOLEAN DEFAULT false,
  submitted_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User favorites table
CREATE TABLE user_favorites (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  item_id INTEGER NOT NULL,
  item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('site', 'youtube')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- 5. Recent views table
CREATE TABLE recent_views (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  item_id INTEGER NOT NULL,
  item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('site', 'youtube')),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- 6. Update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. Create update triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_youtube_channels_updated_at BEFORE UPDATE ON youtube_channels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Enable RLS (Row Level Security)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE recent_views ENABLE ROW LEVEL SECURITY;

-- 9. Create basic policies (allow read access for all users)
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON sites FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON youtube_channels FOR SELECT USING (true);

-- 10. User-specific favorites/recent views policies
CREATE POLICY "Users can view own favorites" ON user_favorites FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own favorites" ON user_favorites FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can delete own favorites" ON user_favorites FOR DELETE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view own recent views" ON recent_views FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own recent views" ON recent_views FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update own recent views" ON recent_views FOR UPDATE USING (auth.uid()::text = user_id);

-- 11. User submitted content policies
CREATE POLICY "Users can insert sites" ON sites FOR INSERT WITH CHECK (is_user_submitted = true);
CREATE POLICY "Users can insert youtube channels" ON youtube_channels FOR INSERT WITH CHECK (is_user_submitted = true);

-- 12. Insert default category data
INSERT INTO categories (name, type, icon, color) VALUES
-- Site categories
('brokerage', 'site', 'chart', 'blue'),
('news', 'site', 'news', 'green'),
('analysis', 'site', 'chart', 'purple'),
('community', 'site', 'users', 'orange'),
('exchange', 'site', 'building', 'blue'),
('investment', 'site', 'chart', 'blue'),
('education', 'site', 'book', 'yellow'),

-- YouTube categories  
('comprehensive_analysis', 'youtube', 'chart', 'blue'),
('beginner_friendly', 'youtube', 'book', 'green'),
('official_brokerage', 'youtube', 'building', 'purple'),
('investment_general', 'youtube', 'money', 'yellow'),
('us_stocks', 'youtube', 'flag', 'pink'),
('tech_stocks', 'youtube', 'laptop', 'purple');