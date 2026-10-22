import { useCallback, useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type StoredRelease = { id: string; title: string; slug: string; is_published: boolean; audio_path: string; cover_path: string };

const AdminMusic = () => {
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [rows, setRows] = useState<StoredRelease[]>([]);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!isAdmin) return;
    const { data, error: e } = await supabase.from("music_releases")
      .select("id,title,slug,is_published,audio_path,cover_path").order("created_at", { ascending: false });
    if (e) setError(e.message);
    else setRows(data ?? []);
  }, [isAdmin]);

  useEffect(() => { void refresh(); }, [refresh]);

  const onUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!audio || !cover || !isAdmin) return;
    setSaving(true); setError(""); setStatus("מעלה את קובץ השיר לאחסון פרטי...");
    const name = "lachtige-shabbos";
    const unique = crypto.randomUUID();
    const audioType = audio.type === "audio/wav" || audio.type === "audio/x-wav" ? "audio/wav" : "audio/mpeg";
    const audioExt = audioType === "audio/wav" ? "wav" : "mp3";
    const coverType = cover.type === "image/png" ? "image/png" : cover.type === "image/webp" ? "image/webp" : "image/jpeg";
    const coverExt = coverType === "image/png" ? "png" : coverType === "image/webp" ? "webp" : "jpg";
    const audioPath = `${name}/${unique}.${audioExt}`;
    const coverPath = `${name}/${unique}.${coverExt}`;
    let audioUploaded = false;
    let coverUploaded = false;
    try {
      if (!["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav"].includes(audio.type)) {
        throw Error("יש לבחור קובץ MP3 או WAV תקין.");
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(cover.type)) {
        throw Error("יש לבחור עטיפת JPG, PNG או WebP.");
      }
      if (audio.size > 100 * 1024 * 1024) throw Error("קובץ האודיו גדול מ-100MB.");
      if (cover.size > 10 * 1024 * 1024) throw Error("קובץ העטיפה גדול מ-10MB.");

      const a = await supabase.storage.from("music-audio").upload(audioPath, audio, { contentType: audioType, upsert: false });
      if (a.error) throw a.error;
      audioUploaded = true;
      setStatus("מעלה את תמונת העטיפה...");
      const c = await supabase.storage.from("music-covers").upload(coverPath, cover, { contentType: coverType, upsert: false });
      if (c.error) throw c.error;
      coverUploaded = true;
      setStatus("שומר את פרטי השיר...");
      const { error: dbError } = await supabase.from("music_releases").upsert({
        slug: name,
        title: "לעכטיגע שבת",
        title_en: "Lachtige Shabbos",
        audio_path: audioPath,
        cover_path: coverPath,
        youtube_id: "8okNDLOM3mo",
        release_date: "2026-10-22",
        is_published: published,
      }, { onConflict: "slug" });
      if (dbError) throw dbError;
      setAudio(null); setCover(null); setStatus(published ? "השיר הועלה ופורסם בהצלחה!" : "השיר נשמר כטיוטה.");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "אירעה שגיאה בהעלאה.");
      setStatus("");
      // Clean up files from failed uploads. Existing released files are not deleted on replacement.
      if (coverUploaded) await supabase.storage.from("music-covers").remove([coverPath]);
      if (audioUploaded) await supabase.storage.from("music-audio").remove([audioPath]);
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (r: StoredRelease) => {
    setError("");
    const { error: e } = await supabase.from("music_releases").update({ is_published: !r.is_published }).eq("id", r.id);
    if (e) setError(e.message); else await refresh();
  };

  if (authLoading) return <p>טוען הרשאות...</p>;
  if (!isAdmin) return <p>אין הרשאת מנהל.</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-display text-3xl text-foreground">העלאת שיר חדש</h1>
      <p className="text-sm text-muted-foreground">״לעכטיגע שבת״ יישמר באחסון אודיו פרטי, ויופיע באתר רק אחרי העלאה מלאה ופרסום.</p>
      <form onSubmit={onUpload} className="space-y-5 rounded-xl bg-card p-6 border border-border">
        <div className="space-y-2">
          <label htmlFor="track-audio" className="block font-medium">קובץ שמע (MP3 או WAV)</label>
          <input id="track-audio" type="file" accept=".mp3,.wav,audio/mpeg,audio/wav" required onChange={e => setAudio(e.target.files?.[0] ?? null)}
            className="block w-full text-sm" />
          {audio && <p className="text-xs text-muted-foreground">{audio.name} · {(audio.size / 1024 / 1024).toFixed(1)}MB</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="track-cover" className="block font-medium">עטיפת השיר</label>
          <input id="track-cover" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" required onChange={e => setCover(e.target.files?.[0] ?? null)}
            className="block w-full text-sm" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
          לפרסם באתר מיד אחרי העלאה מוצלחת
        </label>
        <button type="submit" disabled={saving || !audio || !cover}
          className="rounded-lg px-5 py-3 bg-primary text-primary-foreground font-medium disabled:opacity-50">
          {saving ? "מעלה קבצים..." : "העלה שיר ועטיפה"}
        </button>
        {status && <p role="status" className="text-sm text-primary">{status}</p>}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </form>

      <section className="space-y-3">
        <h2 className="font-display text-2xl">שירים שהועלו</h2>
        {rows.map(r => <div key={r.id} className="flex gap-3 justify-between items-center border border-border rounded-lg p-4">
          <div><div className="font-medium">{r.title}</div><div className="text-xs text-muted-foreground">{r.is_published ? "מפורסם" : "טיוטה"}</div></div>
          <button onClick={() => void togglePublished(r)} className="text-sm border border-primary/50 rounded-lg p-2">
            {r.is_published ? "הסתר מהאתר" : "פרסם עכשיו"}
          </button>
        </div>)}
      </section>
      <p className="text-xs text-muted-foreground">הערה: אין כפתור הורדת MP3 או קישור קבוע לקובץ השמע, אך אין אפשרות טכנית למנוע לחלוטין העתקת אודיו שמושמע בדפדפן.</p>
    </div>
  );
};

export default AdminMusic;
