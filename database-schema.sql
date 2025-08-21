-- Tooza Link 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요

-- 1. 카테고리 테이블
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  type VARCHAR(50) DEFAULT 'site' CHECK (type IN ('site', 'youtube')),
  icon VARCHAR(10),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 사이트 테이블
CREATE TABLE sites (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  category VARCHAR(100) REFERENCES categories(name) ON UPDATE CASCADE,
  tags TEXT[],
  tips TEXT,
  difficulty VARCHAR(50) DEFAULT '보통' CHECK (difficulty IN ('쉬움', '보통', '어려움')),
  is_user_submitted BOOLEAN DEFAULT false,
  submitted_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 유튜브 채널 테이블
CREATE TABLE youtube_channels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  category VARCHAR(100) REFERENCES categories(name) ON UPDATE CASCADE,
  difficulty VARCHAR(50) DEFAULT '보통' CHECK (difficulty IN ('쉬움', '보통', '어려움')),
  tips TEXT,
  is_user_submitted BOOLEAN DEFAULT false,
  submitted_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 사용자 즐겨찾기 테이블
CREATE TABLE user_favorites (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  item_id INTEGER NOT NULL,
  item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('site', 'youtube')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- 5. 최근 조회 테이블
CREATE TABLE recent_views (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  item_id INTEGER NOT NULL,
  item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('site', 'youtube')),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- 6. 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. 업데이트 트리거 생성
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_youtube_channels_updated_at BEFORE UPDATE ON youtube_channels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. RLS (Row Level Security) 설정
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE recent_views ENABLE ROW LEVEL SECURITY;

-- 9. 기본 정책 생성 (모든 사용자가 읽기 가능)
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON sites FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON youtube_channels FOR SELECT USING (true);

-- 10. 사용자별 즐겨찾기/최근조회 정책
CREATE POLICY "Users can view own favorites" ON user_favorites FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own favorites" ON user_favorites FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can delete own favorites" ON user_favorites FOR DELETE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view own recent views" ON recent_views FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own recent views" ON recent_views FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update own recent views" ON recent_views FOR UPDATE USING (auth.uid()::text = user_id);

-- 11. 사용자 제출 콘텐츠 정책
CREATE POLICY "Users can insert sites" ON sites FOR INSERT WITH CHECK (is_user_submitted = true);
CREATE POLICY "Users can insert youtube channels" ON youtube_channels FOR INSERT WITH CHECK (is_user_submitted = true);

-- 12. 기본 카테고리 데이터 삽입
INSERT INTO categories (name, type, icon, color) VALUES
-- 사이트 카테고리
('증권사', 'site', '📈', 'blue'),
('뉴스/정보', 'site', '📰', 'green'),
('분석/데이터', 'site', '📊', 'purple'),
('커뮤니티', 'site', '👥', 'orange'),
('공식거래소', 'site', '🏛️', 'blue'),
('투자정보', 'site', '📊', 'blue'),
('교육', 'site', '📚', 'yellow'),

-- 유튜브 카테고리  
('종합분석', 'youtube', '📊', 'blue'),
('초보자용', 'youtube', '📚', 'green'),
('증권사공식', 'youtube', '🏛️', 'purple'),
('재테크종합', 'youtube', '💰', 'yellow'),
('미국주식', 'youtube', '🇺🇸', 'pink'),
('기술주전문', 'youtube', '💻', 'purple');

COMMIT;