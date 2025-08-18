import React from "react";
import PropTypes from "prop-types";

const SiteCard = React.memo(({ site, isFavorite, onToggleFavorite, onRemove }) => {
  const handleVisit = () => {
    try {
      window.open(site.url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open site:', error);
      alert('사이트를 열 수 없습니다. URL을 확인해주세요.');
    }
  };

  const handleToggleFavorite = () => {
    try {
      onToggleFavorite(site.id);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handleRemove = () => {
    try {
      onRemove(site.id);
    } catch (error) {
      console.error('Failed to remove site:', error);
    }
  };

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

  const getDifficultyColor = (difficulty) => {
    const difficultyColors = {
      '쉬움': 'var(--success-light)',
      '보통': 'var(--warning-light)',
      '어려움': 'var(--destructive-light)'
    };
    return difficultyColors[difficulty] || 'var(--muted)';
  };

  return (
    <article className={`site-card ${site.isUserSubmitted ? 'user-submitted' : ''}`} role="article">
      <div className="card-content">
        <div className="card-header">
          <div className="card-title-section">
            <h3 className="site-name">
              {site.name}
              {site.isUserSubmitted && (
                <span className="user-badge" aria-label="사용자 추가 사이트" title="사용자가 추가한 사이트">👤</span>
              )}
            </h3>
            <p className="site-description">{site.description}</p>
          </div>
          <div className="card-actions">
            <button 
              className={`favorite-btn-simple ${isFavorite ? 'favorited' : ''}`}
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? `${site.name} 즐겨찾기 해제` : `${site.name} 즐겨찾기 추가`}
              title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            >
              <span aria-hidden="true">{isFavorite ? "⭐" : "☆"}</span>
            </button>
            {site.isUserSubmitted && onRemove && (
              <button 
                className="remove-btn-simple"
                onClick={handleRemove}
                aria-label={`${site.name} 삭제`}
                title="삭제"
              >
                <span aria-hidden="true">🗑️</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="card-footer">
          <div className="card-tags">
            <span 
              className="category-tag"
              style={{ backgroundColor: getCategoryColor(site.category) }}
              aria-label="카테고리"
            >
              <span className="sr-only">카테고리: </span>
              {site.category}
            </span>
            {site.difficulty && (
              <span 
                className="difficulty-tag"
                style={{ backgroundColor: getDifficultyColor(site.difficulty) }}
                aria-label="난이도"
              >
                {site.difficulty}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleVisit}
            className="visit-btn-simple"
            type="button"
            aria-label={`${site.name} 사이트 방문하기`}
          >
            <span className="visit-text">방문하기</span>
            <span className="visit-icon">↗</span>
          </button>
        </div>
      </div>
    </article>
  );
});

SiteCard.propTypes = {
  site: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isUserSubmitted: PropTypes.bool
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onRemove: PropTypes.func
};

SiteCard.displayName = 'SiteCard';

export default SiteCard;