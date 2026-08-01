import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};

function getValidSupabaseUrl(url: any): string {
  if (!url || typeof url !== 'string') {
    return 'https://placeholder.supabase.co';
  }
  const trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return 'https://placeholder.supabase.co';
  }
  try {
    new URL(trimmed);
    return trimmed;
  } catch {
    return 'https://placeholder.supabase.co';
  }
}

const rawUrl = env.VITE_SUPABASE_URL;
const rawKey = env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = getValidSupabaseUrl(rawUrl);
const supabaseAnonKey = (typeof rawKey === 'string' && rawKey.trim()) || 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey !== 'placeholder-anon-key'
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

