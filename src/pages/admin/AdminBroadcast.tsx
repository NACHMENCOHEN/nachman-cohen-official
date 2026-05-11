import { useEffect, useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
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
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogRow[]>([]);

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
        body: { title: title.trim(), description: description.trim(), link: link.trim(), buttonText: buttonText.trim() },
      });
      if (error) throw error;
      const d = data as { sent: number; total: number; errors: number; error?: string };
      if (d?.error) throw new Error(d.error);
      setResult(`נשלח ל-${d.sent} מתוך ${d.total} נרשמים${d.errors ? ` · ${d.errors} כשלים` : ""}`);
      setTitle(""); setDescription(""); setLink(""); setButtonText("");
      loadLogs();
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה");
    } finally {
      setBusy(false);
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
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">קישור</label>
            <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..." dir="ltr" className="w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/60" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">טקסט לכפתור</label>
            <input value={buttonText} onChange={(e) => setButtonText(e.target.value)} maxLength={60} placeholder="להאזנה" className="w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/60" />
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {result && (
          <div className="flex items-center gap-2 text-primary text-sm">
            <CheckCircle2 size={16} /> {result}
          </div>
        )}
        <button disabled={busy} type="submit" className="inline-flex items-center justify-center gap-2 gold-gradient text-primary-foreground font-semibold px-8 py-3 rounded-full disabled:opacity-60">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {busy ? "שולח..." : "שלח עדכון לנרשמים"}
        </button>
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