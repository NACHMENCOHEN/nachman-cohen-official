import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import SEO from "@/components/SEO";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session && isAdmin) {
      navigate("/admin/broadcast", { replace: true });
    }
  }, [session, isAdmin, loading, navigate]);

  const switchMode = (next: "signin" | "signup") => {
    if (next === mode) return;
    setMode(next);
    setError(null);
    setInfo(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) setError("פרטי התחברות שגויים");
      } else {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/broadcast` },
        });
        if (error) setError(error.message);
        else setInfo("החשבון נוצר. מתחברים...");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <SEO title="כניסת מנהל | נחמן כהן" description="כניסת מנהל" />
      <main
        dir="rtl"
        className="min-h-[100svh] w-full flex items-start sm:items-center justify-center bg-background px-4 py-10 sm:py-16 overflow-y-auto"
      >
        <div className="w-full max-w-md">
          <form
            onSubmit={onSubmit}
            className="w-full bg-card/40 border border-border rounded-2xl p-6 sm:p-8 space-y-5 text-right shadow-xl"
          >
            <h1 className="font-display text-2xl sm:text-3xl text-foreground text-center">
              כניסת מנהל
            </h1>

            <div className="grid grid-cols-2 gap-2 bg-background/60 border border-border rounded-full p-1">
              <button
                type="button"
                onClick={() => switchMode("signin")}
                className={`py-2 rounded-full text-sm font-medium transition-colors ${
                  mode === "signin"
                    ? "gold-gradient text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                התחברות
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`py-2 rounded-full text-sm font-medium transition-colors ${
                  mode === "signup"
                    ? "gold-gradient text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                יצירת חשבון
              </button>
            </div>

            <div>
              <label htmlFor="admin-email" className="block text-sm text-muted-foreground mb-2">
                אימייל
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="ltr"
                className="w-full bg-background/60 border border-border rounded-lg px-4 h-12 text-base text-foreground focus:outline-none focus:border-primary/60"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm text-muted-foreground mb-2">
                סיסמה
              </label>
              <input
                id="admin-password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="ltr"
                className="w-full bg-background/60 border border-border rounded-lg px-4 h-12 text-base text-foreground focus:outline-none focus:border-primary/60"
              />
            </div>

            <div className="min-h-[20px]">
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
              {info && <p className="text-sm text-primary text-center">{info}</p>}
              {session && !isAdmin && !loading && !error && !info && (
                <p className="text-sm text-destructive text-center">המשתמש המחובר אינו מנהל</p>
              )}
            </div>

            <button
              disabled={busy}
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 gold-gradient text-primary-foreground font-semibold px-6 h-12 rounded-full disabled:opacity-60"
            >
              {busy ? (
                <Loader2 size={16} className="animate-spin" />
              ) : mode === "signin" ? (
                <LogIn size={16} />
              ) : (
                <UserPlus size={16} />
              )}
              {mode === "signin" ? "התחברות" : "יצירת חשבון"}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              {mode === "signin" ? "אין לכם חשבון? " : "יש לכם חשבון? "}
              <button
                type="button"
                onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                className="text-primary hover:underline"
              >
                {mode === "signin" ? "צרו חשבון" : "התחברו"}
              </button>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default AdminLogin;