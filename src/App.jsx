import React, { useState, useEffect, useCallback } from "react";
import YoutubeSection from "./components/YoutubeSection";
import Dashboard from "./components/Dashboard";
import AddSite from "./components/AddSite";
import RecommendationBoard from "./components/RecommendationBoard";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import FourSectionLayout from "./components/FourSectionLayout";
import InvestmentMasters from "./components/InvestmentMasters";
import BoardSelector from "./components/BoardSelector";
import useUserSubmissions from "./hooks/useUserSubmissions";
import useAuth from "./hooks/useAuth";
import "./styles.css";
import "./styles-new.css";
import "./styles-category-box.css";
import "./styles-youtube-category.css";
import "./styles-four-section.css";
import "./modal-styles.css";

function App() {
  const { user, isLoading, isAuthenticated, isAdmin, login, logout, register, updateUser } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [, setDataVersion] = useState(0); // 데이터 업데이트 트리거
  
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn("Failed to load favorites from localStorage:", error);
      return [];
    }
  });
  const [currentView, setCurrentView] = useState("dashboard");
  
  const { addUserSite, addUserYoutubeChannel } = useUserSubmissions();
  const [showAddSiteModal, setShowAddSiteModal] = useState(false);
  const [showAddYoutubeModal, setShowAddYoutubeModal] = useState(false);
  
  const [youtubeFavorites, setYoutubeFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("youtubeFavorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn("Failed to load YouTube favorites:", error);
      return [];
    }
  });
  
  const toggleYoutubeFavorite = useCallback((id) => {
    const newFavorites = youtubeFavorites.includes(id)
      ? youtubeFavorites.filter((fid) => fid !== id)
      : [...youtubeFavorites, id];
    setYoutubeFavorites(newFavorites);
    
    try {
      localStorage.setItem("youtubeFavorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.warn("Failed to save YouTube favorites:", error);
    }
  }, [youtubeFavorites]);
  
  const addToRecentViews = useCallback((id) => {
    try {
      const saved = localStorage.getItem("recentViews");
      const recentViews = saved ? JSON.parse(saved) : [];
      const newRecentViews = [id, ...recentViews.filter(viewId => viewId !== id)].slice(0, 10);
      localStorage.setItem("recentViews", JSON.stringify(newRecentViews));
    } catch (error) {
      console.warn("Failed to save recent views:", error);
    }
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fid) => fid !== id)
        : [...prevFavorites, id]
    );
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.warn("Failed to save favorites to localStorage:", error);
    }
  }, [favorites]);

  const handleAddSite = useCallback((siteData) => {
    const newSite = addUserSite(siteData);
    setShowAddSiteModal(false);
    alert(`${newSite.name}이(가) 성공적으로 추가되었습니다!`);
  }, [addUserSite]);

  const handleAddYoutubeChannel = useCallback((channelData) => {
    const newChannel = addUserYoutubeChannel(channelData);
    setShowAddYoutubeModal(false);
    alert(`${newChannel.name}이(가) 성공적으로 추가되었습니다!`);
  }, [addUserYoutubeChannel]);

  const handleSidebarAdd = useCallback(() => {
    if (currentView === "youtube") {
      setShowAddYoutubeModal(true);
    } else {
      setShowAddSiteModal(true);
    }
  }, [currentView]);

  const handleLogin = useCallback((userData) => {
    login(userData);
    setShowLogin(false);
  }, [login]);

  const handleRegister = useCallback((userData) => {
    register(userData);
    setShowRegister(false);
  }, [register]);

  const handleShowLogin = useCallback(() => {
    setShowLogin(true);
    setShowRegister(false);
  }, []);

  const handleShowRegister = useCallback(() => {
    setShowRegister(true);
    setShowLogin(false);
  }, []);

  const handleCloseAuth = useCallback(() => {
    setShowLogin(false);
    setShowRegister(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setCurrentView('dashboard');
  }, [logout]);

  const handleUpdateProfile = useCallback((userData) => {
    updateUser(userData);
  }, [updateUser]);

  const handleAdminLogin = useCallback((adminData) => {
    login(adminData);
    setShowAdminLogin(false);
    setShowAdminPanel(true);
  }, [login]);

  const handleAdminLogout = useCallback(() => {
    logout();
    setShowAdminPanel(false);
    setCurrentView('dashboard');
  }, [logout]);

  const handleDataUpdate = useCallback(() => {
    // 데이터 버전을 증가시켜 컴포넌트들이 리렌더링되도록 함
    setDataVersion(prev => prev + 1);
  }, []);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  // 구조화된 데이터 스키마
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "My Stock Link",
    "alternateName": "마이 스톡 링크",
    "description": "주식 투자를 위한 신뢰할 수 있는 사이트들과 유튜브 채널을 한 곳에서 관리하세요",
    "url": "https://mystocklink.com",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "creator": {
      "@type": "Organization",
      "name": "My Stock Link"
    },
    "datePublished": "2025-01-18",
    "inLanguage": "ko-KR"
  };

  return (
    <ErrorBoundary>
      <div className="App">
        {/* 구조화된 데이터 삽입 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="app-layout">
          <nav className="sidebar" role="navigation" aria-label="메인 네비게이션">
            <div className="sidebar-header">
              <h2 className="sidebar-title">tooza link</h2>
             </div>
            <div className="sidebar-nav">
              <div className="sidebar-menu">
                <button 
                  className={`sidebar-btn ${currentView === "dashboard" ? 'active' : ''}`}
                  onClick={() => setCurrentView("dashboard")}
                  aria-current={currentView === "dashboard" ? "page" : undefined}
                  aria-label="대시보드로 이동"
                >
                  <span className="sidebar-icon" aria-hidden="true">📊</span>
                  <span className="sidebar-text">대시보드</span>
                </button>
                <button 
                  className={`sidebar-btn ${currentView === "sites" ? 'active' : ''}`}
                  onClick={() => setCurrentView("sites")}
                  aria-current={currentView === "sites" ? "page" : undefined}
                  aria-label="주식 사이트 목록으로 이동"
                >
                  <span className="sidebar-icon" aria-hidden="true">📈</span>
                  <span className="sidebar-text">주식 사이트</span>
                </button>
                <button 
                  className={`sidebar-btn ${currentView === "youtube" ? 'active' : ''}`}
                  onClick={() => setCurrentView("youtube")}
                  aria-current={currentView === "youtube" ? "page" : undefined}
                  aria-label="유튜브 채널 목록으로 이동"
                >
                  <span className="sidebar-icon" aria-hidden="true">📺</span>
                  <span className="sidebar-text">유튜브 채널</span>
                </button>
                <button 
                  className={`sidebar-btn ${currentView === "boards" ? 'active' : ''}`}
                  onClick={() => setCurrentView("boards")}
                  aria-current={currentView === "boards" ? "page" : undefined}
                  aria-label="게시판으로 이동"
                >
                  <span className="sidebar-icon" aria-hidden="true">💬</span>
                  <span className="sidebar-text">게시판</span>
                </button>
                <button 
                  className={`sidebar-btn ${currentView === "masters" ? 'active' : ''}`}
                  onClick={() => setCurrentView("masters")}
                  aria-current={currentView === "masters" ? "page" : undefined}
                  aria-label="투자의 대가로 이동"
                >
                  <span className="sidebar-icon" aria-hidden="true">🏆</span>
                  <span className="sidebar-text">투자의 대가</span>
                </button>
              </div>
              
              {/* 로그인 섹션 */}
              <div className="sidebar-auth">
                {isAuthenticated ? (
                  <div className="user-info-sidebar">
                    <div className="user-name-sidebar">{user?.name}</div>
                    {isAdmin && <div className="admin-badge-sidebar">관리자</div>}
                    <div className="auth-buttons-sidebar">
                      <button 
                        className={`sidebar-auth-btn ${currentView === "profile" ? 'active' : ''}`}
                        onClick={() => setCurrentView("profile")}
                        title="프로필"
                      >
                        👤 프로필
                      </button>
                      {isAdmin ? (
                        <button 
                          onClick={() => setShowAdminPanel(true)}
                          className="sidebar-auth-btn"
                          title="관리자 패널"
                        >
                          ⚙️ 관리자
                        </button>
                      ) : (
                        <button 
                          onClick={() => setShowAdminLogin(true)}
                          className="sidebar-auth-btn"
                          title="관리자 로그인"
                        >
                          🔐 관리자
                        </button>
                      )}
                      <button 
                        onClick={isAdmin ? handleAdminLogout : handleLogout}
                        className="sidebar-auth-btn logout-btn"
                        title="로그아웃"
                      >
                        🚪 로그아웃
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="auth-buttons-sidebar">
                    <button 
                      onClick={handleShowLogin}
                      className="sidebar-auth-btn login-btn"
                      title="로그인"
                    >
                      🔑 로그인
                    </button>
                    <button 
                      onClick={handleShowRegister}
                      className="sidebar-auth-btn register-btn"
                      title="회원가입"
                    >
                      📝 회원가입
                    </button>
                    <button 
                      onClick={() => setShowAdminLogin(true)}
                      className="sidebar-auth-btn"
                      title="관리자 로그인"
                    >
                      🔐 관리자
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>

          <main className="main-content" role="main">
            {currentView === "dashboard" ? (
              <Dashboard 
                siteFavorites={favorites}
                youtubeFavorites={youtubeFavorites}
                onToggleSiteFavorite={toggleFavorite}
                onToggleYoutubeFavorite={toggleYoutubeFavorite}
                onNavigate={setCurrentView}
              />
            ) : currentView === "sites" ? (
              <FourSectionLayout
                favorites={favorites}
                onToggleFavorite={(id) => {
                  toggleFavorite(id);
                  addToRecentViews(id);
                }}
                onSiteClick={addToRecentViews}
              />
            ) : currentView === "youtube" ? (
              <YoutubeSection />
            ) : currentView === "boards" ? (
              <BoardSelector />
            ) : currentView === "masters" ? (
              <InvestmentMasters />
            ) : currentView === "profile" ? (
              <UserProfile
                user={user}
                onLogout={isAdmin ? handleAdminLogout : handleLogout}
                onUpdateProfile={handleUpdateProfile}
              />
            ) : null}
            
            <AddSite
              isOpen={showAddSiteModal}
              onClose={() => setShowAddSiteModal(false)}
              onSubmit={handleAddSite}
              type="site"
            />
            
            <AddSite
              isOpen={showAddYoutubeModal}
              onClose={() => setShowAddYoutubeModal(false)}
              onSubmit={handleAddYoutubeChannel}
              type="youtube"
            />

            {/* 관리자 로그인 모달 */}
            {showAdminLogin && (
              <AdminLogin 
                onAdminLogin={handleAdminLogin}
                onClose={() => setShowAdminLogin(false)}
              />
            )}

            {/* 관리자 패널 모달 */}
            {showAdminPanel && isAdmin && (
              <AdminPanel 
                onClose={() => setShowAdminPanel(false)}
                onDataUpdate={handleDataUpdate}
              />
            )}

            {/* 로그인 모달 */}
            {showLogin && (
              <div className="auth-modal-overlay">
                <div className="auth-modal-container">
                  <Login 
                    onLogin={handleLogin}
                    onSwitchToRegister={handleShowRegister}
                    onClose={handleCloseAuth}
                  />
                </div>
              </div>
            )}

            {/* 회원가입 모달 */}
            {showRegister && (
              <div className="auth-modal-overlay">
                <div className="auth-modal-container">
                  <Register 
                    onRegister={handleRegister}
                    onSwitchToLogin={handleShowLogin}
                    onClose={handleCloseAuth}
                  />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;