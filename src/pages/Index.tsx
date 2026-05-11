import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Music, Play, Phone, MessageCircle, Mail } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";
import aboutImg from "@/assets/about-portrait.jpg";
import HomeMusicPlayer from "@/components/HomeMusicPlayer";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import PromoVideoModal from "@/components/PromoVideoModal";
import { socialLinks } from "@/components/social-icons";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const featuredTracks = [
  { title: "רפואה", titleEn: "Refua", audioSrc: "/music/refua.mp3" },
  { title: "למעלה", titleEn: "Lemala", audioSrc: "/music/lemala.mp3" },
  { title: "תפילין", titleEn: "Tefillin (Cover)", audioSrc: "/music/tefillin.mp3" },
  { title: "למצוא חן", titleEn: "Limtzo Chen", audioSrc: "/music/limtzo-chen.mp3" },
  { title: "מיין טייערע לעכטעלע", titleEn: "Mein Taiere Lechtele", audioSrc: "/music/mein-taiere-lechtele.mp3" },
];

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      <PromoVideoModal />
      <SEO
        title="נחמן כהן האתר הרשמי | זמר חסידי"
        description="האתר הרשמי של נחמן כהן. מוזיקה, קליפים, הופעות ויצירת קשר. זמר חסידי עם מוזיקה מרגשת, קול מלא נשמה וחיבור עמוק לעולם המוזיקה היהודית."
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-end justify-center overflow-hidden">
        {/* Background blur */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img src={heroImg} alt="" aria-hidden="true" className="w-full h-full object-cover object-top scale-110 blur-2xl brightness-[0.3]" />
        </motion.div>

        {/* Oversized background name for depth */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[20vw] font-black text-foreground/[0.03] whitespace-nowrap">
            נחמן כהן
          </span>
        </div>

        {/* Main portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, duration: 1.2, delay: 0.1 }}
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-[2] flex items-start justify-center -mt-12 md:mt-0"
        >
          <img src={heroImg} alt="נחמן כהן" className="h-full object-contain object-top md:object-center" />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 z-[3] bg-background/15" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[3] w-[800px] h-[400px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 text-center pb-16 md:pb-24 px-4">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-20 md:bottom-28 w-[600px] h-[200px] rounded-full bg-primary/12 blur-[100px] pointer-events-none z-0" />

          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...spring, delay: 0.5, duration: 1 }}
            className="font-hero-title text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] gold-text mb-4 relative z-10 drop-shadow-[0_0_60px_hsla(38,55%,65%,0.25)]"
          >
            נחמן כהן
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.65 }}
            className="font-body text-lg md:text-xl text-foreground/70 mb-10 max-w-md mx-auto"
          >
            מוזיקה עם נשמה. קול שנוגע בלב.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/music"
                className="inline-flex items-center gap-2 gold-gradient text-primary-foreground font-body font-semibold text-sm px-8 py-4 rounded-full shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
              >
                <Music size={16} />
                האזנה למוזיקה
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/videos"
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-full border border-primary/40 text-foreground hover:bg-primary/10 backdrop-blur-sm transition-all hover:border-primary/60"
              >
                <Play size={16} />
                צפייה בקליפים
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 backdrop-blur-sm transition-all"
              >
                יצירת קשר
              </Link>
            </motion.div>
          </motion.div>

          {/* Social icons under hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: 0.9 }}
            className="flex items-center justify-center gap-5 flex-wrap"
          >
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-muted-foreground ${s.hoverColorClass} transition-colors`}
                aria-label={s.name}
              >
                <s.Icon size={22} />
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ MUSIC SECTION ═══════════════ */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring}
            className="text-center mb-14"
          >
            <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest">מוזיקה</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">השירים האחרונים</h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              האזינו לשירים של נחמן כהן ולצלילים שמביאים רגש, עומק וחיבור אמיתי.
            </p>
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
                className="inline-block font-body font-medium text-sm px-8 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all hover:border-primary/60"
              >
                לכל השירים
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ VIDEO PREVIEW ═══════════════ */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring}
            className="text-center mb-14"
          >
            <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest">וידאו</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">קליפים והופעות</h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              צפו בקליפים, הופעות ורגעים מוזיקליים מיוחדים מתוך הדרך והעשייה של נחמן כהן.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.2 }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                to="/videos"
                className="inline-block font-body font-medium text-sm px-8 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all hover:border-primary/60"
              >
                לכל הווידאו
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ ABOUT PREVIEW ═══════════════ */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={spring}
            >
              <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest">אודות</p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">נחמן כהן</h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>נחמן כהן הוא זמר חסידי בעל קול חם, מרגש ומלא נשמה, המביא איתו חיבור עמוק למוזיקה יהודית וחסידית.</p>
                <p>בהופעותיו הוא יוצר אווירה מיוחדת של רגש, שמחה ועומק, ומעניק חוויה מוזיקלית בלתי נשכחת.</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block mt-8">
                <Link
                  to="/about"
                  className="inline-block font-body font-medium text-sm px-8 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all hover:border-primary/60"
                >
                  לסיפור המלא
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={spring}
              className="order-first md:order-last"
            >
              <div className="rounded-2xl overflow-hidden gold-border-glow">
                <img src={aboutImg} alt="נחמן כהן" className="w-full aspect-square object-cover object-top" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT PREVIEW ═══════════════ */}
      <section className="py-24 md:py-32 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring}
            className="text-center"
          >
            <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest">יצירת קשר</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">להופעות, בירורים ושיתופי פעולה</h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto mb-8">
              להופעות, בירורים ושיתופי פעולה ניתן ליצור קשר ישירות בטלפון, בוואטסאפ, באימייל או דרך הרשתות החברתיות.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <motion.a
                href="tel:+447435952083"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 gold-gradient text-primary-foreground font-body font-semibold text-sm px-8 py-4 rounded-full transition-shadow hover:shadow-lg hover:shadow-primary/20"
              >
                <Phone size={18} />
                התקשרו עכשיו
              </motion.a>
              <motion.a
                href="https://wa.me/447435952083"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all hover:border-primary/60"
              >
                <MessageCircle size={18} />
                שלחו וואטסאפ
              </motion.a>
            </div>

            <div className="space-y-2 text-muted-foreground font-body text-sm mb-6">
              <p>טלפון: <a href="tel:+447435952083" className="text-foreground hover:text-primary transition-colors" dir="ltr">07435952083</a></p>
              <p>אימייל: <a href="mailto:Ncgraphics2023@gmail.com" className="text-foreground hover:text-primary transition-colors">Ncgraphics2023@gmail.com</a></p>
            </div>

            <p className="text-xs text-muted-foreground">
              ניתן ליצור קשר גם דרך אינסטגרם, יוטיוב וטיקטוק
            </p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
