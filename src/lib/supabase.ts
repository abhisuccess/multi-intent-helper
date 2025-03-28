
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use these fallback values for development
// In production, you should set proper environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Ensure we have values to prevent the "supabaseUrl is required" error
if (!supabaseUrl || supabaseUrl === 'https://your-supabase-project-url.supabase.co') {
  console.warn('Warning: Using fallback Supabase URL. Set the VITE_SUPABASE_URL environment variable for production use.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your-supabase-anon-key') {
  console.warn('Warning: Using fallback Supabase anonymous key. Set the VITE_SUPABASE_ANON_KEY environment variable for production use.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
