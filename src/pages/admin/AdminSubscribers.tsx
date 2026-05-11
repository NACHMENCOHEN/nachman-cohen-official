import { useEffect, useMemo, useState } from "react";
import { Search, Trash2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Subscriber {
  id: string;
  name: string;
  email: string;
  status: string;
  subscribed_at: string;
}

const AdminSubscribers = () => {
  const [rows, setRows] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "unsubscribed">("all");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("subscribers")
      .select("id, name, email, status, subscribed_at")
      .order("subscribed_at", { ascending: false });
    setRows((data || []) as Subscriber[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!ql) return true;
      return r.name.toLowerCase().includes(ql) || r.email.toLowerCase().includes(ql);
    });
  }, [rows, q, statusFilter]);

  const remove = async (id: string) => {
    if (!confirm("למחוק נרשם?")) return;
    await supabase.from("subscribers").delete().eq("id", id);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const exportCsv = () => {
    const header = "name,email,status,subscribed_at\n";
    const body = filtered
      .map((r) => [r.name, r.email, r.status, r.subscribed_at].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + header + body], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const counts = useMemo(() => ({
    total: rows.length,
    active: rows.filter((r) => r.status === "active").length,
    unsub: rows.filter((r) => r.status === "unsubscribed").length,
  }), [rows]);

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-foreground">נרשמים</h1>
          <p className="text-sm text-muted-foreground mt-1">סה"כ {counts.total} · פעילים {counts.active} · הוסרו {counts.unsub}</p>
        </div>
        <button onClick={exportCsv} className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10">
          <Download size={14} /> ייצוא CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חיפוש לפי שם או אימייל"
            className="w-full bg-card/40 border border-border rounded-full pr-10 pl-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/60"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="bg-card/40 border border-border rounded-full px-4 py-2.5 text-sm text-foreground focus:outline-none"
        >
          <option value="all">כל הסטטוסים</option>
          <option value="active">פעיל</option>
          <option value="unsubscribed">הוסר</option>
        </select>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden bg-card/30">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground text-sm">טוען...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground text-sm">אין נרשמים להצגה</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-background/40 text-muted-foreground">
                <tr>
                  <th className="text-right px-4 py-3 font-medium">שם</th>
                  <th className="text-right px-4 py-3 font-medium">אימייל</th>
                  <th className="text-right px-4 py-3 font-medium">סטטוס</th>
                  <th className="text-right px-4 py-3 font-medium">תאריך הרשמה</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-4 py-3 text-foreground">{r.name}</td>
                    <td className="px-4 py-3 text-foreground" dir="ltr">{r.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs px-2.5 py-1 rounded-full ${r.status === "active" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {r.status === "active" ? "פעיל" : "הוסר"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(r.subscribed_at).toLocaleDateString("he-IL")}</td>
                    <td className="px-4 py-3 text-left">
                      <button onClick={() => remove(r.id)} className="text-destructive hover:opacity-80" aria-label="מחק">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubscribers;