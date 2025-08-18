import React from "react";
import PropTypes from "prop-types";

const CompactSiteCard = ({ site, isFavorite, onToggleFavorite, onRemove }) => {
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

  const getDifficultyColor = (difficulty) => {
    const difficultyColors = {
      '쉬움': 'var(--success-light)',
      '보통': 'var(--warning-light)',
      '어려움': 'var(--destructive-light)'
    };
    return difficultyColors[difficulty] || 'var(--muted)';
  };

  return (
    <article 
      className={`compact-site-card ${site.isUserSubmitted ? 'user-submitted' : ''}`}
      role="article"
      aria-label={`${site.name} - ${site.description}`}
    >
      <div className="compact-card-content">
        <div className="compact-card-header">
          <div className="compact-title-section">
            <div className="compact-title-row">
              <h4 className="compact-site-name">
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
              <div className="compact-card-actions" onClick={(e) => e.stopPropagation()}>
                <button 
                  className={`favorite-btn-compact ${isFavorite ? 'favorited' : ''}`}
                  onClick={() => onToggleFavorite(site.id)}
                  aria-label={isFavorite ? `${site.name} 즐겨찾기 해제` : `${site.name} 즐겨찾기 추가`}
                  title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                >
                  <span aria-hidden="true">{isFavorite ? "⭐" : "☆"}</span>
                </button>
                {site.isUserSubmitted && onRemove && (
                  <button 
                    className="remove-btn-compact"
                    onClick={() => onRemove(site.id)}
                    aria-label={`${site.name} 삭제`}
                    title="삭제"
                  >
                    <span aria-hidden="true">🗑️</span>
                  </button>
                )}
              </div>
            </div>
            <p className="compact-site-description">{site.description}</p>
          </div>
        </div>
        
        <div className="compact-card-footer">
          <div className="compact-tags">
            <span 
              className="compact-category-tag"
              style={{ backgroundColor: getCategoryColor(site.category) }}
            >
              {site.category}
            </span>
            {site.difficulty && (
              <span 
                className="compact-difficulty-tag"
                style={{ backgroundColor: getDifficultyColor(site.difficulty) }}
              >
                {site.difficulty}
              </span>
            )}
          </div>
          <button 
            className="compact-visit-btn"
            onClick={handleVisit}
            aria-label={`${site.name} 사이트 방문하기`}
            title="사이트 방문"
          >
            <span className="visit-icon">↗</span>
          </button>
        </div>
      </div>
    </article>
  );
};

CompactSiteCard.propTypes = {
  site: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    tips: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    isUserSubmitted: PropTypes.bool,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

export default React.memo(CompactSiteCard);