import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const YoutubeCategoryBoxLayout = ({ 
  channels, 
  favorites, 
  onToggleFavorite, 
  onRemoveChannel,
  onChannelClick 
}) => {
  // 카테고리별로 채널들을 그룹화
  const channelsByCategory = useMemo(() => {
    const grouped = {};
    
    // 채널들을 카테고리별로 분류
    channels.forEach(channel => {
      if (grouped[channel.category]) {
        grouped[channel.category].push(channel);
      } else {
        grouped[channel.category] = [channel];
      }
    });
    
    return grouped;
  }, [channels]);

  const getCategoryColor = (category) => {
    const categoryColors = {
      '종합분석': 'var(--accent-blue)',
      '초보자용': 'var(--accent-green)', 
      '증권사공식': 'var(--accent-purple)',
      '재테크종합': 'var(--accent-yellow)',
      '미국주식': 'var(--accent-pink)',
      '기술주전문': 'var(--accent-purple)',
    };
    return categoryColors[category] || 'var(--accent-blue)';
  };

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      '종합분석': '📊',
      '초보자용': '📚',
      '증권사공식': '🏛️',
      '재테크종합': '💰',
      '미국주식': '🇺🇸',
      '기술주전문': '💻',
    };
    return categoryIcons[category] || '📺';
  };

  const handleChannelClick = (channel) => {
    // 최근 조회 기록 추가
    if (onChannelClick) {
      onChannelClick(channel.id);
    }
    
    // 채널 열기
    try {
      window.open(channel.url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Failed to open channel:', error);
    }
  };

  const formatSubscribers = (tips) => {
    // tips에서 구독자 수 추출 (예: "300만+ 구독자" -> "300만+")
    const match = tips.match(/(\d+[만천백십억]+\+?)\s*구독자/);
    return match ? match[1] : '';
  };

  return (
    <div className="youtube-category-box-layout">
      <div className="youtube-category-boxes-container">
        {Object.entries(channelsByCategory).map(([category, categoryChannels]) => (
          <div key={category} className="youtube-category-box">
            <div 
              className="youtube-category-header"
              style={{ backgroundColor: getCategoryColor(category) }}
            >
              <h3 className="youtube-category-title">
                <span className="youtube-category-icon">{getCategoryIcon(category)}</span>
                {category}
              </h3>
              <span className="youtube-category-count">
                {categoryChannels.length}개 채널
              </span>
            </div>
            
            <div className="youtube-category-content">
              {categoryChannels.length > 0 ? (
                <div className="youtube-channels-grid">
                  {categoryChannels.map(channel => (
                    <div
                      key={channel.id}
                      className={`youtube-channel-item ${channel.isUserSubmitted ? 'user-submitted' : ''}`}
                      onClick={() => handleChannelClick(channel)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleChannelClick(channel);
                        }
                      }}
                    >
                      <div className="youtube-channel-content">
                        <div className="youtube-channel-header">
                          <h4 className="youtube-channel-name">
                            📺 {channel.name}
                            {channel.isUserSubmitted && (
                              <span 
                                className="user-badge"
                                aria-label="사용자 추가 채널"
                                title="사용자가 추가한 채널"
                              >
                                👤
                              </span>
                            )}
                          </h4>
                          <div className="youtube-channel-actions" onClick={(e) => e.stopPropagation()}>
                            <button 
                              className={`youtube-favorite-btn ${favorites.includes(channel.id) ? 'favorited' : ''}`}
                              onClick={() => onToggleFavorite(channel.id)}
                              aria-label={favorites.includes(channel.id) ? `${channel.name} 즐겨찾기 해제` : `${channel.name} 즐겨찾기 추가`}
                              title={favorites.includes(channel.id) ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                            >
                              {favorites.includes(channel.id) ? "⭐" : "☆"}
                            </button>
                            {channel.isUserSubmitted && onRemoveChannel && (
                              <button 
                                className="youtube-remove-btn"
                                onClick={() => onRemoveChannel(channel.id)}
                                aria-label={`${channel.name} 삭제`}
                                title="삭제"
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        </div>
                        
                        
                        <div className="youtube-channel-footer">
                          <div className="youtube-channel-info">
                            <span className="youtube-channel-difficulty">
                              난이도: {channel.difficulty}
                            </span>
                            {formatSubscribers(channel.tips) && (
                              <span className="youtube-subscribers">
                                👥 {formatSubscribers(channel.tips)}
                              </span>
                            )}
                          </div>
                          <span className="youtube-channel-link-icon">↗</span>
                        </div>
                        
                        {channel.tips && (
                          <div className="youtube-channel-tips">
                            💡 {channel.tips}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="youtube-category-empty">
                  <span className="empty-icon">📺</span>
                  <p>이 카테고리에는 아직 채널이 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

YoutubeCategoryBoxLayout.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    difficulty: PropTypes.string,
    tips: PropTypes.string,
    isUserSubmitted: PropTypes.bool,
  })).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onRemoveChannel: PropTypes.func,
  onChannelClick: PropTypes.func,
};

export default React.memo(YoutubeCategoryBoxLayout);