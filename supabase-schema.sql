-- -- Supabase schema for Studio77 nextjs-app
-- -- Paste this into Supabase SQL Editor and run it.

-- -- Required extension for UUID generation
-- create extension if not exists "pgcrypto";

-- -- ══════════════════════════════════════════
-- -- Storage Policies (Secure)
-- -- ══════════════════════════════════════════
-- -- NOTE: Please ensure you create a storage bucket named "images" in the Supabase Dashboard.
-- -- We are only allowing public READ. 
-- -- Public UPLOAD is removed for security; our backend service role handles all uploads.
-- drop policy if exists "Allow public read of storage objects" on storage.objects;
-- create policy "Allow public read of storage objects"
--   on storage.objects for select
--   using (true);


-- -- ══════════════════════════════════════════
-- -- Studio77 — Supabase Database Schema
-- -- ══════════════════════════════════════════

-- -- 1. Artists table
-- create table if not exists public.artists (
--   id uuid primary key default gen_random_uuid(),
--   name text not null,
--   specialty text,
--   description text,
--   image_url text,
--   is_featured boolean default false,
--   created_at timestamptz default now()
-- );

-- -- 2. Filters table
-- create table if not exists public.filters (
--   id uuid primary key default gen_random_uuid(),
--   label text not null,
--   filter_group text not null default 'category',  -- 'style' or 'category'
--   created_at timestamptz default now()
-- );
-- alter table public.filters add column if not exists filter_group text not null default 'category';

-- -- 3. Coming soon cards table
-- create table if not exists public.coming_soon (
--   id uuid primary key default gen_random_uuid(),
--   title text not null,
--   description text,
--   image_url text,
--   sort_order int default 0,
--   created_at timestamptz default now()
-- );

-- -- 4. Tracks table
-- create table if not exists public.tracks (
--   id uuid primary key default gen_random_uuid(),
--   title text not null,
--   artist_name text,
--   artist_id uuid references public.artists(id) on delete set null,
--   category text not null default 'sheelat',
--   filters text[] default '{}',
--   section text not null default 'latest',
--   is_exclusive boolean default false,
--   audio_url text not null,
--   cover_image_url text,
--   description text,
--   duration text default '00:00',
--   created_at timestamptz default now()
-- );

-- -- 5. Bookings table
-- create table if not exists public.bookings (
--   id uuid primary key default gen_random_uuid(),
--   client_name text not null,
--   client_email text,
--   client_phone text,
--   booking_date date,
--   booking_time time,
--   service_type text default 'recording',
--   notes text,
--   status text default 'pending',
--   created_at timestamptz default now()
-- );

-- -- 6. Contact messages table
-- create table if not exists public.contact_messages (
--   id uuid primary key default gen_random_uuid(),
--   name text not null,
--   email text not null,
--   subject text not null,
--   message text not null,
--   created_at timestamptz default now()
-- );

-- -- 7. User favorites table (IP based)
-- create table if not exists public.user_favorites (
--   id uuid primary key default gen_random_uuid(),
--   user_ip text not null,
--   track_id uuid references public.tracks(id) on delete cascade,
--   created_at timestamptz default now(),
--   unique (user_ip, track_id)
-- );

-- -- Recommended indexes
-- create index if not exists idx_tracks_section on public.tracks (section);
-- create index if not exists idx_tracks_category on public.tracks (category);
-- create index if not exists idx_tracks_created_at on public.tracks (created_at desc);
-- create index if not exists idx_bookings_status on public.bookings (status);
-- create index if not exists idx_coming_soon_sort_order on public.coming_soon (sort_order);
-- create index if not exists idx_user_favorites_ip on public.user_favorites (user_ip);

-- -- ══════════════════════════════════════════
-- -- 🛡️ SECURE ROW LEVEL SECURITY (RLS) 🛡️
-- -- ══════════════════════════════════════════
-- -- Enable RLS for all tables
-- alter table public.artists enable row level security;
-- alter table public.filters enable row level security;
-- alter table public.coming_soon enable row level security;
-- alter table public.tracks enable row level security;
-- alter table public.bookings enable row level security;
-- alter table public.contact_messages enable row level security;
-- alter table public.user_favorites enable row level security;

