import { motion } from "framer-motion";
import { Instagram, Youtube, Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spring, delay: i * 0.1 },
  }),
};

const SocialSection = () => {
  const { t } = useLanguage();

  const socials = [
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/nachmencohen", desc: t.social.instagram },
    { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@Nachmen_cohen", desc: t.social.youtube },
    { name: "TikTok", icon: Heart, url: "https://www.tiktok.com/@nachman_cohen_music?_r=1&_t=ZN-94co99vL1bK", desc: t.social.tiktok },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
            className="font-body text-xs font-medium text-primary mb-3 tracking-widest uppercase"
          >
            {t.social.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl text-foreground"
          >
            {t.social.title}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap justify-center gap-4"
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={cardVariants}
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center py-8 px-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group w-[160px]"
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
              >
                <s.icon size={24} className="text-foreground group-hover:text-primary transition-colors" />
              </motion.div>
              <span className="font-body font-medium text-sm text-foreground mb-1">{s.name}</span>
              <span className="font-body text-xs text-muted-foreground text-center">{s.desc}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialSection;
