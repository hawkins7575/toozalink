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
    const { httpMethod, queryStringParameters, body } = event;

    switch (httpMethod) {
      case 'GET':
        const type = queryStringParameters?.type || 'site';
        
        const { data: categories, error } = await supabase
          .from('categories')
          .select('*')
          .eq('type', type)
          .order('created_at', { ascending: true });

        if (error) throw error;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(categories.map(cat => cat.name))
        };

      case 'POST':
        const newCategory = JSON.parse(body);
        
        const { data, error: insertError } = await supabase
          .from('categories')
          .insert([{
            name: newCategory.name,
            type: newCategory.type || 'site',
            icon: newCategory.icon || '📈',
            color: newCategory.color || 'blue'
          }])
          .select();

        if (insertError) throw insertError;

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(data[0])
        };

      case 'DELETE':
        const { name } = JSON.parse(body);
        
        const { error: deleteError } = await supabase
          .from('categories')
          .delete()
          .eq('name', name);

        if (deleteError) throw deleteError;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Category deleted successfully' })
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Categories API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};