-- -- Clean up any existing unsafe WRITE policies
-- drop policy if exists "Service role can insert artists" on public.artists;
-- drop policy if exists "Service role can update artists" on public.artists;
-- drop policy if exists "Service role can delete artists" on public.artists;
-- drop policy if exists "Service role can insert filters" on public.filters;
-- drop policy if exists "Service role can update filters" on public.filters;
-- drop policy if exists "Service role can delete filters" on public.filters;
-- drop policy if exists "Service role can insert coming_soon" on public.coming_soon;
-- drop policy if exists "Service role can update coming_soon" on public.coming_soon;
-- drop policy if exists "Service role can delete coming_soon" on public.coming_soon;
-- drop policy if exists "Service role can insert tracks" on public.tracks;
-- drop policy if exists "Service role can update tracks" on public.tracks;
-- drop policy if exists "Service role can delete tracks" on public.tracks;
-- drop policy if exists "Service role can insert bookings" on public.bookings;
-- drop policy if exists "Service role can update bookings" on public.bookings;
-- drop policy if exists "Service role can delete bookings" on public.bookings;
-- drop policy if exists "Service role can insert contact_messages" on public.contact_messages;
-- drop policy if exists "Service role can update contact_messages" on public.contact_messages;
-- drop policy if exists "Service role can delete contact_messages" on public.contact_messages;


-- -- 1. PUBLIC READ ACCESS (For the frontend app to show content)
-- drop policy if exists "Public read artists" on public.artists;
-- create policy "Public read artists" on public.artists for select using (true);

-- drop policy if exists "Public read filters" on public.filters;
-- create policy "Public read filters" on public.filters for select using (true);

-- drop policy if exists "Public read coming_soon" on public.coming_soon;
-- create policy "Public read coming_soon" on public.coming_soon for select using (true);

-- drop policy if exists "Public read tracks" on public.tracks;
-- create policy "Public read tracks" on public.tracks for select using (true);

-- -- Allow public read/insert for strictly required frontend functionality (Bookings & Favorites)
-- drop policy if exists "Public read bookings" on public.bookings;
-- create policy "Public read bookings" on public.bookings for select using (true);

-- drop policy if exists "Public insert bookings" on public.bookings;
-- create policy "Public insert bookings" on public.bookings for insert with check (true);

-- drop policy if exists "Public read user_favorites" on public.user_favorites;
-- create policy "Public read user_favorites" on public.user_favorites for select using (true);

-- drop policy if exists "Public insert user_favorites" on public.user_favorites;
-- create policy "Public insert user_favorites" on public.user_favorites for insert with check (true);

-- drop policy if exists "Public delete user_favorites" on public.user_favorites;
-- create policy "Public delete user_favorites" on public.user_favorites for delete using (true);

-- drop policy if exists "Public insert contact_messages" on public.contact_messages;
-- create policy "Public insert contact_messages" on public.contact_messages for insert with check (true);

-- -- NOTE: NO INSERT/UPDATE/DELETE policies are provided for artists, tracks, filters, coming_soon.
-- -- 🔒 This completely rejects anonymous attacks. 
-- -- ✅ Our secure Next.js backend will bypass RLS automatically using SUPABASE_SERVICE_ROLE_KEY.

-- -- ══════════════════════════════════════════
-- -- Dummy / Sample Data
-- -- ══════════════════════════════════════════
-- insert into public.artists (name, specialty, description, image_url, is_featured)
-- values
--   ('أحمد المنشد',  'منشد ومؤدي زفات',   'أعذب الأصوات الوطنية والوجدانية',     'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80', true),
--   ('فهد المطرب',   'مطرب وملحن شعبي',   'خبير المقامات الموسيقية المحلية',      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80', true),
--   ('المهندس حسام', 'مهندس صوت وتوزيع',  'ماسترينغ بتقنيات الأبعاد الثلاثية',   'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80', true),
--   ('المهندس خالد', 'توزيع موسيقي ومكس', 'إشراف على الكورال والآلات الحية',     'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80', true);



-- Required extension for UUID generation
create extension if not exists "pgcrypto";

-- ══════════════════════════════════════════
-- Studio77 — Supabase Database Schema
-- ملاحظة: تم حذف إعدادات Supabase Storage لأن التخزين سيتم عبر ImageKit
-- ملاحظة: تم حذف جدول الحجوزات بناءً على التحديث الأخير
-- ══════════════════════════════════════════

-- 0. Admins table (إدارة المشرفين وصلاحيات لوحة التحكم)
create table if not exists public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  created_at timestamptz default now()
);

-- تفعيل RLS لجدول المشرفين
alter table public.admins enable row level security;

drop policy if exists "Allow admins to read their own status" on public.admins;
create policy "Allow admins to read their own status"
  on public.admins for select
  using (auth.uid() = id);

