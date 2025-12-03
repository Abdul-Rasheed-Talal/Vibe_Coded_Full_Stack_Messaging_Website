-- Create a storage bucket for attachments
insert into storage.buckets (id, name, public)
values ('attachments', 'attachments', true)
on conflict (id) do nothing;

-- Allow authenticated users to upload files to 'attachments'
create policy "Authenticated users can upload attachments"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'attachments' );

-- Allow public access to view files in 'attachments'
create policy "Public access to attachments"
on storage.objects for select
to public
using ( bucket_id = 'attachments' );
