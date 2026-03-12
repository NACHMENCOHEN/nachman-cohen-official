import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

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

const VideosPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="Videos" subtitle="Watch Nachman Cohen's music videos" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {videos.map((video, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.07 }}
            className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm"
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
      </div>
    </div>
  </div>
);

export default VideosPage;
