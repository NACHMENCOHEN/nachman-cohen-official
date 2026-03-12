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
  { title: "דמות עם צבע", titleEn: "Dmut Im Tzeva", audioSrc: "/music/dmut-im-tzeva.wav", cover: "/covers/dmut-im-tzeva.jpg" },
  { title: "מיין טרייערעלע", titleEn: "Mein Treireleh", audioSrc: "/music/mein-treireleh.mp4" },
  { title: "ומרדכי ידע", titleEn: "U'Mordechai Yada", audioSrc: "/music/u-mordechai-yada.mp4" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spring, delay: i * 0.05 },
  }),
};

const TrackCard = ({ track, index }: { track: Track; index: number }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current || dragging) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const seekToPosition = (clientX: number) => {
    if (!audioRef.current || !duration || !barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * duration;
    setProgress(ratio * duration);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    seekToPosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    seekToPosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    seekToPosition(e.clientX);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
    >
      {/* Cover */}
      <div className="relative aspect-square overflow-hidden cursor-pointer group" onClick={togglePlay}>
        {track.cover ? (
          <motion.img
            src={track.cover}
            alt={track.titleEn}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-card flex items-center justify-center">
            <span className="font-display text-5xl text-muted-foreground/20 select-none">♪</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-opacity ${
              playing
                ? "bg-primary text-primary-foreground opacity-100"
                : "bg-primary/90 text-primary-foreground opacity-0 group-hover:opacity-100"
            }`}
          >
            {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </motion.div>
        </div>
      </div>

      {/* Title + Player */}
      <div className="px-4 py-3.5">
        <h3 className="font-body text-sm font-medium text-foreground truncate">{track.titleEn}</h3>
        <p className="font-body text-xs text-muted-foreground mt-0.5 truncate">{track.title}</p>

        {/* Progress */}
        <div className="mt-3">
          <div
            className="w-full h-1 bg-muted rounded-full cursor-pointer group/bar"
            onClick={seek}
          >
            <div
              className="h-full bg-primary rounded-full relative transition-all"
              style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-body text-[10px] text-muted-foreground">{formatTime(progress)}</span>
            <span className="font-body text-[10px] text-muted-foreground">{duration ? formatTime(duration) : "0:00"}</span>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.audioSrc}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        onEnded={() => setPlaying(false)}
      />
    </motion.div>
  );
};

const MusicPage = () => (
  <PageTransition>
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Music" subtitle="Listen to Nachman Cohen's songs" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {tracks.map((track, i) => (
            <TrackCard key={i} track={track} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  </PageTransition>
);

export default MusicPage;
