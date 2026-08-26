CREATE TABLE public.stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_type text NOT NULL CHECK (media_type IN ('image','video')),
  media_url text NOT NULL,
  storage_path text NOT NULL,
  caption text,
  event_title text,
  duration_ms integer NOT NULL DEFAULT 6000,
  views_count integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '24 hours'),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

GRANT SELECT ON public.stories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.stories TO authenticated;
GRANT ALL ON public.stories TO service_role;

ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active non-expired stories"
ON public.stories FOR SELECT TO anon, authenticated
USING (is_active = true AND expires_at > now());

CREATE POLICY "Admins can view all stories"
ON public.stories FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert stories"
ON public.stories FOR INSERT TO authenticated
WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update stories"
ON public.stories FOR UPDATE TO authenticated
USING (private.has_role(auth.uid(), 'admin'))
WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete stories"
ON public.stories FOR DELETE TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_stories_active ON public.stories (is_active, expires_at DESC);

-- keep expires_at consistent at 24h after creation
CREATE OR REPLACE FUNCTION public.set_story_expiry()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.expires_at := COALESCE(NEW.created_at, now()) + interval '24 hours';
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.set_story_expiry() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER stories_set_expiry
BEFORE INSERT ON public.stories
FOR EACH ROW EXECUTE FUNCTION public.set_story_expiry();

-- storage policies (private bucket "stories")
CREATE POLICY "Admins upload story media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'stories' AND private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins read story media"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'stories' AND private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update story media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'stories' AND private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete story media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'stories' AND private.has_role(auth.uid(), 'admin'));