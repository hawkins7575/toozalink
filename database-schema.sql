-- ====================================
-- 게시판 시스템 데이터베이스 스키마
-- tooza.shop 주식 커뮤니티용
-- ====================================

-- 1. boards 테이블: 게시판 카테고리
CREATE TABLE boards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '💬',
  color TEXT DEFAULT '#3b82f6',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. posts 테이블: 게시글
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id TEXT NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_id TEXT, -- 로그인 사용자의 경우 실제 user_id, 익명은 NULL
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_deleted BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. comments 테이블: 댓글 (계층구조 지원)
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- 대댓글용
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_id TEXT, -- 로그인 사용자의 경우 실제 user_id, 익명은 NULL
  likes INTEGER DEFAULT 0,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. post_likes 테이블: 게시글 좋아요 (중복 방지)
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL, -- 익명사용자는 브라우저 fingerprint 사용
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id) -- 동일 사용자의 중복 좋아요 방지
);

-- 5. comment_likes 테이블: 댓글 좋아요 (중복 방지)
CREATE TABLE comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL, -- 익명사용자는 브라우저 fingerprint 사용
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id) -- 동일 사용자의 중복 좋아요 방지
);

-- ====================================
-- 인덱스 설정 (성능 최적화)
-- ====================================

-- posts 테이블 인덱스
CREATE INDEX idx_posts_board_id ON posts(board_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_views ON posts(views DESC);
CREATE INDEX idx_posts_likes ON posts(likes DESC);
CREATE INDEX idx_posts_is_deleted ON posts(is_deleted);
CREATE INDEX idx_posts_is_pinned ON posts(is_pinned);

-- comments 테이블 인덱스
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_created_at ON comments(created_at ASC);
CREATE INDEX idx_comments_is_deleted ON comments(is_deleted);

-- likes 테이블 인덱스
CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);
CREATE INDEX idx_comment_likes_user_id ON comment_likes(user_id);

-- ====================================
-- 기본 데이터 삽입
-- ====================================

INSERT INTO boards (id, title, description, icon, color, display_order) VALUES
('general', '종합 토론 게시판', '주식 투자 관련 자유로운 토론을 나눠보세요', '💬', '#3b82f6', 1),
('analysis', '종목 분석 게시판', '개별 종목에 대한 분석과 의견을 공유하세요', '📊', '#10b981', 2),
('info', '투자 정보 게시판', '유용한 투자 정보와 뉴스를 공유하세요', '📈', '#8b5cf6', 3),
('qna', '질문답변 게시판', '투자 관련 궁금한 점을 질문하고 답변을 받아보세요', '❓', '#f59e0b', 4),
('profit', '수익인증 게시판', '투자 수익을 인증하고 경험담을 공유하세요', '💰', '#ef4444', 5),
('resource', '자료실 게시판', '투자 관련 유용한 자료와 도구를 공유하세요', '📚', '#06b6d4', 6);

-- 샘플 게시글 (각 게시판에 2개씩)
INSERT INTO posts (board_id, title, content, author_name, is_pinned) VALUES
-- 종합 토론 게시판
('general', '📈 2025년 주식시장 전망', '새해를 맞아 올해 주식시장 전망에 대해 이야기해보면 좋을 것 같습니다. 여러분은 올해 시장을 어떻게 전망하고 계신가요?', '시장분석가', true),
('general', '💡 초보 투자자를 위한 조언', '주식 투자를 처음 시작하는 분들을 위한 기본적인 조언들을 정리해봤습니다. 경험 많은 분들의 추가 조언도 환영합니다.', '선배투자자', false),

-- 종목 분석 게시판  
('analysis', '🔍 삼성전자 분석 리포트', '최근 삼성전자의 실적과 향후 전망에 대한 개인적인 분석입니다. 반도체 시장 회복과 함께 긍정적인 신호들이 보이고 있습니다.', '반도체전문가', false),
('analysis', '⚡ 2차전지 관련주 점검', 'LG에너지솔루션, SK온 등 2차전지 관련주들의 현재 상황을 점검해보겠습니다. 전기차 시장 성장세가 계속될지 주목됩니다.', '에너지분석가', false),

-- 투자 정보 게시판
('info', '📊 이번 주 주요 경제지표', '이번 주 발표될 주요 경제지표들을 정리했습니다. 미국 CPI, 한국 GDP 등 시장에 영향을 줄 수 있는 지표들을 확인하세요.', '경제전문가', false),
('info', '🌐 해외주식 투자 가이드', '미국주식, 중국주식 투자 시 알아야 할 기본 정보들을 정리했습니다. 환율, 세금, 거래시간 등 실용적인 내용 위주입니다.', '해외투자가', false),

-- 질문답변 게시판
('qna', '❓ 손절매 기준 어떻게 정하나요?', '투자 초보입니다. 손절매 기준을 어떻게 정해야 할지 고민이 많습니다. 경험 있으신 분들의 조언 부탁드립니다.', '투자초보', false),
('qna', '🤔 배당주 투자 어떻게 생각하세요?', '안정적인 배당 수익을 위해 배당주 투자를 고민중입니다. 배당주 투자의 장단점에 대해 의견 부탁드립니다.', '안정투자자', false),

-- 수익인증 게시판
('profit', '🎉 올해 수익률 30% 달성!', '드디어 목표했던 30% 수익률을 달성했습니다! 주로 성장주 위주로 투자했고, 인내심이 가장 중요했던 것 같습니다.', '성공투자자', false),
('profit', '💪 첫 100만원 수익 달성기', '주식 투자 시작한지 6개월만에 첫 100만원 수익을 달성했습니다. 과정과 배운점들을 공유해드리겠습니다.', '새싹투자자', false),

-- 자료실 게시판
('resource', '📈 무료 주식 분석 툴 모음', '개인투자자들이 활용할 수 있는 무료 주식 분석 도구들을 정리했습니다. 차트 분석부터 재무제표 분석까지 다양한 툴들이 있습니다.', '도구수집가', true),
('resource', '📚 추천 투자서적 리스트', '투자 공부에 도움이 되는 책들을 정리했습니다. 초급부터 고급까지 단계별로 분류해놓았으니 참고하세요.', '독서가투자자', false);