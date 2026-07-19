import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ─── Browser / Client-side Supabase client ───────────────────────────────────
// NEXT_PUBLIC_* variables are embedded by Next.js at BUILD TIME, so these are
// always available on Vercel as long as they are set in Environment Variables.
export const supabase = createClient(
  supabaseUrl  || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

// ─── Server-side Supabase client (bypasses RLS — Route Handlers only) ────────
// Uses the secret service role key. Gracefully degrades during static analysis.
export function createServerClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return createClient(
    supabaseUrl  || 'https://placeholder.supabase.co',
    serviceKey   || 'placeholder-service-key',
    { auth: { persistSession: false } }
  );
}

// ─── isAdmin — Server-side JWT + admins table verification ───────────────────
export async function isAdmin(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

    const token = authHeader.split(' ')[1];
    if (!token) return false;

    // Verify the JWT token using the anon client
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: { user }, error } = await userClient.auth.getUser(token);
    if (error || !user) {
      console.error('Supabase JWT verification failed:', error?.message);
      return false;
    }

    // Confirm the user exists in the admins table
    const serviceClient = createServerClient();
    const { data: adminRecord, error: adminError } = await serviceClient
      .from('admins')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      if (adminError) console.error('Admin lookup failed:', adminError.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('isAdmin check failed:', err);
    return false;
  }
}
