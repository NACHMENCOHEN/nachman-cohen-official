import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-portrait.jpg";
import MusicPlayer from "@/components/MusicPlayer";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-12 md:pb-24">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Nachman Cohen performing live on stage"
            className="w-full h-full object-cover img-frame"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground mb-4">
              Nachman<br />Cohen
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
              Live music for unforgettable events
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-block bg-primary text-primary-foreground font-ui text-xs px-6 py-3 rounded-lg"
                >
                  Book Nachman
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/music"
                  className="inline-block font-ui text-xs px-6 py-3 rounded-lg shadow-[inset_0_0_0_1px_hsl(210_10%_15%)] text-foreground"
                >
                  Listen Now
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.5 }}
            className="mt-12"
          >
            <MusicPlayer />
          </motion.div>
        </div>
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
            <p className="font-ui text-xs text-primary mb-4">Featured</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Bringing Joy to Every Simcha
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
              From intimate weddings to grand concerts, Nachman Cohen delivers
              powerful performances that elevate every celebration. With a repertoire
              spanning traditional niggunim, contemporary hits, and original compositions.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/about"
                className="inline-block font-ui text-xs px-6 py-3 rounded-lg shadow-[inset_0_0_0_1px_hsl(210_10%_15%)] text-foreground"
              >
                Learn More
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
            <p className="font-ui text-xs text-primary mb-8">Upcoming Shows</p>
            <div className="space-y-4">
              {[
                { date: "MAR 28, 2026", venue: "Grand Ballroom, Brooklyn, NY", event: "Private Wedding" },
                { date: "APR 15, 2026", venue: "Convention Center, Lakewood, NJ", event: "Community Concert" },
                { date: "MAY 02, 2026", venue: "The Palace, Monsey, NY", event: "Gala Dinner" },
              ].map((show, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: i * 0.07 }}
                  className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-border gap-2"
                >
                  <span className="font-ui text-xs text-primary">{show.date}</span>
                  <span className="text-foreground font-body">{show.venue}</span>
                  <span className="text-muted-foreground font-body text-sm">{show.event}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/shows" className="font-ui text-xs text-muted-foreground hover:text-foreground transition-colors">
                View All Shows →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
