import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const photos = [
  { src: gallery1, alt: "הקלטה באולפן", span: "md:col-span-2" },
  { src: gallery3, alt: "הופעה מקרוב", span: "md:row-span-2" },
  { src: gallery2, alt: "קונצרט חי", span: "md:col-span-1" },
  { src: gallery4, alt: "תאורה דרמטית על הבמה", span: "md:col-span-1" },
  { src: gallery5, alt: "כלי נגינה", span: "md:col-span-1" },
  { src: gallery6, alt: "חגיגה וריקודים", span: "md:col-span-1" },
];

const GalleryPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="גלריה" subtitle="רגעים מעל ומאחורי הבמה" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.07 }}
            className={`overflow-hidden rounded-2xl ${photo.span}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover img-frame hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default GalleryPage;
