import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const shows = [
  { date: "MAR 28, 2026", venue: "Grand Ballroom", city: "Brooklyn, NY", event: "Private Wedding", available: false },
  { date: "APR 15, 2026", venue: "Convention Center", city: "Lakewood, NJ", event: "Community Concert", available: true },
  { date: "MAY 02, 2026", venue: "The Palace", city: "Monsey, NY", event: "Gala Dinner", available: false },
  { date: "MAY 18, 2026", venue: "Ateres Avrohom", city: "Brooklyn, NY", event: "Wedding", available: false },
  { date: "JUN 08, 2026", venue: "Bell Works", city: "Holmdel, NJ", event: "Corporate Event", available: true },
  { date: "JUN 22, 2026", venue: "Terrace on the Park", city: "Queens, NY", event: "Benefit Concert", available: true },
  { date: "JUL 10, 2026", venue: "The Sands", city: "Atlantic Beach, NY", event: "Summer Concert", available: true },
];

const ShowsPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="Live Shows" subtitle="Upcoming performances and events" />

      <div className="max-w-3xl mx-auto space-y-2">
        {shows.map((show, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.07 }}
            className="flex flex-col md:flex-row md:items-center justify-between py-5 px-4 rounded-lg hover:bg-secondary/30 transition-colors border-b border-border gap-3"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1">
              <span className="font-ui text-xs text-primary w-28">{show.date}</span>
              <span className="text-foreground font-body">{show.venue}</span>
              <span className="text-sm text-muted-foreground">— {show.city}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">{show.event}</span>
              {show.available && (
                <Link
                  to="/contact"
                  className="font-ui text-xs text-primary hover:text-foreground transition-colors"
                >
                  Get Tickets →
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-muted-foreground font-body mb-6">
          Want Nachman at your event?
        </p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground font-ui text-xs px-6 py-3 rounded-lg"
          >
            Book Now
          </Link>
        </motion.div>
      </div>
    </div>
  </div>
);

export default ShowsPage;
