import { motion } from "framer-motion";

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

      {/* Placeholder – upload real performance photos to replace */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="max-w-3xl mx-auto text-center py-16 rounded-2xl border border-dashed border-primary/20 bg-primary/5"
      >
        <p className="font-body text-muted-foreground text-sm">
          Performance photos coming soon — upload real photos to fill this section.
        </p>
      </motion.div>
    </div>
  </section>
);

export default LivePerformances;
