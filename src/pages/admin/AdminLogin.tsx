import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session && isAdmin) navigate("/admin/subscribers", { replace: true });
  }, [session, isAdmin, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setError("פרטי התחברות שגויים");
  };

  return (
    <PageTransition>
      <SEO title="כניסת מנהל | נחמן כהן" description="כניסת מנהל" />
      <section dir="rtl" className="min-h-[70vh] flex items-center justify-center px-6 py-20">
        <form onSubmit={onSubmit} className="w-full max-w-md bg-card/40 border border-border rounded-2xl p-8 space-y-5 text-right">
          <h1 className="font-display text-3xl text-foreground text-center">כניסת מנהל</h1>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">אימייל</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" className="w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/60" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2">סיסמה</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} dir="ltr" className="w-full bg-background/60 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/60" />
          </div>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          {session && !isAdmin && !loading && (
            <p className="text-sm text-destructive text-center">המשתמש המחובר אינו מנהל</p>
          )}
          <button disabled={busy} type="submit" className="w-full inline-flex items-center justify-center gap-2 gold-gradient text-primary-foreground font-semibold px-6 py-3 rounded-full disabled:opacity-60">
            {busy ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            התחברות
          </button>
        </form>
      </section>
    </PageTransition>
  );
};

export default AdminLogin;