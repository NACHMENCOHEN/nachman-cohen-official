import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/nachman-portrait.jpg";
import MusicPlayer from "@/components/MusicPlayer";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="נחמן כהן — תמונה מקצועית"
            className="w-full h-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.3 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground mb-4"
          >
            נחמן כהן
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.5 }}
            className="font-body text-sm md:text-base text-muted-foreground mb-10 tracking-widest"
          >
            האתר הרשמי
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/music"
                className="inline-block bg-primary text-primary-foreground font-body font-medium text-sm px-8 py-4 rounded-lg"
              >
                האזינו לשירים
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.9 }}
          className="absolute bottom-6 left-6 right-6 z-10 max-w-3xl mx-auto"
        >
          <MusicPlayer />
        </motion.div>
      </section>

      {/* Featured section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
          >
            <p className="font-body text-xs font-medium text-primary mb-4">מומלץ</p>
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
                className="inline-block font-body font-medium text-xs px-6 py-3 rounded-lg shadow-[inset_0_0_0_1px_hsl(210_10%_15%)] text-foreground"
              >
                קראו עוד
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Shows Preview */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
          >
            <p className="font-body text-xs font-medium text-primary mb-8">הופעות קרובות</p>
            <div className="space-y-4">
              {[
                { date: "28 מרץ, 2026", venue: "אולם הגדול, ברוקלין", event: "חתונה פרטית" },
                { date: "15 אפריל, 2026", venue: "מרכז הכנסים, לייקווד", event: "קונצרט קהילתי" },
                { date: "2 מאי, 2026", venue: "הפאלאס, מונסי", event: "ערב גאלה" },
              ].map((show, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: i * 0.07 }}
                  className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-border gap-2"
                >
                  <span className="font-body text-xs font-medium text-primary">{show.date}</span>
                  <span className="text-foreground font-body">{show.venue}</span>
                  <span className="text-muted-foreground font-body text-sm">{show.event}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/shows" className="font-body text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                ← כל ההופעות
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
