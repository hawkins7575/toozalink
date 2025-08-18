import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ user, onLogout, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email
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
    
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
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
      // 기존 사용자 목록 가져오기
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // 이메일 중복 확인 (자신 제외)
      const existingUser = users.find(u => u.email === formData.email && u.id !== user.id);
      if (existingUser) {
        setErrors({ email: '이미 사용 중인 이메일입니다' });
        return;
      }
      
      // 사용자 정보 업데이트
      const updatedUsers = users.map(u => 
        u.id === user.id 
          ? { ...u, name: formData.name.trim(), email: formData.email.trim() }
          : u
      );
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // 현재 사용자 정보 업데이트
      const updatedUser = {
        ...user,
        name: formData.name.trim(),
        email: formData.email.trim()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      onUpdateProfile(updatedUser);
      setIsEditing(false);
      
    } catch (error) {
      setErrors({ general: '프로필 업데이트 중 오류가 발생했습니다' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email
    });
    setErrors({});
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-text">{user.name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-login-time">
            마지막 로그인: {formatDate(user.loginTime)}
          </p>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-edit-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? '저장 중...' : '저장'}
            </button>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-actions">
          <button 
            className="btn-primary"
            onClick={() => setIsEditing(true)}
          >
            프로필 수정
          </button>
          <button 
            className="btn-danger"
            onClick={onLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    loginTime: PropTypes.string.isRequired
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired
};

export default UserProfile;