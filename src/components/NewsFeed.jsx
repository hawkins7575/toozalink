import React, { useState, useEffect, useCallback } from 'react';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 뉴스 카테고리
  const categories = ['전체', '국내증시', '해외증시', '경제', '기업', '코인'];

  // 모의 뉴스 데이터 (실제로는 RSS나 API에서 가져올 예정)
  const mockNews = [
    {
      id: 1,
      title: "코스피, 외국인 매수세에 상승 마감... 2460선 회복",
      summary: "코스피가 외국인의 순매수세에 힘입어 상승 마감했습니다. 반도체와 2차전지 관련주가 강세를 보였습니다.",
      source: "한국경제",
      time: "15분 전",
      category: "국내증시",
      url: "https://example.com/news1",
      isHot: true
    },
    {
      id: 2,
      title: "삼성전자, 3분기 영업이익 전년동기 대비 270% 증가",
      summary: "삼성전자가 메모리 반도체 가격 상승과 스마트폰 매출 증가로 양호한 실적을 기록했습니다.",
      source: "조선비즈",
      time: "32분 전",
      category: "기업",
      url: "https://example.com/news2",
      isHot: false
    },
    {
      id: 3,
      title: "미 연준 기준금리 동결... 달러 약세로 신흥국 증시 상승",
      summary: "미국 연방준비제도가 기준금리를 동결하면서 글로벌 증시에 긍정적 영향을 미쳤습니다.",
      source: "이데일리",
      time: "1시간 전",
      category: "해외증시",
      url: "https://example.com/news3",
      isHot: true
    },
    {
      id: 4,
      title: "비트코인 4만 달러 돌파... 기관 투자 증가 영향",
      summary: "비트코인이 기관투자자들의 관심 증가와 ETF 승인 기대감으로 강세를 보이고 있습니다.",
      source: "코인데스크코리아",
      time: "1시간 전",
      category: "코인",
      url: "https://example.com/news4",
      isHot: false
    },
    {
      id: 5,
      title: "한국은행, 기준금리 3.5% 동결... 물가 안정 우선",
      summary: "한국은행이 통화정책방향회의에서 기준금리를 3.5%로 동결하기로 결정했습니다.",
      source: "연합뉴스",
      time: "2시간 전",
      category: "경제",
      url: "https://example.com/news5",
      isHot: false
    },
    {
      id: 6,
      title: "SK하이닉스, HBM3E 양산 본격화... 엔비디아 공급 확대",
      summary: "SK하이닉스가 차세대 고대역폭 메모리 HBM3E 양산을 본격화하며 AI 반도체 시장 공략에 나섰습니다.",
      source: "전자신문",
      time: "3시간 전",
      category: "기업",
      url: "https://example.com/news6",
      isHot: true
    }
  ];

  // 뉴스 데이터 로드
  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: 실제 뉴스 API 연동
      setTimeout(() => {
        setNews(mockNews);
        setLastUpdated(new Date());
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('뉴스 로드 실패:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    
    // 5분마다 자동 업데이트
    const interval = setInterval(fetchNews, 300000);
    
    return () => clearInterval(interval);
  }, []);

  // 카테고리별 필터링
  const filteredNews = selectedCategory === '전체' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const handleNewsClick = (url) => {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('뉴스 링크 열기 실패:', error);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };


  return (
    <section className="news-feed" aria-label="주식 뉴스 피드">
      <div className="news-header-section">
        <div className="news-title-area">
          <h2 className="news-main-title">📰 주식 뉴스</h2>
          <span className="news-updated">
            업데이트: {formatTime(lastUpdated)}
          </span>
        </div>
        
        <div className="news-controls">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          
          <button 
            className={`news-refresh-btn ${isLoading ? 'loading' : ''}`}
            onClick={fetchNews}
            disabled={isLoading}
            aria-label="뉴스 새로고침"
          >
            {isLoading ? '🔄' : '↻'}
          </button>
        </div>
      </div>

      <div className="news-content-area">
        {isLoading ? (
          <div className="news-loading">
            <div className="loading-spinner"></div>
            <span>뉴스를 불러오는 중...</span>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="news-list">
            {filteredNews.map(newsItem => (
              <article 
                key={newsItem.id}
                className={`news-item ${newsItem.isHot ? 'hot' : ''}`}
                onClick={() => handleNewsClick(newsItem.url)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNewsClick(newsItem.url);
                  }
                }}
              >
                <div className="news-content">
                  <div className="news-header">
                    <h4 className="news-title">
                      {newsItem.isHot && <span className="hot-badge">🔥</span>}
                      {newsItem.title}
                    </h4>
                    <span className="news-time">{newsItem.time}</span>
                  </div>
                  <p className="news-summary">{newsItem.summary}</p>
                  <div className="news-footer">
                    <span className="news-source">{newsItem.source}</span>
                    <span className="news-category">{newsItem.category}</span>
                  </div>
                </div>
                <div className="news-arrow">↗</div>
              </article>
            ))}
          </div>
        ) : (
          <div className="news-empty">
            <span>해당 카테고리의 뉴스가 없습니다.</span>
          </div>
        )}
      </div>
    </section>
  );
};


export default React.memo(NewsFeed);