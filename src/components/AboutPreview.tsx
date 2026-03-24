import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-portrait.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const AboutPreview = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...spring, delay: 0.15 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.2 }}
              className="font-body text-xs font-medium text-primary mb-3 tracking-widest uppercase"
            >
              {t.aboutPreview.label}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl text-foreground mb-6"
            >
              {t.aboutPreview.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.4 }}
              className="space-y-4 font-body text-muted-foreground leading-relaxed"
            >
              <p>{t.aboutPreview.p1}</p>
              <p>{t.aboutPreview.p2}</p>
            </motion.div>
            <motion.a
              href="/about"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block font-body font-medium text-xs px-6 py-3 mt-8 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all hover:border-primary/60"
            >
              {t.aboutPreview.readMore}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring}
            className="relative order-first md:order-last"
          >
            <div className="rounded-2xl overflow-hidden img-frame -scale-x-100">
              <motion.img
                src={aboutImg}
                alt="Nachman Cohen"
                className="w-full aspect-square object-cover object-top"
                loading="lazy"
                style={{ scale: imgScale, y: imgY }}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/10 blur-[60px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
