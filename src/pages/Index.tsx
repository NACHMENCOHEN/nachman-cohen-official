import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-portrait.jpg";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.2 }}
          className="relative z-10 mt-24 mb-8"
        >
          <div className="w-72 md:w-80 lg:w-96 mx-auto">
            <img
              src={heroImg}
              alt="נחמן כהן — תמונה מקצועית"
              className="w-full rounded-2xl shadow-2xl shadow-foreground/10"
              style={{ filter: "grayscale(100%) contrast(1.05)" }}
            />
          </div>
        </motion.div>

        {/* Name & CTA */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-3 text-center"
        >
          נחמן כהן
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.65 }}
          className="font-body text-sm text-muted-foreground mb-10 tracking-widest"
        >
          האתר הרשמי
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.8 }}
          className="mb-20"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/music"
              className="inline-block bg-primary text-primary-foreground font-body font-medium text-sm px-8 py-4 rounded-full"
            >
              האזינו לשירים
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured section */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
          >
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              מביא שמחה לכל אירוע
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
              מחתונות אינטימיות ועד קונצרטים גדולים, נחמן כהן מעניק הופעות
              עוצמתיות שמרוממות כל חגיגה. עם רפרטואר הכולל ניגונים מסורתיים,
              להיטים עכשוויים ויצירות מקוריות.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/about"
                className="inline-block font-body font-medium text-xs px-6 py-3 rounded-full border border-foreground text-foreground"
              >
                קראו עוד
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
