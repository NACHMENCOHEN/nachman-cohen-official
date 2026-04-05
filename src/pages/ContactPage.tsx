import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Instagram, Youtube } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.3z" />
  </svg>
);

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const ContactPage = () => {
  return (
    <PageTransition>
      <SEO
        title="יצירת קשר עם נחמן כהן | זמר חסידי"
        description="צרו קשר עם נחמן כהן להופעות, בירורים ושיתופי פעולה. טלפון, וואטסאפ ואימייל."
      />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">יצירת קשר</h1>
            <p className="text-muted-foreground font-body max-w-lg mx-auto">להופעות, בירורים ושיתופי פעולה</p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.15 }}
              className="text-center"
            >
              <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
                ניתן ליצור קשר ישירות בטלפון, בוואטסאפ, באימייל או דרך הרשתות החברתיות.
              </p>

              {/* Contact details */}
              <div className="rounded-2xl bg-card border border-border p-8 mb-8 stage-glow">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-3 text-foreground">
                    <Phone size={18} className="text-primary" />
                    <a href="tel:+447435952083" className="font-body text-lg hover:text-primary transition-colors" dir="ltr">
                      07435952083
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-foreground">
                    <Mail size={18} className="text-primary" />
                    <a href="mailto:Ncgraphics2023@gmail.com" className="font-body text-lg hover:text-primary transition-colors">
                      Ncgraphics2023@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.a
                    href="tel:+447435952083"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 gold-gradient text-primary-foreground font-body font-semibold text-sm px-8 py-4 rounded-full transition-shadow hover:shadow-lg hover:shadow-primary/20 w-full sm:w-auto justify-center"
                  >
                    <Phone size={18} />
                    התקשרו עכשיו
                  </motion.a>
                  <motion.a
                    href="https://wa.me/447435952083"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all hover:border-primary/60 w-full sm:w-auto justify-center"
                  >
                    <MessageCircle size={18} />
                    שלחו וואטסאפ
                  </motion.a>
                </div>
              </div>

              {/* Social links */}
              <p className="font-body text-sm text-muted-foreground mb-6">
                ניתן ליצור קשר גם דרך אינסטגרם, יוטיוב וטיקטוק
              </p>

              <div className="flex items-center justify-center gap-5">
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  href="https://www.instagram.com/nachmencohen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={22} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  href="https://www.youtube.com/@Nachmen_cohen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube size={22} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  href="https://www.tiktok.com/@nachman_cohen_music?_r=1&_t=ZN-94co99vL1bK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  aria-label="TikTok"
                >
                  <TikTokIcon size={20} />
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
