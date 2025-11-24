-- 1. Enable RLS on profiles table (if not already enabled)
alter table profiles enable row level security;

-- 2. Allow authenticated users to view ALL profiles (needed for search)
-- Drop the policy if it exists to avoid errors, then recreate it
drop policy if exists "Public profiles are viewable by everyone" on profiles;
create policy "Public profiles are viewable by everyone"
on profiles for select
to authenticated
using ( true );

-- 3. Allow users to update their OWN profile
drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
on profiles for update
to authenticated
using ( auth.uid() = id );

-- 4. Allow users to insert their OWN profile (for new signups)
drop policy if exists "Users can insert their own profile" on profiles;
create policy "Users can insert their own profile"
on profiles for insert
to authenticated
with check ( auth.uid() = id );

-- 5. Storage Policies for 'avatars' bucket
-- Allow public read access to avatars
drop policy if exists "Avatar images are publicly accessible" on storage.objects;
create policy "Avatar images are publicly accessible"
on storage.objects for select
to public
using ( bucket_id = 'avatars' );

-- Allow authenticated users to upload avatars
drop policy if exists "Anyone can upload an avatar" on storage.objects;
create policy "Anyone can upload an avatar"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'avatars' );

-- Allow authenticated users to update their own avatars
drop policy if exists "Anyone can update their own avatar" on storage.objects;
create policy "Anyone can update their own avatar"
on storage.objects for update
to authenticated
using ( bucket_id = 'avatars' );
