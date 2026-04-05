import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";
import { useState } from "react";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.3z" />
  </svg>
);

const socials = [
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/nachmencohen" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@Nachmen_cohen" },
  { name: "TikTok", icon: TikTokIcon, url: "https://www.tiktok.com/@nachman_cohen_music?_r=1&_t=ZN-94co99vL1bK" },
];

const FloatingSocial = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {socials.map((s, i) => (
        <motion.a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.1 }}
          onMouseEnter={() => setHovered(s.name)}
          onMouseLeave={() => setHovered(null)}
          whileHover={{ scale: 1.15 }}
          className="relative w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
          aria-label={s.name}
        >
          <s.icon size={18} />
          {hovered === s.name && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-12 bg-card border border-border px-3 py-1 rounded-md text-xs font-body text-foreground whitespace-nowrap"
            >
              {s.name}
            </motion.span>
          )}
        </motion.a>
      ))}
    </div>
  );
};

export default FloatingSocial;
