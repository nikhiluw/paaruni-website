// src/lib/supabase.js
// Supabase client singleton — used across the app for all DB/Auth/Storage calls.

import { createClient } from '@supabase/supabase-js';

const raw = import.meta.env.VITE_SUPABASE_URL

export const SUPABASE_URL = raw.startsWith('/') ? window.location.origin + raw : raw

export const supabase = createClient(
  SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)







// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.warn(
//     '⚠️  Supabase credentials missing. Copy .env.example to .env and fill in your project URL and anon key.'
//   );
// }

// export const supabase = createClient(
//   supabaseUrl || 'https://placeholder.supabase.co',
//   supabaseAnonKey || 'placeholder-key'
// );
