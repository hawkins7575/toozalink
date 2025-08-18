import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // 초기 로드 시 로컬 스토리지에서 사용자 정보 확인
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const userData = JSON.parse(currentUser);
          setUser(userData);
          setIsAuthenticated(true);
          setIsAdmin(userData.isAdmin || false);
        }
      } catch (error) {
        console.warn('Failed to load user data:', error);
        // 손상된 데이터 제거
        localStorage.removeItem('currentUser');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // 로그인
  const login = useCallback((userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      setIsAdmin(userData.isAdmin || false);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('로그인 처리 중 오류가 발생했습니다');
    }
  }, []);

  // 로그아웃
  const logout = useCallback(() => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.warn('Logout cleanup failed:', error);
    }
  }, []);

  // 사용자 정보 업데이트
  const updateUser = useCallback((updatedUserData) => {
    try {
      setUser(updatedUserData);
      setIsAdmin(updatedUserData.isAdmin || false);
      localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    } catch (error) {
      console.error('User update failed:', error);
      throw new Error('사용자 정보 업데이트 중 오류가 발생했습니다');
    }
  }, []);

  // 회원가입 (자동 로그인 포함)
  const register = useCallback((userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      setIsAdmin(userData.isAdmin || false);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('회원가입 처리 중 오류가 발생했습니다');
    }
  }, []);

  // 인증 상태 확인
  const checkAuth = useCallback(() => {
    try {
      const currentUser = localStorage.getItem('currentUser');
      return !!currentUser;
    } catch (error) {
      return false;
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    register,
    updateUser,
    checkAuth
  };
};

export default useAuth;