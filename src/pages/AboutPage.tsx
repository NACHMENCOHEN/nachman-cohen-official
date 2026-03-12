import { motion } from "framer-motion";
import aboutImg from "@/assets/about-portrait.jpg";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const AboutPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
        >
          <img
            src={aboutImg}
            alt="Nachman Cohen performing at a wedding"
            className="w-full rounded-2xl img-frame"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="lg:pt-8"
        >
          <p className="font-ui text-xs text-primary mb-4">About</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
            Nachman Cohen
          </h1>

          <div className="space-y-5 text-muted-foreground font-body leading-relaxed max-w-prose">
            <p>
              Nachman Cohen is one of the most sought-after Hasidic singers in the
              Jewish music world today. With a voice that blends raw emotion with
              technical mastery, he has captivated audiences at hundreds of weddings,
              concerts, and community events across the United States and beyond.
            </p>
            <p>
              Born and raised in Brooklyn, New York, Nachman discovered his passion for
              music at a young age, singing in school choirs and performing at local
              celebrations. His unique ability to connect with audiences through both
              traditional niggunim and contemporary compositions quickly set him apart.
            </p>
            <p>
              With three studio albums to his name — "Simcha" (2021), "Emunah" (2023),
              and "Sacred Moments" (2025) — Nachman continues to push the boundaries
              of Jewish music while staying true to its spiritual roots. His performances
              are known for their energy, warmth, and ability to unite people in song.
            </p>
            <p>
              Whether performing an intimate Shabbos table melody or leading thousands
              in a concert hall, Nachman brings the same dedication, passion, and
              spiritual depth to every note.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
            {[
              { num: "500+", label: "Events" },
              { num: "3", label: "Albums" },
              { num: "10+", label: "Years" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-primary">{stat.num}</p>
                <p className="font-ui text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default AboutPage;
