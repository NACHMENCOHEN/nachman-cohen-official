import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Music, Play, Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "@/assets/nachman-hero-clean.webp";
import aboutImg from "@/assets/about-portrait.jpg";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import PromoVideoModal from "@/components/PromoVideoModal";
import { socialLinks } from "@/components/social-icons";
import LiveUpdates from "@/components/LiveUpdates";
import { usePublishedMusic } from "@/hooks/usePublishedMusic";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };
const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: spring,
};

const videos: { id: string; title: string; sub: string; thumb?: string }[] = [
  { id: "8okNDLOM3mo", title: "לעכטיגע שבת", sub: "הקליפ הרשמי", thumb: "/covers/lachtige-shabbos-wide.jpg" },
  { id: "E0sWm7bJUEs", title: "אשר בחר בנו", sub: "LIVE" },
  { id: "IP8vxbsuQu8", title: "מיין טרערעלע", sub: "קליפ" },
];

const SectionTitle = ({ title, en }: { title: string; en: string }) => (
  <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
    <h2 className="font-condensed text-6xl md:text-8xl text-foreground">{title}</h2>
    <span className="font-poster text-2xl md:text-3xl tracking-[0.2em] text-primary/50 pb-2" dir="ltr">{en}</span>
  </div>
);

const Index = () => {
  const { tracks: publishedMusic } = usePublishedMusic();
  const newestTrack = publishedMusic.find((t) => t.slug === "lachtige-shabbos") ?? publishedMusic[0];
  const releasesWithCover = publishedMusic.filter((r) => r.cover);

  const heroRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const scrollRail = (dir: 1 | -1) => railRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <PageTransition>
      <PromoVideoModal />
      <SEO
        title="נחמן כהן | Nachman Cohen – זמר ומלחין חסידי"
        description="האתר הרשמי של הזמר והמלחין נחמן כהן. מוזיקה חסידית, שירים חדשים, קליפים, הופעות ועדכונים. Official website of Jewish singer and composer Nachman Cohen."
        path="/"
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-[92vh] min-h-[620px] overflow-hidden">
        {/* giant word behind the portrait */}
        <motion.div
          style={{ y: wordY }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, duration: 1.4 }}
          className="absolute inset-x-0 top-[8%] z-0 flex justify-center pointer-events-none select-none"
          dir="ltr"
        >
          <div className="relative isolate overflow-hidden">
            {/* Lachtige Shabbos clip montage playing inside the letters */}
            <video
              src="/video/hero-loop.mp4"
              poster="/video/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <span className="relative block font-poster text-white bg-black mix-blend-multiply text-[34vw] md:text-[26vw] whitespace-nowrap px-[1vw]">NACHMAN</span>
            <span className="absolute inset-0 block font-poster text-black site-texture mix-blend-lighten text-[34vw] md:text-[26vw] whitespace-nowrap px-[1vw]" aria-hidden>NACHMAN</span>
            <span className="absolute inset-0 block font-poster hero-stroke text-[34vw] md:text-[26vw] whitespace-nowrap px-[1vw]" aria-hidden>NACHMAN</span>
          </div>
        </motion.div>

        {/* portrait */}
        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, duration: 1.2, delay: 0.2 }}
          className="absolute inset-x-0 bottom-[16%] md:bottom-[12%] top-[14%] z-[2] flex justify-center items-end"
        >
          <img
            src={heroImg}
            alt="נחמן כהן"
            className="h-[85%] md:h-auto w-auto max-w-none md:max-h-full md:max-w-[min(100%,980px)] object-contain object-bottom grayscale contrast-[1.08] brightness-[.95]"
          />
        </motion.div>


        {/* name + actions */}
        <div className="absolute inset-x-0 bottom-0 z-10 pb-10 md:pb-14 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.6, duration: 1 }}
            className="font-condensed gold-text text-7xl md:text-9xl mb-2"
          >
            נחמן כהן
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: 0.75 }}
            className="font-body text-base md:text-lg text-foreground/70 mb-7"
          >
            מוזיקה עם נשמה. קול שנוגע בלב.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.85 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/music" className="gold-btn"><Music size={16} />האזנה למוזיקה</Link>
            <Link to="/videos" className="ghost-btn"><Play size={16} />צפייה בקליפים</Link>
          </motion.div>
        </div>

      </section>

      {/* socials (mobile) */}
      <div className="md:hidden flex items-center justify-center gap-5 flex-wrap pb-6">
        {socialLinks.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
            className={`text-muted-foreground ${s.hoverColorClass} transition-colors`}><s.Icon size={22} /></a>
        ))}
      </div>

      <LiveUpdates />

      {/* ═══════════════ FEATURED RELEASE ═══════════════ */}
      {newestTrack && (
        <section className="py-20 md:py-28 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
              <motion.div {...reveal} className="relative flex justify-center md:justify-start">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="vinyl spin-slow absolute top-1/2 -translate-y-1/2 -left-20 md:-left-28 rounded-full" style={{ width: "92%", height: "92%" }} />
                  <Link to={`/music/${newestTrack.slug}`} className="relative block w-full h-full">
                    <img
                      src={newestTrack.cover}
                      alt={`נחמן כהן – ${newestTrack.title} – עטיפת השיר`}
                      className="w-full h-full object-cover rounded-sm border-4 border-foreground/90 shadow-2xl"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </motion.div>

              <motion.div {...reveal} className="text-center md:text-right">
                <span className="inline-block font-poster tracking-[0.25em] text-sm text-primary mb-3" dir="ltr">NEW RELEASE</span>
                <h2 className="font-condensed text-7xl md:text-8xl text-foreground mb-3">{newestTrack.title}</h2>
                <p className="font-body text-muted-foreground mb-8" dir="ltr" style={{ textAlign: "inherit" }}>
                  Nachman Cohen – {newestTrack.titleEn}
                </p>
                <Link to={`/music/${newestTrack.slug}`} className="gold-btn"><Play size={16} />האזינו עכשיו</Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ RELEASES RAIL ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div {...reveal}><SectionTitle title="שירים" en="MUSIC" /></motion.div>

          <div className="relative">
            <div ref={railRef} className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2">
              {releasesWithCover.map((r) => (
                <Link
                  key={r.slug}
                  to={`/music/${r.slug}`}
                  className="group snap-start shrink-0 w-44 md:w-56"
                >
                  <div className="relative overflow-hidden rounded-sm border border-border">
                    <img src={r.cover} alt={`${r.title} – נחמן כהן`} loading="lazy"
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/45 transition-colors">
                      <Play className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={36} />
                    </span>
                  </div>
                  <p className="font-condensed text-3xl text-foreground mt-3 group-hover:text-primary transition-colors">{r.title}</p>
                </Link>
              ))}
            </div>
            <div className="hidden md:flex gap-2 mt-6">
              <button onClick={() => scrollRail(1)} aria-label="הבא" className="ghost-btn !px-3"><ChevronRight size={18} /></button>
              <button onClick={() => scrollRail(-1)} aria-label="הקודם" className="ghost-btn !px-3"><ChevronLeft size={18} /></button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/music" className="ghost-btn">לכל השירים</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ VIDEOS ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div {...reveal}><SectionTitle title="קליפים" en="VIDEOS" /></motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <motion.div key={v.id} {...reveal} transition={{ ...spring, delay: i * 0.08 }}>
                <Link to="/videos" className="group block">
                  <div className="relative overflow-hidden rounded-sm border border-border aspect-video">
                    <img src={v.thumb ?? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={`${v.title} – נחמן כהן`} loading="lazy"
                      className="w-full h-full object-cover grayscale-[.35] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        <Play size={22} className="text-primary-foreground mr-[-2px]" fill="currentColor" />
                      </span>
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-3">
                    <p className="font-condensed text-3xl text-foreground group-hover:text-primary transition-colors">{v.title}</p>
                    <span className="font-body text-xs text-muted-foreground">{v.sub}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/videos" className="ghost-btn">לכל הקליפים</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
            <motion.div {...reveal} className="flex justify-center">
              <div className="w-64 md:w-80 p-2.5 arch border border-primary/50 shadow-[0_25px_60px_-20px_rgba(0,0,0,.9)]">
                <img src={aboutImg} alt="נחמן כהן" loading="lazy"
                  className="block arch w-full aspect-[3/4] object-cover object-top grayscale" />
              </div>
            </motion.div>
            <motion.div {...reveal}>
              <h2 className="font-condensed text-7xl md:text-8xl text-foreground mb-2">אודות</h2>
              <p className="font-body text-sm text-primary mb-6">זמר ומלחין חסידי · לונדון</p>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>נחמן כהן הוא זמר חסידי בעל קול חם, מרגש ומלא נשמה, המביא איתו חיבור עמוק למוזיקה יהודית וחסידית.</p>
                <p>בהופעותיו הוא יוצר אווירה מיוחדת של רגש, שמחה ועומק, ומעניק חוויה מוזיקלית בלתי נשכחת.</p>
              </div>
              <Link to="/about" className="ghost-btn mt-8">לסיפור המלא</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div {...reveal} className="max-w-4xl mx-auto border border-primary/30 px-6 py-14 md:p-16 text-center relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-4 font-poster tracking-[0.3em] text-primary/70 text-sm" dir="ltr">BOOKING</span>
            <h2 className="font-condensed text-6xl md:text-7xl text-foreground mb-4">להופעות ושיתופי פעולה</h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto mb-8">
              ניתן ליצור קשר ישירות בטלפון, בוואטסאפ או באימייל.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <a href="tel:+447435952083" className="gold-btn"><Phone size={16} />התקשרו עכשיו</a>
              <a href="https://wa.me/447435952083" target="_blank" rel="noopener noreferrer" className="ghost-btn"><MessageCircle size={16} />וואטסאפ</a>
            </div>
            <div className="space-y-1 text-muted-foreground font-body text-sm">
              <p>טלפון: <a href="tel:+447435952083" className="text-foreground hover:text-primary transition-colors" dir="ltr">07435952083</a></p>
              <p>אימייל: <a href="mailto:Ncgraphics2023@gmail.com" className="text-foreground hover:text-primary transition-colors">Ncgraphics2023@gmail.com</a></p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
