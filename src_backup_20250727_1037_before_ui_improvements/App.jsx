import React, { useState, useEffect, useMemo } from "react";
import { stockSites as initialSites, categories } from "./data";
import SiteCard from "./components/SiteCard";
import YoutubeSection from "./components/YoutubeSection";
import Dashboard from "./components/Dashboard";
import AddSite from "./components/AddSite";
import useUserSubmissions from "./hooks/useUserSubmissions";
import "./styles.css";

function App() {
  const [sites] = useState(initialSites);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn("Failed to load favorites from localStorage:", error);
      return [];
    }
  });
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentView, setCurrentView] = useState("dashboard"); // "dashboard", "sites", or "youtube"
  
  // 사용자 제출 기능
  const { userSites, addUserSite, removeUserSite } = useUserSubmissions();
  const [showAddSiteModal, setShowAddSiteModal] = useState(false);
  
  // 유튜브 즐겨찾기 상태 추가
  const [youtubeFavorites, setYoutubeFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("youtubeFavorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn("Failed to load YouTube favorites:", error);
      return [];
    }
  });
  
  const toggleYoutubeFavorite = (id) => {
    const newFavorites = youtubeFavorites.includes(id)
      ? youtubeFavorites.filter((fid) => fid !== id)
      : [...youtubeFavorites, id];
    setYoutubeFavorites(newFavorites);
    
    try {
      localStorage.setItem("youtubeFavorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.warn("Failed to save YouTube favorites:", error);
    }
  };
  
  // 방문 기록 추가 함수
  const addToRecentViews = (id) => {
    try {
      const saved = localStorage.getItem("recentViews");
      const recentViews = saved ? JSON.parse(saved) : [];
      const newRecentViews = [id, ...recentViews.filter(viewId => viewId !== id)].slice(0, 10);
      localStorage.setItem("recentViews", JSON.stringify(newRecentViews));
    } catch (error) {
      console.warn("Failed to save recent views:", error);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fid) => fid !== id)
        : [...prevFavorites, id]
    );
  };

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.warn("Failed to save favorites to localStorage:", error);
    }
  }, [favorites]);

  // 기존 사이트와 사용자 제출 사이트 결합
  const allSites = useMemo(() => {
    return [...sites, ...userSites];
  }, [sites, userSites]);

  const filteredSites = useMemo(() => {
    return allSites.filter((site) => {
      const matchesCategory = selectedCategory === "전체" || site.category === selectedCategory;
      return matchesCategory;
    });
  }, [allSites, selectedCategory]);

  const favoriteSites = useMemo(() => {
    return allSites.filter((site) => favorites.includes(site.id));
  }, [allSites, favorites]);

  // 사이트 추가 핸들러
  const handleAddSite = (siteData) => {
    const newSite = addUserSite(siteData);
    setShowAddSiteModal(false);
    alert(`${newSite.name}이(가) 성공적으로 추가되었습니다!`);
  };

  // 사이트 삭제 핸들러
  const handleRemoveSite = (siteId) => {
    if (window.confirm('정말로 이 사이트를 삭제하시겠습니까?')) {
      removeUserSite(siteId);
      // 즐겨찾기에서도 제거
      setFavorites(prev => prev.filter(id => id !== siteId));
    }
  };


  return (
    <div className="App">
      {/* 네비게이션 버튼 */}
      <div className="nav-buttons">
        <button 
          className={`nav-btn ${currentView === "dashboard" ? 'active' : ''}`}
          onClick={() => setCurrentView("dashboard")}
        >
          📈 대시보드
        </button>
        <button 
          className={`nav-btn ${currentView === "sites" ? 'active' : ''}`}
          onClick={() => setCurrentView("sites")}
        >
          🌐 주식 사이트
        </button>
        <button 
          className={`nav-btn ${currentView === "youtube" ? 'active' : ''}`}
          onClick={() => setCurrentView("youtube")}
        >
          📺 유튜브 채널
        </button>
      </div>
      
      {currentView === "dashboard" ? (
        <Dashboard 
          siteFavorites={favorites}
          youtubeFavorites={youtubeFavorites}
          onToggleSiteFavorite={toggleFavorite}
          onToggleYoutubeFavorite={toggleYoutubeFavorite}
          onNavigate={setCurrentView}
        />
      ) : currentView === "sites" ? (
        <div className="sites-section">
          <div className="sites-header">
            <h1>🌐 주식 사이트</h1>
            <p className="sites-subtitle">신뢰할 수 있는 주식 투자 사이트들을 카테고리별로 만나보세요</p>
            <button 
              className="add-site-btn"
              onClick={() => setShowAddSiteModal(true)}
            >
              ➕ 새 사이트 추가
            </button>
          </div>


          {/* 카테고리 필터 */}
          <div className="filter-section">
            <h3>카테고리</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 즐겨찾기 섹션 */}
          {favoriteSites.length > 0 && (
            <div className="favorites-container">
              <div className="favorites-header">
                <h2 className="favorites-title">
                  <span className="star-icon">⭐</span>
                  내 즐겨찾기 사이트
                </h2>
                <div className="favorites-count">
                  {favoriteSites.length}개의 사이트
                </div>
              </div>
              <div className="site-list">
                {favoriteSites.map((site) => (
                  <SiteCard
                    key={`fav-${site.id}`}
                    site={site}
                    isFavorite={true}
                    onToggleFavorite={(id) => {
                      toggleFavorite(id);
                      addToRecentViews(id);
                    }}
                    onRemove={site.isUserSubmitted ? handleRemoveSite : undefined}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="section-title">
            <h2>전체 사이트</h2>
            <span className="count-badge">{filteredSites.length}개</span>
          </div>
          <div className="site-list">
            {filteredSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isFavorite={favorites.includes(site.id)}
                onToggleFavorite={(id) => {
                  toggleFavorite(id);
                  addToRecentViews(id);
                }}
                onRemove={site.isUserSubmitted ? handleRemoveSite : undefined}
              />
            ))}
          </div>
        </div>
      ) : (
        <YoutubeSection />
      )}
      
      {/* 사이트 추가 모달 */}
      <AddSite
        isOpen={showAddSiteModal}
        onClose={() => setShowAddSiteModal(false)}
        onSubmit={handleAddSite}
        type="site"
      />
    </div>
  );
}

export default App;