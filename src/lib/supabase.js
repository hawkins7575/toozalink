import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Supabase 클라이언트 생성 (성능 최적화)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false // URL 감지 비활성화로 초기 로딩 속도 향상
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10 // 실시간 이벤트 제한으로 성능 향상
    }
  },
  global: {
    headers: { 
      'x-my-custom-header': 'tooza-link',
      'Accept-Encoding': 'gzip, deflate, br' // 압축 활성화
    }
  }
});

// 연결 상태 캐시
let connectionCache = {
  status: null,
  lastCheck: 0,
  ttl: 30000 // 30초 TTL
};

// 데이터베이스 연결 테스트 함수 (캐시 적용)
export const testConnection = async (force = false) => {
  const now = Date.now();
  
  // 캐시된 결과 반환 (강제 새로고침이 아닌 경우)
  if (!force && connectionCache.status !== null && 
      (now - connectionCache.lastCheck) < connectionCache.ttl) {
    return connectionCache.status;
  }
  
  try {
    // 가장 가벼운 쿼리 사용
    const { error } = await supabase.rpc('ping'); // 존재한다면 사용, 아니면 fallback
    
    if (error) {
      // ping 함수가 없다면 최소한의 쿼리 실행
      const { error: fallbackError } = await supabase
        .from('categories')
        .select('id')
        .limit(1)
        .single();
      
      if (fallbackError && fallbackError.code !== 'PGRST116') throw fallbackError;
    }
    
    connectionCache = { status: true, lastCheck: now, ttl: 30000 };
    console.log('✅ Supabase 연결 성공!');
    return true;
  } catch (error) {
    connectionCache = { status: false, lastCheck: now, ttl: 5000 }; // 실패 시 짧은 TTL
    console.error('❌ Supabase 연결 실패:', error.message);
    return false;
  }
};

export default supabase;