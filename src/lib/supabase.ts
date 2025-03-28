
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgfdkdobbznsislyajet.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZmRrZG9iYnpuc2lzbHlhamV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMzkxNjgsImV4cCI6MjA1ODcxNTE2OH0.RIWxha7lAM2Wgc-bUe67w0lFJBKxYOumimcZEJyZohY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
