import { motion } from "framer-motion";
import { Instagram, Youtube, Music2, Heart } from "lucide-react";

const socials = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/nachmencohen",
    color: "from-pink-500 to-purple-600",
    desc: "Behind the scenes & updates",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@Nachmen_cohen",
    color: "from-red-500 to-red-700",
    desc: "Music videos & performances",
  },
  {
    name: "TikTok",
    icon: Heart,
    url: "https://www.tiktok.com/@nachman_cohen_music?_r=1&_t=ZN-94co99vL1bK",
    color: "from-foreground to-muted-foreground",
    desc: "Short clips & moments",
  },
];

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const SocialSection = () => (
  <section className="py-24 md:py-32 border-t border-border">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-center mb-16"
      >
        <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest uppercase">Follow</p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">Stay Connected</h2>
      </motion.div>

      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {socials.map((s, i) => (
          <motion.a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.08 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center py-8 px-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <s.icon size={24} className="text-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="font-body font-medium text-sm text-foreground mb-1">{s.name}</span>
            <span className="font-body text-xs text-muted-foreground text-center">{s.desc}</span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default SocialSection;