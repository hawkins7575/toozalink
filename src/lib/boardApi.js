import { supabase } from './supabase.js';

// ============ 게시판 관련 API ============

/**
 * 모든 활성 게시판 목록 조회
 */
export const getBoards = async () => {
  // 임시: 데이터베이스 스키마 설정 전까지 기본 데이터 반환
  console.log('기본 게시판 데이터를 사용합니다. (데이터베이스 스키마 설정 대기 중)');
  
  const fallbackData = [
    {
      id: 'board1',
      title: '종합 토론 게시판',
      description: '주식 투자 관련 자유로운 토론을 나눠보세요',
      icon: '💬',
      color: '#3b82f6',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'board2',
      title: '종목 분석 게시판',
      description: '개별 종목에 대한 분석과 의견을 공유하세요',
      icon: '📊',
      color: '#10b981',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'board3',
      title: '투자 정보 게시판',
      description: '유용한 투자 정보와 뉴스를 공유하세요',
      icon: '📈',
      color: '#8b5cf6',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'board4',
      title: '질문답변 게시판',
      description: '투자 관련 궁금한 점을 질문하고 답변을 받아보세요',
      icon: '❓',
      color: '#f59e0b',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'board5',
      title: '수익인증 게시판',
      description: '투자 수익을 인증하고 경험담을 공유하세요',
      icon: '💰',
      color: '#ef4444',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'board6',
      title: '자료실 게시판',
      description: '투자 관련 유용한 자료와 도구를 공유하세요',
      icon: '📚',
      color: '#06b6d4',
      is_active: true,
      created_at: new Date().toISOString()
    }
  ];
  
  return fallbackData;
};

/**
 * 특정 게시판 정보 조회
 */
export const getBoard = async (boardId) => {
  try {
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .eq('id', boardId)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('게시판 정보 조회 실패:', error);
    return { data: null, error: error.message };
  }
};

// ============ 게시글 관련 API ============

/**
 * 게시글 목록 조회 (페이지네이션 지원)
 */
export const getPosts = async (boardId, { page = 1, limit = 20, sortBy = 'created_at', sortOrder = 'desc' } = {}) => {
  // 임시: 데이터베이스 스키마 설정 전까지 기본 게시글 데이터 반환
  console.log(`${boardId} 게시판 기본 게시글 데이터를 사용합니다. (데이터베이스 스키마 설정 대기 중)`);
  
  // 임시 게시글 데이터
  const tempPosts = [
    {
      id: 'post_1',
      board_id: boardId,
      title: '📈 오늘의 주식 시장 동향',
      content: '오늘 주식 시장의 주요 동향과 분석을 공유드립니다. 코스피는 전일 대비 상승세를 보이고 있으며...',
      author_name: '투자전문가',
      author_id: 'expert_001',
      views: 156,
      likes: 23,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      is_deleted: false,
      is_pinned: false
    },
    {
      id: 'post_2',
      board_id: boardId,
      title: '💡 초보자를 위한 투자 가이드',
      content: '주식 투자를 처음 시작하는 분들을 위한 기본 가이드입니다. 먼저 자신의 투자 목표를 명확히 하고...',
      author_name: '주식초보탈출',
      author_id: 'beginner_guide',
      views: 89,
      likes: 15,
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5시간 전
      updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      is_deleted: false,
      is_pinned: false
    },
    {
      id: 'post_3',
      board_id: boardId,
      title: '🔥 이 종목 어떻게 생각하시나요?',
      content: '최근 급등하고 있는 이 종목에 대한 여러분의 의견을 듣고 싶습니다. 기술적 분석과 펀더멘탈 모두...',
      author_name: '종목탐정',
      author_id: 'stock_detective',
      views: 234,
      likes: 45,
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8시간 전
      updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      is_deleted: false,
      is_pinned: false
    },
    {
      id: 'post_4',
      board_id: boardId,
      title: '📊 분기 실적 발표 일정 정리',
      content: '이번 주 주요 기업들의 분기 실적 발표 일정을 정리해드립니다. 투자 참고하시기 바랍니다.',
      author_name: '실적지킴이',
      author_id: 'earning_watcher',
      views: 67,
      likes: 12,
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12시간 전
      updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      is_deleted: false,
      is_pinned: false
    },
    {
      id: 'post_5',
      board_id: boardId,
      title: '⚠️ 투자 위험 관리 방법',
      content: '성공적인 투자를 위해서는 수익률만큼이나 위험 관리가 중요합니다. 포트폴리오 분산의 중요성과...',
      author_name: '리스크매니저',
      author_id: 'risk_manager',
      views: 145,
      likes: 28,
      created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18시간 전
      updated_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      is_deleted: false,
      is_pinned: true // 고정 게시글
    }
  ];

  try {
    // 정렬 적용
    let sortedPosts = [...tempPosts];
    
    if (sortBy === 'created_at') {
      // 고정 게시글을 먼저 정렬하고, 그 다음 생성일자로 정렬
      sortedPosts.sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
    } else if (sortBy === 'views') {
      sortedPosts.sort((a, b) => {
        return sortOrder === 'desc' ? b.views - a.views : a.views - b.views;
      });
    } else if (sortBy === 'likes') {
      sortedPosts.sort((a, b) => {
        return sortOrder === 'desc' ? b.likes - a.likes : a.likes - b.likes;
      });
    }
    
    // 페이지네이션 적용
    const offset = (page - 1) * limit;
    const paginatedPosts = sortedPosts.slice(offset, offset + limit);

    return { 
      data: paginatedPosts, 
      error: null,
      pagination: {
        page,
        limit,
        total: tempPosts.length,
        totalPages: Math.ceil(tempPosts.length / limit)
      }
    };
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    return { data: [], error: error.message, pagination: null };
  }
};

