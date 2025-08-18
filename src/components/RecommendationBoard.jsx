import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from 'prop-types';

const RecommendationBoard = React.memo(() => {
  const [recommendations, setRecommendations] = useState(() => {
    try {
      const saved = localStorage.getItem("recommendations");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn("Failed to load recommendations:", error);
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState({
    title: "",
    url: "",
    description: "",
    category: "주식사이트",
    reason: "",
    tags: [],
    difficulty: "보통",
    type: "정보공유"
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedType, setSelectedType] = useState("전체");
  const [sortBy, setSortBy] = useState("최신순");

  // 투자 정보 카테고리 및 타입 정의
  const categories = [
    "전체", "주식사이트", "유튜브채널", "뉴스/미디어", "분석도구", 
    "교육/학습", "증권사", "해외주식", "암호화폐", "부동산", "경제지표", "기타"
  ];

  const postTypes = [
    "전체", "정보공유", "질문", "토론", "분석", "뉴스", "팁/노하우", "후기/리뷰"
  ];

  const availableTags = [
    "초보자", "전문가", "무료", "유료", "실시간", "차트분석", "재무분석", 
    "배당주", "성장주", "가치투자", "기술적분석", "펀더멘털", "ETF", "리츠",
    "미국주식", "한국주식", "글로벌", "섹터분석", "종목추천", "리서치"
  ];

  // URL 기반 카테고리 자동 감지 (확장)
  const detectCategoryFromUrl = (url) => {
    if (!url) return "주식사이트";
    
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
      return "유튜브채널";
    } else if (lowerUrl.includes('news') || lowerUrl.includes('herald') || lowerUrl.includes('chosun') || 
               lowerUrl.includes('joins') || lowerUrl.includes('ytn') || lowerUrl.includes('sbs') || 
               lowerUrl.includes('mbc') || lowerUrl.includes('kbs')) {
      return "뉴스/미디어";
    } else if (lowerUrl.includes('tradingview') || lowerUrl.includes('chart') || 
               lowerUrl.includes('analytics') || lowerUrl.includes('screener')) {
      return "분석도구";
    } else if (lowerUrl.includes('edu') || lowerUrl.includes('academy') || 
               lowerUrl.includes('course') || lowerUrl.includes('learn')) {
      return "교육/학습";
    } else if (lowerUrl.includes('sec.com') || lowerUrl.includes('securities') || 
               lowerUrl.includes('investment') || lowerUrl.includes('trading')) {
      return "증권사";
    } else if (lowerUrl.includes('crypto') || lowerUrl.includes('bitcoin') || 
               lowerUrl.includes('binance') || lowerUrl.includes('coinbase')) {
      return "암호화폐";
    } else if (lowerUrl.includes('reit') || lowerUrl.includes('estate') || 
               lowerUrl.includes('property') || lowerUrl.includes('land')) {
      return "부동산";
    } else {
      return "주식사이트";
    }
  };

  // URL 변경 시 카테고리 자동 설정
  const handleUrlChange = useCallback((url) => {
    const detectedCategory = detectCategoryFromUrl(url);
    setNewRecommendation(prev => ({
      ...prev, 
      url: url,
      category: detectedCategory
    }));
  }, []);

  // localStorage에 추천사항 저장
  useEffect(() => {
    try {
      localStorage.setItem("recommendations", JSON.stringify(recommendations));
    } catch (error) {
      console.warn("Failed to save recommendations:", error);
    }
  }, [recommendations]);

  // 태그 추가/제거
  const handleTagToggle = useCallback((tag) => {
    setNewRecommendation(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  }, []);

  // 필터링된 추천사항
  const filteredRecommendations = useMemo(() => {
    let filtered = recommendations;

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(rec => 
        rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 카테고리 필터링
    if (selectedCategory !== "전체") {
      filtered = filtered.filter(rec => rec.category === selectedCategory);
    }

    // 타입 필터링
    if (selectedType !== "전체") {
      filtered = filtered.filter(rec => rec.type === selectedType);
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "인기순":
          return b.likes - a.likes;
        case "오래된순":
          return new Date(a.date) - new Date(b.date);
        case "최신순":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return filtered;
  }, [recommendations, searchTerm, selectedCategory, selectedType, sortBy]);

  // 추천사항 추가
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!newRecommendation.title || !newRecommendation.description) {
      alert("제목과 설명을 모두 입력해주세요.");
      return;
    }

    const recommendation = {
      id: Date.now(),
      ...newRecommendation,
      date: new Date().toLocaleDateString(),
      likes: 0,
      likedBy: [],
      views: 0,
      comments: []
    };

    setRecommendations(prev => [recommendation, ...prev]);
    setNewRecommendation({
      title: "",
      url: "",
      description: "",
      category: "주식사이트",
      reason: "",
      tags: [],
      difficulty: "보통",
      type: "정보공유"
    });
    setShowForm(false);
    alert("게시글이 등록되었습니다!");
  }, [newRecommendation]);

  // 좋아요 토글
  const handleLike = useCallback((id) => {
    setRecommendations(prev => 
      prev.map(rec => {
        if (rec.id === id) {
          const hasLiked = rec.likedBy.includes('user'); // 간단한 사용자 식별
          if (hasLiked) {
            return {
              ...rec,
              likes: rec.likes - 1,
              likedBy: rec.likedBy.filter(user => user !== 'user')
            };
          } else {
            return {
              ...rec,
              likes: rec.likes + 1,
              likedBy: [...rec.likedBy, 'user']
            };
          }
        }
        return rec;
      })
    );
  }, []);

  // 추천사항 삭제
  const handleDelete = useCallback((id) => {
    if (window.confirm("정말로 이 추천사항을 삭제하시겠습니까?")) {
      setRecommendations(prev => prev.filter(rec => rec.id !== id));
    }
  }, []);

  return (
    <section className="recommendation-board" role="main" aria-labelledby="board-heading">
      <header className="recommendation-header">
        <h1 id="board-heading">투자 정보 게시판</h1>
        <p className="recommendation-subtitle">투자 관련 정보, 팁, 질문을 공유하고 토론해보세요</p>
        <button 
          className="recommendation-add-btn"
          onClick={() => setShowForm(!showForm)}
          aria-expanded={showForm}
          aria-controls="recommendation-form"
        >
          {showForm ? "취소" : "새 글 작성"}
        </button>
      </header>

      {/* 검색 및 필터링 */}
      <div className="board-filters">
        <div className="search-section">
          <input
            type="text"
            placeholder="제목, 내용, 태그로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-section">
          <div className="filter-group">
            <label>카테고리:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>글 유형:</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              {postTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>정렬:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="최신순">최신순</option>
              <option value="인기순">인기순</option>
              <option value="오래된순">오래된순</option>
            </select>
          </div>
        </div>
        
        <div className="results-info">
          총 {filteredRecommendations.length}개의 게시글
        </div>
      </div>

      {/* 추천 등록 폼 */}
      {showForm && (
        <div className="recommendation-form-container" id="recommendation-form">
          <form className="recommendation-form" onSubmit={handleSubmit} role="form" aria-labelledby="form-heading">
            <div className="form-group">
              <label>제목 *</label>
              <input
                type="text"
                value={newRecommendation.title}
                onChange={(e) => setNewRecommendation({...newRecommendation, title: e.target.value})}
                placeholder="추천하는 사이트/서비스명"
                required
              />
            </div>
            
            <div className="form-group">
              <label>URL *</label>
              <input
                type="url"
                value={newRecommendation.url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com"
                required
              />
              <small className="url-hint">
                URL을 입력하면 자동으로 카테고리가 설정됩니다
              </small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>카테고리</label>
                <select
                  value={newRecommendation.category}
                  onChange={(e) => setNewRecommendation({...newRecommendation, category: e.target.value})}
                  className="form-select"
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>글 유형</label>
                <select
                  value={newRecommendation.type}
                  onChange={(e) => setNewRecommendation({...newRecommendation, type: e.target.value})}
                  className="form-select"
                >
                  {postTypes.slice(1).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>난이도</label>
                <select
                  value={newRecommendation.difficulty}
                  onChange={(e) => setNewRecommendation({...newRecommendation, difficulty: e.target.value})}
                  className="form-select"
                >
                  <option value="쉬움">쉬움</option>
                  <option value="보통">보통</option>
                  <option value="어려움">어려움</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>태그 선택</label>
              <div className="tags-container">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-btn ${newRecommendation.tags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <small className="tag-hint">
                관련 태그를 선택하면 다른 사용자가 쉽게 찾을 수 있습니다
              </small>
            </div>

            <div className="form-group">
              <label>설명 *</label>
              <textarea
                value={newRecommendation.description}
                onChange={(e) => setNewRecommendation({...newRecommendation, description: e.target.value})}
                placeholder="어떤 서비스인지 간단히 설명해주세요"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>추가 정보 (선택사항)</label>
              <textarea
                value={newRecommendation.reason}
                onChange={(e) => setNewRecommendation({...newRecommendation, reason: e.target.value})}
                placeholder="추가로 공유하고 싶은 정보나 팁이 있다면 작성해주세요"
                rows="2"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">등록하기</button>
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 게시글 목록 */}
      <section className="recommendations-list" role="region" aria-labelledby="list-heading">
        <h2 id="list-heading" className="sr-only">게시글 목록</h2>
        {filteredRecommendations.length === 0 ? (
          <div className="empty-state" role="status">
            {recommendations.length === 0 ? (
              <>
                <p>아직 등록된 게시글이 없습니다.</p>
                <p>첫 번째 글을 작성해보세요!</p>
              </>
            ) : (
              <>
                <p>검색 조건에 맞는 게시글이 없습니다.</p>
                <p>다른 검색어나 필터를 시도해보세요.</p>
              </>
            )}
          </div>
        ) : (
          filteredRecommendations.map((rec) => (
            <article key={rec.id} className="recommendation-card">
              <header className="rec-header">
                <div className="rec-title-section">
                  <h3 className="rec-title">
                    <a href={rec.url} target="_blank" rel="noopener noreferrer" aria-label={`${rec.title} 사이트 방문`}>
                      {rec.title}
                    </a>
                  </h3>
                  <div className="post-badges">
                    <span className={`type-badge type-${rec.type}`}>{rec.type}</span>
                    <span className="rec-category" aria-label="카테고리">{rec.category}</span>
                    <span className={`difficulty-badge difficulty-${rec.difficulty}`}>{rec.difficulty}</span>
                  </div>
                </div>
                <div className="rec-meta">
                  <span className="rec-date" aria-label="등록일">{rec.date}</span>
                  <span className="views">👁️ {rec.views || 0}</span>
                  <button 
                    className="rec-delete"
                    onClick={() => handleDelete(rec.id)}
                    aria-label={`${rec.title} 추천 삭제`}
                    title="삭제"
                  >
                    ×
                  </button>
                </div>
              </header>
              
              <p className="rec-description">{rec.description}</p>
              
              {rec.reason && (
                <div className="additional-info">
                  <strong>추가 정보:</strong> {rec.reason}
                </div>
              )}
              
              {rec.tags && rec.tags.length > 0 && (
                <div className="tags-display">
                  {rec.tags.map(tag => (
                    <span key={tag} className="tag-display">{tag}</span>
                  ))}
                </div>
              )}
              
              <footer className="rec-actions">
                <button 
                  className={`like-btn ${rec.likedBy.includes('user') ? 'liked' : ''}`}
                  onClick={() => handleLike(rec.id)}
                  aria-label={`좋아요 ${rec.likes}개, ${rec.likedBy.includes('user') ? '좋아요 취소' : '좋아요 추가'}`}
                >
                  <span aria-hidden="true">♡</span> {rec.likes}
                </button>
                <button className="comment-btn">
                  💬 {rec.comments?.length || 0}
                </button>
                <a 
                  href={rec.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="visit-btn"
                  aria-label={`${rec.title} 사이트 방문하기`}
                >
                  방문하기
                </a>
              </footer>
            </article>
          ))
        )}
      </section>
    </section>
  );
});

RecommendationBoard.displayName = 'RecommendationBoard';

export default RecommendationBoard;