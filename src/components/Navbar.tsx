import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { socialLinks } from "./social-icons";

const navLinks = [
  { to: "/", label: "דף הבית" },
  { to: "/music", label: "מוזיקה" },
  { to: "/videos", label: "וידאו" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "יצירת קשר" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel rounded-none border-x-0 border-t-0">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl font-bold gold-text tracking-tight">
          נחמן כהן
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative font-body text-sm transition-colors duration-300 ${
                location.pathname === link.to
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </Link>
          ))}

          <div className="flex items-center gap-4 border-e border-border pe-4">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground ${s.hoverColorClass} transition-colors`}
                aria-label={s.name}
              >
                <s.Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label="תפריט"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-card border-t border-border"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`font-body text-sm py-3 transition-colors ${
                    location.pathname === link.to
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-5 pt-3 border-t border-border mt-2 flex-wrap">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground ${s.hoverColorClass} transition-colors`}
                    aria-label={s.name}
                  >
                    <s.Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