/**
 * 특정 게시글 조회 (조회수 증가 포함)
 */
export const getPost = async (postId) => {
  try {
    // 게시글 정보 조회
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select(`
        *,
        boards!inner(title, description, icon, color)
      `)
      .eq('id', postId)
      .eq('is_deleted', false)
      .single();

    if (postError) throw postError;

    // 조회수 증가
    const { error: updateError } = await supabase
      .from('posts')
      .update({ views: post.views + 1 })
      .eq('id', postId);

    if (updateError) {
      console.warn('조회수 업데이트 실패:', updateError);
    }

    return { data: { ...post, views: post.views + 1 }, error: null };
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    return { data: null, error: error.message };
  }
};

/**
 * 게시글 작성
 */
export const createPost = async (postData) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        board_id: postData.board_id,
        title: postData.title,
        content: postData.content,
        author_name: postData.author_name,
        author_id: postData.author_id || null
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    return { data: null, error: error.message };
  }
};

/**
 * 게시글 수정
 */
export const updatePost = async (postId, updateData) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: updateData.title,
        content: updateData.content,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    return { data: null, error: error.message };
  }
};

/**
 * 게시글 삭제 (소프트 삭제)
 */
export const deletePost = async (postId) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ is_deleted: true })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    return { data: null, error: error.message };
  }
};

// ============ 댓글 관련 API ============

/**
 * 특정 게시글의 댓글 목록 조회 (계층 구조)
 */
export const getComments = async (postId) => {
  // 임시: 데이터베이스 스키마 설정 전까지 기본 댓글 데이터 반환
  console.log(`${postId} 게시글 기본 댓글 데이터를 사용합니다. (데이터베이스 스키마 설정 대기 중)`);
  
  const tempComments = [
    {
      id: `comment_${postId}_1`,
      post_id: postId,
      parent_id: null,
      content: '좋은 정보 감사합니다! 많은 도움이 되었어요.',
      author_name: '투자초보',
      author_id: 'user_001',
      likes: 5,
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4시간 전
      updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      is_deleted: false,
      replies: []
    },
    {
      id: `comment_${postId}_2`,
      post_id: postId,
      parent_id: null,
      content: '저도 같은 생각입니다. 특히 말씀해주신 위험관리 부분이 인상적이었어요.',
      author_name: '경험자',
      author_id: 'user_002',
      likes: 3,
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6시간 전
      updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      is_deleted: false,
      replies: []
    },
    {
      id: `comment_${postId}_3`,
      post_id: postId,
      parent_id: null,
      content: '혹시 추가적인 자료나 참고할 만한 사이트가 있을까요?',
      author_name: '학습중',
      author_id: 'user_003',
      likes: 2,
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8시간 전
      updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      is_deleted: false,
      replies: []
    }
  ];

  try {
    return { data: tempComments, error: null };
  } catch (error) {
    console.error('댓글 목록 조회 실패:', error);
    return { data: [], error: error.message };
  }
};

