import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { videoPublicationDates } from "@/data/video-publication";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

interface YouTubeVideo {
  id: string;
  title: string;
  titleEn?: string;
  thumbQuality?: string;
  thumb?: string;
}

const videos: YouTubeVideo[] = [
  { id: "8okNDLOM3mo", title: "נחמן כהן – לעכטיגע שבת | הקליפ הרשמי", titleEn: "Nachman Cohen – Lachtige Shabbos | Official Music Video", thumbQuality: "hqdefault", thumb: "/covers/lachtige-shabbos-wide.jpg" },
  { id: "E0sWm7bJUEs", title: "נחמן כהן – אשר בחר בנו | LIVE", titleEn: "Nachman Cohen – Asher Bachar Banu | LIVE", thumbQuality: "hqdefault" },
  { id: "IP8vxbsuQu8", title: "מיין טרערעלע" },
  { id: "5HJVtOdDoW4", title: "למעלה", thumbQuality: "hqdefault" },
  { id: "kJYX_CN6XQg", title: "רפואה" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { ...spring, delay: i * 0.08 },
  }),
};

const VideosPage = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <PageTransition>
      <SEO
        title="קליפים והופעות של נחמן כהן | זמר חסידי"
        description="צפו בקליפים ובהופעות של נחמן כהן. קליפים, הופעות ורגעים מוזיקליים מיוחדים."
        path="/videos"
        jsonLd={videos.map((v) => ({ "@context": "https://schema.org", "@type": "VideoObject", name: v.title, description: `${v.title} – נחמן כהן`, thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, embedUrl: `https://www.youtube.com/embed/${v.id}`, contentUrl: `https://www.youtube.com/watch?v=${v.id}`, uploadDate: videoPublicationDates[v.id] }))}
      />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">וידאו</h1>
            <p className="text-muted-foreground font-body max-w-lg mx-auto mb-2">צפו בקליפים ובהופעות של נחמן כהן</p>
            <p className="text-muted-foreground/70 font-body text-sm max-w-xl mx-auto">
              קליפים, הופעות ורגעים מוזיקליים מיוחדים מתוך הדרך והעשייה של נחמן כהן.
            </p>
          </motion.div>

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
                    src={video.thumb ?? `https://img.youtube.com/vi/${video.id}/${video.thumbQuality || "maxresdefault"}.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={28} className="text-primary-foreground ms-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-body text-foreground text-sm">{video.title}</h3>
                  {video.titleEn && <p className="font-body text-muted-foreground text-xs mt-0.5" dir="ltr">{video.titleEn}</p>}
                  <p className="font-body text-muted-foreground text-xs mt-0.5">נחמן כהן</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

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
                title="נגן וידאו"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 start-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                aria-label="סגור"
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
