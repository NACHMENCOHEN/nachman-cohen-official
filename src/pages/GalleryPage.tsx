import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Camera } from "lucide-react";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const GalleryPage = () => (
  <div className="pt-28 pb-24 min-h-screen">
    <div className="container mx-auto px-6">
      <SectionHeading title="גלריה" subtitle="רגעים מעל ומאחורי הבמה" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        className="flex flex-col items-center justify-center py-24 px-6 border border-dashed border-border rounded-2xl"
      >
        <Camera className="w-16 h-16 text-muted-foreground/50 mb-6" />
        <h3 className="font-display text-2xl text-foreground mb-2">גלריה ריקה</h3>
        <p className="font-body text-muted-foreground text-center max-w-md">
          תמונות אמיתיות יעלו בקרוב.
        </p>
      </motion.div>
    </div>
  </div>
);

export default GalleryPage;
