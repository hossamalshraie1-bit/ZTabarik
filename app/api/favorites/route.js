import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

function getClientIp(request) {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

export async function GET(request) {
  const supabase = createServerClient();
  const ip = getClientIp(request);
  
  const { data, error } = await supabase
    .from('user_favorites')
    .select('track_id')
    .eq('user_ip', ip);
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  const trackIds = data.map(item => item.track_id);
  return NextResponse.json(trackIds);
}

export async function POST(request) {
  const supabase = createServerClient();
  const ip = getClientIp(request);
  const { trackId } = await request.json();
  
  if (!trackId) {
    return NextResponse.json({ error: 'trackId is required' }, { status: 400 });
  }
  
  // Check if it already exists
  const { data, error: selectError } = await supabase
    .from('user_favorites')
    .select('id')
    .eq('user_ip', ip)
    .eq('track_id', trackId)
    .maybeSingle();
    
  if (selectError) {
    return NextResponse.json({ error: selectError.message }, { status: 500 });
  }
  
  if (data) {
    // If it exists, remove it (unfavorite)
    const { error: deleteError } = await supabase
      .from('user_favorites')
      .delete()
      .eq('id', data.id);
      
    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }
    return NextResponse.json({ favorited: false });
  } else {
    // If it doesn't exist, insert it (favorite)
    const { error: insertError } = await supabase
      .from('user_favorites')
      .insert([{ user_ip: ip, track_id: trackId }]);
      
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    return NextResponse.json({ favorited: true });
  }
}
