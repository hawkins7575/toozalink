import { useState, useCallback, useRef, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { performanceMonitor, dbPoolConfig } from '../utils/dbOptimizer';

/**
 * 성능 최적화된 데이터베이스 쿼리 훅
 */
export const useOptimizedQuery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);
  const queryCache = useRef(new Map());
  
  // 쿼리 캐시 관리
  const getCachedResult = useCallback((cacheKey) => {
    const cached = queryCache.current.get(cacheKey);
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > dbPoolConfig.cacheTimeout;
    if (isExpired) {
      queryCache.current.delete(cacheKey);
      return null;
    }
    
    return cached.data;
  }, []);
  
  const setCachedResult = useCallback((cacheKey, data) => {
    queryCache.current.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    // 캐시 크기 제한 (메모리 관리)
    if (queryCache.current.size > 50) {
      const firstKey = queryCache.current.keys().next().value;
      queryCache.current.delete(firstKey);
    }
  }, []);
  
  // 최적화된 쿼리 실행
  const executeQuery = useCallback(async (queryConfig) => {
    const {
      table,
      select = '*',
      filters = [],
      orderBy,
      limit,
      enableCache = true,
      retryCount = 0
    } = queryConfig;
    
    // 캐시 키 생성
    const cacheKey = `${table}-${JSON.stringify({ select, filters, orderBy, limit })}`;
    
    // 캐시 확인
    if (enableCache) {
      const cachedResult = getCachedResult(cacheKey);
      if (cachedResult) {
        console.log('🎯 쿼리 캐시 히트:', cacheKey);
        return cachedResult;
      }
    }
    
    setIsLoading(true);
    setError(null);
    
    // 이전 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    const queryId = `${table}-${Date.now()}`;
    
    try {
      performanceMonitor.startQuery(queryId, `SELECT ${select} FROM ${table}`);
      
      // 쿼리 빌드
      let query = supabase
        .from(table)
        .select(select);
      
      // 필터 적용
      filters.forEach(filter => {
        const { column, operator, value } = filter;
        switch (operator) {
          case 'eq':
            query = query.eq(column, value);
            break;
          case 'in':
            query = query.in(column, value);
            break;
          case 'like':
            query = query.ilike(column, `%${value}%`);
            break;
          case 'gte':
            query = query.gte(column, value);
            break;
          case 'lte':
            query = query.lte(column, value);
            break;
          default:
            query = query.eq(column, value);
        }
      });
      
      // 정렬 적용
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false });
      }
      
      // 제한 적용
      if (limit) {
        query = query.limit(limit);
      }
      
      // 요청 실행 (타임아웃 포함)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('쿼리 타임아웃')), dbPoolConfig.connectionTimeout);
      });
      
      const queryPromise = query.abortSignal(abortControllerRef.current.signal);
      
      const { data, error: queryError } = await Promise.race([queryPromise, timeoutPromise]);
      
      performanceMonitor.endQuery(queryId);
      
      if (queryError) throw queryError;
      
      // 캐시 저장
      if (enableCache && data) {
        setCachedResult(cacheKey, data);
      }
      
      return data || [];
      
    } catch (err) {
      performanceMonitor.endQuery(queryId);
      
      // 재시도 로직 (네트워크 오류의 경우)
      if (err.name !== 'AbortError' && retryCount < dbPoolConfig.maxRetries) {
        console.warn(`쿼리 재시도 (${retryCount + 1}/${dbPoolConfig.maxRetries}):`, err.message);
        await new Promise(resolve => setTimeout(resolve, dbPoolConfig.retryDelay));
        return executeQuery({ ...queryConfig, retryCount: retryCount + 1 });
      }
      
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [getCachedResult, setCachedResult]);
  
  // 배치 쿼리 실행
  const executeBatchQuery = useCallback(async (queries) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await Promise.allSettled(
        queries.map(query => executeQuery(query))
      );
      
      const successfulResults = [];
      const errors = [];
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successfulResults[index] = result.value;
        } else {
          errors[index] = result.reason;
        }
      });
      
      if (errors.length > 0 && successfulResults.length === 0) {
        throw new Error(`배치 쿼리 실패: ${errors.filter(Boolean).map(e => e.message).join(', ')}`);
      }
      
      return successfulResults;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [executeQuery]);
  
  // 캐시 클리어
  const clearCache = useCallback((pattern) => {
    if (pattern) {
      // 패턴 매칭으로 특정 캐시만 삭제
      for (const [key] of queryCache.current) {
        if (key.includes(pattern)) {
          queryCache.current.delete(key);
        }
      }
    } else {
      // 전체 캐시 삭제
      queryCache.current.clear();
    }
  }, []);
  
  // 캐시 통계
  const getCacheStats = useCallback(() => {
    return {
      size: queryCache.current.size,
      keys: Array.from(queryCache.current.keys())
    };
  }, []);
  
  // 컴포넌트 언마운트 시 정리
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    queryCache.current.clear();
  }, []);
  
  // 메모화된 반환값
  const returnValue = useMemo(() => ({
    executeQuery,
    executeBatchQuery,
    clearCache,
    getCacheStats,
    cleanup,
    isLoading,
    error
  }), [executeQuery, executeBatchQuery, clearCache, getCacheStats, cleanup, isLoading, error]);
  
  return returnValue;
};

// 사전 정의된 최적화 쿼리들
export const optimizedQueries = {
  // 사이트 목록 조회
  getAllSites: {
    table: 'sites',
    select: 'id, name, url, description, category, tags, tips, difficulty, is_user_submitted, created_at',
    orderBy: { column: 'created_at', ascending: false },
    limit: 200
  },
  
  // 유튜브 채널 목록 조회
  getAllYoutubeChannels: {
    table: 'youtube_channels',
    select: 'id, name, url, category, difficulty, tips, is_user_submitted, created_at',
    orderBy: { column: 'created_at', ascending: false },
    limit: 100
  },
  
  // 카테고리 목록 조회
  getCategoriesByType: (type) => ({
    table: 'categories',
    select: 'name',
    filters: [{ column: 'type', operator: 'eq', value: type }],
    orderBy: { column: 'name', ascending: true }
  }),
  
  // 인기 사이트 조회 (예시)
  getPopularSites: {
    table: 'sites',
    select: 'id, name, url, description, category',
    filters: [{ column: 'is_user_submitted', operator: 'eq', value: false }],
    orderBy: { column: 'created_at', ascending: false },
    limit: 50
  }
};

export default useOptimizedQuery;