import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Music2, Mic2, Users, PartyPopper, Phone } from "lucide-react";
import aboutImg from "@/assets/about-portrait.jpg";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import MediaPress from "@/components/MediaPress";
import { socialLinks } from "@/components/social-icons";
import { ARTIST_ID, SITE_URL } from "@/lib/artist-seo";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };
const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: spring,
};

const story = [
  "נחמן כהן הוא זמר חסידי בעל קול ייחודי, חם ומלא רגש, המוקדש למוזיקה יהודית וחסידית אותנטית.",
  "הקול שלו מביא איתו עומק, נשמה, שמחה וחיבור, ויוצר חוויה מוזיקלית שמצליחה לגעת בלבבות ולהישאר בזיכרון.",
  "את דרכו המוזיקלית החל נחמן מתוך אהבה אמיתית לעולם הניגון, הרגש והמילים. מאז הוא ממשיך ליצור, להופיע ולהביא לקהל מוזיקה שמחברת בין מסורת, רגש ועוצמה.",
];

const events = [
  { label: "אירועים מיוחדים", Icon: Sparkles },
  { label: "קבלות פנים", Icon: Users },
  { label: "חופות", Icon: Heart },
  { label: "דינרים", Icon: Mic2 },
  { label: "ערבים מוזיקליים", Icon: Music2 },
  { label: "אירועים פרטיים", Icon: PartyPopper },
];

const gallery = [
  { src: "/gallery/lachtige-2.jpg", alt: "נרות שבת – מתוך הקליפ לעכטיגע שבת" },
  { src: "/gallery/lachtige-4.jpg", alt: "שולחן שבת – מתוך הקליפ לעכטיגע שבת" },
  { src: "/gallery/lachtige-3.jpg", alt: "סעודת שבת – מתוך הקליפ לעכטיגע שבת" },
  { src: "/gallery/lachtige-5.jpg", alt: "כוס קידוש – מתוך הקליפ לעכטיגע שבת" },
];

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <PageTransition>
      <SEO
        title="אודות נחמן כהן | About Nachman Cohen – זמר חסידי"
        description="נחמן כהן (Nachman Cohen) הוא זמר חסידי בעל קול ייחודי, חם ומלא רגש. About Nachman Cohen, Hasidic singer and composer – the full story."
        path="/about"
        jsonLd={{ "@context": "https://schema.org", "@type": ["AboutPage", "ProfilePage"], "@id": `${SITE_URL}/about#page`, url: `${SITE_URL}/about`, name: "אודות נחמן כהן | About Nachman Cohen", inLanguage: "he", isPartOf: { "@id": `${SITE_URL}/#website` }, mainEntity: { "@id": ARTIST_ID }, about: { "@id": ARTIST_ID } }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} className="relative pt-28 md:pt-32 pb-20 overflow-hidden">

        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-center">
            <motion.div
              style={{ y: photoY }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, duration: 1 }}
              className="flex justify-center"
            >
              <div className="w-72 md:w-96 p-3 arch border border-primary/50 shadow-[0_30px_70px_-20px_rgba(0,0,0,.9)]">
                <img src={aboutImg} alt="נחמן כהן – זמר חסידי" className="block arch w-full aspect-[3/4] object-cover object-top grayscale -scale-x-100" />
              </div>
            </motion.div>

            <div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...spring, delay: 0.2 }}
                className="font-poster tracking-[0.3em] text-sm text-primary" dir="ltr">THE STORY</motion.span>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.3 }}
                className="font-condensed gold-text text-8xl md:text-[9rem] mt-2 mb-2">נחמן כהן</motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...spring, delay: 0.4 }}
                className="font-body text-primary/90 mb-8">זמר ומלחין חסידי · לונדון</motion.p>

              <div className="space-y-5 font-body text-foreground/75 leading-relaxed text-[1.05rem]">
                {story.map((t, i) => (
                  <motion.p key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.5 + i * 0.1 }}
                    className={i === 0 ? "first-letter:font-condensed first-letter:text-7xl first-letter:float-right first-letter:ml-3 first-letter:leading-[.8] first-letter:text-primary" : ""}>
                    {t}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ QUOTE ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.blockquote {...reveal} className="relative max-w-4xl mx-auto text-center">
            <span className="absolute -top-16 left-1/2 -translate-x-1/2 font-condensed text-[12rem] leading-none text-primary/15 select-none" aria-hidden>"</span>
            <p className="relative font-condensed text-5xl md:text-7xl text-foreground leading-[1.05]">
              המטרה היא לא רק לשיר,<br />
              <span className="gold-text">אלא ליצור רגעים שמרגישים אותם באמת.</span>
            </p>
            <footer className="mt-6 font-body text-sm text-muted-foreground">— נחמן כהן</footer>
          </motion.blockquote>
        </div>
      </section>

      {/* ═══════════ GALLERY ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div {...reveal} className="flex items-end justify-between gap-6 mb-10">
            <h2 className="font-condensed text-6xl md:text-8xl text-foreground">מאחורי הקלעים</h2>
            <Link to="/music/lachtige-shabbos" className="font-body text-sm text-primary hover:underline pb-3">מתוך "לעכטיגע שבת" ←</Link>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {gallery.map((g, i) => (
              <motion.div
                key={g.src}
                {...reveal}
                transition={{ ...spring, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-sm aspect-[4/5]"
              >
                <img src={g.src} alt={g.alt} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 ring-1 ring-inset ring-primary/20 group-hover:ring-primary/60 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EVENTS ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div {...reveal} className="max-w-3xl mb-12">
            <h2 className="font-condensed text-6xl md:text-8xl text-foreground mb-4">הופעות</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              נחמן מופיע באירועים מגוונים ומעניק לכל הופעה אווירה ייחודית של תוכן, רגש ושמחה.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {events.map(({ label, Icon }, i) => (
              <motion.div key={label} {...reveal} transition={{ ...spring, delay: i * 0.06 }}
                className="group relative border border-border hover:border-primary/50 bg-card/40 p-6 md:p-8 transition-colors">
                <Icon className="text-primary mb-6 transition-transform group-hover:-translate-y-1" size={28} strokeWidth={1.5} />
                <p className="font-condensed text-3xl md:text-4xl text-foreground">{label}</p>
                <span className="absolute top-4 left-4 font-poster text-sm text-primary/40" dir="ltr">0{i + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ LISTEN + BOOK ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div {...reveal} className="max-w-4xl mx-auto border border-primary/30 px-6 py-14 md:p-16 text-center">
            <h2 className="font-condensed text-6xl md:text-7xl text-foreground mb-4">להזמנת הופעה</h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto mb-8">
              נשמח לשמוע על האירוע שלכם ולהתאים הופעה שתיצור את האווירה הנכונה.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Link to="/contact" className="gold-btn"><Phone size={16} />יצירת קשר</Link>
              <Link to="/music" className="ghost-btn">להאזנה לשירים</Link>
            </div>
            <div className="flex items-center justify-center gap-6">
              {socialLinks.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                  className={`text-muted-foreground ${s.hoverColorClass} transition-colors`}><s.Icon size={22} /></a>
              ))}
            </div>
          </motion.div>

          <div className="mt-10 text-center">
            <a href="https://musicbrainz.org/artist/b15ff3e7-467f-49cb-892b-ce2ca4ece6b5" target="_blank" rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground hover:text-primary underline underline-offset-4">
              רשומת האמן ב־MusicBrainz
            </a>
          </div>

          <MediaPress />
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
