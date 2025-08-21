-- ====================================
-- 게시판 관련 데이터베이스 테이블 완전 삭제
-- ====================================

-- 1. 의존성 순서에 따라 테이블 삭제
-- (외래키 제약 조건 때문에 순서가 중요함)

-- 좋아요 테이블부터 삭제
DROP TABLE IF EXISTS comment_likes CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;

-- 댓글 테이블 삭제
DROP TABLE IF EXISTS comments CASCADE;

-- 게시글 테이블 삭제
DROP TABLE IF EXISTS posts CASCADE;

-- 게시판 테이블 삭제
DROP TABLE IF EXISTS boards CASCADE;

-- 2. 관련 뷰(View) 삭제
DROP VIEW IF EXISTS board_stats CASCADE;
DROP VIEW IF EXISTS popular_posts_weekly CASCADE;

-- 3. 관련 함수 삭제
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS update_post_likes_count() CASCADE;
DROP FUNCTION IF EXISTS update_comment_likes_count() CASCADE;

-- 4. 확인 쿼리 (실행 후 빈 결과가 나와야 함)
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('boards', 'posts', 'comments', 'post_likes', 'comment_likes')
ORDER BY table_name;

-- 실행 완료 메시지
SELECT '게시판 관련 모든 테이블이 삭제되었습니다.' as message;