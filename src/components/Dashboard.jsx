import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { stockSites, youtubeChannels } from "../data";
import CompactSiteCard from "./CompactSiteCard";
import SimpleFavoriteCard from "./SimpleFavoriteCard";

const Dashboard = ({ 
  siteFavorites, 
  youtubeFavorites, 
  onToggleSiteFavorite, 
  onToggleYoutubeFavorite,
  onNavigate 
}) => {
  const [recentViews] = useState(() => {
    try {
      const saved = localStorage.getItem("recentViews");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const favoriteSites = useMemo(() => {
    return stockSites.filter(site => siteFavorites.includes(site.id));
  }, [siteFavorites]);

  const favoriteYoutubeChannels = useMemo(() => {
    return youtubeChannels.filter(channel => youtubeFavorites.includes(channel.id));
  }, [youtubeFavorites]);

  const recentSites = useMemo(() => {
    const allItems = [...stockSites, ...youtubeChannels];
    return recentViews
      .map(id => allItems.find(item => item.id === id))
      .filter(Boolean)
      .slice(0, 6);
  }, [recentViews]);

  const quickStats = {
    totalFavorites: siteFavorites.length + youtubeFavorites.length,
    siteFavorites: siteFavorites.length,
    youtubeFavorites: youtubeFavorites.length,
    recentViews: recentViews.length
  };



  const handleNavigateToSites = useCallback(() => {
    onNavigate('sites');
  }, [onNavigate]);

  const handleNavigateToYoutube = useCallback(() => {
    onNavigate('youtube');
  }, [onNavigate]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>나의 투자 대시보드</h1>
        <p className="dashboard-subtitle">나만의 맞춤 정보를 한눈에 확인하세요</p>
      </header>

      {/* 퀵 스탯 */}
      <section className="quick-stats" aria-label="통계 요약">
        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">★</div>
          <div className="stat-info">
            <div className="stat-number">{quickStats.totalFavorites}</div>
            <div className="stat-label">즐겨찾기</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">●</div>
          <div className="stat-info">
            <div className="stat-number">{quickStats.siteFavorites}</div>
            <div className="stat-label">사이트</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">△</div>
          <div className="stat-info">
            <div className="stat-number">{quickStats.youtubeFavorites}</div>
            <div className="stat-label">유튜브</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" aria-hidden="true">○</div>
          <div className="stat-info">
            <div className="stat-number">{quickStats.recentViews}</div>
            <div className="stat-label">최근 방문</div>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        {/* 즐겨찾기 사이트 */}
        <section className="dashboard-section" aria-labelledby="favorite-sites-heading">
          <div className="section-header">
            <h2 id="favorite-sites-heading">즐겨찾기 사이트</h2>
            <button 
              className="view-all-btn"
              onClick={handleNavigateToSites}
              aria-label="즐겨찾기 사이트 전체보기"
            >
              전체보기
            </button>
          </div>
          {favoriteSites.length > 0 ? (
            <div className="dashboard-simple-grid">
              {favoriteSites.slice(0, 6).map(site => (
                <SimpleFavoriteCard
                  key={site.id}
                  site={site}
                  isFavorite={true}
                  onToggleFavorite={onToggleSiteFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>아직 즐겨찾기한 사이트가 없습니다</p>
              <button 
                className="cta-btn"
                onClick={handleNavigateToSites}
                aria-label="주식 사이트 목록으로 이동하여 즐겨찾기 추가하기"
              >
                사이트 둘러보기
              </button>
            </div>
          )}
        </section>

        {/* 즐겨찾기 유튜브 */}
        <section className="dashboard-section" aria-labelledby="favorite-youtube-heading">
          <div className="section-header">
            <h2 id="favorite-youtube-heading">즐겨찾기 유튜브</h2>
            <button 
              className="view-all-btn"
              onClick={handleNavigateToYoutube}
              aria-label="즐겨찾기 유튜브 채널 전체보기"
            >
              전체보기
            </button>
          </div>
          {favoriteYoutubeChannels.length > 0 ? (
            <div className="dashboard-simple-grid">
              {favoriteYoutubeChannels.slice(0, 6).map(channel => (
                <SimpleFavoriteCard
                  key={channel.id}
                  site={channel}
                  isFavorite={true}
                  onToggleFavorite={onToggleYoutubeFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>아직 즐겨찾기한 유튜브 채널이 없습니다</p>
              <button 
                className="cta-btn"
                onClick={handleNavigateToYoutube}
                aria-label="유튜브 채널 목록으로 이동하여 즐겨찾기 추가하기"
              >
                유튜브 채널 둘러보기
              </button>
            </div>
          )}
        </section>



        {/* 최근 방문 */}
        {recentSites.length > 0 && (
          <section className="dashboard-section full-width" aria-labelledby="recent-visits-heading">
            <div className="section-header">
              <h2 id="recent-visits-heading">최근 방문</h2>
            </div>
            <div className="dashboard-grid-small">
              {recentSites.map(item => (
                <CompactSiteCard
                  key={item.id}
                  site={item}
                  isFavorite={
                    stockSites.includes(item) 
                      ? siteFavorites.includes(item.id)
                      : youtubeFavorites.includes(item.id)
                  }
                  onToggleFavorite={
                    stockSites.includes(item) 
                      ? onToggleSiteFavorite
                      : onToggleYoutubeFavorite
                  }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  siteFavorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  youtubeFavorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleSiteFavorite: PropTypes.func.isRequired,
  onToggleYoutubeFavorite: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default React.memo(Dashboard);