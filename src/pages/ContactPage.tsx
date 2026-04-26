import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { socialLinks } from "@/components/social-icons";

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

              <div className="flex items-center justify-center gap-4 flex-wrap">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.name}
                    whileHover={{ scale: 1.15, y: -2 }}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground ${s.hoverColorClass} hover:border-primary/30 transition-all`}
                    aria-label={s.name}
                  >
                    <s.Icon size={22} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
