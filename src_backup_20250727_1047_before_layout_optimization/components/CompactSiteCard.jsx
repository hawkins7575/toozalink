import React from "react";
import PropTypes from "prop-types";

const CompactSiteCard = ({ site, isFavorite, onToggleFavorite, onRemove }) => {
  const handleVisit = (e) => {
    e.stopPropagation();
    window.open(site.url, '_blank');
  };

  return (
    <div className={`compact-site-card ${site.isUserSubmitted ? 'user-submitted' : ''}`}>
      <div className="compact-card-main" onClick={handleVisit}>
        <div className="compact-card-header">
          <h4 className="compact-site-name">
            {site.name}
            {site.isUserSubmitted && <span className="user-badge">👤</span>}
          </h4>
          <div className="compact-card-actions" onClick={(e) => e.stopPropagation()}>
            <button 
              className={`favorite-btn-compact ${isFavorite ? 'favorited' : ''}`}
              onClick={() => onToggleFavorite(site.id)}
              title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            >
              {isFavorite ? "⭐" : "☆"}
            </button>
            {site.isUserSubmitted && onRemove && (
              <button 
                className="remove-btn-compact"
                onClick={() => onRemove(site.id)}
                title="삭제"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
        
        <p className="compact-site-description">{site.description}</p>
        
        <div className="compact-card-footer">
          <span className="compact-site-category">{site.category}</span>
          <span className="compact-site-difficulty">{site.difficulty}</span>
        </div>
      </div>
    </div>
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