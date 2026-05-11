import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

const UnsubscribePage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      if (!token) {
        setState("error");
        setMessage("חסר קישור הסרה תקין");
        return;
      }
      try {
        const { data, error } = await supabase.functions.invoke("unsubscribe-newsletter", { body: { token } });
        if (error) throw error;
        if ((data as any)?.error) throw new Error((data as any).error);
        setState("ok");
      } catch (e) {
        setState("error");
        setMessage(e instanceof Error ? e.message : "שגיאה");
      }
    })();
  }, [token]);

  return (
    <PageTransition>
      <SEO title="הסרה מרשימת התפוצה | נחמן כהן" description="הסרה מרשימת התפוצה של נחמן כהן" />
      <section dir="rtl" className="min-h-[70vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center bg-card/40 border border-border rounded-2xl p-10">
          {state === "loading" && (
            <>
              <Loader2 className="animate-spin mx-auto text-primary mb-4" size={36} />
              <p className="font-body text-muted-foreground">מבצעים הסרה...</p>
            </>
          )}
          {state === "ok" && (
            <>
              <CheckCircle2 className="mx-auto text-primary mb-4" size={40} />
              <h1 className="font-display text-2xl md:text-3xl text-foreground mb-3">הוסרתם בהצלחה</h1>
              <p className="font-body text-muted-foreground mb-6">לא תקבלו עוד עדכונים במייל. תודה שהייתם איתנו.</p>
              <Link to="/" className="inline-block font-body text-sm px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all">לעמוד הבית</Link>
            </>
          )}
          {state === "error" && (
            <>
              <AlertCircle className="mx-auto text-destructive mb-4" size={40} />
              <h1 className="font-display text-2xl text-foreground mb-3">לא הצלחנו לבצע את ההסרה</h1>
              <p className="font-body text-muted-foreground mb-6">{message}</p>
              <Link to="/" className="inline-block font-body text-sm px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all">לעמוד הבית</Link>
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default UnsubscribePage;