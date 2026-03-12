import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const shows = [
  { date: "Mar 28, 2026", venue: "The Grand Hall", city: "Brooklyn, NY", event: "Private Wedding", available: false },
  { date: "Apr 15, 2026", venue: "Convention Center", city: "Lakewood, NJ", event: "Community Concert", available: true },
  { date: "May 2, 2026", venue: "The Palace", city: "Monsey, NY", event: "Gala Evening", available: false },
  { date: "May 18, 2026", venue: "Ateres Avraham", city: "Brooklyn, NY", event: "Wedding", available: false },
  { date: "Jun 8, 2026", venue: "Bell Works", city: "New Jersey", event: "Corporate Event", available: true },
  { date: "Jun 22, 2026", venue: "Terrace on the Park", city: "Queens, NY", event: "Charity Concert", available: true },
  { date: "Jul 10, 2026", venue: "The Sands", city: "New York", event: "Summer Concert", available: true },
];

const ShowsPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="Shows" subtitle="Upcoming shows and events" />

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
            className="inline-block bg-primary text-primary-foreground font-body font-medium text-xs px-6 py-3 rounded-full"
          >
            Book Now
          </Link>
        </motion.div>
      </div>
    </div>
  </div>
);

export default ShowsPage;
