const { supabase } = require('./supabase-client');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { sites, youtubeChannels } = JSON.parse(event.body);
    
    let results = {
      sites: { success: 0, failed: 0 },
      channels: { success: 0, failed: 0 },
      errors: []
    };

    // 사이트 마이그레이션
    if (sites && sites.length > 0) {
      for (const site of sites) {
        try {
          const siteData = {
            name: site.name,
            url: site.url,
            description: site.description,
            category: site.category,
            tags: site.tags || [],
            tips: site.tips || '',
            difficulty: site.difficulty || '보통',
            is_user_submitted: site.isUserSubmitted || false
          };

          const { error } = await supabase
            .from('sites')
            .insert([siteData]);

          if (error) {
            results.errors.push(`Site "${site.name}": ${error.message}`);
            results.sites.failed++;
          } else {
            results.sites.success++;
          }
        } catch (err) {
          results.errors.push(`Site "${site.name}": ${err.message}`);
          results.sites.failed++;
        }
      }
    }

    // 유튜브 채널 마이그레이션
    if (youtubeChannels && youtubeChannels.length > 0) {
      for (const channel of youtubeChannels) {
        try {
          const channelData = {
            name: channel.name,
            url: channel.url,
            category: channel.category,
            difficulty: channel.difficulty || '보통',
            tips: channel.tips || '',
            is_user_submitted: channel.isUserSubmitted || false
          };

          const { error } = await supabase
            .from('youtube_channels')
            .insert([channelData]);

          if (error) {
            results.errors.push(`Channel "${channel.name}": ${error.message}`);
            results.channels.failed++;
          } else {
            results.channels.success++;
          }
        } catch (err) {
          results.errors.push(`Channel "${channel.name}": ${err.message}`);
          results.channels.failed++;
        }
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Migration completed',
        results
      })
    };

  } catch (error) {
    console.error('Migration Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};