import { motion } from "framer-motion";
import aboutImg from "@/assets/about-portrait.jpg";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const AboutPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:[direction:ltr]">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
          className="order-1 lg:order-2"
        >
          <div className="aspect-square overflow-hidden rounded-2xl">
            <img
              src={aboutImg}
              alt="Nachman Cohen"
              className="w-full h-full object-cover object-[center_15%] -scale-x-100 shadow-lg shadow-foreground/5"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
          className="lg:pt-8 order-2 lg:order-1"
        >
          <p className="font-body text-xs font-medium text-muted-foreground mb-4 tracking-widest">ABOUT</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
            Nachman Cohen
          </h1>

          <div className="space-y-5 text-muted-foreground font-body leading-relaxed">
            <p>Nachman Cohen is a Hasidic singer who brings a warm and moving voice, blending traditional Hasidic melodies with a contemporary style.</p>
            <p>He began his musical journey at a very young age. At just 15 years old, Nachman released his debut single "Refua," and has since continued to create and release songs that express emotion, faith, and a deep connection to Jewish music.</p>
            <p>Over the years, Nachman has released several original songs and special covers of beloved melodies, with the central goal of bringing moving Hasidic music that speaks to the heart.</p>
            <p>Nachman performs at various events — weddings, bar mitzvahs, and special occasions — bringing an authentic Hasidic atmosphere alongside joy and energy that uplifts the audience.</p>
            <p>Today, Nachman continues to work on new songs and additional musical projects, driven by a desire to bring joyful, deep, and soulful Jewish music to the world.</p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

export default AboutPage;
