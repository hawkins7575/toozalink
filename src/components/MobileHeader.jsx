import React from 'react';
import PropTypes from 'prop-types';

const MobileHeader = ({ 
  currentView, 
  onMenuToggle, 
  user, 
  isAuthenticated,
  onShowLogin,
  onShowRegister 
}) => {
  const getViewTitle = (view) => {
    const titles = {
      'dashboard': '대시보드',
      'sites': '주식 사이트',
      'youtube': '유튜브 채널',
      'boards': '주식게시판',
      'masters': '투자의 대가',
      'profile': '프로필'
    };
    return titles[view] || 'tooza link';
  };

  return (
    <div className="mobile-header">
      <button 
        className="mobile-menu-btn"
        onClick={onMenuToggle}
        aria-label="메뉴 열기"
      >
        ☰
      </button>
      
      <h1 className="mobile-title">
        {getViewTitle(currentView)}
      </h1>
      
      <div className="mobile-auth-section">
        {isAuthenticated ? (
          <div className="mobile-user-info">
            <span className="mobile-user-name">{user?.name}</span>
          </div>
        ) : (
          <div className="mobile-auth-buttons">
            <button 
              className="mobile-login-btn"
              onClick={onShowLogin}
              aria-label="로그인"
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

MobileHeader.propTypes = {
  currentView: PropTypes.string.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  onShowLogin: PropTypes.func.isRequired,
  onShowRegister: PropTypes.func.isRequired,
};

export default React.memo(MobileHeader);