import React from "react";
import PropTypes from "prop-types";

const SiteCard = ({ site, isFavorite, onToggleFavorite }) => {

  return (
    <div className="site-card">
      <div className="card-header">
        <h3 className="site-name">{site.name}</h3>
        <button 
          className={`favorite-btn-simple ${isFavorite ? 'favorited' : ''}`}
          onClick={() => onToggleFavorite(site.id)}
          title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        >
          {isFavorite ? "⭐" : "☆"}
        </button>
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
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default React.memo(SiteCard);