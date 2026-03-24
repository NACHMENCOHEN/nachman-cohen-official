import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-portrait.jpg";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import MediaPress from "@/components/MediaPress";
import { useLanguage } from "@/i18n/LanguageContext";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const AboutPage = () => {
  const { t } = useLanguage();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.06, 1]);

  const paragraphs = [t.aboutPage.p1, t.aboutPage.p2, t.aboutPage.p3, t.aboutPage.p4];

  return (
    <PageTransition>
      <SEO title="About – Nachman Cohen" description="Learn about Nachman Cohen, a Hasidic singer blending traditional melodies with contemporary style." />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              ref={imgRef}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={spring}
              className="order-1 lg:order-2"
            >
              <div className="aspect-square overflow-hidden rounded-2xl -scale-x-100">
                <motion.img
                  src={aboutImg}
                  alt="Nachman Cohen"
                  className="w-full h-full object-cover object-[center_15%] shadow-lg shadow-foreground/5"
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
                className="font-body text-xs font-medium text-muted-foreground mb-4 tracking-widest"
              >
                {t.aboutPage.label}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.3 }}
                className="font-display text-4xl md:text-5xl text-foreground mb-8"
              >
                {t.aboutPage.title}
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
            </motion.div>
          </div>

          <MediaPress />
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
