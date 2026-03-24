import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const spring = { type: "spring" as const, duration: 0.6, bounce: 0 };

const BookingSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
            className="font-body text-xs font-medium text-primary mb-3 tracking-widest uppercase"
          >
            {t.booking.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl text-foreground mb-4"
          >
            {t.booking.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.3 }}
            className="font-body text-muted-foreground max-w-md mx-auto"
          >
            {t.booking.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...spring, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={spring}
            className="rounded-2xl bg-card border border-border p-8 text-center hover:border-primary/20 transition-colors"
          >
            <p className="font-body text-xs text-muted-foreground mb-4 tracking-wider uppercase">{t.booking.contactDirectly}</p>
            <a
              href="tel:+447435952083"
              className="block font-display text-3xl md:text-4xl text-foreground hover:text-primary transition-colors mb-8"
              dir="ltr"
            >
              +44 7435 952083
            </a>
            <div className="flex items-center justify-center gap-4">
              <motion.a
                href="tel:+447435952083"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 gold-gradient text-primary-foreground font-body font-medium text-sm px-6 py-3 rounded-full transition-shadow hover:shadow-lg hover:shadow-primary/20"
              >
                <Phone size={16} />
                {t.booking.callNow}
              </motion.a>
              <motion.a
                href="https://wa.me/447435952083"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-6 py-3 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all hover:border-primary/60"
              >
                <MessageCircle size={16} />
                {t.booking.whatsapp}
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
