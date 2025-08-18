import React, { useState, useMemo, useCallback } from "react";
import { youtubeChannels } from "../data";
import YoutubeFourSectionLayout from "./YoutubeFourSectionLayout";
import useUserSubmissions from "../hooks/useUserSubmissions";

const YoutubeSection = React.memo(() => {
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
  const { userYoutubeChannels } = useUserSubmissions();

  const toggleFavorite = useCallback((id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    
    try {
      localStorage.setItem("youtubeFavorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.warn("Failed to save YouTube favorites:", error);
    }
  }, [favorites]);

  // 기존 채널과 사용자 제출 채널 결합
  const allChannels = useMemo(() => {
    return [...youtubeChannels, ...userYoutubeChannels];
  }, [userYoutubeChannels]);

  return (
    <YoutubeFourSectionLayout
      allChannels={allChannels}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      onChannelClick={(id) => {
        // 최근 조회 기록 추가 (추후 구현 가능)
        console.log('Channel clicked:', id);
      }}
    />
  );
});


YoutubeSection.displayName = 'YoutubeSection';

export default YoutubeSection;