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
  try {
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('posts')
      .select('*, boards!inner(title)')
      .eq('is_deleted', false);

    if (boardId) {
      query = query.eq('board_id', boardId);
    }

    // 고정 게시글 우선 정렬, 그 다음 지정된 정렬
    if (sortBy === 'created_at') {
      query = query.order('is_pinned', { ascending: false })
                  .order(sortBy, { ascending: sortOrder === 'asc' });
    } else {
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    }

    const { data, error, count } = await query
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
    console.error('게시글 목록 조회 실패:', error);
    return { data: null, error: error.message, pagination: null };
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
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true });

    if (error) throw error;

    // 댓글을 계층 구조로 변환
    const commentsMap = new Map();
    const rootComments = [];

    // 먼저 모든 댓글을 Map에 저장
    data.forEach(comment => {
      commentsMap.set(comment.id, { ...comment, replies: [] });
    });

    // 계층 구조 구성
    data.forEach(comment => {
      if (comment.parent_id) {
        const parent = commentsMap.get(comment.parent_id);
        if (parent) {
          parent.replies.push(commentsMap.get(comment.id));
        }
      } else {
        rootComments.push(commentsMap.get(comment.id));
      }
    });

    return { data: rootComments, error: null };
  } catch (error) {
    console.error('댓글 목록 조회 실패:', error);
    return { data: null, error: error.message };
  }
};

/**
 * 댓글 작성
 */
export const createComment = async (commentData) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: commentData.post_id,
        parent_id: commentData.parent_id || null,
        content: commentData.content,
        author_name: commentData.author_name,
        author_id: commentData.author_id || null
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
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
  try {
    // 기존 좋아요 확인
    const { data: existingLike, error: checkError } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existingLike) {
      // 좋아요 취소
      const { error: deleteError } = await supabase
        .from('post_likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) throw deleteError;

      // 게시글 좋아요 수 감소
      const { error: updateError } = await supabase
        .rpc('decrement_post_likes', { post_id: postId });

      if (updateError) throw updateError;

      return { data: { liked: false }, error: null };
    } else {
      // 좋아요 추가
      const { error: insertError } = await supabase
        .from('post_likes')
        .insert([{ post_id: postId, user_id: userId }]);

      if (insertError) throw insertError;

      // 게시글 좋아요 수 증가
      const { error: updateError } = await supabase
        .rpc('increment_post_likes', { post_id: postId });

      if (updateError) throw updateError;

      return { data: { liked: true }, error: null };
    }
  } catch (error) {
    console.error('게시글 좋아요 토글 실패:', error);
    return { data: null, error: error.message };
  }
};

/**
 * 댓글 좋아요 토글
 */
export const toggleCommentLike = async (commentId, userId) => {
  try {
    // 기존 좋아요 확인
    const { data: existingLike, error: checkError } = await supabase
      .from('comment_likes')
      .select('id')
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existingLike) {
      // 좋아요 취소
      const { error: deleteError } = await supabase
        .from('comment_likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) throw deleteError;

      // 댓글 좋아요 수 감소
      const { error: updateError } = await supabase
        .rpc('decrement_comment_likes', { comment_id: commentId });

      if (updateError) throw updateError;

      return { data: { liked: false }, error: null };
    } else {
      // 좋아요 추가
      const { error: insertError } = await supabase
        .from('comment_likes')
        .insert([{ comment_id: commentId, user_id: userId }]);

      if (insertError) throw insertError;

      // 댓글 좋아요 수 증가
      const { error: updateError } = await supabase
        .rpc('increment_comment_likes', { comment_id: commentId });

      if (updateError) throw updateError;

      return { data: { liked: true }, error: null };
    }
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