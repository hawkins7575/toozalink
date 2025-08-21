import { useState, useEffect, useCallback } from 'react';

const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions' 
  : 'http://localhost:8888/.netlify/functions';

export const useDatabase = () => {
  const [sites, setSites] = useState([]);
  const [youtubeChannels, setYoutubeChannels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [youtubeCategories, setYoutubeCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출 헬퍼 함수
  const apiCall = useCallback(async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error(`API call failed for ${endpoint}:`, err);
      throw err;
    }
  }, []);

  // 사이트 관련 함수들
  const fetchSites = useCallback(async () => {
    try {
      const data = await apiCall('/sites');
      setSites(data);
    } catch (err) {
      console.error('사이트 로드 실패:', err);
      setError(err.message);
    }
  }, [apiCall]);

  const addSite = useCallback(async (siteData) => {
    try {
      const newSite = await apiCall('/sites', {
        method: 'POST',
        body: JSON.stringify(siteData),
      });
      setSites(prev => [newSite, ...prev]);
      return newSite;
    } catch (err) {
      console.error('사이트 추가 실패:', err);
      throw err;
    }
  }, [apiCall]);

  const deleteSite = useCallback(async (siteId) => {
    try {
      await apiCall(`/sites/${siteId}`, {
        method: 'DELETE',
      });
      setSites(prev => prev.filter(site => site.id !== siteId));
    } catch (err) {
      console.error('사이트 삭제 실패:', err);
      throw err;
    }
  }, [apiCall]);

  // 유튜브 채널 관련 함수들
  const fetchYoutubeChannels = useCallback(async () => {
    try {
      const data = await apiCall('/youtube-channels');
      setYoutubeChannels(data);
    } catch (err) {
      console.error('유튜브 채널 로드 실패:', err);
      setError(err.message);
    }
  }, [apiCall]);

  const addYoutubeChannel = useCallback(async (channelData) => {
    try {
      const newChannel = await apiCall('/youtube-channels', {
        method: 'POST',
        body: JSON.stringify(channelData),
      });
      setYoutubeChannels(prev => [newChannel, ...prev]);
      return newChannel;
    } catch (err) {
      console.error('유튜브 채널 추가 실패:', err);
      throw err;
    }
  }, [apiCall]);

  const deleteYoutubeChannel = useCallback(async (channelId) => {
    try {
      await apiCall(`/youtube-channels/${channelId}`, {
        method: 'DELETE',
      });
      setYoutubeChannels(prev => prev.filter(channel => channel.id !== channelId));
    } catch (err) {
      console.error('유튜브 채널 삭제 실패:', err);
      throw err;
    }
  }, [apiCall]);

  // 카테고리 관련 함수들
  const fetchCategories = useCallback(async (type = 'site') => {
    try {
      const data = await apiCall(`/categories?type=${type}`);
      if (type === 'site') {
        setCategories(data);
      } else {
        setYoutubeCategories(data);
      }
      return data;
    } catch (err) {
      console.error('카테고리 로드 실패:', err);
      setError(err.message);
    }
  }, [apiCall]);

  const addCategory = useCallback(async (categoryData) => {
    try {
      const newCategory = await apiCall('/categories', {
        method: 'POST',
        body: JSON.stringify(categoryData),
      });
      
      if (categoryData.type === 'site') {
        setCategories(prev => [...prev, newCategory.name]);
      } else {
        setYoutubeCategories(prev => [...prev, newCategory.name]);
      }
      
      return newCategory;
    } catch (err) {
      console.error('카테고리 추가 실패:', err);
      throw err;
    }
  }, [apiCall]);

  const deleteCategory = useCallback(async (categoryName, type = 'site') => {
    try {
      await apiCall('/categories', {
        method: 'DELETE',
        body: JSON.stringify({ name: categoryName }),
      });
      
      if (type === 'site') {
        setCategories(prev => prev.filter(cat => cat !== categoryName));
      } else {
        setYoutubeCategories(prev => prev.filter(cat => cat !== categoryName));
      }
    } catch (err) {
      console.error('카테고리 삭제 실패:', err);
      throw err;
    }
  }, [apiCall]);

  // 데이터 마이그레이션 함수
  const migrateData = useCallback(async (localData) => {
    try {
      const result = await apiCall('/migrate-data', {
        method: 'POST',
        body: JSON.stringify(localData),
      });
      
      // 마이그레이션 후 데이터 새로고침
      await Promise.all([
        fetchSites(),
        fetchYoutubeChannels(),
        fetchCategories('site'),
        fetchCategories('youtube')
      ]);
      
      return result;
    } catch (err) {
      console.error('데이터 마이그레이션 실패:', err);
      throw err;
    }
  }, [apiCall, fetchSites, fetchYoutubeChannels, fetchCategories]);

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchSites(),
          fetchYoutubeChannels(),
          fetchCategories('site'),
          fetchCategories('youtube')
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [fetchSites, fetchYoutubeChannels, fetchCategories]);

  return {
    // 데이터
    sites,
    youtubeChannels,
    categories,
    youtubeCategories,
    loading,
    error,
    
    // 사이트 함수들
    addSite,
    deleteSite,
    fetchSites,
    
    // 유튜브 채널 함수들
    addYoutubeChannel,
    deleteYoutubeChannel,
    fetchYoutubeChannels,
    
    // 카테고리 함수들
    addCategory,
    deleteCategory,
    fetchCategories,
    
    // 유틸리티
    migrateData,
  };
};