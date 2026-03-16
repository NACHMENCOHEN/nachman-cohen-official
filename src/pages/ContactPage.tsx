import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const ContactPage = () => {
  return (
    <PageTransition>
      <SEO title="Contact – Nachman Cohen" description="Book Nachman Cohen for weddings, concerts and private events." />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Book a Show"
            subtitle="Book Nachman Cohen for live performances"
          />

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.15 }}
              className="text-center"
            >
              <p className="font-body text-xs text-muted-foreground mb-3 tracking-wider uppercase">
                Weddings • Bar Mitzvah • Private Events
              </p>
              <a
                href="tel:+447435952083"
                className="inline-block font-display text-4xl md:text-5xl text-foreground hover:text-primary transition-colors mb-8"
                dir="ltr"
              >
                +44 7435 952083
              </a>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
