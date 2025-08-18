import React from "react";
import PropTypes from "prop-types";

const SiteCard = ({ site, isFavorite, onToggleFavorite, onRemove }) => {

  return (
    <div className={`site-card ${site.isUserSubmitted ? 'user-submitted' : ''}`}>
      <div className="card-header">
        <h3 className="site-name">
          {site.name}
          {site.isUserSubmitted && <span className="user-badge">👤</span>}
        </h3>
        <div className="card-actions">
          <button 
            className={`favorite-btn-simple ${isFavorite ? 'favorited' : ''}`}
            onClick={() => onToggleFavorite(site.id)}
            title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            {isFavorite ? "⭐" : "☆"}
          </button>
          {site.isUserSubmitted && onRemove && (
            <button 
              className="remove-btn-simple"
              onClick={() => onRemove(site.id)}
              title="삭제"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      
      <p className="site-description">{site.description}</p>
      
      <div className="site-category">{site.category}</div>
      
      <button 
        onClick={() => window.open(site.url, '_blank')}
        className="visit-btn-simple"
        type="button"
      >
        방문하기
      </button>
    </div>
  );
};

SiteCard.propTypes = {
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

export default React.memo(SiteCard);