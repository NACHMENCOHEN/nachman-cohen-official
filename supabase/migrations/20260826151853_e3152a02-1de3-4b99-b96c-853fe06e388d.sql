CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
REVOKE EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

DROP POLICY IF EXISTS "Admins can view broadcast logs" ON public.broadcast_logs;
CREATE POLICY "Admins can view broadcast logs" ON public.broadcast_logs FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete subscribers" ON public.subscribers;
CREATE POLICY "Admins can delete subscribers" ON public.subscribers FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can update subscribers" ON public.subscribers;
CREATE POLICY "Admins can update subscribers" ON public.subscribers FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins can view subscribers" ON public.subscribers;
CREATE POLICY "Admins can view subscribers" ON public.subscribers FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins upload broadcast images" ON storage.objects;
CREATE POLICY "Admins upload broadcast images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'broadcast-images' AND private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins update broadcast images" ON storage.objects;
CREATE POLICY "Admins update broadcast images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'broadcast-images' AND private.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins delete broadcast images" ON storage.objects;
CREATE POLICY "Admins delete broadcast images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'broadcast-images' AND private.has_role(auth.uid(), 'admin'));

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

REVOKE EXECUTE ON FUNCTION public.assign_admin_on_signup() FROM PUBLIC, anon, authenticated;