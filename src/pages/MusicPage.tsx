import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageTransition from "@/components/PageTransition";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

interface Track {
  title: string;
  titleEn: string;
  audioSrc: string;
  cover?: string;
}

const tracks: Track[] = [
  { title: "רפואה", titleEn: "Refua", audioSrc: "/music/refua.m4a", cover: "/covers/refua.jpg" },
  { title: "למעלה", titleEn: "Lemala", audioSrc: "/music/lemala.mp3", cover: "/covers/lemala.jpg" },
  { title: "תפילין (קאבר)", titleEn: "Tefillin (Cover)", audioSrc: "/music/tefillin.mp3" },
  { title: "מיין טייערע לעכטעלע", titleEn: "Mein Taiere Lechtele", audioSrc: "/music/mein-taiere-lechtele.mp3" },
  { title: "התעוררי (קאבר)", titleEn: "Hisoreri (Cover)", audioSrc: "/music/hisoreri.mp4" },
  { title: "דמות עם צבע", titleEn: "Dmut Im Tzeva", audioSrc: "/music/dmut-im-tzeva.mp4", cover: "/covers/dmut-im-tzeva.jpg" },
  { title: "מיין טרייערעלע", titleEn: "Mein Treireleh", audioSrc: "/music/mein-treireleh.mp4" },
  { title: "ומרדכי ידע", titleEn: "U'Mordechai Yada", audioSrc: "/music/u-mordechai-yada.mp4" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spring, delay: i * 0.06 },
  }),
};

const TrackCard = ({ track, index }: { track: Track; index: number }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative aspect-square rounded-2xl overflow-hidden bg-card border border-border cursor-pointer hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all"
      onClick={togglePlay}
    >
      {track.cover ? (
        <motion.img
          src={track.cover}
          alt={track.titleEn}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-muted to-card flex items-center justify-center">
          <span className="font-display text-5xl text-muted-foreground/30 select-none">♪</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent transition-opacity" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
        >
          {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
        </motion.div>
      </div>

      {playing && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
        >
          <Pause size={12} />
        </motion.div>
      )}

      <div className="absolute bottom-0 inset-x-0 p-4">
        <p className="font-body text-foreground text-sm font-medium truncate">{track.titleEn}</p>
        <p className="font-body text-muted-foreground text-xs mt-0.5 truncate">{track.title}</p>
      </div>

      <audio ref={audioRef} src={track.audioSrc} onEnded={() => setPlaying(false)} />
    </motion.div>
  );
};

const MusicPage = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <SectionHeading title="Music" subtitle="Listen to Nachman Cohen's songs" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
          >
            {tracks.map((track, i) => (
              <TrackCard key={i} track={track} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MusicPage;
