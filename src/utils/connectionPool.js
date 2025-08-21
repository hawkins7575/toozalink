/**
 * 데이터베이스 연결 풀 및 성능 관리 유틸리티
 * Supabase 클라이언트의 연결을 효율적으로 관리합니다.
 */

import { supabase } from '../lib/supabase';

class ConnectionPool {
  constructor() {
    this.activeConnections = 0;
    this.maxConnections = 10;
    this.connectionQueue = [];
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      responseTimes: []
    };
    this.healthCheck = {
      lastCheck: 0,
      isHealthy: true,
      consecutiveFailures: 0,
      checkInterval: 30000 // 30초
    };
  }
  
  /**
   * 연결 요청
   */
  async acquireConnection() {
    if (this.activeConnections >= this.maxConnections) {
      // 연결 풀이 가득 찬 경우 대기열에 추가
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('연결 풀 대기 타임아웃'));
        }, 10000); // 10초 타임아웃
        
        this.connectionQueue.push({
          resolve,
          reject,
          timeout
        });
      });
    }
    
    this.activeConnections++;
    return this.createConnection();
  }
  
  /**
   * 연결 반환
   */
  releaseConnection() {
    this.activeConnections = Math.max(0, this.activeConnections - 1);
    
    // 대기 중인 요청이 있으면 처리
    if (this.connectionQueue.length > 0) {
      const waiting = this.connectionQueue.shift();
      clearTimeout(waiting.timeout);
      
      this.activeConnections++;
      waiting.resolve(this.createConnection());
    }
  }
  
  /**
   * 실제 연결 생성 (Supabase 클라이언트 반환)
   */
  createConnection() {
    return {
      client: supabase,
      release: () => this.releaseConnection()
    };
  }
  
  /**
   * 성능 모니터링이 포함된 쿼리 실행
   */
  async executeQuery(queryFn, queryName = 'unknown') {
    const startTime = performance.now();
    let connection;
    
    try {
      connection = await this.acquireConnection();
      this.stats.totalRequests++;
      
      const result = await queryFn(connection.client);
      
      const responseTime = performance.now() - startTime;
      this.updateStats(responseTime, true);
      
      console.log(`✅ 쿼리 성공 [${queryName}]: ${responseTime.toFixed(2)}ms`);
      
      return result;
    } catch (error) {
      const responseTime = performance.now() - startTime;
      this.updateStats(responseTime, false);
      
      console.error(`❌ 쿼리 실패 [${queryName}]: ${error.message} (${responseTime.toFixed(2)}ms)`);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
  
  /**
   * 통계 업데이트
   */
  updateStats(responseTime, success) {
    this.stats.responseTimes.push(responseTime);
    
    // 최근 100개 응답 시간만 유지 (메모리 관리)
    if (this.stats.responseTimes.length > 100) {
      this.stats.responseTimes.shift();
    }
    
    // 평균 응답 시간 계산
    this.stats.averageResponseTime = 
      this.stats.responseTimes.reduce((sum, time) => sum + time, 0) / 
      this.stats.responseTimes.length;
    
    if (success) {
      this.stats.successfulRequests++;
      this.healthCheck.consecutiveFailures = 0;
    } else {
      this.stats.failedRequests++;
      this.healthCheck.consecutiveFailures++;
      
      // 연속 실패가 많으면 건강하지 않음으로 표시
      if (this.healthCheck.consecutiveFailures >= 5) {
        this.healthCheck.isHealthy = false;
      }
    }
  }
  
  /**
   * 연결 풀 상태 확인
   */
  async checkHealth() {
    const now = Date.now();
    
    // 마지막 체크로부터 지정된 간격이 지나지 않았으면 캐시된 결과 반환
    if (now - this.healthCheck.lastCheck < this.healthCheck.checkInterval) {
      return this.healthCheck.isHealthy;
    }
    
    try {
      const startTime = performance.now();
      
      // 간단한 헬스체크 쿼리
      await supabase.from('categories').select('id').limit(1);
      
      const responseTime = performance.now() - startTime;
      
      this.healthCheck.isHealthy = responseTime < 3000; // 3초 이상이면 비건강
      this.healthCheck.lastCheck = now;
      
      if (this.healthCheck.isHealthy) {
        this.healthCheck.consecutiveFailures = 0;
      }
      
      console.log(`🏥 헬스체크 완료: ${responseTime.toFixed(2)}ms (건강: ${this.healthCheck.isHealthy})`);
      
    } catch (error) {
      this.healthCheck.isHealthy = false;
      this.healthCheck.lastCheck = now;
      this.healthCheck.consecutiveFailures++;
      
      console.error('🏥 헬스체크 실패:', error.message);
    }
    
    return this.healthCheck.isHealthy;
  }
  
  /**
   * 통계 정보 반환
   */
  getStats() {
    const successRate = this.stats.totalRequests > 0 
      ? (this.stats.successfulRequests / this.stats.totalRequests * 100).toFixed(2)
      : 0;
    
    return {
      activeConnections: this.activeConnections,
      queueLength: this.connectionQueue.length,
      totalRequests: this.stats.totalRequests,
      successfulRequests: this.stats.successfulRequests,
      failedRequests: this.stats.failedRequests,
      successRate: `${successRate}%`,
      averageResponseTime: `${this.stats.averageResponseTime.toFixed(2)}ms`,
      isHealthy: this.healthCheck.isHealthy,
      consecutiveFailures: this.healthCheck.consecutiveFailures,
      lastHealthCheck: new Date(this.healthCheck.lastCheck).toISOString()
    };
  }
  
  /**
   * 통계 초기화
   */
  resetStats() {
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      responseTimes: []
    };
  }
  
  /**
   * 연결 풀 정리 (애플리케이션 종료 시)
   */
  cleanup() {
    // 대기 중인 모든 연결 요청 취소
    this.connectionQueue.forEach(waiting => {
      clearTimeout(waiting.timeout);
      waiting.reject(new Error('연결 풀이 종료되었습니다'));
    });
    
    this.connectionQueue = [];
    this.activeConnections = 0;
    this.resetStats();
  }
}

