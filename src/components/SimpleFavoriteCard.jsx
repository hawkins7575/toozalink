import React from "react";
import PropTypes from "prop-types";

const SimpleFavoriteCard = ({ site, isFavorite, onToggleFavorite, onRemove }) => {
  const handleVisit = (e) => {
    e.stopPropagation();
    try {
      window.open(site.url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open site:', error);
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

  return (
    <article className={`simple-favorite-card ${site.isUserSubmitted ? 'user-submitted' : ''}`}>
      <div className="simple-card-content">
        <div className="simple-card-main" onClick={handleVisit}>
          <div className="simple-card-info">
            <h4 className="simple-site-name">
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
            <span 
              className="simple-category-tag"
              style={{ backgroundColor: getCategoryColor(site.category) }}
            >
              {site.category}
            </span>
          </div>
          <span className="simple-visit-icon">↗</span>
        </div>
        
        <div className="simple-card-actions" onClick={(e) => e.stopPropagation()}>
          <button 
            className={`simple-favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={() => onToggleFavorite(site.id)}
            aria-label={isFavorite ? `${site.name} 즐겨찾기 해제` : `${site.name} 즐겨찾기 추가`}
            title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <span aria-hidden="true">{isFavorite ? "⭐" : "☆"}</span>
          </button>
          {site.isUserSubmitted && onRemove && (
            <button 
              className="simple-remove-btn"
              onClick={() => onRemove(site.id)}
              aria-label={`${site.name} 삭제`}
              title="삭제"
            >
              <span aria-hidden="true">🗑️</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

SimpleFavoriteCard.propTypes = {
  site: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isUserSubmitted: PropTypes.bool,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

export default React.memo(SimpleFavoriteCard);