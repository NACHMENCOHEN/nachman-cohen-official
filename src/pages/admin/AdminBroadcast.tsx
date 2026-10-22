import { useEffect, useState } from "react";
import { Send, CheckCircle2, FlaskConical, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LogRow {
  id: string;
  title: string;
  recipients_count: number;
  status: string;
  error_message: string | null;
  sent_at: string;
}

const AdminBroadcast = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [youtube, setYoutube] = useState("");
  const [spotify, setSpotify] = useState("");
  const [appleMusic, setAppleMusic] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telegram, setTelegram] = useState("");
  const [website, setWebsite] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [busy, setBusy] = useState(false);
  const [testBusy, setTestBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogRow[]>([]);

  const DEFAULT_SOCIAL = {
    website: "https://nachmancohen.com",
    youtube: "https://youtube.com/@nachman_cohen",
    instagram: "https://www.instagram.com/nachmencohen",
    tiktok: "https://www.tiktok.com/@nachman_cohen_music",
    spotify: "https://open.spotify.com/artist/3FW9FTp7VhD1x4B9TMN2iF",
    appleMusic: "https://music.apple.com/us/artist/6817063247",
    telegram: "",
  };
  const previewLinks = [
    { label: "Website", url: website.trim() || DEFAULT_SOCIAL.website },
    { label: "YouTube", url: youtube.trim() || DEFAULT_SOCIAL.youtube },
    { label: "Instagram", url: instagram.trim() || DEFAULT_SOCIAL.instagram },
    { label: "TikTok", url: tiktok.trim() || DEFAULT_SOCIAL.tiktok },
    { label: "Spotify", url: spotify.trim() || DEFAULT_SOCIAL.spotify },
    { label: "Apple Music", url: appleMusic.trim() || DEFAULT_SOCIAL.appleMusic },
    { label: "Telegram", url: telegram.trim() || DEFAULT_SOCIAL.telegram },
  ].filter((l) => !!l.url);

  const loadLogs = async () => {
    const { data } = await supabase
      .from("broadcast_logs")
      .select("id, title, recipients_count, status, error_message, sent_at")
      .order("sent_at", { ascending: false })
      .limit(20);
    setLogs((data || []) as LogRow[]);
  };

  useEffect(() => { loadLogs(); }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!title.trim()) {
      setError("כותרת חובה");
      return;
    }
    if (!confirm("לשלוח עדכון לכל הנרשמים הפעילים?")) return;
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-broadcast", {
        body: { title: title.trim(), description: description.trim(), link: link.trim(), buttonText: buttonText.trim(), imageUrl: imageUrl.trim(), youtubeUrl: youtube.trim(), spotifyUrl: spotify.trim(), appleMusicUrl: appleMusic.trim(), instagramUrl: instagram.trim(), telegramUrl: telegram.trim(), websiteUrl: website.trim(), tiktokUrl: tiktok.trim() },
      });
      if (error) throw error;
      const d = data as { sent: number; total: number; errors: number; error?: string };
      if (d?.error) throw new Error(d.error);
      setResult(`נשלח ל-${d.sent} מתוך ${d.total} נרשמים${d.errors ? ` · ${d.errors} כשלים` : ""}`);
      setTitle(""); setDescription(""); setLink(""); setButtonText(""); setImageUrl("");
      setYoutube(""); setSpotify(""); setAppleMusic(""); setInstagram(""); setTelegram(""); setWebsite(""); setTiktok("");
      loadLogs();
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
    }
  };

  const onTest = async () => {
    setError(null);
    setResult(null);
    if (!title.trim()) {
      setError("כותרת חובה גם לבדיקה");
      return;
    }
    setTestBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-broadcast", {
        body: { title: title.trim(), description: description.trim(), link: link.trim(), buttonText: buttonText.trim(), imageUrl: imageUrl.trim(), youtubeUrl: youtube.trim(), spotifyUrl: spotify.trim(), appleMusicUrl: appleMusic.trim(), instagramUrl: instagram.trim(), telegramUrl: telegram.trim(), websiteUrl: website.trim(), tiktokUrl: tiktok.trim(), test: true },
      });
      if (error) throw error;
      const d = data as { sent: number; errors: number; error?: string };
      if (d?.error) throw new Error(d.error);
      setResult(`מייל בדיקה נשלח ל-ncgraphics2023@gmail.com${d.errors ? ` · ${d.errors} כשלים` : ""}`);
      loadLogs();
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setTestBusy(false);
    }
  };

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("broadcast-images").upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("broadcast-images").getPublicUrl(path);
      setImageUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאת העלאה");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div dir="rtl" className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={onSubmit} className="lg:col-span-2 space-y-5 bg-card/30 border border-border rounded-2xl p-6">
        <h1 className="font-display text-2xl text-foreground">שלח עדכון לנרשמים</h1>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">כותרת העדכון</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} required className="w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/60" />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">תיאור קצר</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} rows={5} className="w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/60 resize-y" />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">תמונת קאבר / קישור לתמונה</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." dir="ltr" className="flex-1 bg-background/60 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/60" />
            <label className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary/60 rounded-lg px-4 py-3 cursor-pointer text-sm text-foreground whitespace-nowrap">
              <Upload size={16} />
              {uploading ? "מעלה..." : "העלאת תמונה"}
              <input type="file" accept="image/*" className="hidden" onChange={onUploadImage} disabled={uploading} />
            </label>
          </div>
          {imageUrl && (
            <div className="mt-3">
              <img src={imageUrl} alt="תצוגה מקדימה" className="max-h-48 rounded-lg border border-border" />
            </div>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">קישור להאזנה / צפייה</label>
            <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." dir="ltr" className="w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/60" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">טקסט לכפתור</label>
            <input value={buttonText} onChange={(e) => setButtonText(e.target.value)} maxLength={60} placeholder="להאזנה" className="w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/60" />
          </div>
        </div>
        <div className="border-t border-border pt-5">
          <h3 className="text-sm text-muted-foreground mb-1">קישורי פלטפורמות (אופציונלי)</h3>
          <p className="text-xs text-muted-foreground mb-3">אם תשאיר ריק - ישלחו אוטומטית הקישורים הרשמיים של נחמן כהן.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Website", value: website, set: setWebsite },
              { label: "YouTube", value: youtube, set: setYoutube },
              { label: "Instagram", value: instagram, set: setInstagram },
              { label: "TikTok", value: tiktok, set: setTiktok },
              { label: "Spotify", value: spotify, set: setSpotify },
              { label: "Apple Music", value: appleMusic, set: setAppleMusic },
              { label: "Telegram", value: telegram, set: setTelegram },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs text-muted-foreground mb-2">{f.label}</label>
                <input value={f.value} onChange={(e) => f.set(e.target.value)} placeholder="https://..." dir="ltr" className="w-full bg-background/60 border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary/60 text-sm" />
              </div>
            ))}
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="border border-border rounded-xl p-4 bg-background/40">
          <p className="text-xs text-muted-foreground mb-3">תצוגה מקדימה של שורת הקישורים שתופיע במייל:</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
            {previewLinks.map((l, i) => (
              <span key={l.label} className="flex items-center gap-3">
                <a href={l.url} target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline">{l.label}</a>
                {i < previewLinks.length - 1 && <span className="text-muted-foreground">|</span>}
              </span>
            ))}
          </div>
        </div>
        {result && (
          <div className="flex items-center gap-2 text-primary text-sm">
            <CheckCircle2 size={16} /> {result}
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <button disabled={busy || testBusy} type="submit" className="inline-flex items-center justify-center gap-2 gold-gradient text-primary-foreground font-semibold px-8 py-3 rounded-full disabled:opacity-60">
            <Send size={16} />
            {busy ? "שולח..." : "שלח עדכון לנרשמים"}
          </button>
          <button disabled={busy || testBusy} type="button" onClick={onTest} className="inline-flex items-center justify-center gap-2 border border-primary/60 text-primary font-semibold px-8 py-3 rounded-full disabled:opacity-60">
            <FlaskConical size={16} />
            {testBusy ? "שולח בדיקה..." : "שלח מייל בדיקה"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          השליחה תהיה משם: <span dir="ltr" className="text-foreground">Nachman Cohen Music &lt;updates@nachmancohen.com&gt;</span> · תגובות יישלחו ל־<span dir="ltr" className="text-foreground">ncgraphics2023@gmail.com</span>
        </p>
      </form>

      <div className="bg-card/30 border border-border rounded-2xl p-6">
        <h2 className="font-display text-xl text-foreground mb-4">שליחות אחרונות</h2>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {logs.length === 0 && <p className="text-sm text-muted-foreground">אין עדיין שליחות</p>}
          {logs.map((l) => (
            <div key={l.id} className="border border-border rounded-lg p-3 text-sm">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-medium text-foreground truncate">{l.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${l.status === "sent" ? "bg-primary/15 text-primary" : l.status === "partial" ? "bg-yellow-500/15 text-yellow-500" : "bg-destructive/15 text-destructive"}`}>
                  {l.status === "sent" ? "נשלח" : l.status === "partial" ? "חלקי" : "נכשל"}
                </span>
              </div>
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>{l.recipients_count} נמענים</span>
                <span>{new Date(l.sent_at).toLocaleString("he-IL")}</span>
              </div>
              {l.error_message && <p className="text-xs text-destructive mt-1 truncate" title={l.error_message}>{l.error_message}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBroadcast;