import React, { useState, useEffect } from 'react';
import { getYoutubeChannels } from '../data';

const YoutubeFourSectionLayout = ({ allChannels, favorites, onToggleFavorite, onChannelClick }) => {
  const [youtubeChannels, setYoutubeChannels] = useState([]);

  useEffect(() => {
    // 컴포넌트 마운트 시 최신 데이터 로드
    setYoutubeChannels(getYoutubeChannels());
  }, []);

  // allChannels가 있으면 사용하고, 없으면 로컬 데이터 사용
  const channels = allChannels || youtubeChannels;

  // 카테고리별로 채널 분류
  const comprehensiveChannels = channels.filter(channel => channel.category === '종합분석');
  const newsChannels = channels.filter(channel => channel.category === '경제뉴스');
  const analysisChannels = channels.filter(channel => channel.category === '기술분석');
  const educationChannels = channels.filter(channel => channel.category === '투자교육');

  const sections = [
    {
      id: 'comprehensive',
      title: '종합 분석',
      subtitle: '전반적인 시장 분석과 투자 전략',
      icon: '📊',
      color: 'blue',
      channels: comprehensiveChannels,
      description: '종합적인 시장 분석과 투자 전략을 제공하는 채널들'
    },
    {
      id: 'news',
      title: '경제 뉴스',
      subtitle: '실시간 경제 소식과 시장 동향',
      icon: '📺',
      color: 'green',
      channels: newsChannels,
      description: '최신 경제 뉴스와 시장 동향을 빠르게 전달하는 채널들'
    },
    {
      id: 'analysis',
      title: '기술 분석',
      subtitle: '차트 분석과 기술적 지표',
      icon: '📈',
      color: 'purple',
      channels: analysisChannels,
      description: '차트 분석과 기술적 지표를 활용한 전문 분석 채널들'
    },
    {
      id: 'education',
      title: '투자 교육',
      subtitle: '투자 기초와 전문 지식',
      icon: '🎓',
      color: 'orange',
      channels: educationChannels,
      description: '투자 기초부터 전문 지식까지 체계적인 교육 채널들'
    }
  ];

  const handleChannelClick = (channel) => {
    onChannelClick(channel.id);
    window.open(channel.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="four-section-layout">
      {/* 헤더 */}
      <div className="layout-header">
        <h1>주식 유튜브 채널</h1>
        <p>신뢰할 수 있는 주식 투자 유튜브 채널들을 카테고리별로 만나보세요</p>
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
                {section.channels.length}
              </div>
            </div>
            <div className="section-description">
              {section.description}
            </div>
            
            {/* 각 섹션의 모든 채널 목록을 스크롤로 표시 */}
            <div className="section-sites-list">
              {section.channels.map((channel) => (
                <div
                  key={channel.id}
                  className="site-item-compact"
                  onClick={() => handleChannelClick(channel)}
                >
                  <div className="site-info-compact">
                    <span className="site-name-compact">{channel.name}</span>
                    <button
                      className={`favorite-btn-compact ${favorites.includes(channel.id) ? 'favorited' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(channel.id);
                      }}
                    >
                      {favorites.includes(channel.id) ? '★' : '☆'}
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

export default YoutubeFourSectionLayout;