-- 1. Artists table
create table if not exists public.artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  specialty text,
  description text,
  image_url text, 
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 2. Filters table
create table if not exists public.filters (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  filter_group text not null default 'category',  -- 'style' or 'category'
  created_at timestamptz default now()
);
alter table public.filters add column if not exists filter_group text not null default 'category';

-- 3. Coming soon cards table
create table if not exists public.coming_soon (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text, 
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 4. Tracks table
create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist_name text,
  artist_id uuid references public.artists(id) on delete set null,
  category text not null default 'sheelat',
  filters text[] default '{}',
  section text not null default 'latest',
  is_exclusive boolean default false,
  audio_url text not null, 
  cover_image_url text, 
  description text,
  duration text default '00:00',
  created_at timestamptz default now()
);

-- 5. Contact messages table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- 6. User favorites table (IP based)
create table if not exists public.user_favorites (
  id uuid primary key default gen_random_uuid(),
  user_ip text not null,
  track_id uuid references public.tracks(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_ip, track_id)
);

-- Recommended indexes
create index if not exists idx_tracks_section on public.tracks (section);
create index if not exists idx_tracks_category on public.tracks (category);
create index if not exists idx_tracks_created_at on public.tracks (created_at desc);
create index if not exists idx_coming_soon_sort_order on public.coming_soon (sort_order);
create index if not exists idx_user_favorites_ip on public.user_favorites (user_ip);

-- ══════════════════════════════════════════
-- 🛡️ SECURE ROW LEVEL SECURITY (RLS) 🛡️
-- ══════════════════════════════════════════
-- Enable RLS for all tables
alter table public.artists enable row level security;
alter table public.filters enable row level security;
alter table public.coming_soon enable row level security;
alter table public.tracks enable row level security;
alter table public.contact_messages enable row level security;
alter table public.user_favorites enable row level security;

-- 1. PUBLIC READ ACCESS (For the frontend app to show content)
drop policy if exists "Public read artists" on public.artists;
create policy "Public read artists" on public.artists for select using (true);

drop policy if exists "Public read filters" on public.filters;
create policy "Public read filters" on public.filters for select using (true);

drop policy if exists "Public read coming_soon" on public.coming_soon;
create policy "Public read coming_soon" on public.coming_soon for select using (true);

drop policy if exists "Public read tracks" on public.tracks;
create policy "Public read tracks" on public.tracks for select using (true);

-- 2. Allow public read/insert/delete for strictly required frontend functionality
drop policy if exists "Public read user_favorites" on public.user_favorites;
create policy "Public read user_favorites" on public.user_favorites for select using (true);

drop policy if exists "Public insert user_favorites" on public.user_favorites;
create policy "Public insert user_favorites" on public.user_favorites for insert with check (true);

drop policy if exists "Public delete user_favorites" on public.user_favorites;
create policy "Public delete user_favorites" on public.user_favorites for delete using (true);

drop policy if exists "Public insert contact_messages" on public.contact_messages;
create policy "Public insert contact_messages" on public.contact_messages for insert with check (true);

-- NOTE: NO INSERT/UPDATE/DELETE policies are provided for artists, tracks, filters, coming_soon.
-- 🔒 وهذا يمنع أي هجمات من المتصفح لتعديل البيانات.
-- ✅ السيرفر (Next.js) سيتجاوز هذه الحماية تلقائياً باستخدام مفتاح الخدمة السري للأدمن.

-- ══════════════════════════════════════════
-- Dummy / Sample Data (Commented Out)
-- ══════════════════════════════════════════
-- insert into public.artists (name, specialty, description, image_url, is_featured)
-- values
--   ('أحمد المنشد',  'منشد ومؤدي زفات',   'أعذب الأصوات الوطنية والوجدانية',     'https://ik.imagekit.io/dummy/ahmed.jpg', true),
--   ('فهد المطرب',   'مطرب وملحن شعبي',   'خبير المقامات الموسيقية المحلية',      'https://ik.imagekit.io/dummy/fahd.jpg', true),
--   ('المهندس حسام', 'مهندس صوت وتوزيع',  'ماسترينغ بتقنيات الأبعاد الثلاثية',   'https://ik.imagekit.io/dummy/hossam.jpg', true),
--   ('المهندس خالد', 'توزيع موسيقي ومكس', 'إشراف على الكورال والآلات الحية',     'https://ik.imagekit.io/dummy/khaled.jpg', true);
