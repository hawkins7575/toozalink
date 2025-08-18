import React, { useState, useMemo } from "react";
import { youtubeChannels, youtubeCategories } from "../data";
import SiteCard from "./SiteCard";
import AddSite from "./AddSite";
import useUserSubmissions from "../hooks/useUserSubmissions";

const YoutubeSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("youtubeFavorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn("Failed to load YouTube favorites:", error);
      return [];
    }
  });
  
  // 사용자 제출 기능
  const { userYoutubeChannels, addUserYoutubeChannel, removeUserYoutubeChannel } = useUserSubmissions();
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    
    try {
      localStorage.setItem("youtubeFavorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.warn("Failed to save YouTube favorites:", error);
    }
  };

  // 기존 채널과 사용자 제출 채널 결합
  const allChannels = useMemo(() => {
    return [...youtubeChannels, ...userYoutubeChannels];
  }, [userYoutubeChannels]);

  const filteredChannels = useMemo(() => {
    return allChannels.filter((channel) => {
      const matchesCategory = selectedCategory === "전체" || channel.category === selectedCategory;
      return matchesCategory;
    });
  }, [allChannels, selectedCategory]);

  const favoriteChannels = useMemo(() => {
    return allChannels.filter((channel) => favorites.includes(channel.id));
  }, [allChannels, favorites]);

  // 채널 추가 핸들러
  const handleAddChannel = (channelData) => {
    const newChannel = addUserYoutubeChannel(channelData);
    setShowAddChannelModal(false);
    alert(`${newChannel.name}이(가) 성공적으로 추가되었습니다!`);
  };

  // 채널 삭제 핸들러
  const handleRemoveChannel = (channelId) => {
    if (window.confirm('정말로 이 채널을 삭제하시겠습니까?')) {
      removeUserYoutubeChannel(channelId);
      // 즐겨찾기에서도 제거
      setFavorites(prev => prev.filter(id => id !== channelId));
    }
  };

  return (
    <div className="youtube-section">
      <div className="youtube-header">
        <h1>📺 주식 유튜브 채널</h1>
        <p className="youtube-subtitle">신뢰할 수 있는 주식 투자 유튜브 채널들을 카테고리별로 만나보세요</p>
        <button 
          className="add-site-btn"
          onClick={() => setShowAddChannelModal(true)}
        >
          ➕ 새 채널 추가
        </button>
      </div>


      {/* 카테고리 필터 */}
      <div className="filter-section">
        <h3>카테고리</h3>
        <div className="category-filters">
          {youtubeCategories.map(category => (
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
      {favoriteChannels.length > 0 && (
        <div className="favorites-container">
          <div className="favorites-header">
            <h2 className="favorites-title">
              <span className="star-icon">⭐</span>
              내 즐겨찾기 채널
            </h2>
            <div className="favorites-count">
              {favoriteChannels.length}개의 채널
            </div>
          </div>
          <div className="site-list">
            {favoriteChannels.map((channel) => (
              <SiteCard
                key={`fav-${channel.id}`}
                site={channel}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
                onRemove={channel.isUserSubmitted ? handleRemoveChannel : undefined}
              />
            ))}
          </div>
        </div>
      )}

      <div className="section-title">
        <h2>전체 유튜브 채널</h2>
        <span className="count-badge">{filteredChannels.length}개</span>
      </div>
      <div className="site-list">
        {filteredChannels.map((channel) => (
          <SiteCard
            key={channel.id}
            site={channel}
            isFavorite={favorites.includes(channel.id)}
            onToggleFavorite={toggleFavorite}
            onRemove={channel.isUserSubmitted ? handleRemoveChannel : undefined}
          />
        ))}
      </div>
      
      {/* 채널 추가 모달 */}
      <AddSite
        isOpen={showAddChannelModal}
        onClose={() => setShowAddChannelModal(false)}
        onSubmit={handleAddChannel}
        type="youtube"
      />
    </div>
  );
};

export default YoutubeSection;