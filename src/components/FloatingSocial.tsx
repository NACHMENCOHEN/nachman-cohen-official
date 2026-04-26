import { motion } from "framer-motion";
import { useState } from "react";
import { socialLinks } from "./social-icons";

const FloatingSocial = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {socialLinks.map((s, i) => (
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
          className={`relative w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground ${s.hoverColorClass} hover:border-primary/30 transition-all`}
          aria-label={s.name}
        >
          <s.Icon size={18} />
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
