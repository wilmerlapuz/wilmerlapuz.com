/**
 * Shared Supabase client for sync scripts
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = Bun.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Bun.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required environment variables:');
  if (!supabaseUrl) console.error('  - PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) console.error('  - PUBLIC_SUPABASE_ANON_KEY');
  Bun.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
