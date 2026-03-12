import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Music, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";
import HomeMusicPlayer from "@/components/HomeMusicPlayer";
import LivePerformances from "@/components/LivePerformances";
import AboutPreview from "@/components/AboutPreview";
import BookingSection from "@/components/BookingSection";
import SocialSection from "@/components/SocialSection";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const featuredTracks = [
  { title: "רפואה", titleEn: "Refua", audioSrc: "/music/refua.m4a" },
  { title: "למעלה", titleEn: "Lemala", audioSrc: "/music/lemala.mp3" },
  { title: "תפילין", titleEn: "Tefillin (Cover)", audioSrc: "/music/tefillin.mp3" },
  { title: "למצוא חן", titleEn: "Limtzo Chen", audioSrc: "/music/limtzo-chen.mp3" },
  { title: "מיין טייערע לעכטעלע", titleEn: "Mein Taiere Lechtele", audioSrc: "/music/mein-taiere-lechtele.mp3" },
];

const Index = () => {
  return (
    <div>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
        {/* Blurred backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top scale-110 blur-2xl brightness-[0.35]"
          />
        </div>

        {/* Main portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, duration: 1.2, delay: 0.1 }}
          className="absolute inset-0 z-[1] flex items-start justify-center"
        >
          <img
            src={heroImg}
            alt="Nachman Cohen"
            className="h-full object-contain"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 z-[2] bg-background/15" />
        
        {/* Warm stage glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[2] w-[800px] h-[400px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center pb-16 md:pb-24 px-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.4 }}
            className="font-body text-xs text-primary mb-4 tracking-[0.25em] uppercase"
          >
            נחמן כהן – זמר חסידי
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.55 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground mb-10"
          >
            Nachman Cohen
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/music"
                className="inline-flex items-center gap-2 gold-gradient text-primary-foreground font-body font-semibold text-sm px-8 py-4 rounded-full shadow-lg shadow-primary/20"
              >
                <Music size={16} />
                Listen to Music
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-full border border-primary/40 text-foreground hover:bg-primary/10 backdrop-blur-sm transition-colors"
              >
                <Calendar size={16} />
                Book for Events
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ MUSIC ═══════════════ */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="text-center mb-14"
          >
            <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest uppercase">Music</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground">Latest Songs</h2>
          </motion.div>

          <HomeMusicPlayer tracks={featuredTracks} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.3 }}
            className="text-center mt-10"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                to="/music"
                className="inline-block font-body font-medium text-xs px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
              >
                View All Songs →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ LIVE PERFORMANCES ═══════════════ */}
      <LivePerformances />

      {/* ═══════════════ ABOUT ═══════════════ */}
      <AboutPreview />

      {/* ═══════════════ BOOKING ═══════════════ */}
      <div id="booking">
        <BookingSection />
      </div>

      {/* ═══════════════ SOCIAL ═══════════════ */}
      <SocialSection />
    </div>
  );
};

export default Index;