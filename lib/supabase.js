import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Browser / Client-side Supabase client (anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (service role for Route Handlers — bypasses RLS)
export function createServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}

// Server-side utility to verify if a request comes from an authenticated admin cataloged in `public.admins`
export async function isAdmin(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    if (!token) return false;

    // Create a temporary client with the user token to verify it
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: { user }, error } = await userClient.auth.getUser(token);
    if (error || !user) {
      console.error('Supabase JWT verification failed:', error?.message);
      return false;
    }

    // Check if the verified user exists in the `admins` table
    const serviceClient = createServerClient();
    const { data: adminRecord, error: adminError } = await serviceClient
      .from('admins')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      if (adminError) console.error('Database query for admin verification failed:', adminError.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('isAdmin check failed with exception:', err);
    return false;
  }
}

