import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LogOut, Users, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Loader2 } from "lucide-react";

const AdminLayout = () => {
  const { session, isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!session || !isAdmin)) navigate("/admin/login", { replace: true });
  }, [session, isAdmin, loading, navigate]);

  if (loading || !session || !isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={28} />
      </div>
    );
  }

  const links = [
    { to: "/admin/subscribers", label: "נרשמים", icon: Users },
    { to: "/admin/broadcast", label: "שלח עדכון", icon: Send },
  ];

  return (
    <div dir="rtl" className="min-h-screen">
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
                    className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border transition-colors ${
                      active
                        ? "bg-primary/10 border-primary/50 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
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
              navigate("/admin/login");
            }}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground"
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