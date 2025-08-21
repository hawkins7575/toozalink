import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Favicon = ({ url, siteName, size = 16, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // URL에서 도메인 추출
  const getDomainFromUrl = (url) => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return urlObj.hostname;
    } catch (error) {
      console.warn('Invalid URL for favicon:', url);
      return null;
    }
  };

  const domain = getDomainFromUrl(url);
  
  // Google favicon API 사용
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}` : null;

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // 파비콘을 가져올 수 없는 경우 기본 아이콘 표시
  if (!faviconUrl || hasError) {
    return (
      <span 
        className={`favicon-fallback ${className}`}
        style={{ 
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${Math.max(8, size * 0.6)}px`,
          backgroundColor: 'var(--accent-blue)',
          color: 'white',
          borderRadius: '2px',
          fontWeight: 'bold'
        }}
        title={`${siteName} 파비콘`}
      >
        🌐
      </span>
    );
  }

  return (
    <div 
      className={`favicon-container ${className}`}
      style={{ 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative'
      }}
    >
      {isLoading && (
        <span 
          className="favicon-loading"
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            fontSize: `${Math.max(8, size * 0.5)}px`,
            backgroundColor: '#f0f0f0',
            borderRadius: '2px'
          }}
        >
          ⟳
        </span>
      )}
      <img
        src={faviconUrl}
        alt={`${siteName} 파비콘`}
        width={size}
        height={size}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          display: isLoading ? 'none' : 'block',
          borderRadius: '2px',
          objectFit: 'contain'
        }}
        loading="lazy"
      />
    </div>
  );
};

Favicon.propTypes = {
  url: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default React.memo(Favicon);