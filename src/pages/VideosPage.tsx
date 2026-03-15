import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageTransition from "@/components/PageTransition";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

interface YouTubeVideo {
  id: string;
  title: string;
  titleHe: string;
}

const videos: YouTubeVideo[] = [
  { id: "6je9lysaUCg", title: "U'Mordechai Yada", titleHe: "ומרדכי ידע" },
  { id: "IP8vxbsuQu8", title: "Mein Treireleh", titleHe: "מיין טרערעלע" },
  { id: "OKDfi4QH9QE", title: "Dmut Im Tzeva", titleHe: "דמות עם צבע" },
  { id: "HBP93mSaqg0", title: "Hisoreri", titleHe: "התעוררי" },
  { id: "KSp9emysPns", title: "Mein Taiere Lechtele", titleHe: "מיין טייערע לעכטעלע" },
  { id: "iUSjCJjVrg8", title: "Tefillin", titleHe: "תפילין" },
  { id: "5HJVtOdDoW4", title: "Lemala", titleHe: "למעלה" },
  { id: "kJYX_CN6XQg", title: "Refuah", titleHe: "רפואה" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spring, delay: i * 0.08 },
  }),
};

const VideosPage = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <SectionHeading title="Videos" subtitle="Watch Nachman Cohen's music videos" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                custom={i}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group"
                onClick={() => setActiveVideo(video.id)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={28} className="text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-body text-foreground text-sm">{video.title}</h3>
                  <p className="font-body text-muted-foreground text-xs mt-0.5">{video.titleHe}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={spring}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default VideosPage;
