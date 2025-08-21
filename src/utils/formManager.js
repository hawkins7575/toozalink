// 폼 상태 관리 유틸리티

import { useState, useCallback, useRef, useEffect } from 'react';

// 기본 폼 관리 훅
export const useForm = (initialValues = {}, options = {}) => {
  const { 
    validateOnChange = false,
    validateOnBlur = true,
    validators = {},
    onSubmit,
    resetOnSubmit = false
  } = options;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 값 변경 핸들러
  const setValue = useCallback((name, value) => {
    if (!mountedRef.current) return;

    setValues(prev => ({ ...prev, [name]: value }));

    // 변경 시 검증
    if (validateOnChange && validators[name]) {
      const error = validators[name](value, values);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validateOnChange, validators, values]);

  // 입력 핸들러 (이벤트 기반)
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setValue(name, inputValue);
  }, [setValue]);

  // 블러 핸들러
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    
    if (!mountedRef.current) return;

    setTouched(prev => ({ ...prev, [name]: true }));

    // 블러 시 검증
    if (validateOnBlur && validators[name]) {
      const error = validators[name](values[name], values);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validateOnBlur, validators, values]);

  // 전체 폼 검증
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validators).forEach(name => {
      const error = validators[name](values[name], values);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    if (mountedRef.current) {
      setErrors(newErrors);
    }

    return isValid;
  }, [validators, values]);

  // 폼 제출 핸들러
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!mountedRef.current || isSubmitting) return;

    // 모든 필드를 touched로 설정
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }), 
      {}
    );
    setTouched(allTouched);

    // 폼 검증
    const isValid = validateForm();
    if (!isValid) return;

    try {
      setIsSubmitting(true);
      
      if (onSubmit) {
        await onSubmit(values);
      }

      if (resetOnSubmit && mountedRef.current) {
        reset();
      }
    } catch (error) {
      console.error('폼 제출 실패:', error);
    } finally {
      if (mountedRef.current) {
        setIsSubmitting(false);
      }
    }
  }, [values, isSubmitting, validateForm, onSubmit, resetOnSubmit]);

  // 폼 리셋
  const reset = useCallback((newValues = initialValues) => {
    if (!mountedRef.current) return;

    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // 특정 필드 에러 설정
  const setFieldError = useCallback((name, error) => {
    if (mountedRef.current) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, []);

  // 특정 필드 에러 제거
  const clearFieldError = useCallback((name) => {
    if (mountedRef.current) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, []);

  // 폼 상태 확인
  const isDirty = Object.keys(values).some(
    key => values[key] !== initialValues[key]
  );

  const hasErrors = Object.keys(errors).some(key => errors[key]);

  const isValidated = Object.keys(touched).length > 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    hasErrors,
    isValidated,
    setValue,
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    reset,
    setFieldError,
    clearFieldError,
    // 개별 필드 접근을 위한 헬퍼
    getValue: (name) => values[name] || '',
    getError: (name) => errors[name] || null,
    isTouched: (name) => touched[name] || false,
    isFieldValid: (name) => !errors[name] && touched[name]
  };
};

// 게시글/댓글 작성 전용 폼 훅
export const usePostForm = (options = {}) => {
  const {
    isAuthenticated = false,
    user = null,
    onSubmit,
    type = 'post' // 'post' or 'comment'
  } = options;

  const initialValues = {
    title: type === 'post' ? '' : undefined,
    content: '',
    author: isAuthenticated ? (user?.name || '익명') : '익명'
  };

  const validators = {
    title: type === 'post' ? (value) => {
      if (!value || value.trim().length < 2) {
        return '제목은 최소 2자 이상 입력해주세요.';
      }
      if (value.trim().length > 200) {
        return '제목은 최대 200자까지 입력 가능합니다.';
      }
      return null;
    } : undefined,
    
    content: (value) => {
      const minLength = type === 'post' ? 5 : 1;
      const maxLength = type === 'post' ? 10000 : 1000;
      
      if (!value || value.trim().length < minLength) {
        return `내용은 최소 ${minLength}자 이상 입력해주세요.`;
      }
      if (value.trim().length > maxLength) {
        return `내용은 최대 ${maxLength}자까지 입력 가능합니다.`;
      }
      return null;
    },
    
    author: !isAuthenticated ? (value) => {
      if (!value || value.trim().length < 1) {
        return '작성자명을 입력해주세요.';
      }
      if (value.trim().length > 50) {
        return '작성자명은 최대 50자까지 입력 가능합니다.';
      }
      return null;
    } : undefined
  };

  // undefined 값 제거
  Object.keys(validators).forEach(key => {
    if (validators[key] === undefined) {
      delete validators[key];
    }
  });

  return useForm(initialValues, {
    validators,
    onSubmit,
    resetOnSubmit: true,
    validateOnBlur: true
  });
};

// 검색 폼 전용 훅
export const useSearchForm = (onSearch) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
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

  // 디바운스된 검색
  const debouncedSearch = useCallback((term) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (!mountedRef.current) return;

      try {
        setIsSearching(true);
        await onSearch(term);
      } catch (error) {
        console.error('검색 실패:', error);
      } finally {
        if (mountedRef.current) {
          setIsSearching(false);
        }
      }
    }, 300);
  }, [onSearch]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      debouncedSearch(value.trim());
    }
  }, [debouncedSearch]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (searchTerm.trim()) {
      debouncedSearch(searchTerm.trim());
    }
  }, [searchTerm, debouncedSearch]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    debouncedSearch('');
  }, [debouncedSearch]);

  return {
    searchTerm,
    isSearching,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
    setSearchTerm
  };
};