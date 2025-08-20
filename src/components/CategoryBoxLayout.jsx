import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../data';

const CategoryBoxLayout = ({ 
  sites, 
  favorites, 
  onToggleFavorite, 
  onRemoveSite,
  onSiteClick 
}) => {
  const [categories, setCategories] = useState([]);

  // 카테고리 데이터 로드
  useEffect(() => {
    const loadCategories = () => {
      const currentCategories = getCategories();
      setCategories(currentCategories);
    };

    loadCategories();
    
    // 카테고리 업데이트 이벤트 감지
    const handleCategoryUpdate = () => {
      loadCategories();
    };
    
    window.addEventListener('categoryUpdate', handleCategoryUpdate);
    window.addEventListener('storage', handleCategoryUpdate);
    
    return () => {
      window.removeEventListener('categoryUpdate', handleCategoryUpdate);
      window.removeEventListener('storage', handleCategoryUpdate);
    };
  }, []);

  // 카테고리별로 사이트들을 그룹화
  const sitesByCategory = useMemo(() => {
    const grouped = {};
    
    // 모든 카테고리 초기화 (빈 카테고리도 표시하기 위해)
    categories.forEach(category => {
      if (category !== '전체') {
        grouped[category] = [];
      }
    });
    
    // 사이트들을 카테고리별로 분류
    sites.forEach(site => {
      if (grouped[site.category]) {
        grouped[site.category].push(site);
      } else {
        // 새로운 카테고리가 있으면 추가
        grouped[site.category] = [site];
      }
    });
    
    return grouped;
  }, [sites]);

  const getCategoryColor = (category) => {
    const categoryColors = {
      '투자정보': 'var(--accent-blue)',
      '뉴스': 'var(--accent-green)', 
      '커뮤니티': 'var(--accent-pink)',
      '분석도구': 'var(--accent-purple)',
      '교육': 'var(--accent-yellow)',
    };
    return categoryColors[category] || 'var(--accent-purple)';
  };

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      '투자정보': '📊',
      '뉴스': '📰',
      '커뮤니티': '💬',
      '분석도구': '🔍',
      '교육': '📚',
    };
    return categoryIcons[category] || '📈';
  };

  const handleSiteClick = (site) => {
    // 최근 조회 기록 추가
    if (onSiteClick) {
      onSiteClick(site.id);
    }
    
    // 사이트 열기
    try {
      window.open(site.url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open site:', error);
    }
  };

  return (
    <div className="category-box-layout">
      <div className="category-boxes-container">
        {Object.entries(sitesByCategory).map(([category, categorySites]) => (
          <div key={category} className="category-box">
            <div 
              className="category-header"
              style={{ backgroundColor: getCategoryColor(category) }}
            >
              <h3 className="category-title">
                <span className="category-icon">{getCategoryIcon(category)}</span>
                {category}
              </h3>
              <span className="category-count">
                {categorySites.length}개
              </span>
            </div>
            
            <div className="category-content">
              {categorySites.length > 0 ? (
                <div className="sites-grid">
                  {categorySites.map(site => (
                    <div
                      key={site.id}
                      className={`site-box-item ${site.isUserSubmitted ? 'user-submitted' : ''}`}
                      onClick={() => handleSiteClick(site)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSiteClick(site);
                        }
                      }}
                    >
                      <div className="site-box-content">
                        <div className="site-box-header">
                          <h4 className="site-box-name">
                            {site.name}
                            {site.isUserSubmitted && (
                              <span 
                                className="user-badge"
                                aria-label="사용자 추가 사이트"
                                title="사용자가 추가한 사이트"
                              >
                                👤
                              </span>
                            )}
                          </h4>
                          <div className="site-box-actions" onClick={(e) => e.stopPropagation()}>
                            <button 
                              className={`site-favorite-btn ${favorites.includes(site.id) ? 'favorited' : ''}`}
                              onClick={() => onToggleFavorite(site.id)}
                              aria-label={favorites.includes(site.id) ? `${site.name} 즐겨찾기 해제` : `${site.name} 즐겨찾기 추가`}
                              title={favorites.includes(site.id) ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                            >
                              {favorites.includes(site.id) ? "⭐" : "☆"}
                            </button>
                            {site.isUserSubmitted && onRemoveSite && (
                              <button 
                                className="site-remove-btn"
                                onClick={() => onRemoveSite(site.id)}
                                aria-label={`${site.name} 삭제`}
                                title="삭제"
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {site.description && (
                          <p className="site-box-description">
                            {site.description}
                          </p>
                        )}
                        
                        <div className="site-box-footer">
                          <span className="site-box-difficulty">
                            난이도: {site.difficulty}
                          </span>
                          <span className="site-box-link-icon">↗</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="category-empty">
                  <span className="empty-icon">📂</span>
                  <p>이 카테고리에는 아직 사이트가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CategoryBoxLayout.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    difficulty: PropTypes.string,
    isUserSubmitted: PropTypes.bool,
  })).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onRemoveSite: PropTypes.func,
  onSiteClick: PropTypes.func,
};

export default React.memo(CategoryBoxLayout);