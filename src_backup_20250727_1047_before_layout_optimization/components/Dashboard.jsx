import React, { useState, useMemo } from "react";
import { stockSites, youtubeChannels } from "../data";
import SiteCard from "./SiteCard";

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

  const recommendedSites = useMemo(() => {
    // 초보자용 추천 사이트
    return stockSites
      .filter(site => site.tags.includes("초보용") || site.difficulty === "쉬움")
      .slice(0, 4);
  }, []);

  const recommendedYoutube = useMemo(() => {
    // 초보자용 유튜브 채널
    return youtubeChannels
      .filter(channel => channel.category === "초보자용")
      .slice(0, 4);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 나의 투자 대시보드</h1>
        <p className="dashboard-subtitle">나만의 맞춤 정보를 한눈에 확인하세요</p>
      </div>

      {/* 퀵 스탯 */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{quickStats.totalFavorites}</h3>
            <p>전체 즐겨찾기</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌐</div>
          <div className="stat-info">
            <h3>{quickStats.siteFavorites}</h3>
            <p>사이트</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📺</div>
          <div className="stat-info">
            <h3>{quickStats.youtubeFavorites}</h3>
            <p>유튜브</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🕒</div>
          <div className="stat-info">
            <h3>{quickStats.recentViews}</h3>
            <p>최근 방문</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* 즐겨찾기 사이트 */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>⭐ 즐겨찾기 사이트</h2>
            <button 
              className="view-all-btn"
              onClick={() => onNavigate('sites')}
            >
              전체보기
            </button>
          </div>
          {favoriteSites.length > 0 ? (
            <div className="dashboard-grid-small">
              {favoriteSites.slice(0, 4).map(site => (
                <SiteCard
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
                onClick={() => onNavigate('sites')}
              >
                사이트 둘러보기
              </button>
            </div>
          )}
        </div>

        {/* 즐겨찾기 유튜브 */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>📺 즐겨찾기 유튜브</h2>
            <button 
              className="view-all-btn"
              onClick={() => onNavigate('youtube')}
            >
              전체보기
            </button>
          </div>
          {favoriteYoutubeChannels.length > 0 ? (
            <div className="dashboard-grid-small">
              {favoriteYoutubeChannels.slice(0, 4).map(channel => (
                <SiteCard
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
                onClick={() => onNavigate('youtube')}
              >
                유튜브 채널 둘러보기
              </button>
            </div>
          )}
        </div>

        {/* 추천 사이트 */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>🎯 추천 사이트</h2>
            <span className="section-subtitle">초보자에게 추천</span>
          </div>
          <div className="dashboard-grid-small">
            {recommendedSites.map(site => (
              <SiteCard
                key={site.id}
                site={site}
                isFavorite={siteFavorites.includes(site.id)}
                onToggleFavorite={onToggleSiteFavorite}
              />
            ))}
          </div>
        </div>

        {/* 추천 유튜브 */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>🎬 추천 유튜브</h2>
            <span className="section-subtitle">초보자 친화적</span>
          </div>
          <div className="dashboard-grid-small">
            {recommendedYoutube.map(channel => (
              <SiteCard
                key={channel.id}
                site={channel}
                isFavorite={youtubeFavorites.includes(channel.id)}
                onToggleFavorite={onToggleYoutubeFavorite}
              />
            ))}
          </div>
        </div>

        {/* 최근 방문 */}
        {recentSites.length > 0 && (
          <div className="dashboard-section full-width">
            <div className="section-header">
              <h2>🕒 최근 방문</h2>
            </div>
            <div className="dashboard-grid-small">
              {recentSites.map(item => (
                <SiteCard
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;