import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

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

  // 사이트 가져오기
  const fetchSites = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSites(data || []);
      return data || [];
    } catch (err) {
      console.error('사이트 로드 실패:', err);
      setError(err.message);
      return [];
    }
  }, []);

  // 유튜브 채널 가져오기
  const fetchYoutubeChannels = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('youtube_channels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setYoutubeChannels(data || []);
      return data || [];
    } catch (err) {
      console.error('유튜브 채널 로드 실패:', err);
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