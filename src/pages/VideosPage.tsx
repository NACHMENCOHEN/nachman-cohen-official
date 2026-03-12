import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import PageTransition from "@/components/PageTransition";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

interface VideoTrack {
  title: string;
  titleEn: string;
  videoSrc: string;
}

const videos: VideoTrack[] = [
  { title: "דמות עם צבע", titleEn: "Dmut Im Tzeva", videoSrc: "/music/dmut-im-tzeva.mp4" },
  { title: "מיין טייערע לעכטעלע", titleEn: "Mein Taiere Lechtele", videoSrc: "/music/mein-taiere-lechtele.mp4" },
  { title: "מיין טרערעלע", titleEn: "Mein Treireleh", videoSrc: "/music/mein-treireleh.mp4" },
  { title: "תפילין", titleEn: "Tefillin", videoSrc: "/music/tefillin.mp4" },
  { title: "התעוררי", titleEn: "Hisoreri", videoSrc: "/music/hisoreri.mp4" },
  { title: "ומרדכי ידע", titleEn: "U'Mordechai Yada", videoSrc: "/music/u-mordechai-yada.mp4" },
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

const VideosPage = () => (
  <PageTransition>
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Videos" subtitle="Watch Nachman Cohen's music videos" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {videos.map((video, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <video
                src={video.videoSrc}
                controls
                preload="metadata"
                className="w-full aspect-video object-cover"
              />
              <div className="p-4">
                <h3 className="font-body text-foreground text-sm">{video.titleEn}</h3>
                <p className="font-body text-muted-foreground text-xs mt-0.5">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </PageTransition>
);

export default VideosPage;
