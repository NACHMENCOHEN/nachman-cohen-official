import { useEffect, useState } from "react";
import { releases, type Release } from "@/data/releases";
import { supabase } from "@/integrations/supabase/client";

type MusicReleaseRow = {
  slug: string;
  title: string;
  title_en: string;
  audio_path: string;
  cover_path: string;
  youtube_id: string | null;
  release_date: string | null;
};

export function usePublishedMusic() {
  const [tracks, setTracks] = useState<Release[]>(releases);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const { data, error } = await supabase.from("music_releases")
          .select("slug,title,title_en,audio_path,cover_path,youtube_id,release_date")
          .eq("is_published", true)
          .order("release_date", { ascending: false });
        if (error) throw error;

        const live = await Promise.all(((data ?? []) as MusicReleaseRow[]).map(async (r): Promise<Release | null> => {
          const { data: signed, error: signingError } = await supabase.storage
            .from("music-audio").createSignedUrl(r.audio_path, 60 * 60);
          if (signingError || !signed?.signedUrl) return null;
          const { data: cover } = supabase.storage.from("music-covers").getPublicUrl(r.cover_path);
          return {
            slug: r.slug, title: r.title, titleEn: r.title_en,
            audioSrc: signed.signedUrl,
            cover: cover.publicUrl, downloadable: false,
            youtubeId: r.youtube_id ?? undefined,
            releaseDate: r.release_date ?? undefined,
            isNew: true,
            description: "לעכטיגע שבת – שיר חדש בביצוע ובלחן של נחמן כהן.",
          } as Release;
        }));
        const valid = live.filter((r): r is Release => r !== null);
        if (alive) setTracks([
          ...valid,
          ...releases.filter(r => !valid.some(v => v.slug === r.slug)).map(r => valid.length ? { ...r, isNew: false } : r),
        ]);
      } catch (e) {
        console.error("Unable to load published music", e);
      } finally {
        if (alive) setLoading(false);
      }
    };
    void load();
    return () => { alive = false; };
  }, []);

  return { tracks, loading };
}
