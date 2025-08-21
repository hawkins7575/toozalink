const { supabase } = require('./supabase-client');

// 성능 최적화를 위한 헤더
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Cache-Control',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Cache-Control': 'public, max-age=300, s-maxage=600', // 5분 브라우저, 10분 CDN 캐시
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff'
};

exports.handler = async (event, context) => {
  // CORS 처리
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { httpMethod, queryStringParameters, body, path } = event;

    switch (httpMethod) {
      case 'GET':
        // 성능 최적화된 쿼리
        const { data: sites, error } = await supabase
          .from('sites')
          .select(`
            id, name, url, description, category,
            tags, tips, difficulty, is_user_submitted,
            created_at
          `) // 필요한 필드만 선택
          .order('created_at', { ascending: false })
          .limit(200); // 데이터 제한

        if (error) throw error;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(sites)
        };

      case 'POST':
        const newSite = JSON.parse(body);
        
        const siteData = {
          name: newSite.name,
          url: newSite.url,
          description: newSite.description,
          category: newSite.category,
          tags: newSite.tags || [],
          tips: newSite.tips || '',
          difficulty: newSite.difficulty || '보통',
          is_user_submitted: newSite.isUserSubmitted || false,
          submitted_by: newSite.submittedBy || 'user'
        };

        // 성능을 위해 필요한 필드만 반환
        const { data, error: insertError } = await supabase
          .from('sites')
          .insert([siteData])
          .select(`
            id, name, url, description, category,
            tags, tips, difficulty, is_user_submitted,
            created_at
          `);

        if (insertError) throw insertError;

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(data[0])
        };

      case 'PUT':
        const pathParts = path.split('/');
        const siteId = pathParts[pathParts.length - 1];
        const updateData = JSON.parse(body);

        const { data: updatedSite, error: updateError } = await supabase
          .from('sites')
          .update(updateData)
          .eq('id', siteId)
          .select();

        if (updateError) throw updateError;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedSite[0])
        };

      case 'DELETE':
        const deletePathParts = path.split('/');
        const deleteSiteId = deletePathParts[deletePathParts.length - 1];

        const { error: deleteError } = await supabase
          .from('sites')
          .delete()
          .eq('id', deleteSiteId);

        if (deleteError) throw deleteError;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Site deleted successfully' })
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Sites API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};