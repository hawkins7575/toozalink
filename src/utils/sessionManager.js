// 향상된 세션 관리 유틸리티

// 세션 키 상수
const SESSION_KEYS = {
  USER_ID: 'board_user_id',
  USER_PREFERENCES: 'board_user_preferences',
  SESSION_TIMESTAMP: 'board_session_timestamp',
  VIEW_HISTORY: 'board_view_history'
};

// 세션 만료 시간 (24시간)
const SESSION_EXPIRY_TIME = 24 * 60 * 60 * 1000;

// 브라우저 저장소 지원 확인
const isStorageAvailable = (type) => {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// 안전한 JSON 파싱
const safeJSONParse = (value, defaultValue = null) => {
  try {
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.warn('JSON 파싱 실패:', error);
    return defaultValue;
  }
};

// 안전한 JSON 문자열화
const safeJSONStringify = (value) => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.warn('JSON 문자열화 실패:', error);
    return null;
  }
};

// 세션 데이터 저장
export const setSessionData = (key, value, persistent = false) => {
  const storage = persistent && isStorageAvailable('localStorage') 
    ? localStorage 
    : sessionStorage;
  
  if (!isStorageAvailable(persistent ? 'localStorage' : 'sessionStorage')) {
    console.warn('브라우저 저장소를 사용할 수 없습니다.');
    return false;
  }
  
  try {
    const serializedValue = typeof value === 'string' ? value : safeJSONStringify(value);
    if (serializedValue !== null) {
      storage.setItem(key, serializedValue);
      
      // 타임스탬프 저장
      storage.setItem(`${key}_timestamp`, Date.now().toString());
      return true;
    }
  } catch (error) {
    console.warn('세션 데이터 저장 실패:', error);
  }
  
  return false;
};

// 세션 데이터 조회
export const getSessionData = (key, defaultValue = null, persistent = false) => {
  const storage = persistent && isStorageAvailable('localStorage') 
    ? localStorage 
    : sessionStorage;
  
  if (!isStorageAvailable(persistent ? 'localStorage' : 'sessionStorage')) {
    return defaultValue;
  }
  
  try {
    const value = storage.getItem(key);
    const timestamp = storage.getItem(`${key}_timestamp`);
    
    // 만료 시간 체크
    if (timestamp) {
      const age = Date.now() - parseInt(timestamp, 10);
      if (age > SESSION_EXPIRY_TIME) {
        removeSessionData(key, persistent);
        return defaultValue;
      }
    }
    
    if (value === null) return defaultValue;
    
    // JSON 파싱 시도
    const parsed = safeJSONParse(value, value);
    return parsed !== null ? parsed : defaultValue;
  } catch (error) {
    console.warn('세션 데이터 조회 실패:', error);
    return defaultValue;
  }
};

// 세션 데이터 삭제
export const removeSessionData = (key, persistent = false) => {
  const storage = persistent && isStorageAvailable('localStorage') 
    ? localStorage 
    : sessionStorage;
  
  if (!isStorageAvailable(persistent ? 'localStorage' : 'sessionStorage')) {
    return false;
  }
  
  try {
    storage.removeItem(key);
    storage.removeItem(`${key}_timestamp`);
    return true;
  } catch (error) {
    console.warn('세션 데이터 삭제 실패:', error);
    return false;
  }
};

// 전체 세션 정리
export const clearAllSessionData = () => {
  const clearStorage = (storage) => {
    try {
      Object.values(SESSION_KEYS).forEach(key => {
        storage.removeItem(key);
        storage.removeItem(`${key}_timestamp`);
      });
    } catch (error) {
      console.warn('세션 정리 실패:', error);
    }
  };
  
  if (isStorageAvailable('sessionStorage')) {
    clearStorage(sessionStorage);
  }
  
  if (isStorageAvailable('localStorage')) {
    clearStorage(localStorage);
  }
};

// 고유 사용자 ID 생성 및 관리
export const generateUserId = () => {
  // 기존 사용자 ID 확인
  const existingId = getSessionData(SESSION_KEYS.USER_ID);
  if (existingId && typeof existingId === 'string' && existingId.length > 0) {
    return existingId;
  }
  
  // 새 사용자 ID 생성
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 11);
  const newId = `anon_${randomStr}_${timestamp}`;
  
  // 세션에 저장 (지속적)
  setSessionData(SESSION_KEYS.USER_ID, newId, true);
  
  return newId;
};

// 사용자 선호도 관리
export const setUserPreferences = (preferences) => {
  const currentPrefs = getUserPreferences();
  const updatedPrefs = { ...currentPrefs, ...preferences };
  return setSessionData(SESSION_KEYS.USER_PREFERENCES, updatedPrefs, true);
};

export const getUserPreferences = () => {
  return getSessionData(SESSION_KEYS.USER_PREFERENCES, {
    theme: 'light',
    postsPerPage: 20,
    sortOrder: 'newest',
    showImages: true
  }, true);
};

// 게시글 조회 이력 관리
export const addToViewHistory = (postId, boardId) => {
  const history = getViewHistory();
  const newEntry = {
    postId,
    boardId,
    timestamp: Date.now()
  };
  
  // 중복 제거
  const filtered = history.filter(item => item.postId !== postId);
  
  // 최신 항목을 맨 앞에 추가 (최대 50개)
  const updated = [newEntry, ...filtered].slice(0, 50);
  
  return setSessionData(SESSION_KEYS.VIEW_HISTORY, updated, true);
};

export const getViewHistory = () => {
  return getSessionData(SESSION_KEYS.VIEW_HISTORY, [], true);
};

export const clearViewHistory = () => {
  return removeSessionData(SESSION_KEYS.VIEW_HISTORY, true);
};

// 세션 유효성 검사
export const isSessionValid = () => {
  const userId = getSessionData(SESSION_KEYS.USER_ID);
  const timestamp = getSessionData(SESSION_KEYS.SESSION_TIMESTAMP);
  
  if (!userId || !timestamp) return false;
  
  const age = Date.now() - parseInt(timestamp, 10);
  return age < SESSION_EXPIRY_TIME;
};

// 세션 갱신
export const refreshSession = () => {
  const userId = generateUserId(); // 기존 ID 반환 또는 새 ID 생성
  setSessionData(SESSION_KEYS.SESSION_TIMESTAMP, Date.now().toString(), true);
  return userId;
};

// 세션 상태 정보
export const getSessionInfo = () => {
  const userId = getSessionData(SESSION_KEYS.USER_ID);
  const timestamp = getSessionData(SESSION_KEYS.SESSION_TIMESTAMP);
  const preferences = getUserPreferences();
  const viewHistory = getViewHistory();
  
  return {
    userId,
    sessionAge: timestamp ? Date.now() - parseInt(timestamp, 10) : 0,
    isValid: isSessionValid(),
    preferences,
    viewHistoryCount: viewHistory.length,
    storageSupport: {
      sessionStorage: isStorageAvailable('sessionStorage'),
      localStorage: isStorageAvailable('localStorage')
    }
  };
};

// React Hook for session management
export const useSession = () => {
  const userId = generateUserId();
  
  return {
    userId,
    preferences: getUserPreferences(),
    setPreferences: setUserPreferences,
    addToHistory: addToViewHistory,
    getHistory: getViewHistory,
    clearHistory: clearViewHistory,
    refreshSession,
    sessionInfo: getSessionInfo(),
    clearAll: clearAllSessionData
  };
};