-- Music releases: audio is private; covers are public. The public catalogue only reveals published releases.
CREATE TABLE IF NOT EXISTS public.music_releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  title_en text NOT NULL,
  audio_path text NOT NULL UNIQUE,
  cover_path text NOT NULL,
  youtube_id text,
  release_date date,
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.music_releases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Published music public read" ON public.music_releases;
CREATE POLICY "Published music public read" ON public.music_releases
 FOR SELECT TO anon USING (is_published);
DROP POLICY IF EXISTS "Published music and admin catalogue" ON public.music_releases;
CREATE POLICY "Published music and admin catalogue" ON public.music_releases
 FOR SELECT TO authenticated USING (is_published OR private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins insert music" ON public.music_releases;
CREATE POLICY "Admins insert music" ON public.music_releases
 FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins update music" ON public.music_releases;
CREATE POLICY "Admins update music" ON public.music_releases
 FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins delete music" ON public.music_releases;
CREATE POLICY "Admins delete music" ON public.music_releases
 FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
 VALUES ('music-audio', 'music-audio', false, 104857600, ARRAY['audio/mpeg','audio/mp3','audio/wav','audio/x-wav','audio/mp4','audio/aac'])
 ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
 VALUES ('music-covers', 'music-covers', true, 10485760, ARRAY['image/jpeg','image/png','image/webp'])
 ON CONFLICT (id) DO NOTHING;

-- A published recording can be requested as an expiring signed URL. The underlying bucket remains private.
DROP POLICY IF EXISTS "Visitors sign published music audio" ON storage.objects;
CREATE POLICY "Visitors sign published music audio" ON storage.objects
 FOR SELECT TO anon USING (
   bucket_id = 'music-audio' AND EXISTS (
     SELECT 1 FROM public.music_releases r WHERE r.audio_path = name AND r.is_published
   )
 );
DROP POLICY IF EXISTS "Authenticated sign published music and admins access audio" ON storage.objects;
CREATE POLICY "Authenticated sign published music and admins access audio" ON storage.objects
 FOR SELECT TO authenticated USING (
   bucket_id = 'music-audio' AND (
     EXISTS (SELECT 1 FROM public.music_releases r WHERE r.audio_path = name AND r.is_published)
     OR private.has_role(auth.uid(), 'admin')
   )
 );
DROP POLICY IF EXISTS "Admins upload music audio" ON storage.objects;
CREATE POLICY "Admins upload music audio" ON storage.objects FOR INSERT TO authenticated
 WITH CHECK (bucket_id = 'music-audio' AND private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins replace music audio" ON storage.objects;
CREATE POLICY "Admins replace music audio" ON storage.objects FOR UPDATE TO authenticated
 USING (bucket_id = 'music-audio' AND private.has_role(auth.uid(), 'admin'))
 WITH CHECK (bucket_id = 'music-audio' AND private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins delete music audio" ON storage.objects;
CREATE POLICY "Admins delete music audio" ON storage.objects FOR DELETE TO authenticated
 USING (bucket_id = 'music-audio' AND private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins upload music covers" ON storage.objects;
CREATE POLICY "Admins upload music covers" ON storage.objects FOR INSERT TO authenticated
 WITH CHECK (bucket_id = 'music-covers' AND private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins update music covers" ON storage.objects;
CREATE POLICY "Admins update music covers" ON storage.objects FOR UPDATE TO authenticated
 USING (bucket_id = 'music-covers' AND private.has_role(auth.uid(), 'admin'))
 WITH CHECK (bucket_id = 'music-covers' AND private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins delete music covers" ON storage.objects;
CREATE POLICY "Admins delete music covers" ON storage.objects FOR DELETE TO authenticated
 USING (bucket_id = 'music-covers' AND private.has_role(auth.uid(), 'admin'));
