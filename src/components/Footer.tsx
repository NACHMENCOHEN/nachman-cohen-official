import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.3z" />
  </svg>
);

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
            <motion.a whileHover={{ scale: 1.15, y: -2 }} href="https://www.instagram.com/nachmencohen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram size={22} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.15, y: -2 }} href="https://www.youtube.com/@Nachmen_cohen" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
              <Youtube size={22} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.15, y: -2 }} href="https://www.tiktok.com/@nachman_cohen_music?_r=1&_t=ZN-94co99vL1bK" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="TikTok">
              <TikTokIcon size={20} />
            </motion.a>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-xs text-muted-foreground/60">
              © כל הזכויות שמורות לנחמן כהן
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
