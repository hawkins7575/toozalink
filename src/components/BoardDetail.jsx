import React, { useState, useEffect, useCallback } from 'react';
import PostDetail from './PostDetail';
import { getPosts, createPost } from '../lib/boardApi';
import useAuth from '../hooks/useAuth';
import { useErrorHandler } from '../utils/errorHandler';
import { useSession } from '../utils/sessionManager';

const BoardDetail = ({ board, onBack }) => {
  const { user, isAuthenticated } = useAuth();
  const { handleError } = useErrorHandler();
  const { userId } = useSession();
  const [selectedPost, setSelectedPost] = useState(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: isAuthenticated ? user?.name || '익명' : '익명'
  });

  // 게시글 목록 로드
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const result = await getPosts(board.id);
        setPosts(result.posts);
        setError(null);
      } catch (err) {
        const safeMessage = handleError(err, { operation: 'loadPosts', boardId: board.id }, false);
        setError(safeMessage);
      } finally {
        setLoading(false);
      }
    };

    if (board?.id) {
      loadPosts();
    }
  }, [board?.id, handleError]);

  const handlePostClick = useCallback((post) => {
    setSelectedPost(post);
  }, []);

  const handleBackToBoard = useCallback(() => {
    setSelectedPost(null);
  }, []);

  const handleNewPost = useCallback(() => {
    setShowNewPostForm(true);
  }, []);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setSubmitting(true);
      
      const postData = {
        boardId: board.id,
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        authorName: isAuthenticated ? user?.name || '익명' : newPost.author.trim() || '익명',
        authorId: isAuthenticated ? user?.id : userId
      };

      const createdPost = await createPost(postData);
      
      // 게시글 목록에 새 게시글 추가
      setPosts(prevPosts => [createdPost, ...prevPosts]);
      
      // 폼 초기화
      setNewPost({ title: '', content: '', author: '익명' });
      setShowNewPostForm(false);
      
      alert('게시글이 성공적으로 작성되었습니다!');
    } catch (err) {
      handleError(err, { operation: 'createPost', boardId: board.id });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelPost = useCallback(() => {
    setNewPost({ title: '', content: '', author: '익명' });
    setShowNewPostForm(false);
  }, []);

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
              {!isAuthenticated && (
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="작성자"
                    value={newPost.author}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                  />
                </div>
              )}
              {isAuthenticated && (
                <div className="form-group">
                  <input
                    type="text"
                    value={user?.name || '익명'}
                    disabled
                    className="author-input-disabled"
                  />
                </div>
              )}
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
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? '게시 중...' : '게시'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 게시글 목록 */}
      <div className="posts-list">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>게시글을 불러오고 있습니다...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              다시 시도
            </button>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostItem 
              key={post.id}
              post={post}
              onPostClick={handlePostClick}
            />
          ))
        ) : (
          <div className="empty-posts">
            <p>아직 게시글이 없습니다.</p>
            <p>첫 번째 게시글을 작성해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 성능 최적화를 위한 PostItem 컴포넌트 (React.memo 사용)
const PostItem = React.memo(({ post, onPostClick }) => {
  const handleClick = React.useCallback(() => {
    onPostClick(post);
  }, [post, onPostClick]);

  const formatDate = React.useMemo(() => {
    return new Date(post.created_at).toLocaleDateString('ko-KR');
  }, [post.created_at]);

  const previewContent = React.useMemo(() => {
    return post.content.length > 100 
      ? post.content.substring(0, 100) + '...' 
      : post.content;
  }, [post.content]);

  return (
    <div 
      className="post-item"
      onClick={handleClick}
    >
      <div className="post-main">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-preview">{previewContent}</p>
        
        <div className="post-meta">
          <span className="post-author">👤 {post.author_name}</span>
          <span className="post-date">📅 {formatDate}</span>
          <span className="post-stats">
            👁️ {post.views} | 👍 {post.likes}
          </span>
        </div>
      </div>

      <div className="post-arrow">→</div>
    </div>
  );
});

PostItem.displayName = 'PostItem';

export default BoardDetail;