import { motion } from "framer-motion";
import aboutImg from "@/assets/about-cutout.png";

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

          <div className="space-y-5 text-muted-foreground font-body leading-relaxed max-w-prose">
            <p>
              נחמן כהן הוא אחד הזמרים החסידיים המבוקשים ביותר בעולם המוזיקה
              היהודית כיום. עם קול המשלב רגש עמוק עם שליטה טכנית, הוא ריתק
              קהלים במאות חתונות, קונצרטים ואירועים קהילתיים ברחבי
              ארצות הברית ומעבר לה.
            </p>
            <p>
              נחמן נולד וגדל בברוקלין, ניו יורק, וגילה את תשוקתו למוזיקה
              בגיל צעיר, כששר במקהלות בית הספר והופיע באירועים מקומיים.
              היכולת הייחודית שלו להתחבר לקהל דרך ניגונים מסורתיים
              ויצירות עכשוויות הבדילה אותו מהר.
            </p>
            <p>
              בין אם הוא מבצע ניגון שבת אינטימי או מוביל אלפים באולם
              קונצרטים, נחמן מביא את אותה מסירות, תשוקה ועומק רוחני
              לכל תו ותו.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
            {[
              { num: "500+", label: "אירועים" },
              { num: "5", label: "שירים" },
              { num: "10+", label: "שנים" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-foreground">{stat.num}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default AboutPage;
