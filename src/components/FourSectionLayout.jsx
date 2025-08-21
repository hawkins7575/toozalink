import React, { useState, useEffect } from 'react';
import { getStockSites, getCategories } from '../data';
import Favicon from './Favicon';

const FourSectionLayout = ({ favorites, onToggleFavorite, onSiteClick }) => {
  const [stockSites, setStockSites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 폴백 데이터 먼저 로드하여 즉시 표시
        const fallbackData = await import('../data');
        setStockSites(fallbackData.stockSites || []);
        setCategories(fallbackData.categories || []);
        setIsLoading(false); // 폴백 데이터 로드 완료

        // 그 다음 실제 데이터 로드 (백그라운드)
        try {
          const [sitesData, categoriesData] = await Promise.all([
            getStockSites(),
            getCategories('site')
          ]);
          
          // 데이터가 실제로 있을 때만 업데이트
          if (sitesData && sitesData.length > 0) {
            setStockSites(sitesData);
          }
          if (categoriesData && categoriesData.length > 0) {
            setCategories(categoriesData);
          }
        } catch (apiError) {
          console.warn('API 데이터 로딩 실패, 폴백 데이터 사용:', apiError);
          // 폴백 데이터가 이미 로드되어 있으므로 추가 작업 불필요
        }
      } catch (error) {
        console.error('모든 데이터 로딩 실패:', error);
        // 최소한의 기본 데이터라도 설정
        setStockSites([]);
        setCategories(['증권사', '뉴스/정보', '분석/데이터', '커뮤니티']);
        setIsLoading(false);
      }
    };

    loadData();
    
    // 카테고리 업데이트 이벤트 감지
    const handleCategoryUpdate = () => {
      loadData();
    };
    
    window.addEventListener('categoryUpdate', handleCategoryUpdate);
    window.addEventListener('storage', handleCategoryUpdate);
    
    return () => {
      window.removeEventListener('categoryUpdate', handleCategoryUpdate);
      window.removeEventListener('storage', handleCategoryUpdate);
    };
  }, []);

  // 카테고리별로 사이트 분류 (동적으로)
  const getSitesByCategory = (categoryName) => {
    return stockSites.filter(site => site.category === categoryName);
  };

  // 카테고리별 색상, 아이콘, 부제목 매핑
  const getCategoryInfo = (category) => {
    const infoMap = {
      '증권사': { 
        color: 'blue', 
        icon: '🏢', 
        subtitle: '증권계좌 개설과 매매 서비스' 
      },
      '뉴스/정보': { 
        color: 'green', 
        icon: '📰', 
        subtitle: '실시간 주식뉴스와 시장정보' 
      },
      '분석/데이터': { 
        color: 'purple', 
        icon: '📊', 
        subtitle: '차트분석과 투자데이터' 
      },
      '커뮤니티': { 
        color: 'orange', 
        icon: '💬', 
        subtitle: '투자자들의 소통공간' 
      },
      '투자정보': { 
        color: 'blue', 
        icon: '💰', 
        subtitle: '투자전략과 종목정보' 
      },
      '뉴스': { 
        color: 'green', 
        icon: '📺', 
        subtitle: '경제뉴스와 시장동향' 
      },
      '분석도구': { 
        color: 'purple', 
        icon: '🔍', 
        subtitle: '투자분석 도구와 지표' 
      },
      '교육': { 
        color: 'yellow', 
        icon: '🎓', 
        subtitle: '투자교육과 학습자료' 
      },
      '공식거래소': { 
        color: 'blue', 
        icon: '🏛️', 
        subtitle: '공식 주식거래소' 
      },
      '포털사이트': { 
        color: 'green', 
        icon: '🌐', 
        subtitle: '종합 금융정보 포털' 
      },
      '정부기관': { 
        color: 'purple', 
        icon: '🏛️', 
        subtitle: '정부 금융감독기관' 
      },
      '금융서비스': { 
        color: 'orange', 
        icon: '💳', 
        subtitle: '종합 금융서비스' 
      },
      '글로벌포털': { 
        color: 'blue', 
        icon: '🌍', 
        subtitle: '해외 금융정보 포털' 
      },
      '공공데이터': { 
        color: 'green', 
        icon: '📈', 
        subtitle: '공공 투자데이터' 
      },
      '금융정보포털': { 
        color: 'purple', 
        icon: '📋', 
        subtitle: '금융정보 종합포털' 
      }
    };
    return infoMap[category] || { color: 'blue', icon: '📊', subtitle: '투자 관련 서비스' };
  };

  // 영어 카테고리를 한글로 변환
  const getCategoryKoreanTitle = (category) => {
    const titleMap = {
      // 영어 카테고리들을 한글로 매핑
      'Securities': '증권사',
      'News/Info': '뉴스/정보',
      'Analysis/Data': '분석/데이터',
      'Community': '커뮤니티',
      'Official Exchange': '공식거래소',
      'Investment Info': '투자정보',
      'Education': '교육',
      'Portal': '포털사이트',
      'Government': '정부기관',
      'Financial Service': '금융서비스',
      'Global Portal': '글로벌포털',
      'Public Data': '공공데이터',
      'Financial Portal': '금융정보포털',
      // 이미 한글인 경우는 그대로 반환
      '증권사': '증권사',
      '뉴스/정보': '뉴스/정보',
      '분석/데이터': '분석/데이터',
      '커뮤니티': '커뮤니티',
      '공식거래소': '공식거래소',
      '투자정보': '투자정보',
      '교육': '교육',
      '포털사이트': '포털사이트',
      '정부기관': '정부기관',
      '금융서비스': '금융서비스',
      '글로벌포털': '글로벌포털',
      '공공데이터': '공공데이터',
      '금융정보포털': '금융정보포털'
    };
    return titleMap[category] || category;
  };


  // 동적으로 섹션 생성
  const sections = categories
    .filter(category => category !== '전체')
    .map((category) => {
      const categoryInfo = getCategoryInfo(category);
      const sites = getSitesByCategory(category);
      return {
        id: category.toLowerCase().replace(/[^a-z0-9]/g, ''),
        title: getCategoryKoreanTitle(category),
        subtitle: categoryInfo.subtitle,
        icon: categoryInfo.icon,
        color: categoryInfo.color,
        sites: sites
      };
    });

  const handleSiteClick = (site) => {
    onSiteClick(site.id);
    window.open(site.url, '_blank', 'noopener,noreferrer');
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="four-section-layout">
        <div className="layout-header">
          <h1>주식 투자 사이트</h1>
          <p>신뢰할 수 있는 주식 투자 사이트들을 카테고리별로 만나보세요</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>사이트 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="four-section-layout">
      {/* 헤더 */}
      <div className="layout-header">
        <h1>주식 투자 사이트</h1>
        <p>신뢰할 수 있는 주식 투자 사이트들을 카테고리별로 만나보세요</p>
      </div>

      {/* 섹션 그리드 */}
      <div className="sections-grid">
        {sections.length > 0 ? sections.map((section) => (
          <div key={section.id} className={`section-card ${section.color}`}>
            <div className="section-header">
              <div className="section-icon">{section.icon}</div>
              <div className="section-info">
                <h3>{section.title}</h3>
                <p>{section.subtitle}</p>
              </div>
              <div className="section-count">
                {section.sites.length}
              </div>
            </div>
            
            {/* 각 섹션의 모든 사이트 목록을 스크롤로 표시 */}
            <div className="section-sites-list">
              {section.sites.map((site) => (
                <div
                  key={site.id}
                  className="site-item-compact"
                  onClick={() => handleSiteClick(site)}
                >
                  <div className="site-info-compact">
                    <div className="site-name-with-favicon">
                      <Favicon 
                        url={site.url} 
                        siteName={site.name} 
                        size={14} 
                        className="site-favicon-compact"
                      />
                      <span className="site-name-compact">{site.name}</span>
                    </div>
                    <button
                      className={`favorite-btn-compact ${favorites.includes(site.id) ? 'favorited' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(site.id);
                      }}
                    >
                      {favorites.includes(site.id) ? '★' : '☆'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )) : (
          <div className="no-categories-message">
            <span className="empty-icon">📂</span>
            <p>카테고리가 없습니다. 관리자 패널에서 카테고리를 추가해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FourSectionLayout;