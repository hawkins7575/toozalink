import React from "react";
import PropTypes from "prop-types";

const Favorites = ({ favoriteSites }) => {
  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2 className="favorites-title">
          <span className="star-icon">⭐</span>
          내 즐겨찾기
        </h2>
        <div className="favorites-count">
          {favoriteSites.length}개의 사이트
        </div>
      </div>
      
      {favoriteSites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">📌</div>
          <h3>아직 즐겨찾기가 없어요</h3>
          <p>마음에 드는 사이트를 즐겨찾기에 추가해보세요!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteSites.map((site, index) => (
            <div key={site.id} className="favorite-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="favorite-card">
                <div className="favorite-header">
                  <div className="site-icon">
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${(() => {
                        try {
                          return new URL(site.url).hostname;
                        } catch {
                          return site.url.replace(/^https?:\/\//, '').split('/')[0];
                        }
                      })()}&sz=24`}
                      alt=""
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="fallback-icon" style={{ display: 'none' }}>🔗</div>
                  </div>
                  <div className="remove-btn" title="즐겨찾기 해제">×</div>
                </div>
                
                <div className="favorite-content">
                  <h3 className="site-name">{site.name}</h3>
                  <p className="site-url">{(() => {
                    try {
                      return new URL(site.url).hostname;
                    } catch {
                      return site.url.replace(/^https?:\/\//, '').split('/')[0];
                    }
                  })()}</p>
                </div>
                
                <div className="favorite-actions">
                  <button 
                    onClick={() => window.open(site.url, '_blank')}
                    className="visit-link"
                    type="button"
                  >
                    <span>방문하기</span>
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Favorites.propTypes = {
  favoriteSites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Favorites;