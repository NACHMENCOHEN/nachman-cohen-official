import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { LogOut, Radio, Music } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminLayout = () => {
  const { session, isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (loading) return;
    if ((!session || !isAdmin) && !redirectedRef.current) {
      redirectedRef.current = true;
      navigate("/admin/login", { replace: true });
    }
  }, [session, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        טוען...
      </div>
    );
  }
  if (!session || !isAdmin) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center text-muted-foreground text-sm">
        מעביר להתחברות...
      </div>
    );
  }

  const links = [
    { to: "/admin/stories", label: "עדכונים חיים", icon: Radio },
    { to: "/admin/music", label: "העלאת שירים", icon: Music },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-6 py-4 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-display text-lg text-foreground">ניהול</span>
            <nav className="flex items-center gap-2">
              {links.map((l) => {
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border ${
                      active
                        ? "bg-primary/10 border-primary/50 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <l.icon size={14} />
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/admin/login", { replace: true });
            }}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border text-muted-foreground"
          >
            <LogOut size={14} /> יציאה
          </button>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
