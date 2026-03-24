import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Music, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";
import HomeMusicPlayer from "@/components/HomeMusicPlayer";
import AboutPreview from "@/components/AboutPreview";
import BookingSection from "@/components/BookingSection";
import SocialSection from "@/components/SocialSection";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { useLanguage } from "@/i18n/LanguageContext";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const featuredTracks = [
  { title: "רפואה", titleEn: "Refua", audioSrc: "/music/refua.mp3" },
  { title: "למעלה", titleEn: "Lemala", audioSrc: "/music/lemala.mp3" },
  { title: "תפילין", titleEn: "Tefillin (Cover)", audioSrc: "/music/tefillin.mp3" },
  { title: "למצוא חן", titleEn: "Limtzo Chen", audioSrc: "/music/limtzo-chen.mp3" },
  { title: "מיין טייערע לעכטעלע", titleEn: "Mein Taiere Lechtele", audioSrc: "/music/mein-taiere-lechtele.mp3" },
];

const Index = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      <SEO title="נחמן כהן - האתר הרשמי | Nachman Cohen" description="האתר הרשמי של נחמן כהן. מוזיקה, קליפים, שירים, הופעות, ועדכונים." />
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-end justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src={heroImg} alt="" aria-hidden="true" className="w-full h-full object-cover object-top scale-110 blur-2xl brightness-[0.35]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, duration: 1.2, delay: 0.1 }}
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-[1] flex items-start justify-center -mt-12 md:mt-0"
        >
          <img src={heroImg} alt="Nachman Cohen" className="h-full object-contain object-top md:object-center" />
        </motion.div>

        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 z-[2] bg-background/15" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[2] w-[800px] h-[400px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center pb-16 md:pb-24 px-4">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-20 md:bottom-28 w-[600px] h-[200px] rounded-full bg-primary/12 blur-[100px] pointer-events-none z-0" />
          
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...spring, delay: 0.5, duration: 1 }}
            className="font-hero-title text-[3.5rem] sm:text-[5rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem] text-foreground mb-10 gold-text uppercase whitespace-nowrap relative z-10 drop-shadow-[0_0_60px_hsla(38,70%,55%,0.25)]"
            dir="ltr"
          >
            NACHMAN COHEN
            <span className="sr-only"> – Official Website</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/music"
                className="inline-flex items-center gap-2 gold-gradient text-primary-foreground font-body font-semibold text-sm px-8 py-4 rounded-full shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
              >
                <Music size={16} />
                {t.hero.listenToMusic}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-full border border-primary/40 text-foreground hover:bg-primary/10 backdrop-blur-sm transition-all hover:border-primary/60"
              >
                <Calendar size={16} />
                {t.hero.bookForEvents}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ MUSIC ═══════════════ */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring}
            className="text-center mb-14"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.1 }}
              className="font-body text-xs font-medium text-primary mb-3 tracking-widest uppercase"
            >
              {t.musicSection.label}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.2 }}
              className="font-display text-4xl md:text-6xl text-foreground"
            >
              {t.musicSection.title}
            </motion.h2>
          </motion.div>

          <HomeMusicPlayer tracks={featuredTracks} />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.3 }}
            className="text-center mt-10"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                to="/music"
                className="inline-block font-body font-medium text-xs px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all hover:border-primary/60"
              >
                {t.musicSection.viewAll}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AboutPreview />

      <div id="booking">
        <BookingSection />
      </div>

      <SocialSection />
    </PageTransition>
  );
};

export default Index;
