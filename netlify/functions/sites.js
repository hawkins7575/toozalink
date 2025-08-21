const { supabase } = require('./supabase-client');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
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
        const { data: sites, error } = await supabase
          .from('sites')
          .select('*')
          .order('created_at', { ascending: false });

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

        const { data, error: insertError } = await supabase
          .from('sites')
          .insert([siteData])
          .select();

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