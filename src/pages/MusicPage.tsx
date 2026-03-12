import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

interface Track {
  title: string;
  audioSrc: string;
  cover?: string;
}

const tracks: Track[] = [
  { title: "רפואה", audioSrc: "/music/refua.m4a" },
  { title: "למעלה", audioSrc: "/music/lemala.mp3", cover: "/covers/lemala.jpg" },
  { title: "תפילין (קאבר)", audioSrc: "/music/tefillin.mp3" },
  { title: "מיין טייערע לעכטעלע", audioSrc: "/music/mein-taiere-lechtele.mp3" },
  { title: "התעוררי (קאבר)", audioSrc: "/music/hisoreri.mp4" },
  { title: "דמות עם צבע", audioSrc: "/music/dmut-im-tzeva.mp4", cover: "/covers/dmut-im-tzeva.jpg" },
  { title: "מיין טרייערעלע", audioSrc: "/music/mein-treireleh.mp4" },
  { title: "ומרדכי ידע", audioSrc: "/music/u-mordechai-yada.mp4" },
];

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...spring, delay: index * 0.06 }}
      className="group relative aspect-square rounded-2xl overflow-hidden bg-card border border-border cursor-pointer"
      onClick={togglePlay}
    >
      {/* Cover image or gradient placeholder */}
      {track.cover ? (
        <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-muted to-card flex items-center justify-center">
          <span className="font-display text-5xl text-muted-foreground/30 select-none">♪</span>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent transition-opacity" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
          {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
        </div>
      </div>

      {/* Playing indicator */}
      {playing && (
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Pause size={12} />
        </div>
      )}

      {/* Title */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <p className="font-body text-foreground text-sm font-medium truncate">{track.title}</p>
        <p className="font-body text-muted-foreground text-xs mt-0.5">שיר {index + 1}</p>
      </div>

      <audio ref={audioRef} src={track.audioSrc} onEnded={() => setPlaying(false)} />
    </motion.div>
  );
};

const MusicPage = () => {
  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="שירים" subtitle="האזינו לשירים של נחמן כהן" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {tracks.map((track, i) => (
            <TrackCard key={i} track={track} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
