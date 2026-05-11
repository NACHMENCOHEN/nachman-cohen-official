import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const applySession = (s: Session | null) => {
      if (cancelled) return;
      const newId = s?.user.id ?? null;
      // Only update state when the user actually changes, to avoid re-render loops on token refresh
      if (newId === lastUserIdRef.current && session !== null === (s !== null)) {
        return;
      }
      lastUserIdRef.current = newId;
      setSession(s);
      if (!newId) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setLoading(true);
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", newId)
        .eq("role", "admin")
        .maybeSingle()
        .then(({ data }) => {
          if (cancelled) return;
          setIsAdmin(!!data);
          setLoading(false);
        });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => applySession(s));
    supabase.auth.getSession().then(({ data }) => applySession(data.session));

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { session, isAdmin, loading };
}
