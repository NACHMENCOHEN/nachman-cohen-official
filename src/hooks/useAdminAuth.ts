import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!cancelled) setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setSession(data.session);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    let cancelled = false;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setIsAdmin(!!data);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [userId]);

  return { session, isAdmin, loading };
}