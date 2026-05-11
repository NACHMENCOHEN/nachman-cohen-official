ALTER TABLE public.broadcast_logs ADD COLUMN IF NOT EXISTS image_url text;

INSERT INTO storage.buckets (id, name, public) VALUES ('broadcast-images', 'broadcast-images', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read broadcast images" ON storage.objects FOR SELECT USING (bucket_id = 'broadcast-images');
CREATE POLICY "Admins upload broadcast images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'broadcast-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update broadcast images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'broadcast-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete broadcast images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'broadcast-images' AND public.has_role(auth.uid(), 'admin'));