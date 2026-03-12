import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Music } from "lucide-react";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const MusicPage = () => {
  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Music" subtitle="Music Coming Soon" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <Music className="w-16 h-16 text-muted-foreground mb-6" strokeWidth={1.5} />
          <h3 className="font-display text-2xl text-foreground mb-2">Music Coming Soon</h3>
          <p className="font-body text-muted-foreground max-w-md">
            Stay tuned for upcoming releases. Follow Nachman Cohen on social media for updates.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MusicPage;
