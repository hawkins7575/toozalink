import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin, onSwitchToRegister, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 입력 시 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = '이메일 또는 아이디를 입력해주세요';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // 관리자 계정 확인 (아이디 또는 이메일)
      const ADMIN_CREDENTIALS = {
        username: 'daesung75',
        email: 'daesung75@admin.com',
        password: 'wlsl3014'
      };

      if ((formData.email === ADMIN_CREDENTIALS.username || formData.email === ADMIN_CREDENTIALS.email) && 
          formData.password === ADMIN_CREDENTIALS.password) {
        // 관리자 로그인 성공
        const adminLoginData = {
          id: 'admin',
          email: formData.email,
          name: '관리자',
          isAdmin: true,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(adminLoginData));
        onLogin(adminLoginData);
        return;
      }

      // 일반 사용자 확인 (이메일 또는 사용자명으로)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => 
        (u.email === formData.email || u.name === formData.email || u.username === formData.email) && 
        u.password === formData.password
      );
      
      if (user) {
        // 일반 사용자 로그인 성공
        const loginData = {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: false,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(loginData));
        onLogin(loginData);
      } else {
        setErrors({ general: '이메일 또는 비밀번호가 올바르지 않습니다' });
      }
    } catch (error) {
      setErrors({ general: '로그인 중 오류가 발생했습니다' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {onClose && (
          <button 
            type="button" 
            className="close-button"
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        )}
        <div className="auth-header">
          <h1>로그인</h1>
          <p>My Stock Link에 오신 것을 환영합니다</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">이메일 또는 아이디</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="이메일 또는 아이디를 입력하세요"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            계정이 없으신가요?{' '}
            <button 
              type="button" 
              className="auth-link-btn"
              onClick={onSwitchToRegister}
              disabled={isLoading}
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onSwitchToRegister: PropTypes.func.isRequired,
  onClose: PropTypes.func
};

export default Login;