// 싱글톤 인스턴스 생성
export const connectionPool = new ConnectionPool();

/**
 * 최적화된 쿼리 실행 헬퍼 함수들
 */
export const queryHelpers = {
  /**
   * 단일 테이블 조회 (캐시 포함)
   */
  async selectFromTable(tableName, options = {}) {
    const {
      select = '*',
      filters = {},
      orderBy,
      limit,
      enableCache = true
    } = options;
    
    return connectionPool.executeQuery(async (client) => {
      let query = client.from(tableName).select(select);
      
      // 필터 적용
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          query = query.in(key, value);
        } else {
          query = query.eq(key, value);
        }
      });
      
      // 정렬
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false });
      }
      
      // 제한
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return data || [];
    }, `SELECT ${tableName}`);
  },
  
  /**
   * 배치 데이터 삽입
   */
  async batchInsert(tableName, records, batchSize = 50) {
    const batches = [];
    for (let i = 0; i < records.length; i += batchSize) {
      batches.push(records.slice(i, i + batchSize));
    }
    
    const results = [];
    for (const batch of batches) {
      const result = await connectionPool.executeQuery(async (client) => {
        const { data, error } = await client
          .from(tableName)
          .insert(batch)
          .select();
        
        if (error) throw error;
        return data;
      }, `BATCH INSERT ${tableName} (${batch.length} records)`);
      
      results.push(...result);
    }
    
    return results;
  },
  
  /**
   * 성능 최적화된 검색
   */
  async searchTable(tableName, searchTerm, searchColumns, options = {}) {
    const { limit = 50, orderBy } = options;
    
    return connectionPool.executeQuery(async (client) => {
      // 여러 컬럼에 대한 OR 검색
      const searchConditions = searchColumns
        .map(col => `${col}.ilike.%${searchTerm}%`)
        .join(',');
      
      let query = client
        .from(tableName)
        .select('*')
        .or(searchConditions);
      
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? false });
      }
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return data || [];
    }, `SEARCH ${tableName} for "${searchTerm}"`);
  }
};

// 정기적인 헬스체크 스케줄링
setInterval(() => {
  connectionPool.checkHealth();
}, 60000); // 1분마다

// 애플리케이션 종료 시 정리
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    connectionPool.cleanup();
  });
}

export default connectionPool;