// Supabase 클라이언트 설정
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and ANON KEY must be provided');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };