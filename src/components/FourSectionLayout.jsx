import React, { useState, useEffect } from 'react';
import { getStockSites, getCategories } from '../data';
import Favicon from './Favicon';

const FourSectionLayout = ({ favorites, onToggleFavorite, onSiteClick }) => {
  const [stockSites, setStockSites] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [sitesData, categoriesData] = await Promise.all([
          getStockSites(),
          getCategories('site')
        ]);
        setStockSites(sitesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        // 폴백으로 기본 데이터 사용
        import('../data').then(module => {
          setStockSites(module.stockSites);
          setCategories(module.categories);
        });
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

  // 카테고리별 색상 및 아이콘 매핑
  const getCategoryColor = (category) => {
    const colorMap = {
      '증권사': 'blue',
      '뉴스/정보': 'green',
      '분석/데이터': 'purple', 
      '커뮤니티': 'orange',
      '투자정보': 'blue',
      '뉴스': 'green',
      '분석도구': 'purple',
      '교육': 'yellow'
    };
    return colorMap[category] || 'blue';
  };


  // 동적으로 섹션 생성
  const sections = categories
    .filter(category => category !== '전체')
    .map((category) => ({
      id: category.toLowerCase().replace(/[^a-z0-9]/g, ''),
      title: category,
      color: getCategoryColor(category),
      sites: getSitesByCategory(category)
    }));

  const handleSiteClick = (site) => {
    onSiteClick(site.id);
    window.open(site.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="four-section-layout">
      {/* 동적 섹션 그리드 */}
      <div className="sections-grid">
        {sections.length > 0 ? sections.map((section) => (
          <div key={section.id} className={`section-card ${section.color}`}>
            <div className="section-header">
              <div className="section-info">
                <h3>{section.title}</h3>
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