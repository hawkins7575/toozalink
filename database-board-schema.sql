-- 게시판 기능을 위한 데이터베이스 스키마 확장

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

-- 6. 업데이트 트리거 함수들
CREATE TRIGGER update_boards_updated_at BEFORE UPDATE ON boards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. RLS (Row Level Security) 설정
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;

-- 8. 기본 정책 생성 (모든 사용자가 읽기 가능)
CREATE POLICY "Enable read access for all users" ON boards FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for all users" ON posts FOR SELECT USING (is_deleted = false);
CREATE POLICY "Enable read access for all users" ON comments FOR SELECT USING (is_deleted = false);
CREATE POLICY "Enable read access for all users" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON comment_likes FOR SELECT USING (true);

-- 9. 쓰기 정책 (모든 사용자가 작성 가능)
CREATE POLICY "Enable insert for all users" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON post_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON comment_likes FOR INSERT WITH CHECK (true);

-- 10. 수정/삭제 정책 (작성자만 가능)
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (author_id IS NULL OR auth.uid()::text = author_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (author_id IS NULL OR auth.uid()::text = author_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (author_id IS NULL OR auth.uid()::text = author_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (author_id IS NULL OR auth.uid()::text = author_id);

-- 11. 인덱스 생성 (성능 최적화)
CREATE INDEX idx_posts_board_id ON posts(board_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);
CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);

-- 12. 뷰 조회수 업데이트 함수
CREATE OR REPLACE FUNCTION increment_post_views(post_id_param INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE posts 
  SET views = views + 1 
  WHERE id = post_id_param;
END;
$$ LANGUAGE plpgsql;

-- 13. 좋아요 토글 함수
CREATE OR REPLACE FUNCTION toggle_post_like(post_id_param INTEGER, user_id_param VARCHAR(100))
RETURNS INTEGER AS $$
DECLARE
  like_count INTEGER;
BEGIN
  -- 기존 좋아요 확인
  IF EXISTS (SELECT 1 FROM post_likes WHERE post_id = post_id_param AND user_id = user_id_param) THEN
    -- 좋아요 제거
    DELETE FROM post_likes WHERE post_id = post_id_param AND user_id = user_id_param;
    UPDATE posts SET likes = likes - 1 WHERE id = post_id_param;
  ELSE
    -- 좋아요 추가
    INSERT INTO post_likes (post_id, user_id) VALUES (post_id_param, user_id_param);
    UPDATE posts SET likes = likes + 1 WHERE id = post_id_param;
  END IF;
  
  -- 현재 좋아요 수 반환
  SELECT likes INTO like_count FROM posts WHERE id = post_id_param;
  RETURN like_count;
END;
$$ LANGUAGE plpgsql;

-- 14. 댓글 좋아요 토글 함수
CREATE OR REPLACE FUNCTION toggle_comment_like(comment_id_param INTEGER, user_id_param VARCHAR(100))
RETURNS INTEGER AS $$
DECLARE
  like_count INTEGER;
BEGIN
  -- 기존 좋아요 확인
  IF EXISTS (SELECT 1 FROM comment_likes WHERE comment_id = comment_id_param AND user_id = user_id_param) THEN
    -- 좋아요 제거
    DELETE FROM comment_likes WHERE comment_id = comment_id_param AND user_id = user_id_param;
    UPDATE comments SET likes = likes - 1 WHERE id = comment_id_param;
  ELSE
    -- 좋아요 추가
    INSERT INTO comment_likes (comment_id, user_id) VALUES (comment_id_param, user_id_param);
    UPDATE comments SET likes = likes + 1 WHERE id = comment_id_param;
  END IF;
  
  -- 현재 좋아요 수 반환
  SELECT likes INTO like_count FROM comments WHERE id = comment_id_param;
  RETURN like_count;
END;
$$ LANGUAGE plpgsql;

-- 15. 기본 게시판 데이터 삽입
INSERT INTO boards (id, title, description, icon, color) VALUES
('board1', '종합 토론 게시판', '주식 투자 관련 자유로운 토론을 나눠보세요', '💬', '#3b82f6'),
('board2', '종목 분석 게시판', '개별 종목에 대한 분석과 의견을 공유하세요', '📊', '#10b981'),
('board3', '투자 정보 게시판', '유용한 투자 정보와 뉴스를 공유하세요', '📈', '#8b5cf6'),
('board4', '질문답변 게시판', '투자 관련 궁금한 점을 질문하고 답변을 받아보세요', '❓', '#f59e0b'),
('board5', '수익인증 게시판', '투자 수익을 인증하고 경험담을 공유하세요', '💰', '#ef4444'),
('board6', '자료실 게시판', '투자 관련 유용한 자료와 도구를 공유하세요', '📚', '#06b6d4');

-- 16. 샘플 게시글 데이터 삽입
INSERT INTO posts (board_id, title, content, author_name, views, likes) VALUES
('board1', '2025년 투자 전망에 대해 어떻게 생각하시나요?', '새해를 맞아 올해 투자 전망에 대한 다양한 의견을 듣고 싶습니다.', '투자러버', 142, 23),
('board1', '초보자 추천 투자 서적 공유', '투자 초보분들께 도움이 될 만한 좋은 책들을 추천해주세요.', '북러버', 89, 12),
('board2', '삼성전자 4분기 실적 분석', '삼성전자 4분기 실적 발표 후 주가 전망에 대해 분석해보겠습니다.', '애널리스트A', 234, 45),
('board3', '미국 금리 인상 전망과 한국 증시 영향', '최근 미국 연준의 금리 정책 변화가 한국 증시에 미칠 영향을 분석해봅시다.', '경제분석가', 178, 32),
('board4', '주식 초보인데 어떤 계좌를 개설해야 하나요?', '투자를 시작하려고 하는데 증권계좌 개설 방법과 추천 증권사를 알려주세요.', '투자초보', 156, 28),
('board5', '작년 수익률 30% 달성!', '작년 한 해 동안 꾸준한 투자로 30% 수익을 얻었습니다. 경험담을 공유합니다.', '성공투자자', 312, 67),
('board6', '주식 분석 엑셀 템플릿 공유', '개인적으로 사용하는 주식 분석용 엑셀 템플릿을 공유합니다.', '엑셀마스터', 445, 89);

COMMIT;