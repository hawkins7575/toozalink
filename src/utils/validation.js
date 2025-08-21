// 입력 데이터 검증 유틸리티

// XSS 방지를 위한 HTML 특수문자 이스케이프
export const escapeHtml = (text) => {
  if (typeof text !== 'string') return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// 텍스트 길이 검증
export const validateTextLength = (text, minLength = 1, maxLength = 1000) => {
  if (typeof text !== 'string') {
    return { valid: false, error: '텍스트 형식이 올바르지 않습니다.' };
  }
  
  const trimmedText = text.trim();
  
  if (trimmedText.length < minLength) {
    return { valid: false, error: `최소 ${minLength}자 이상 입력해주세요.` };
  }
  
  if (trimmedText.length > maxLength) {
    return { valid: false, error: `최대 ${maxLength}자까지 입력 가능합니다.` };
  }
  
  return { valid: true, text: trimmedText };
};

// 게시글 제목 검증
export const validatePostTitle = (title) => {
  const result = validateTextLength(title, 2, 200);
  if (!result.valid) return result;
  
  // 금지 문자 패턴 검사
  const forbiddenPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i
  ];
  
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(result.text)) {
      return { valid: false, error: '허용되지 않는 문자가 포함되어 있습니다.' };
    }
  }
  
  return { valid: true, text: result.text };
};

// 게시글 내용 검증
export const validatePostContent = (content) => {
  const result = validateTextLength(content, 5, 10000);
  if (!result.valid) return result;
  
  // 금지 문자 패턴 검사
  const forbiddenPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(result.text)) {
      return { valid: false, error: '허용되지 않는 내용이 포함되어 있습니다.' };
    }
  }
  
  return { valid: true, text: result.text };
};

// 댓글 내용 검증
export const validateCommentContent = (content) => {
  const result = validateTextLength(content, 1, 1000);
  if (!result.valid) return result;
  
  // 금지 문자 패턴 검사
  const forbiddenPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i
  ];
  
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(result.text)) {
      return { valid: false, error: '허용되지 않는 문자가 포함되어 있습니다.' };
    }
  }
  
  return { valid: true, text: result.text };
};

// 작성자명 검증
export const validateAuthorName = (name) => {
  const result = validateTextLength(name, 1, 50);
  if (!result.valid) return result;
  
  // 특수문자 제한 (일반적인 닉네임 문자만 허용)
  const allowedPattern = /^[가-힣a-zA-Z0-9\s_-]+$/;
  
  if (!allowedPattern.test(result.text)) {
    return { valid: false, error: '닉네임에는 한글, 영문, 숫자, 공백, 언더스코어, 하이픈만 사용 가능합니다.' };
  }
  
  return { valid: true, text: result.text };
};

// 검색어 검증
export const validateSearchTerm = (searchTerm) => {
  const result = validateTextLength(searchTerm, 1, 100);
  if (!result.valid) return result;
  
  // SQL 인젝션 패턴 검사 (추가 보안)
  const sqlPatterns = [
    /union\s+select/i,
    /drop\s+table/i,
    /delete\s+from/i,
    /insert\s+into/i,
    /update\s+set/i,
    /--/,
    /;/
  ];
  
  for (const pattern of sqlPatterns) {
    if (pattern.test(result.text)) {
      return { valid: false, error: '유효하지 않은 검색어입니다.' };
    }
  }
  
  return { valid: true, text: result.text };
};

// 숫자 검증 (페이지, ID 등)
export const validateNumber = (value, min = 1, max = Number.MAX_SAFE_INTEGER) => {
  const num = parseInt(value, 10);
  
  if (isNaN(num)) {
    return { valid: false, error: '숫자가 아닙니다.' };
  }
  
  if (num < min || num > max) {
    return { valid: false, error: `${min}과 ${max} 사이의 값이어야 합니다.` };
  }
  
  return { valid: true, value: num };
};

// 게시판 ID 검증
export const validateBoardId = (boardId) => {
  if (typeof boardId !== 'string') {
    return { valid: false, error: '게시판 ID가 올바르지 않습니다.' };
  }
  
  // 게시판 ID 패턴 검증 (board1, board2 등)
  const boardIdPattern = /^(board[1-6]|all)$/;
  
  if (!boardIdPattern.test(boardId)) {
    return { valid: false, error: '존재하지 않는 게시판입니다.' };
  }
  
  return { valid: true, boardId };
};

// 종합 검증 결과 처리
export const handleValidationResult = (result, fieldName = '입력값') => {
  if (!result.valid) {
    throw new Error(`${fieldName} 검증 실패: ${result.error}`);
  }
  return result.text || result.value || result.boardId;
};