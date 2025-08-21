// 로딩 상태 관리 유틸리티

import { useState, useCallback, useRef, useEffect } from 'react';

// 로딩 상태 관리 훅
export const useLoadingState = (initialLoading = false) => {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  // 컴포넌트 언마운트 시 상태 업데이트 방지
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const setLoadingState = useCallback((isLoading) => {
    if (mountedRef.current) {
      setLoading(isLoading);
    }
  }, []);

  const setErrorState = useCallback((errorMessage) => {
    if (mountedRef.current) {
      setError(errorMessage);
    }
  }, []);

  const clearError = useCallback(() => {
    if (mountedRef.current) {
      setError(null);
    }
  }, []);

  const executeAsync = useCallback(async (asyncFunction, options = {}) => {
    const { 
      showLoading = true, 
      clearErrorOnStart = true,
      onSuccess,
      onError
    } = options;

    if (clearErrorOnStart) {
      clearError();
    }

    if (showLoading) {
      setLoadingState(true);
    }

    try {
      const result = await asyncFunction();
      
      if (onSuccess && mountedRef.current) {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      if (mountedRef.current) {
        const errorMessage = error.message || '작업을 완료할 수 없습니다.';
        setErrorState(errorMessage);
        
        if (onError) {
          onError(error);
        }
      }
      throw error;
    } finally {
      if (showLoading && mountedRef.current) {
        setLoadingState(false);
      }
    }
  }, [setLoadingState, setErrorState, clearError]);

  return {
    loading,
    error,
    setLoading: setLoadingState,
    setError: setErrorState,
    clearError,
    executeAsync
  };
};

// 다중 로딩 상태 관리 훅
export const useMultipleLoadingState = (keys = []) => {
  const [loadingStates, setLoadingStates] = useState(
    keys.reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );
  const [errors, setErrors] = useState(
    keys.reduce((acc, key) => ({ ...acc, [key]: null }), {})
  );
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const setLoading = useCallback((key, isLoading) => {
    if (mountedRef.current) {
      setLoadingStates(prev => ({ ...prev, [key]: isLoading }));
    }
  }, []);

  const setError = useCallback((key, errorMessage) => {
    if (mountedRef.current) {
      setErrors(prev => ({ ...prev, [key]: errorMessage }));
    }
  }, []);

  const clearError = useCallback((key) => {
    if (mountedRef.current) {
      if (key) {
        setErrors(prev => ({ ...prev, [key]: null }));
      } else {
        setErrors(keys.reduce((acc, k) => ({ ...acc, [k]: null }), {}));
      }
    }
  }, [keys]);

  const executeAsync = useCallback(async (key, asyncFunction, options = {}) => {
    const { 
      showLoading = true, 
      clearErrorOnStart = true,
      onSuccess,
      onError
    } = options;

    if (clearErrorOnStart) {
      clearError(key);
    }

    if (showLoading) {
      setLoading(key, true);
    }

    try {
      const result = await asyncFunction();
      
      if (onSuccess && mountedRef.current) {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      if (mountedRef.current) {
        const errorMessage = error.message || '작업을 완료할 수 없습니다.';
        setError(key, errorMessage);
        
        if (onError) {
          onError(error);
        }
      }
      throw error;
    } finally {
      if (showLoading && mountedRef.current) {
        setLoading(key, false);
      }
    }
  }, [setLoading, setError, clearError]);

  // 모든 로딩 상태 확인
  const isAnyLoading = Object.values(loadingStates).some(loading => loading);
  
  // 모든 에러 확인
  const hasAnyError = Object.values(errors).some(error => error !== null);

  return {
    loadingStates,
    errors,
    isAnyLoading,
    hasAnyError,
    setLoading,
    setError,
    clearError,
    executeAsync,
    // 개별 상태 접근을 위한 헬퍼
    isLoading: (key) => loadingStates[key] || false,
    getError: (key) => errors[key]
  };
};

// 디바운스된 로딩 상태 (너무 빠른 로딩 상태 변경 방지)
export const useDebouncedLoading = (delay = 100) => {
  const [loading, setLoading] = useState(false);
  const [actualLoading, setActualLoading] = useState(false);
  const timeoutRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const setDebouncedLoading = useCallback((isLoading) => {
    setActualLoading(isLoading);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isLoading) {
      // 로딩 시작은 즉시 표시
      if (mountedRef.current) {
        setLoading(true);
      }
    } else {
      // 로딩 끝은 디바운스 적용
      timeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setLoading(false);
        }
      }, delay);
    }
  }, [delay]);

  return [loading, setDebouncedLoading, actualLoading];
};

// 순차적 로딩 관리 (여러 단계의 로딩)
export const useSequentialLoading = (steps = []) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepErrors, setStepErrors] = useState({});
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const executeSequence = useCallback(async (stepFunctions) => {
    if (!mountedRef.current) return;

    setCurrentStep(0);
    setStepErrors({});

    for (let i = 0; i < stepFunctions.length; i++) {
      if (!mountedRef.current) break;

      try {
        setCurrentStep(i);
        await stepFunctions[i]();
      } catch (error) {
        if (mountedRef.current) {
          setStepErrors(prev => ({ ...prev, [i]: error.message }));
          setCurrentStep(-1);
        }
        throw error;
      }
    }

    if (mountedRef.current) {
      setCurrentStep(-1);
    }
  }, []);

  const resetSequence = useCallback(() => {
    if (mountedRef.current) {
      setCurrentStep(-1);
      setStepErrors({});
    }
  }, []);

  return {
    currentStep,
    stepErrors,
    isLoading: currentStep >= 0,
    currentStepName: currentStep >= 0 ? steps[currentStep] : null,
    executeSequence,
    resetSequence
  };
};