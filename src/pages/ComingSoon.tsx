import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";

const ComingSoon = () => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img
      src={heroImg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl brightness-[0.3]"
    />
    <img
      src={heroImg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
    />
    <div className="absolute inset-0 bg-black/50" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 text-center px-6"
    >
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-4">
        Coming Soon
      </h1>
      <p className="font-body text-lg md:text-xl text-white/70 mb-2 tracking-widest uppercase">
        Official Website
      </p>
      <p className="font-body text-sm text-white/50 mb-12">
        Nachman Cohen – Hasidic Singer
      </p>

      <div className="flex items-center justify-center gap-6">
        <a
          href="https://www.instagram.com/nachmencohen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Instagram"
        >
          <Instagram size={24} />
        </a>
        <a
          href="https://www.youtube.com/@Nachmen_cohen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors"
          aria-label="YouTube"
        >
          <Youtube size={24} />
        </a>
      </div>
    </motion.div>
  </div>
);

export default ComingSoon;
