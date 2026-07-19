import { createServerClient, isAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('coming_soon')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: 'غير مصرح للوصول' }, { status: 401 });
  }

  const supabase = createServerClient();
  const body = await request.json();
  const { data, error } = await supabase.from('coming_soon').insert([body]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
