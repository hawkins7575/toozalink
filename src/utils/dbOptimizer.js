// 데이터베이스 성능 최적화 유틸리티

/**
 * 배치 처리를 위한 데이터 청킹
 */
export const chunkArray = (array, chunkSize = 50) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

/**
 * 데이터베이스 연결 풀 최적화 설정
 */
export const dbPoolConfig = {
  // 연결 풀 설정
  poolSize: 10,
  maxRetries: 3,
  retryDelay: 1000,
  connectionTimeout: 10000,
  
  // 쿼리 최적화 설정
  selectLimit: 200,
  batchSize: 50,
  cacheTimeout: 300000, // 5분
};

/**
 * 쿼리 성능 모니터링
 */
export class QueryPerformanceMonitor {
  constructor() {
    this.queries = new Map();
    this.slowQueries = [];
  }
  
  startQuery(queryId, queryText) {
    this.queries.set(queryId, {
      query: queryText,
      startTime: performance.now()
    });
  }
  
  endQuery(queryId) {
    const queryInfo = this.queries.get(queryId);
    if (!queryInfo) return;
    
    const duration = performance.now() - queryInfo.startTime;
    
    // 느린 쿼리 감지 (1초 이상)
    if (duration > 1000) {
      this.slowQueries.push({
        ...queryInfo,
        duration,
        timestamp: new Date().toISOString()
      });
      
      console.warn(`🐌 느린 쿼리 감지 (${duration.toFixed(2)}ms):`, queryInfo.query);
    }
    
    this.queries.delete(queryId);
  }
  
  getSlowQueries() {
    return this.slowQueries;
  }
  
  clearSlowQueries() {
    this.slowQueries = [];
  }
}

/**
 * 데이터 압축 및 직렬화 최적화
 */
export const dataSerializer = {
  // JSON 압축
  compress: (data) => {
    try {
      return JSON.stringify(data, null, 0); // 공백 제거
    } catch (error) {
      console.error('데이터 압축 실패:', error);
      return null;
    }
  },
  
  // 선택적 필드 직렬화 (민감한 데이터 제외)
  serializeForCache: (data) => {
    if (Array.isArray(data)) {
      return data.map(item => ({
        id: item.id,
        name: item.name,
        url: item.url,
        category: item.category,
        description: item.description?.slice(0, 100) // 설명 자르기
      }));
    }
    return data;
  }
};

/**
 * 메모리 효율적인 데이터 처리
 */
export const memoryOptimizer = {
  // 큰 데이터셋을 스트림으로 처리
  processLargeDataset: async function* (data, processor) {
    const chunks = chunkArray(data, dbPoolConfig.batchSize);
    
    for (const chunk of chunks) {
      yield await processor(chunk);
      
      // 메모리 해제를 위한 가비지 컬렉션 힌트
      if (global.gc) {
        global.gc();
      }
    }
  },
  
  // 메모리 사용량 모니터링
  getMemoryUsage: () => {
    if (typeof performance !== 'undefined' && performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      };
    }
    return null;
  }
};

/**
 * 쿼리 빌더 최적화
 */
export const optimizedQueryBuilder = {
  // 필수 필드만 선택하는 셀렉터 생성
  buildSelectClause: (tableName) => {
    const fieldMap = {
      sites: `id, name, url, description, category, tags, tips, difficulty, is_user_submitted, created_at`,
      youtube_channels: `id, name, url, category, difficulty, tips, is_user_submitted, created_at`,
      categories: `id, name, type, created_at`
    };
    
    return fieldMap[tableName] || '*';
  },
  
  // 인덱스 활용을 위한 정렬 최적화
  buildOrderClause: (sortField = 'created_at', direction = 'desc') => {
    // 인덱스가 있는 필드 우선 사용
    const indexedFields = ['id', 'created_at', 'category', 'name'];
    
    if (!indexedFields.includes(sortField)) {
      console.warn(`비인덱스 필드로 정렬: ${sortField}. 성능에 영향을 줄 수 있습니다.`);
    }
    
    return { [sortField]: { ascending: direction === 'asc' } };
  }
};

/**
 * 연결 최적화 도우미
 */
export const connectionOptimizer = {
  // 연결 상태 체크
  checkConnectionHealth: async (supabase) => {
    try {
      const start = performance.now();
      await supabase.from('categories').select('id').limit(1).single();
      const duration = performance.now() - start;
      
      return {
        healthy: true,
        latency: Math.round(duration),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  },
  
  // 연결 풀 상태 모니터링
  getConnectionStats: () => {
    // Supabase는 연결 풀을 내부적으로 관리하므로 
    // 클라이언트 측에서는 요청 통계만 추적
    return {
      activeRequests: 0, // 실제 구현 시 추적
      completedRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0
    };
  }
};

// 성능 최적화 모니터 인스턴스 생성
export const performanceMonitor = new QueryPerformanceMonitor();

// 사용 예시:
/*
// 쿼리 시작
performanceMonitor.startQuery('fetch-sites', 'SELECT * FROM sites');

// 쿼리 실행...

// 쿼리 종료
performanceMonitor.endQuery('fetch-sites');
*/