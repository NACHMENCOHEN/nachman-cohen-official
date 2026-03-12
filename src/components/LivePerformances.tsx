import { motion } from "framer-motion";
import concert1 from "@/assets/concert-1.jpg";
import concert2 from "@/assets/concert-2.jpg";
import concert3 from "@/assets/concert-3.jpg";

const images = [
  { src: concert1, alt: "Nachman Cohen performing on stage", caption: "Live Concert" },
  { src: concert2, alt: "Nachman Cohen singing to a crowd", caption: "Event Performance" },
  { src: concert3, alt: "Wedding celebration performance", caption: "Wedding Celebration" },
];

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const LivePerformances = () => (
  <section className="py-24 md:py-32 relative overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
    
    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="text-center mb-16"
      >
        <p className="font-body text-xs font-medium text-primary mb-3 tracking-widest uppercase">Live</p>
        <h2 className="font-display text-4xl md:text-6xl text-foreground">On Stage</h2>
        <p className="font-body text-muted-foreground mt-4 max-w-md mx-auto">
          Bringing soulful Hasidic music to life at weddings, concerts and celebrations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-body text-xs text-primary tracking-wider uppercase">{img.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LivePerformances;