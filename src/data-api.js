// API 기반 데이터 관리 시스템
// localStorage와 API를 병행하여 사용

const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions' 
  : 'http://localhost:8888/.netlify/functions';

// API 호출 헬퍼
const apiCall = async (endpoint, options = {}) => {
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
    // API 실패 시 localStorage 폴백
    return null;
  }
};

// 카테고리 관리
export const getCategories = async () => {
  try {
    // API에서 카테고리 가져오기 시도
    const apiCategories = await apiCall('/categories?type=site');
    if (apiCategories) {
      return ['전체', ...apiCategories];
    }
  } catch (error) {
    console.warn('API에서 카테고리 로드 실패, localStorage 사용:', error);
  }

  // 폴백: localStorage에서 가져오기
  const saved = localStorage.getItem('siteCategories');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.warn('localStorage 카테고리 파싱 실패:', error);
    }
  }

  // 기본 카테고리 반환
  return ['전체', '증권사', '뉴스/정보', '분석/데이터', '커뮤니티'];
};

export const getYoutubeCategories = async () => {
  try {
    // API에서 카테고리 가져오기 시도
    const apiCategories = await apiCall('/categories?type=youtube');
    if (apiCategories) {
      return ['전체', ...apiCategories];
    }
  } catch (error) {
    console.warn('API에서 유튜브 카테고리 로드 실패, localStorage 사용:', error);
  }

  // 폴백: localStorage에서 가져오기
  const saved = localStorage.getItem('youtubeCategories');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.warn('localStorage 유튜브 카테고리 파싱 실패:', error);
    }
  }

  // 기본 카테고리 반환
  return ['전체', '종합분석', '초보자용', '증권사공식', '재테크종합', '미국주식', '기술주전문'];
};

// 사이트 관리
export const getStockSites = async () => {
  try {
    // API에서 사이트 가져오기 시도
    const apiSites = await apiCall('/sites');
    if (apiSites && apiSites.length > 0) {
      return apiSites;
    }
  } catch (error) {
    console.warn('API에서 사이트 로드 실패, localStorage 사용:', error);
  }

  // 폴백: localStorage에서 가져오기
  const saved = localStorage.getItem('userSites');
  if (saved) {
    try {
      const localSites = JSON.parse(saved);
      if (localSites.length > 0) {
        return localSites;
      }
    } catch (error) {
      console.warn('localStorage 사이트 파싱 실패:', error);
    }
  }

  // 기본 사이트 반환 (기존 defaultStockSites와 동일한 데이터)
  return getDefaultStockSites();
};

// 유튜브 채널 관리
export const getYoutubeChannels = async () => {
  try {
    // API에서 채널 가져오기 시도
    const apiChannels = await apiCall('/youtube-channels');
    if (apiChannels && apiChannels.length > 0) {
      return apiChannels;
    }
  } catch (error) {
    console.warn('API에서 유튜브 채널 로드 실패, localStorage 사용:', error);
  }

  // 폴백: localStorage에서 가져오기
  const saved = localStorage.getItem('userYoutubeChannels');
  if (saved) {
    try {
      const localChannels = JSON.parse(saved);
      if (localChannels.length > 0) {
        return localChannels;
      }
    } catch (error) {
      console.warn('localStorage 유튜브 채널 파싱 실패:', error);
    }
  }

  // 기본 채널 반환 (기존 defaultYoutubeChannels와 동일한 데이터)
  return getDefaultYoutubeChannels();
};

// 카테고리 추가 (API + localStorage)
export const addCategory = async (categoryName, type = 'site') => {
  try {
    // API에 추가 시도
    await apiCall('/categories', {
      method: 'POST',
      body: JSON.stringify({
        name: categoryName,
        type: type,
        icon: '📈',
        color: 'blue'
      }),
    });
  } catch (error) {
    console.warn('API에 카테고리 추가 실패, localStorage만 업데이트:', error);
  }

  // localStorage에도 추가 (폴백)
  const storageKey = type === 'site' ? 'siteCategories' : 'youtubeCategories';
  const currentCategories = await (type === 'site' ? getCategories() : getYoutubeCategories());
  
  if (!currentCategories.includes(categoryName)) {
    const updatedCategories = [...currentCategories, categoryName];
    localStorage.setItem(storageKey, JSON.stringify(updatedCategories));
    return updatedCategories;
  }
  
  return currentCategories;
};

// 사이트/채널 추가 (API + localStorage)
export const addSite = async (siteData) => {
  try {
    // API에 추가 시도
    const newSite = await apiCall('/sites', {
      method: 'POST',
      body: JSON.stringify({
        ...siteData,
        isUserSubmitted: true
      }),
    });
    
    if (newSite) {
      return newSite;
    }
  } catch (error) {
    console.warn('API에 사이트 추가 실패, localStorage만 업데이트:', error);
  }

  // 폴백: localStorage에만 추가
  const currentSites = await getStockSites();
  const newId = Math.max(...currentSites.map(s => s.id), 0) + 1;
  const newSite = {
    id: newId,
    ...siteData,
    isUserSubmitted: true,
    submittedAt: new Date().toISOString()
  };
  
  const updatedSites = [newSite, ...currentSites];
  localStorage.setItem('userSites', JSON.stringify(updatedSites));
  return newSite;
};

export const addYoutubeChannel = async (channelData) => {
  try {
    // API에 추가 시도
    const newChannel = await apiCall('/youtube-channels', {
      method: 'POST',
      body: JSON.stringify({
        ...channelData,
        isUserSubmitted: true
      }),
    });
    
    if (newChannel) {
      return newChannel;
    }
  } catch (error) {
    console.warn('API에 유튜브 채널 추가 실패, localStorage만 업데이트:', error);
  }

  // 폴백: localStorage에만 추가
  const currentChannels = await getYoutubeChannels();
  const newId = Math.max(...currentChannels.map(c => c.id), 0) + 1;
  const newChannel = {
    id: newId,
    ...channelData,
    isUserSubmitted: true,
    submittedAt: new Date().toISOString()
  };
  
  const updatedChannels = [newChannel, ...currentChannels];
  localStorage.setItem('userYoutubeChannels', JSON.stringify(updatedChannels));
  return newChannel;
};

// 기본 데이터 (기존 data.js에서 가져온 데이터)
const getDefaultStockSites = () => [
  // 여기에 기존 defaultStockSites 데이터를 넣어주세요
  // 지금은 간단한 예시만 넣겠습니다
  {
    id: 1,
    name: "한국거래소(KRX)",
    url: "http://www.krx.co.kr",
    description: "시장·공매도·파생상품 정보, 상장종목 현황",
    category: "공식거래소",
    tags: ["한국", "무료", "공시", "필수", "공공기관"],
    tips: "정보데이터시스템(MDC)에서 시장 기초통계와 공매도 현황 확인 필수",
    difficulty: "보통"
  }
  // ... 나머지 사이트들
];

const getDefaultYoutubeChannels = () => [
  // 여기에 기존 defaultYoutubeChannels 데이터를 넣어주세요
  {
    id: 1,
    name: "삼프로TV_경제의신과함께",
    url: "https://www.youtube.com/@SamProTV",
    category: "종합분석",
    difficulty: "보통",
    tips: "300만+ 구독자, 경제 전반에 대한 쉬운 해설"
  }
  // ... 나머지 채널들
];