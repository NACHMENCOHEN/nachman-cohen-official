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
  { src: gallery1, alt: "Recording in the studio", span: "md:col-span-2" },
  { src: gallery3, alt: "Close-up performance", span: "md:row-span-2" },
  { src: gallery2, alt: "Live concert venue", span: "md:col-span-1" },
  { src: gallery4, alt: "Stage setup with dramatic lighting", span: "md:col-span-1" },
  { src: gallery5, alt: "Musical instruments", span: "md:col-span-1" },
  { src: gallery6, alt: "Celebration and dancing", span: "md:col-span-1" },
];

const GalleryPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="Gallery" subtitle="Moments captured on and off stage" />

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
