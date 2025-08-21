import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';

// 성능 최적화를 위한 상수
const FETCH_TIMEOUT = 10000; // 10초 타임아웃
const RETRY_DELAY = 1000; // 1초 재시도 지연

export const useSupabaseData = () => {
  const [sites, setSites] = useState([]);
  const [youtubeChannels, setYoutubeChannels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [youtubeCategories, setYoutubeCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 사이트 카테고리 가져오기
  const fetchCategories = useCallback(async (type = 'site') => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .eq('type', type)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const categoryNames = ['전체', ...data.map(cat => cat.name)];
      
      if (type === 'site') {
        setCategories(categoryNames);
      } else {
        setYoutubeCategories(categoryNames);
      }
      
      return categoryNames;
    } catch (err) {
      console.error(`카테고리 로드 실패 (${type}):`, err);
      setError(err.message);
      return type === 'site' ? 
        ['전체', '증권사', '뉴스/정보', '분석/데이터', '커뮤니티'] :
        ['전체', '종합분석', '초보자용', '증권사공식', '재테크종합'];
    }
  }, []);

  // 사이트 가져오기 (성능 최적화)
  const fetchSites = useCallback(async (retryCount = 0) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const { data, error } = await supabase
        .from('sites')
        .select(`
          id, name, url, description, category,
          tags, tips, difficulty, is_user_submitted,
          created_at
        `)
        .order('created_at', { ascending: false })
        .limit(200) // 성능을 위한 데이터 제한
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);
      
      if (error) throw error;
      setSites(data || []);
      return data || [];
    } catch (err) {
      // 네트워크 오류 시 재시도
      if (err.name === 'AbortError' && retryCount < 2) {
        console.warn(`사이트 로드 재시도 (${retryCount + 1}/2)`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchSites(retryCount + 1);
      }
      
      console.error('사이트 로드 실패:', err.message);
      setError(err.message);
      return [];
    }
  }, []);

  // 유튜브 채널 가져오기 (성능 최적화)
  const fetchYoutubeChannels = useCallback(async (retryCount = 0) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const { data, error } = await supabase
        .from('youtube_channels')
        .select(`
          id, name, url, category, difficulty,
          tips, is_user_submitted, created_at
        `)
        .order('created_at', { ascending: false })
        .limit(100) // 성능을 위한 데이터 제한
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);
      
      if (error) throw error;
      setYoutubeChannels(data || []);
      return data || [];
    } catch (err) {
      if (err.name === 'AbortError' && retryCount < 2) {
        console.warn(`유튜브 채널 로드 재시도 (${retryCount + 1}/2)`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return fetchYoutubeChannels(retryCount + 1);
      }
      
      console.error('유튜브 채널 로드 실패:', err.message);
      setError(err.message);
      return [];
    }
  }, []);

  // 사이트 추가
  const addSite = useCallback(async (siteData) => {
    try {
      const { data, error } = await supabase
        .from('sites')
        .insert([{
          name: siteData.name,
          url: siteData.url,
          description: siteData.description,
          category: siteData.category,
          tags: siteData.tags || [],
          tips: siteData.tips || '',
          difficulty: siteData.difficulty || 'normal',
          is_user_submitted: true,
          submitted_by: 'user'
        }])
        .select()
        .single();

      if (error) throw error;
      
      // 상태 업데이트
      setSites(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('사이트 추가 실패:', err);
      throw err;
    }
  }, []);

  // 유튜브 채널 추가
  const addYoutubeChannel = useCallback(async (channelData) => {
    try {
      const { data, error } = await supabase
        .from('youtube_channels')
        .insert([{
          name: channelData.name,
          url: channelData.url,
          category: channelData.category,
          difficulty: channelData.difficulty || 'normal',
          tips: channelData.tips || '',
          is_user_submitted: true,
          submitted_by: 'user'
        }])
        .select()
        .single();

      if (error) throw error;
      
      // 상태 업데이트
      setYoutubeChannels(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('유튜브 채널 추가 실패:', err);
      throw err;
    }
  }, []);

  // 카테고리 추가
  const addCategory = useCallback(async (categoryName, type = 'site') => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{
          name: categoryName,
          type: type,
          icon: type === 'site' ? 'chart' : 'video',
          color: 'blue'
        }])
        .select()
        .single();

      if (error) throw error;
      
      // 상태 업데이트
      if (type === 'site') {
        setCategories(prev => [...prev, categoryName]);
      } else {
        setYoutubeCategories(prev => [...prev, categoryName]);
      }
      
      return data;
    } catch (err) {
      console.error('카테고리 추가 실패:', err);
      throw err;
    }
  }, []);

  // 사이트 삭제
  const deleteSite = useCallback(async (siteId) => {
    try {
      const { error } = await supabase
        .from('sites')
        .delete()
        .eq('id', siteId);

      if (error) throw error;
      
      // 상태 업데이트
      setSites(prev => prev.filter(site => site.id !== siteId));
    } catch (err) {
      console.error('사이트 삭제 실패:', err);
      throw err;
    }
  }, []);

  // 유튜브 채널 삭제
  const deleteYoutubeChannel = useCallback(async (channelId) => {
    try {
      const { error } = await supabase
        .from('youtube_channels')
        .delete()
        .eq('id', channelId);

      if (error) throw error;
      
      // 상태 업데이트
      setYoutubeChannels(prev => prev.filter(channel => channel.id !== channelId));
    } catch (err) {
      console.error('유튜브 채널 삭제 실패:', err);
      throw err;
    }
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        await Promise.all([
          fetchCategories('site'),
          fetchCategories('youtube'),
          fetchSites(),
          fetchYoutubeChannels()
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [fetchCategories, fetchSites, fetchYoutubeChannels]);

  return {
    // 데이터
    sites,
    youtubeChannels,
    categories,
    youtubeCategories,
    loading,
    error,
    
    // 함수들
    addSite,
    addYoutubeChannel,
    addCategory,
    deleteSite,
    deleteYoutubeChannel,
    fetchSites,
    fetchYoutubeChannels,
    fetchCategories
  };
};