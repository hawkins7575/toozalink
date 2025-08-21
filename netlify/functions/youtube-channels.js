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
        const { data: channels, error } = await supabase
          .from('youtube_channels')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(channels)
        };

      case 'POST':
        const newChannel = JSON.parse(body);
        
        const channelData = {
          name: newChannel.name,
          url: newChannel.url,
          category: newChannel.category,
          difficulty: newChannel.difficulty || '보통',
          tips: newChannel.tips || '',
          is_user_submitted: newChannel.isUserSubmitted || false,
          submitted_by: newChannel.submittedBy || 'user'
        };

        const { data, error: insertError } = await supabase
          .from('youtube_channels')
          .insert([channelData])
          .select();

        if (insertError) throw insertError;

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(data[0])
        };

      case 'PUT':
        const pathParts = path.split('/');
        const channelId = pathParts[pathParts.length - 1];
        const updateData = JSON.parse(body);

        const { data: updatedChannel, error: updateError } = await supabase
          .from('youtube_channels')
          .update(updateData)
          .eq('id', channelId)
          .select();

        if (updateError) throw updateError;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedChannel[0])
        };

      case 'DELETE':
        const deletePathParts = path.split('/');
        const deleteChannelId = deletePathParts[deletePathParts.length - 1];

        const { error: deleteError } = await supabase
          .from('youtube_channels')
          .delete()
          .eq('id', deleteChannelId);

        if (deleteError) throw deleteError;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Channel deleted successfully' })
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('YouTube Channels API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};