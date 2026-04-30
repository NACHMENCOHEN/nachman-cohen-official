import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { socialLinks } from "./social-icons";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const footerLinks = [
  { to: "/", label: "דף הבית" },
  { to: "/music", label: "מוזיקה" },
  { to: "/videos", label: "וידאו" },
  { to: "/about", label: "אודות" },
  { to: "/contact", label: "יצירת קשר" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-16 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center"
        >
          <Link to="/" className="inline-block font-display text-3xl font-bold gold-text mb-2">
            נחמן כהן
          </Link>
          <p className="text-sm text-muted-foreground mb-8">האתר הרשמי</p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-5 mb-8">
            {socialLinks.map((s) => (
              <motion.a
                key={s.name}
                whileHover={{ scale: 1.15, y: -2 }}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground ${s.hoverColorClass} transition-colors`}
                aria-label={s.name}
              >
                <s.Icon size={22} />
              </motion.a>
            ))}
          </div>

          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground/60 order-2 md:order-1">
              © כל הזכויות שמורות לנחמן כהן
            </p>
            <p className="text-xs text-muted-foreground/60 order-1 md:order-2 flex items-center gap-1.5">
              <span>Website designed by</span>
              <a
                href="https://www.instagram.com/ncgraphics.design?igsh=MXhzNWJzcTUycGdheA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                NC Graphics
              </a>
              <a
                href="https://www.instagram.com/ncgraphics.design?igsh=MXhzNWJzcTUycGdheA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NC Graphics Instagram"
                className="hover:text-primary transition-colors inline-flex"
              >
                <Instagram size={13} />
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
