import { useCallback, useEffect, useRef, useState } from "react";
import { Trash2, Upload, Eye, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type StoryRow = {
  id: string;
  media_type: "image" | "video";
  storage_path: string;
  caption: string | null;
  event_title: string | null;
  views_count: number;
  is_active: boolean;
  created_at: string;
  expires_at: string;
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("he-IL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

const remaining = (iso: string) => {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "פג תוקף";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h} שע׳ ${m} דק׳`;
};

const AdminStories = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<StoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("stories")
      .select("id, media_type, storage_path, caption, event_title, views_count, is_active, created_at, expires_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) toast({ title: "שגיאה בטעינה", description: error.message, variant: "destructive" });
    setRows((data ?? []) as StoryRow[]);
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const isVideo = !!file && file.type.startsWith("video/");

  const publish = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || (isVideo ? "mp4" : "jpg");
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("stories").upload(path, file, {
        cacheControl: "3600",
        contentType: file.type || undefined,
      });
      if (upErr) throw upErr;

      const { data: userData } = await supabase.auth.getUser();
      const { error: insErr } = await supabase.from("stories").insert({
        media_type: isVideo ? "video" : "image",
        media_url: path,
        storage_path: path,
        caption: caption.trim() || null,
        event_title: eventTitle.trim() || null,
        created_by: userData.user?.id ?? null,
      });
      if (insErr) throw insErr;

      toast({ title: "הסטורי פורסם", description: "יהיה זמין 24 שעות" });
      setFile(null);
      setCaption("");
      setEventTitle("");
      if (inputRef.current) inputRef.current.value = "";
      load();
    } catch (e) {
      toast({
        title: "שגיאה בפרסום",
        description: e instanceof Error ? e.message : "נסו שוב",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const remove = async (row: StoryRow) => {
    if (!confirm("למחוק את הסטורי?")) return;
    await supabase.storage.from("stories").remove([row.storage_path]);
    const { error } = await supabase.from("stories").delete().eq("id", row.id);
    if (error) {
      toast({ title: "שגיאה במחיקה", description: error.message, variant: "destructive" });
      return;
    }
    setRows((r) => r.filter((x) => x.id !== row.id));
  };

  return (
    <div dir="rtl" className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-foreground">עדכונים חיים</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">
          כל סטורי מתפרסם ל־24 שעות ואז נעלם אוטומטית.
        </p>
      </div>

      {/* Composer */}
      <div className="rounded-2xl border border-border bg-card/40 p-5 space-y-4">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 text-primary py-4 text-base font-body"
        >
          <Upload size={18} />
          הוספת סטורי
        </button>

        {previewUrl && (
          <div className="flex flex-col md:flex-row gap-5">
            <div className="mx-auto w-[200px] aspect-[9/16] rounded-xl overflow-hidden bg-black border border-border shrink-0">
              {isVideo ? (
                <video src={previewUrl} className="w-full h-full object-contain" controls playsInline muted />
              ) : (
                <img src={previewUrl} alt="תצוגה מקדימה" className="w-full h-full object-contain" />
              )}
            </div>
            <div className="flex-1 space-y-3">
              <input
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="שם אירוע (אופציונלי)"
                className="w-full h-12 rounded-xl bg-background border border-border px-4 text-base text-foreground"
              />
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="כיתוב (אופציונלי)"
                rows={3}
                className="w-full rounded-xl bg-background border border-border px-4 py-3 text-base text-foreground"
              />
              <div className="flex gap-3">
                <button
                  onClick={publish}
                  disabled={uploading}
                  className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-body disabled:opacity-60"
                >
                  {uploading ? "מפרסם..." : "פרסם סטורי"}
                </button>
                <button
                  onClick={() => setFile(null)}
                  className="h-12 px-5 rounded-xl border border-border text-muted-foreground"
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* List */}
      {loading ? (
        <p className="text-sm text-muted-foreground">טוען...</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">אין סטוריז עדיין.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => {
            const live = r.is_active && new Date(r.expires_at) > new Date();
            return (
              <div
                key={r.id}
                className="rounded-xl border border-border bg-card/30 p-4 flex flex-wrap items-center gap-4"
              >
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${
                    live ? "border-primary/50 text-primary bg-primary/10" : "border-border text-muted-foreground"
                  }`}
                >
                  {live ? "פעיל" : "פג תוקף"}
                </span>
                <span className="text-sm text-foreground">{r.media_type === "video" ? "וידאו" : "תמונה"}</span>
                <span className="text-sm text-muted-foreground flex-1 min-w-[140px] truncate">
                  {r.event_title || r.caption || "—"}
                </span>
                <span className="text-xs text-muted-foreground">פורסם: {fmt(r.created_at)}</span>
                <span className="text-xs text-muted-foreground">פג: {fmt(r.expires_at)}</span>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Clock size={12} /> {remaining(r.expires_at)}
                </span>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Eye size={12} /> {r.views_count}
                </span>
                <button
                  onClick={() => remove(r)}
                  aria-label="מחק"
                  className="text-destructive/80 hover:text-destructive p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminStories;