/**
 * 댓글 작성
 */
export const createComment = async (commentData) => {
  // 임시: 데이터베이스 스키마 설정 전까지 임시 댓글 생성
  console.log('임시 댓글 생성:', commentData);
  
  try {
    const newComment = {
      id: `comment_${commentData.post_id}_${Date.now()}`,
      post_id: commentData.post_id,
      parent_id: commentData.parent_id || null,
      content: commentData.content,
      author_name: commentData.author_name,
      author_id: commentData.author_id || null,
      likes: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_deleted: false,
      replies: []
    };

    return { data: newComment, error: null };
  } catch (error) {
    console.error('댓글 작성 실패:', error);
    return { data: null, error: error.message };
  }
};

/**
 * 댓글 수정
 */
export const updateComment = async (commentId, content) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update({ 
        content,
        updated_at: new Date().toISOString()
      })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    return { data: null, error: error.message };
  }
};

/**
 * 댓글 삭제 (소프트 삭제)
 */
export const deleteComment = async (commentId) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update({ is_deleted: true })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    return { data: null, error: error.message };
  }
};

// ============ 좋아요 관련 API ============

/**
 * 게시글 좋아요 토글
 */
export const togglePostLike = async (postId, userId) => {
  // 임시: 데이터베이스 스키마 설정 전까지 임시 응답
  console.log(`임시 게시글 좋아요 토글: postId=${postId}, userId=${userId}`);
  
  try {
    // 임시로 랜덤하게 좋아요 상태 반환
    const liked = Math.random() > 0.5;
    return { data: { liked }, error: null };
  } catch (error) {
    console.error('게시글 좋아요 토글 실패:', error);
    return { data: null, error: error.message };
  }
};

/**
 * 댓글 좋아요 토글
 */
export const toggleCommentLike = async (commentId, userId) => {
  // 임시: 데이터베이스 스키마 설정 전까지 임시 응답
  console.log(`임시 댓글 좋아요 토글: commentId=${commentId}, userId=${userId}`);
  
  try {
    // 임시로 랜덤하게 좋아요 상태 반환
    const liked = Math.random() > 0.5;
    return { data: { liked }, error: null };
  } catch (error) {
    console.error('댓글 좋아요 토글 실패:', error);
    return { data: null, error: error.message };
  }
};

// ============ 검색 관련 API ============

/**
 * 게시글 검색
 */
export const searchPosts = async (query, boardId = null, { page = 1, limit = 20 } = {}) => {
  try {
    const offset = (page - 1) * limit;
    
    let searchQuery = supabase
      .from('posts')
      .select('*, boards!inner(title)', { count: 'exact' })
      .eq('is_deleted', false)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`);

    if (boardId) {
      searchQuery = searchQuery.eq('board_id', boardId);
    }

    const { data, error, count } = await searchQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return { 
      data, 
      error: null,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    };
  } catch (error) {
    console.error('게시글 검색 실패:', error);
    return { data: null, error: error.message, pagination: null };
  }
};

/**
 * 인기 게시글 조회 (좋아요 수 기준)
 */
export const getPopularPosts = async (boardId = null, { limit = 10 } = {}) => {
  try {
    let query = supabase
      .from('posts')
      .select('*, boards!inner(title)')
      .eq('is_deleted', false);

    if (boardId) {
      query = query.eq('board_id', boardId);
    }

    const { data, error } = await query
      .order('likes', { ascending: false })
      .order('views', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('인기 게시글 조회 실패:', error);
    return { data: null, error: error.message };
  }
};

/**
 * 사용자 ID 생성 (익명 사용자용)
 */
export const generateUserId = () => {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * 게시판 통계 정보 조회
 */
export const getBoardStats = async (boardId) => {
  // 임시: 데이터베이스 스키마 설정 전까지 기본 통계 반환
  console.log(`${boardId} 게시판 기본 통계 데이터를 사용합니다. (데이터베이스 스키마 설정 대기 중)`);
  
  return {
    totalPosts: Math.floor(Math.random() * 50) + 10,
    totalViews: Math.floor(Math.random() * 1000) + 100,
    totalLikes: Math.floor(Math.random() * 100) + 10,
    lastPost: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  };
};