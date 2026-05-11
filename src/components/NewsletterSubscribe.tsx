import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSubscribe = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("נא למלא שם וכתובת אימייל");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { name: name.trim(), email: email.trim() },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setSuccess(true);
      setName("");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "אירעה שגיאה, נסו שוב");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="subscribe" dir="rtl" className="py-20 md:py-28 border-t border-border relative overflow-hidden scroll-mt-24 md:scroll-mt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-primary/40 bg-primary/5 mb-5">
            <Mail className="text-primary" size={22} />
          </div>
          <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest">עדכונים</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">קבלו עדכונים ראשונים</h2>
          <p className="font-body text-muted-foreground mb-10 leading-relaxed">
            הירשמו וקבלו עדכון במייל בכל פעם שעולה שיר חדש, קליפ חדש או ביצוע מיוחד של נחמן כהן.
          </p>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 p-8 rounded-2xl border border-primary/40 bg-primary/5"
            >
              <CheckCircle2 className="text-primary" size={36} />
              <p className="font-display text-xl text-foreground">תודה שנרשמתם!</p>
              <p className="text-muted-foreground text-sm">נעדכן אתכם במייל כשיעלה תוכן חדש.</p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 text-right">
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-body">שם מלא</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={120}
                  dir="rtl"
                  className="w-full bg-background/60 border border-border rounded-full px-5 py-3 font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors"
                  placeholder="השם שלכם"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-body">כתובת אימייל</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={254}
                  dir="ltr"
                  className="w-full bg-background/60 border border-border rounded-full px-5 py-3 font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors text-left"
                  placeholder="name@example.com"
                />
              </div>

              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full inline-flex items-center justify-center gap-2 gold-gradient text-primary-foreground font-body font-semibold text-sm px-8 py-4 rounded-full shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                {loading ? "שולח..." : "הרשמה לעדכונים"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;