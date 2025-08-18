import React, { useState } from 'react';

const PostDetail = ({ post, board, onBack }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '댓글러',
      content: '좋은 글 감사합니다!',
      date: '2025-01-18',
      likes: 3
    },
    {
      id: 2,
      author: '투자고수',
      content: '저도 비슷한 경험이 있네요. 공감됩니다.',
      date: '2025-01-18',
      likes: 1
    }
  ]);
  
  const [newComment, setNewComment] = useState({
    author: '익명',
    content: ''
  });
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.content.trim()) {
      const comment = {
        id: comments.length + 1,
        author: newComment.author,
        content: newComment.content,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment({ author: '익명', content: '' });
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
              <span className="author">👤 {post.author}</span>
              <span className="date">📅 {post.date}</span>
              <span className="views">👁️ {post.views}</span>
            </div>
            
            <div className="post-actions">
              <button 
                className={`like-btn ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
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
              <input
                type="text"
                placeholder="작성자"
                value={newComment.author}
                onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                className="author-input"
              />
              <textarea
                placeholder="댓글을 입력하세요"
                value={newComment.content}
                onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                rows="3"
                className="comment-textarea"
                required
              />
            </div>
            <button type="submit" className="comment-submit-btn">
              댓글 작성
            </button>
          </form>
        </div>

        {/* 댓글 목록 */}
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">👤 {comment.author}</span>
                <span className="comment-date">📅 {comment.date}</span>
                <button className="comment-like-btn">
                  👍 {comment.likes}
                </button>
              </div>
              <div className="comment-content">
                {comment.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;