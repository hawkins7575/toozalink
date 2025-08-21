import React, { useState, useEffect, useCallback } from 'react';
import { 
  getComments, 
  createComment, 
  togglePostLike, 
  toggleCommentLike, 
  generateUserId 
} from '../lib/boardApi';
import useAuth from '../hooks/useAuth';
import { useErrorHandler } from '../utils/errorHandler';
import { useSession } from '../utils/sessionManager';

const PostDetail = ({ post, board, onBack }) => {
  const { user, isAuthenticated } = useAuth();
  const { handleError } = useErrorHandler();
  const { userId, addToHistory } = useSession();
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [newComment, setNewComment] = useState({
    author: isAuthenticated ? user?.name || '익명' : '익명',
    content: ''
  });
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [likingPost, setLikingPost] = useState(false);

  // 컴포넌트 마운트 시 댓글 로드 및 조회수 증가
  useEffect(() => {
    const loadCommentsAndIncrementViews = async () => {
      try {
        // 조회 이력에 추가
        addToHistory(post.id, board.id);
        
        // 댓글 로드
        const commentsData = await getComments(post.id);
        setComments(commentsData);
      } catch (error) {
        handleError(error, { operation: 'loadComments', postId: post.id }, false);
      } finally {
        setCommentsLoading(false);
      }
    };

    if (post?.id && board?.id) {
      loadCommentsAndIncrementViews();
    }
  }, [post?.id, board?.id, addToHistory, handleError]);

  // 게시글 좋아요 토글
  const handleLike = useCallback(async () => {
    if (likingPost) return;
    
    try {
      setLikingPost(true);
      const newLikeCount = await togglePostLike(post.id, userId);
      setLikeCount(newLikeCount);
      setIsLiked(!isLiked);
    } catch (error) {
      handleError(error, { operation: 'togglePostLike', postId: post.id });
    } finally {
      setLikingPost(false);
    }
  }, [likingPost, post.id, isLiked, userId, handleError]);

  // 댓글 작성
  const handleCommentSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!newComment.content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      setSubmittingComment(true);
      
      const commentData = {
        postId: post.id,
        content: newComment.content.trim(),
        authorName: isAuthenticated ? user?.name || '익명' : newComment.author.trim() || '익명',
        authorId: isAuthenticated ? user?.id : userId
      };

      const createdComment = await createComment(commentData);
      setComments(prevComments => [...prevComments, createdComment]);
      setNewComment({ author: '익명', content: '' });
      
    } catch (error) {
      handleError(error, { operation: 'createComment', postId: post.id });
    } finally {
      setSubmittingComment(false);
    }
  }, [newComment, post.id, isAuthenticated, user, userId, handleError]);

  // 댓글 좋아요 토글
  const handleCommentLike = async (commentId) => {
    try {
      const userId = generateUserId();
      const newLikeCount = await toggleCommentLike(commentId, userId);
      
      // 댓글 목록에서 해당 댓글의 좋아요 수 업데이트
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId 
            ? { ...comment, likes: newLikeCount }
            : comment
        )
      );
    } catch (error) {
      console.error('댓글 좋아요 처리 실패:', error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  return (
    <div className="post-detail-layout">
      <div className="post-detail-header">
        <button onClick={onBack} className="back-btn">
          ← {board.title}
        </button>
      </div>

      {/* 게시글 내용 */}
      <div className="post-content">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-info">
            <div className="post-meta">
              <span className="author">👤 {post.author_name}</span>
              <span className="date">📅 {new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
              <span className="views">👁️ {post.views}</span>
            </div>
            
            <div className="post-actions">
              <button 
                className={`like-btn ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
                disabled={likingPost}
              >
                👍 {likeCount}
              </button>
            </div>
          </div>
        </div>

        <div className="post-body">
          <p>{post.content}</p>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="comments-section">
        <div className="comments-header">
          <h3>댓글 {comments.length}개</h3>
        </div>

        {/* 댓글 작성 폼 */}
        <div className="comment-form">
          <form onSubmit={handleCommentSubmit}>
            <div className="comment-input-group">
              {!isAuthenticated && (
                <input
                  type="text"
                  placeholder="작성자"
                  value={newComment.author}
                  onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                  className="author-input"
                />
              )}
              {isAuthenticated && (
                <input
                  type="text"
                  value={user?.name || '익명'}
                  disabled
                  className="author-input-disabled"
                />
              )}
              <textarea
                placeholder="댓글을 입력하세요"
                value={newComment.content}
                onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                rows="3"
                className="comment-textarea"
                required
              />
            </div>
            <button type="submit" className="comment-submit-btn" disabled={submittingComment}>
              {submittingComment ? '작성 중...' : '댓글 작성'}
            </button>
          </form>
        </div>

        {/* 댓글 목록 */}
        <div className="comments-list">
          {commentsLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>댓글을 불러오고 있습니다...</p>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">👤 {comment.author_name}</span>
                  <span className="comment-date">📅 {new Date(comment.created_at).toLocaleDateString('ko-KR')}</span>
                  <button 
                    className="comment-like-btn"
                    onClick={() => handleCommentLike(comment.id, comment.likes)}
                  >
                    👍 {comment.likes}
                  </button>
                </div>
                <div className="comment-content">
                  {comment.content}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-comments">
              <p>첫 번째 댓글을 작성해보세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;