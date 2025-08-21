// 보안 강화된 에러 처리 유틸리티

// 사용자에게 표시할 수 있는 안전한 에러 메시지 맵핑
const SAFE_ERROR_MESSAGES = {
  // 네트워크 관련 에러
  'network_error': '네트워크 연결을 확인해주세요.',
  'timeout_error': '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.',
  'server_error': '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  
  // 인증/권한 관련 에러
  'auth_required': '로그인이 필요한 서비스입니다.',
  'permission_denied': '접근 권한이 없습니다.',
  'session_expired': '세션이 만료되었습니다. 다시 로그인해주세요.',
  
  // 입력 검증 에러
  'validation_error': '입력 정보를 확인해주세요.',
  'invalid_input': '올바르지 않은 입력입니다.',
  'required_field': '필수 항목을 입력해주세요.',
  
  // 게시판 관련 에러
  'board_not_found': '존재하지 않는 게시판입니다.',
  'post_not_found': '존재하지 않는 게시글입니다.',
  'comment_not_found': '존재하지 않는 댓글입니다.',
  'post_creation_failed': '게시글 작성에 실패했습니다.',
  'comment_creation_failed': '댓글 작성에 실패했습니다.',
  'like_toggle_failed': '좋아요 처리에 실패했습니다.',
  
  // 기본 에러
  'unknown_error': '예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  'operation_failed': '작업을 완료할 수 없습니다. 다시 시도해주세요.'
};

// 에러 코드를 기반으로 에러 타입 분류
export const classifyError = (error) => {
  if (!error) return 'unknown_error';
  
  const errorMessage = error.message || error.toString().toLowerCase();
  const errorCode = error.code || '';
  
  // 네트워크 에러 분류
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return 'network_error';
  }
  
  if (errorMessage.includes('timeout') || errorCode === 'TIMEOUT') {
    return 'timeout_error';
  }
  
  // 서버 에러 분류 (5xx 에러)
  if (errorCode >= 500 && errorCode < 600) {
    return 'server_error';
  }
  
  // 인증/권한 에러 분류
  if (errorCode === 401 || errorMessage.includes('unauthorized')) {
    return 'auth_required';
  }
  
  if (errorCode === 403 || errorMessage.includes('forbidden')) {
    return 'permission_denied';
  }
  
  // 검증 에러 분류
  if (errorMessage.includes('validation') || errorMessage.includes('검증')) {
    return 'validation_error';
  }
  
  if (errorCode === 400 || errorMessage.includes('bad request')) {
    return 'invalid_input';
  }
  
  // 게시판 관련 에러 분류
  if (errorMessage.includes('board') && errorMessage.includes('not found')) {
    return 'board_not_found';
  }
  
  if (errorMessage.includes('post') && errorMessage.includes('not found')) {
    return 'post_not_found';
  }
  
  if (errorMessage.includes('comment') && errorMessage.includes('not found')) {
    return 'comment_not_found';
  }
  
  return 'unknown_error';
};

// 안전한 에러 메시지 생성
export const getSafeErrorMessage = (error, fallbackMessage = null) => {
  const errorType = classifyError(error);
  const safeMessage = SAFE_ERROR_MESSAGES[errorType];
  
  // 개발 환경에서만 원본 에러 로깅
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Details]:', {
      original: error,
      classified: errorType,
      safeMessage: safeMessage
    });
  }
  
  return fallbackMessage || safeMessage || SAFE_ERROR_MESSAGES.unknown_error;
};

// 에러 로깅 함수 (프로덕션에서는 외부 로깅 서비스로 전송)
export const logError = (error, context = {}) => {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    },
    context,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  // 개발 환경에서는 콘솔에 로깅
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Log]:', errorInfo);
  } else {
    // 프로덕션에서는 외부 로깅 서비스로 전송
    // 예: Sentry, LogRocket, 또는 자체 로깅 API
    try {
      // 민감한 정보 제거 후 로깅
      // eslint-disable-next-line no-unused-vars
      const sanitizedErrorInfo = {
        ...errorInfo,
        context: sanitizeContext(errorInfo.context)
      };
      
      // 실제 로깅 서비스 호출 (현재는 주석 처리)
      // sendToLoggingService(sanitizedErrorInfo);
    } catch (loggingError) {
      console.error('로깅 실패:', loggingError);
    }
  }
};

// 컨텍스트에서 민감한 정보 제거
const sanitizeContext = (context) => {
  const sensitiveKeys = ['password', 'token', 'key', 'secret', 'auth'];
  const sanitized = { ...context };
  
  Object.keys(sanitized).forEach(key => {
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
    }
  });
  
  return sanitized;
};

// React 컴포넌트에서 사용할 에러 핸들러 훅
export const useErrorHandler = () => {
  const handleError = (error, context = {}, showAlert = true) => {
    // 에러 로깅
    logError(error, context);
    
    // 안전한 에러 메시지 생성
    const safeMessage = getSafeErrorMessage(error);
    
    // 사용자에게 알림 (옵션)
    if (showAlert) {
      alert(safeMessage);
    }
    
    return safeMessage;
  };
  
  return { handleError, getSafeErrorMessage, logError };
};

// 에러 바운더리용 에러 핸들링
export const handleErrorBoundary = (error, errorInfo) => {
  logError(error, {
    componentStack: errorInfo.componentStack,
    type: 'error_boundary'
  });
  
  return getSafeErrorMessage(error, '페이지를 새로고침해주세요.');
};