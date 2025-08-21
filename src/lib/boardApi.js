import { supabase } from './supabase';

// 게시판 목록 가져오기
export const getBoards = async () => {
  try {
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('게시판 목록 조회 실패:', error);
    throw error;
  }
};

// 특정 게시판의 게시글 목록 가져오기
export const getPosts = async (boardId, page = 1, limit = 20) => {
  try {
    const offset = (page - 1) * limit;
    
    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('board_id', boardId)
      .eq('is_deleted', false)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    
    return {
      posts: data,
      totalCount: count,
      hasMore: count > offset + limit
    };
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw error;
  }
};

// 게시글 상세 정보 가져오기
export const getPost = async (postId) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .eq('is_deleted', false)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    throw error;
  }
};

// 게시글 작성
export const createPost = async (postData) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([{
        board_id: postData.boardId,
        title: postData.title,
        content: postData.content,
        author_name: postData.authorName,
        author_id: postData.authorId || null
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    throw error;
  }
};

// 게시글 수정
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
    return data;
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    throw error;
  }
};

// 게시글 삭제 (소프트 삭제)
export const deletePost = async (postId) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ 
        is_deleted: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    throw error;
  }
};

// 게시글 조회수 증가
export const incrementPostViews = async (postId) => {
  try {
    const { error } = await supabase.rpc('increment_post_views', {
      post_id_param: postId
    });

    if (error) throw error;
  } catch (error) {
    console.error('조회수 증가 실패:', error);
    // 조회수 증가 실패는 치명적이지 않으므로 에러를 던지지 않음
  }
};

// 게시글 좋아요 토글
export const togglePostLike = async (postId, userId) => {
  try {
    const { data, error } = await supabase.rpc('toggle_post_like', {
      post_id_param: postId,
      user_id_param: userId
    });

    if (error) throw error;
    return data; // 현재 좋아요 수 반환
  } catch (error) {
    console.error('좋아요 토글 실패:', error);
    throw error;
  }
};

// 댓글 목록 가져오기
export const getComments = async (postId) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('댓글 목록 조회 실패:', error);
    throw error;
  }
};

// 댓글 작성
export const createComment = async (commentData) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: commentData.postId,
        parent_id: commentData.parentId || null,
        content: commentData.content,
        author_name: commentData.authorName,
        author_id: commentData.authorId || null
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('댓글 작성 실패:', error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (commentId, content) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update({
        content: content,
        updated_at: new Date().toISOString()
      })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
};

// 댓글 삭제 (소프트 삭제)
export const deleteComment = async (commentId) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update({ 
        is_deleted: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    throw error;
  }
};

// 댓글 좋아요 토글
export const toggleCommentLike = async (commentId, userId) => {
  try {
    const { data, error } = await supabase.rpc('toggle_comment_like', {
      comment_id_param: commentId,
      user_id_param: userId
    });

    if (error) throw error;
    return data; // 현재 좋아요 수 반환
  } catch (error) {
    console.error('댓글 좋아요 토글 실패:', error);
    throw error;
  }
};

// 게시글 검색
export const searchPosts = async (boardId, searchTerm, page = 1, limit = 20) => {
  try {
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('is_deleted', false);

    if (boardId && boardId !== 'all') {
      query = query.eq('board_id', boardId);
    }

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,author_name.ilike.%${searchTerm}%`);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    
    return {
      posts: data,
      totalCount: count,
      hasMore: count > offset + limit
    };
  } catch (error) {
    console.error('게시글 검색 실패:', error);
    throw error;
  }
};

// 사용자 ID 생성 (익명 사용자용)
export const generateUserId = () => {
  const sessionId = sessionStorage.getItem('board_user_id');
  if (sessionId) {
    return sessionId;
  }
  
  const newId = 'anon_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  sessionStorage.setItem('board_user_id', newId);
  return newId;
};

// 게시판 통계 정보 가져오기
export const getBoardStats = async (boardId) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, views, likes, created_at')
      .eq('board_id', boardId)
      .eq('is_deleted', false);

    if (error) throw error;
    
    const totalPosts = data.length;
    const totalViews = data.reduce((sum, post) => sum + post.views, 0);
    const totalLikes = data.reduce((sum, post) => sum + post.likes, 0);
    
    return {
      totalPosts,
      totalViews,
      totalLikes,
      lastPost: data.length > 0 ? data[0].created_at : null
    };
  } catch (error) {
    console.error('게시판 통계 조회 실패:', error);
    return {
      totalPosts: 0,
      totalViews: 0,
      totalLikes: 0,
      lastPost: null
    };
  }
};