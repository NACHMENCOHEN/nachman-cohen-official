import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const ContactPage = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Book a Show"
            subtitle="Book Nachman Cohen for live performances"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.15 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="space-y-6 mb-12">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...spring, delay: 0.25 }}
                className="font-body text-lg text-foreground"
              >
                Weddings • Bar Mitzvah • Private Events
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...spring, delay: 0.35 }}
                className="font-body text-muted-foreground"
              >
                For bookings please call:
              </motion.p>
              <motion.a
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring, delay: 0.45 }}
                href="tel:+447435952083"
                className="inline-block font-display text-4xl md:text-5xl text-foreground hover:text-primary transition-colors"
                dir="ltr"
              >
                +44 7435 952083
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="tel:+447435952083"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-8 py-4 rounded-full transition-shadow hover:shadow-lg hover:shadow-primary/20"
              >
                <Phone size={18} />
                Call Now
              </motion.a>

              <motion.a
                href="https://wa.me/447435952083"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-full border border-foreground text-foreground hover:bg-primary/10 transition-all"
              >
                <MessageCircle size={18} />
                WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
