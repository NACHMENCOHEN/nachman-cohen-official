import { motion } from "framer-motion";
import aboutImg from "@/assets/about-portrait.jpg";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const AboutPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
        >
          <img
            src={aboutImg}
            alt="נחמן כהן"
            className="w-full rounded-2xl shadow-lg shadow-foreground/5"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="lg:pt-8"
        >
          <p className="font-body text-xs font-medium text-muted-foreground mb-4 tracking-widest">אודות</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
            נחמן כהן
          </h1>

          <p className="text-muted-foreground font-body leading-relaxed">
            הביוגרפיה תתעדכן בקרוב.
          </p>
        </motion.div>
      </div>
    </div>
  </div>
);

export default AboutPage;
