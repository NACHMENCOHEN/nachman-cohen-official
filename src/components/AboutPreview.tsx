import { motion } from "framer-motion";
import aboutImg from "@/assets/about-portrait.jpg";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const AboutPreview = () => (
  <section className="py-24 md:py-32 border-t border-border">
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Text – LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.15 }}
        >
          <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest uppercase">About</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">Nachman Cohen</h2>
          <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
            <p>
              Nachman Cohen is a rising Hasidic singer whose soulful voice bridges tradition and modern expression. 
              With roots deep in Jewish musical heritage, his performances blend heartfelt devotion with 
              contemporary artistry.
            </p>
            <p>
              From intimate wedding celebrations to grand concert stages, Nachman brings an authentic 
              energy that moves audiences of all backgrounds. His original compositions and powerful covers 
              have earned him a growing following across the Jewish music world.
            </p>
          </div>
          <motion.a
            href="/about"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block font-body font-medium text-xs px-6 py-3 mt-8 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
          >
            Read Full Story →
          </motion.a>
        </motion.div>

        {/* Image – RIGHT, square */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="relative order-first md:order-last"
        >
          <div className="rounded-2xl overflow-hidden img-frame">
            <img
              src={aboutImg}
              alt="Nachman Cohen"
              className="w-full aspect-square object-cover object-top"
              loading="lazy"
            />
          </div>
          {/* Decorative glow */}
          <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/10 blur-[60px] pointer-events-none" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutPreview;