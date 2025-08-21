-- 게시판 기능을 위한 데이터베이스 스키마 확장
-- Migration: Create Board Schema

-- 1. 게시판 테이블
CREATE TABLE boards (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- 2. 게시글 테이블
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  board_id VARCHAR(50) REFERENCES boards(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  author_id VARCHAR(100), -- 로그인한 사용자의 경우
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 댓글 테이블
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE, -- 대댓글용
  content TEXT NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  author_id VARCHAR(100), -- 로그인한 사용자의 경우
  likes INTEGER DEFAULT 0,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 게시글 좋아요 테이블
CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id VARCHAR(100), -- 익명 사용자의 경우 세션 ID 등
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- 5. 댓글 좋아요 테이블
CREATE TABLE comment_likes (
  id SERIAL PRIMARY KEY,
  comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  user_id VARCHAR(100), -- 익명 사용자의 경우 세션 ID 등
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- 6. 트리거 함수 적용 (기존 함수 재사용)
CREATE TRIGGER update_boards_updated_at BEFORE UPDATE ON boards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. RLS (Row Level Security) 활성화
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- 8. 기본 정책 생성 (읽기 권한)
CREATE POLICY "Enable read access for all users" ON boards FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for all users" ON posts FOR SELECT USING (is_deleted = false);
CREATE POLICY "Enable read access for all users" ON comments FOR SELECT USING (is_deleted = false);

-- 9. 게시글/댓글 작성 정책 (인증된 사용자)
CREATE POLICY "Users can insert posts" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (author_id = auth.uid()::text);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (author_id = auth.uid()::text);

CREATE POLICY "Users can insert comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (author_id = auth.uid()::text);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (author_id = auth.uid()::text);

-- 10. 좋아요 정책
CREATE POLICY "Users can view all likes" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own likes" ON post_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete own likes" ON post_likes FOR DELETE USING (user_id = auth.uid()::text);

CREATE POLICY "Users can view all comment likes" ON comment_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage own comment likes" ON comment_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete own comment likes" ON comment_likes FOR DELETE USING (user_id = auth.uid()::text);

-- 11. 인덱스 생성 (성능 최적화)
CREATE INDEX idx_posts_board_id ON posts(board_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);

-- 12. 기본 게시판 데이터 삽입
INSERT INTO boards (id, title, description, icon, color) VALUES
('general', '자유게시판', '자유로운 주제로 대화하는 공간입니다', '💬', '#3B82F6'),
('stock_discussion', '주식 토론', '주식 관련 토론과 정보 공유', '📈', '#10B981'),
('news_discussion', '뉴스 토론', '최신 경제/주식 뉴스에 대한 토론', '📰', '#F59E0B'),
('beginner_questions', '초보자 질문', '주식 초보자를 위한 질문과 답변', '❓', '#8B5CF6'),
('strategy_sharing', '투자전략 공유', '개인 투자전략과 경험 공유', '🎯', '#EF4444'),
('recommendations', '종목추천', '종목 추천과 분석 정보', '⭐', '#06B6D4');