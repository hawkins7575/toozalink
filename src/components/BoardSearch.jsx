import React, { useState, useEffect } from 'react';
import { searchPosts } from '../lib/boardApi';

const BoardSearch = ({ onSearchResults, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const searchResults = await searchPosts(selectedBoard, searchTerm.trim());
      setResults(searchResults.posts);
      onSearchResults(searchResults.posts);
      
    } catch (err) {
      console.error('검색 실패:', err);
      setError('검색에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    onSearchResults([]);
  };

  return (
    <div className="board-search-overlay">
      <div className="board-search-container">
        <div className="search-header">
          <h3>게시글 검색</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-inputs">
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="board-select"
            >
              <option value="all">전체 게시판</option>
              <option value="board1">종합 토론</option>
              <option value="board2">종목 분석</option>
              <option value="board3">투자 정보</option>
              <option value="board4">질문답변</option>
              <option value="board5">수익인증</option>
              <option value="board6">자료실</option>
            </select>
            
            <input
              type="text"
              placeholder="검색어를 입력하세요 (제목, 내용, 작성자)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <button type="submit" disabled={loading} className="search-btn">
              {loading ? '검색중...' : '검색'}
            </button>
            
            <button type="button" onClick={handleClear} className="clear-btn">
              초기화
            </button>
          </div>
        </form>

        {error && (
          <div className="search-error">
            <p>{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="search-results">
            <h4>검색 결과 ({results.length}개)</h4>
            <div className="results-list">
              {results.map((post) => (
                <div key={post.id} className="result-item">
                  <h5 className="result-title">{post.title}</h5>
                  <p className="result-preview">
                    {post.content.length > 100 
                      ? post.content.substring(0, 100) + '...'
                      : post.content}
                  </p>
                  <div className="result-meta">
                    <span>👤 {post.author_name}</span>
                    <span>📅 {new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                    <span>👁️ {post.views}</span>
                    <span>👍 {post.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !loading && searchTerm && (
          <div className="no-results">
            <p>검색 결과가 없습니다.</p>
            <p>다른 검색어를 시도해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardSearch;