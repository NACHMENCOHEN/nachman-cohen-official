import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Story = {
  id: string;
  media_type: "image" | "video";
  media_url: string;
  caption: string | null;
  event_title: string | null;
  duration_ms: number;
  created_at: string;
  expires_at: string;
};

const SEEN_KEY = "nc-stories-seen";

export function readSeen(): string[] {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function markSeen(id: string) {
  try {
    const seen = readSeen();
    if (!seen.includes(id)) {
      localStorage.setItem(SEEN_KEY, JSON.stringify([...seen, id].slice(-200)));
    }
  } catch {
    /* ignore */
  }
}

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [seen, setSeen] = useState<string[]>(() => readSeen());

  useEffect(() => {
    let cancelled = false;
    supabase.functions
      .invoke("get-stories")
      .then(({ data }) => {
        if (cancelled) return;
        setStories(((data as { stories?: Story[] } | null)?.stories ?? []) as Story[]);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const refreshSeen = useCallback(() => setSeen(readSeen()), []);

  const hasUnseen = stories.some((s) => !seen.includes(s.id));

  return { stories, loading, hasUnseen, refreshSeen };
}

export function timeAgoHe(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.floor(diff / 60000));
  if (mins < 60) return `לפני ${mins} דק׳`;
  const hours = Math.floor(mins / 60);
  return `לפני ${hours} שע׳`;
}
