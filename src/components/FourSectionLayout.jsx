import React, { useState, useEffect } from 'react';
import { getStockSites } from '../data';

const FourSectionLayout = ({ favorites, onToggleFavorite, onSiteClick }) => {
  const [stockSites, setStockSites] = useState([]);

  useEffect(() => {
    // 컴포넌트 마운트 시 최신 데이터 로드
    setStockSites(getStockSites());
  }, []);

  // 카테고리별로 사이트 분류
  const tradingSites = stockSites.filter(site => site.category === '증권사');
  const newsSites = stockSites.filter(site => site.category === '뉴스/정보');
  const analysisSites = stockSites.filter(site => site.category === '분석/데이터');
  const communitySites = stockSites.filter(site => site.category === '커뮤니티');

  const sections = [
    {
      id: 'trading',
      title: '증권사 플랫폼',
      subtitle: '주식 거래 및 투자 플랫폼',
      icon: '📈',
      color: 'blue',
      sites: tradingSites,
      description: '신뢰할 수 있는 증권사 플랫폼에서 안전하게 투자하세요'
    },
    {
      id: 'news',
      title: '경제 뉴스',
      subtitle: '실시간 시장 정보 및 뉴스',
      icon: '📰',
      color: 'green',
      sites: newsSites,
      description: '최신 경제 뉴스와 시장 동향을 빠르게 확인하세요'
    },
    {
      id: 'analysis',
      title: '분석 도구',
      subtitle: '차트 분석 및 데이터',
      icon: '📊',
      color: 'purple',
      sites: analysisSites,
      description: '전문적인 분석 도구로 투자 결정을 내리세요'
    },
    {
      id: 'community',
      title: '투자 커뮤니티',
      subtitle: '투자자들과의 소통',
      icon: '👥',
      color: 'orange',
      sites: communitySites,
      description: '다른 투자자들과 정보를 공유하고 소통하세요'
    }
  ];

  const handleSiteClick = (site) => {
    onSiteClick(site.id);
    window.open(site.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="four-section-layout">
      {/* 헤더 */}
      <div className="layout-header">
        <h1>주식 투자 플랫폼</h1>
        <p>신뢰할 수 있는 주식 투자 사이트들을 카테고리별로 만나보세요</p>
      </div>

      {/* 4개 섹션 그리드 */}
      <div className="sections-grid">
        {sections.map((section) => (
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
            <div className="section-description">
              {section.description}
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
                    <span className="site-name-compact">{site.name}</span>
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
        ))}
      </div>
    </div>
  );
};

export default FourSectionLayout;