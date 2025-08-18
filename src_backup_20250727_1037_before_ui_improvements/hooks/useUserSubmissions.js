import { useState, useEffect, useCallback } from 'react';

const useUserSubmissions = () => {
  const [userSites, setUserSites] = useState([]);
  const [userYoutubeChannels, setUserYoutubeChannels] = useState([]);

  // localStorage에서 사용자 제출 데이터 로드
  useEffect(() => {
    try {
      const savedSites = localStorage.getItem('userSubmittedSites');
      const savedYoutube = localStorage.getItem('userSubmittedYoutube');
      
      if (savedSites) {
        setUserSites(JSON.parse(savedSites));
      }
      
      if (savedYoutube) {
        setUserYoutubeChannels(JSON.parse(savedYoutube));
      }
    } catch (error) {
      console.warn('Failed to load user submissions:', error);
    }
  }, []);

  // 사용자 제출 사이트 저장
  const saveUserSites = useCallback((sites) => {
    try {
      localStorage.setItem('userSubmittedSites', JSON.stringify(sites));
      setUserSites(sites);
    } catch (error) {
      console.warn('Failed to save user sites:', error);
    }
  }, []);

  // 사용자 제출 유튜브 채널 저장
  const saveUserYoutube = useCallback((channels) => {
    try {
      localStorage.setItem('userSubmittedYoutube', JSON.stringify(channels));
      setUserYoutubeChannels(channels);
    } catch (error) {
      console.warn('Failed to save user youtube channels:', error);
    }
  }, []);

  // 새 사이트 추가
  const addUserSite = useCallback((siteData) => {
    // 기존 사이트들의 최대 ID 찾기 (기존 37개 + 사용자 제출)
    const maxExistingId = Math.max(
      57, // 기존 사이트 최대 ID
      ...userSites.map(site => site.id),
      0
    );
    
    const newSite = {
      ...siteData,
      id: maxExistingId + 1,
      isUserSubmitted: true
    };

    const updatedSites = [...userSites, newSite];
    saveUserSites(updatedSites);
    
    return newSite;
  }, [userSites, saveUserSites]);

  // 새 유튜브 채널 추가
  const addUserYoutubeChannel = useCallback((channelData) => {
    // 기존 유튜브 채널들의 최대 ID 찾기
    const maxExistingId = Math.max(
      57, // 기존 유튜브 최대 ID
      ...userYoutubeChannels.map(channel => channel.id),
      0
    );
    
    const newChannel = {
      ...channelData,
      id: maxExistingId + 1,
      isUserSubmitted: true
    };

    const updatedChannels = [...userYoutubeChannels, newChannel];
    saveUserYoutube(updatedChannels);
    
    return newChannel;
  }, [userYoutubeChannels, saveUserYoutube]);

  // 사용자 제출 사이트 삭제
  const removeUserSite = useCallback((siteId) => {
    const updatedSites = userSites.filter(site => site.id !== siteId);
    saveUserSites(updatedSites);
  }, [userSites, saveUserSites]);

  // 사용자 제출 유튜브 채널 삭제
  const removeUserYoutubeChannel = useCallback((channelId) => {
    const updatedChannels = userYoutubeChannels.filter(channel => channel.id !== channelId);
    saveUserYoutube(updatedChannels);
  }, [userYoutubeChannels, saveUserYoutube]);

  // 사용자 제출 사이트 수정
  const updateUserSite = useCallback((siteId, updatedData) => {
    const updatedSites = userSites.map(site => 
      site.id === siteId 
        ? { ...site, ...updatedData, id: siteId, isUserSubmitted: true }
        : site
    );
    saveUserSites(updatedSites);
  }, [userSites, saveUserSites]);

  // 사용자 제출 유튜브 채널 수정
  const updateUserYoutubeChannel = useCallback((channelId, updatedData) => {
    const updatedChannels = userYoutubeChannels.map(channel => 
      channel.id === channelId 
        ? { ...channel, ...updatedData, id: channelId, isUserSubmitted: true }
        : channel
    );
    saveUserYoutube(updatedChannels);
  }, [userYoutubeChannels, saveUserYoutube]);

  // 통계
  const stats = {
    totalUserSites: userSites.length,
    totalUserYoutubeChannels: userYoutubeChannels.length,
    totalUserSubmissions: userSites.length + userYoutubeChannels.length
  };

  return {
    // 데이터
    userSites,
    userYoutubeChannels,
    stats,
    
    // 메서드
    addUserSite,
    addUserYoutubeChannel,
    removeUserSite,
    removeUserYoutubeChannel,
    updateUserSite,
    updateUserYoutubeChannel
  };
};

export default useUserSubmissions;