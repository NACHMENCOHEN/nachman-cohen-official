import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const shows = [
  { date: "28 מרץ, 2026", venue: "אולם הגדול", city: "ברוקלין, ניו יורק", event: "חתונה פרטית", available: false },
  { date: "15 אפריל, 2026", venue: "מרכז הכנסים", city: "לייקווד, ניו ג׳רזי", event: "קונצרט קהילתי", available: true },
  { date: "2 מאי, 2026", venue: "הפאלאס", city: "מונסי, ניו יורק", event: "ערב גאלה", available: false },
  { date: "18 מאי, 2026", venue: "אטרת אברהם", city: "ברוקלין, ניו יורק", event: "חתונה", available: false },
  { date: "8 יוני, 2026", venue: "בל וורקס", city: "ניו ג׳רזי", event: "אירוע חברה", available: true },
  { date: "22 יוני, 2026", venue: "טרס און דה פארק", city: "קווינס, ניו יורק", event: "קונצרט צדקה", available: true },
  { date: "10 יולי, 2026", venue: "דה סנדס", city: "ניו יורק", event: "קונצרט קיץ", available: true },
];

const ShowsPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="הופעות" subtitle="הופעות ואירועים קרובים" />

      <div className="max-w-3xl mx-auto space-y-2">
        {shows.map((show, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.07 }}
            className="flex flex-col md:flex-row md:items-center justify-between py-5 px-4 rounded-xl hover:bg-secondary/50 transition-colors border-b border-border gap-3"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1">
              <span className="font-body text-xs font-medium text-foreground w-28">{show.date}</span>
              <span className="text-foreground font-body">{show.venue}</span>
              <span className="text-sm text-muted-foreground">— {show.city}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">{show.event}</span>
              {show.available && (
                <Link
                  to="/contact"
                  className="font-body text-xs font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  ← הזמנת כרטיסים
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-muted-foreground font-body mb-6">
          רוצים את נחמן באירוע שלכם?
        </p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground font-body font-medium text-xs px-6 py-3 rounded-full"
          >
            הזמינו עכשיו
          </Link>
        </motion.div>
      </div>
    </div>
  </div>
);

export default ShowsPage;
