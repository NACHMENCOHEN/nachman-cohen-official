import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const ContactPage = () => {
  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="הזמנת הופעה"
          subtitle="Book Nachman Cohen for live performances"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="space-y-6 mb-12">
            <p className="font-body text-lg text-foreground">
              Weddings • Bar Mitzvah • Private Events
            </p>
            <p className="font-body text-muted-foreground">
              For bookings please call:
            </p>
            <a
              href="tel:+447435952083"
              className="inline-block font-display text-4xl md:text-5xl text-foreground hover:text-muted-foreground transition-colors"
              dir="ltr"
            >
              +44 7435 952083
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="tel:+447435952083"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-8 py-4 rounded-full"
            >
              <Phone size={18} />
              התקשרו עכשיו
            </motion.a>

            <motion.a
              href="https://wa.me/447435952083"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-full border border-foreground text-foreground"
            >
              <MessageCircle size={18} />
              WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
