import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

interface Track {
  title: string;
  audioSrc: string;
}

const tracks: Track[] = [
  { title: "רפואה", audioSrc: "/music/refua.m4a" },
  { title: "למעלה", audioSrc: "/music/lemala.mp3" },
  { title: "תפילין (קאבר)", audioSrc: "/music/tefillin.mp3" },
  { title: "מיין טייערע לעכטעלע", audioSrc: "/music/mein-taiere-lechtele.mp3" },
  { title: "התעוררי (קאבר)", audioSrc: "/music/hisoreri.mp4" },
  { title: "דמות עם צבע", audioSrc: "/music/dmut-im-tzeva.mp4" },
  { title: "מיין טרייערעלע", audioSrc: "/music/mein-treireleh.mp4" },
  { title: "ומרדכי ידע", audioSrc: "/music/u-mordechai-yada.mp4" },
];

const TrackRow = ({ track, index }: { track: Track; index: number }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...spring, delay: index * 0.07 }}
      className="border-b border-border"
    >
      <div className="flex items-center justify-between py-5 px-4 rounded-xl hover:bg-secondary/50 transition-colors gap-4">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-body text-xs text-muted-foreground w-6">{index + 1}</span>
          <span className="text-foreground font-body text-sm">{track.title}</span>
        </div>

        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label={playing ? "השהה" : "נגן"}
        >
          {playing ? <Pause size={14} /> : <Play size={14} className="mr-[-1px]" />}
        </button>
      </div>

      <audio
        ref={audioRef}
        src={track.audioSrc}
        onEnded={() => setPlaying(false)}
      />
    </motion.div>
  );
};

const MusicPage = () => {
  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="שירים" subtitle="האזינו לשירים של נחמן כהן" />

        <div className="max-w-3xl mx-auto">
          {tracks.map((track, i) => (
            <TrackRow key={i} track={track} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
