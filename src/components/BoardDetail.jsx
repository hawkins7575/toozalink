import React, { useState } from 'react';
import PostDetail from './PostDetail';

const BoardDetail = ({ board, onBack }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: '익명'
  });

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackToBoard = () => {
    setSelectedPost(null);
  };

  const handleNewPost = () => {
    setShowNewPostForm(true);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    // 실제로는 여기서 서버에 게시글을 저장해야 함
    console.log('새 게시글:', newPost);
    setNewPost({ title: '', content: '', author: '익명' });
    setShowNewPostForm(false);
  };

  const handleCancelPost = () => {
    setNewPost({ title: '', content: '', author: '익명' });
    setShowNewPostForm(false);
  };

  // 게시글 상세보기 화면
  if (selectedPost) {
    return (
      <PostDetail 
        post={selectedPost} 
        board={board}
        onBack={handleBackToBoard}
      />
    );
  }

  // 게시판 상세 화면
  return (
    <div className="board-detail-layout">
      <div className="board-detail-header">
        <div className="board-detail-nav">
          <button onClick={onBack} className="back-btn">
            ← 게시판 목록
          </button>
        </div>
        
        <div className="board-detail-info">
          <div className="board-detail-icon" style={{ color: board.color }}>
            {board.icon}
          </div>
          <div>
            <h1>{board.title}</h1>
            <p>{board.description}</p>
          </div>
        </div>

        <div className="board-actions">
          <button onClick={handleNewPost} className="new-post-btn">
            ✏️ 글쓰기
          </button>
        </div>
      </div>

      {/* 새 게시글 작성 폼 */}
      {showNewPostForm && (
        <div className="new-post-form-container">
          <div className="new-post-form">
            <h3>새 게시글 작성</h3>
            <form onSubmit={handleSubmitPost}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="작성자"
                  value={newPost.author}
                  onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="내용을 입력하세요"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows="6"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCancelPost} className="cancel-btn">
                  취소
                </button>
                <button type="submit" className="submit-btn">
                  게시
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 게시글 목록 */}
      <div className="posts-list">
        {board.posts.map((post) => (
          <div 
            key={post.id} 
            className="post-item"
            onClick={() => handlePostClick(post)}
          >
            <div className="post-main">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-preview">{post.content}</p>
              
              <div className="post-meta">
                <span className="post-author">👤 {post.author}</span>
                <span className="post-date">📅 {post.date}</span>
                <span className="post-stats">
                  👁️ {post.views} | 👍 {post.likes} | 💬 {post.comments}
                </span>
              </div>
            </div>

            <div className="post-arrow">→</div>
          </div>
        ))}

        {board.posts.length === 0 && (
          <div className="empty-posts">
            <p>아직 게시글이 없습니다.</p>
            <p>첫 번째 게시글을 작성해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;