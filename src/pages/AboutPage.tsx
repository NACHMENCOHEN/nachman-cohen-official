import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import aboutImg from "@/assets/about-portrait.jpg";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import MediaPress from "@/components/MediaPress";
import { ARTIST_ID, SITE_URL } from "@/lib/artist-seo";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const paragraphs = [
  "נחמן כהן הוא זמר חסידי בעל קול ייחודי, חם ומלא רגש, המוקדש למוזיקה יהודית וחסידית אותנטית.",
  "הקול שלו מביא איתו עומק, נשמה, שמחה וחיבור, ויוצר חוויה מוזיקלית שמצליחה לגעת בלבבות ולהישאר בזיכרון.",
  "את דרכו המוזיקלית החל נחמן מתוך אהבה אמיתית לעולם הניגון, הרגש והמילים. מאז הוא ממשיך ליצור, להופיע ולהביא לקהל מוזיקה שמחברת בין מסורת, רגש ועוצמה.",
  "נחמן מופיע באירועים מיוחדים, קבלות פנים, חופות, דינרים, ערבים מוזיקליים ואירועים פרטיים, ומעניק לכל הופעה אווירה ייחודית של תוכן, רגש ושמחה.",
  "המטרה של נחמן כהן היא לא רק לשיר, אלא ליצור רגעים שמרגישים אותם באמת. רגעים של נשמה, חיבור, התרוממות ושמחה. דרך המוזיקה שלו הוא מבקש לשמר את היופי של המוזיקה היהודית והחסידית, ולהגיש אותה בצורה מרגשת, מכובדת ועמוקה.",
];

const AboutPage = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.06, 1]);

  return (
    <PageTransition>
      <SEO
        title="אודות נחמן כהן | האתר הרשמי של נחמן כהן"
        description="נחמן כהן הוא זמר חסידי בעל קול ייחודי, חם ומלא רגש. קראו את הסיפור המלא."
        path="/about"
        jsonLd={{ "@context": "https://schema.org", "@type": "AboutPage", "@id": `${SITE_URL}/about#page`, url: `${SITE_URL}/about`, mainEntity: { "@id": ARTIST_ID } }}
      />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              ref={imgRef}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={spring}
              className="order-1 lg:order-2"
            >
              <div className="aspect-square overflow-hidden rounded-2xl gold-border-glow">
                <motion.img
                  src={aboutImg}
                  alt="נחמן כהן"
                  className="w-full h-full object-cover object-[center_15%] shadow-lg"
                  style={{ scale: imgScale }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.15 }}
              className="lg:pt-8 order-2 lg:order-1"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.2 }}
                className="font-body text-xs font-medium text-primary mb-4 tracking-widest"
              >
                אודות
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.3 }}
                className="font-display text-4xl md:text-5xl text-foreground mb-8"
              >
                נחמן כהן
              </motion.h1>

              <div className="space-y-5 text-muted-foreground font-body leading-relaxed">
                {paragraphs.map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.35 + i * 0.08 }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...spring, delay: 0.7 }}
                className="mt-10"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
                  <Link
                    to="/contact"
                    className="inline-block font-body font-semibold text-sm px-8 py-4 rounded-full gold-gradient text-primary-foreground transition-shadow hover:shadow-lg hover:shadow-primary/20"
                  >
                    יצירת קשר
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

<div className="my-8 text-center">
  <a
    href="https://musicbrainz.org/artist/b15ff3e7-467f-49cb-892b-ce2ca4ece6b5"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary underline underline-offset-4"
  >
    רשומת האמן ב־MusicBrainz
  </a>
</div>

          <MediaPress />
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
