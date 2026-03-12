import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
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

const TrackRow = ({ track, index }: { track: Track; index: number }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...spring, delay: index * 0.05 }}
      className="max-w-3xl mx-auto"
    >
      <div className="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all">
        {/* Cover Image */}
        <div className="relative aspect-[16/9] md:aspect-[2.5/1] overflow-hidden cursor-pointer group" onClick={togglePlay}>
          {track.cover ? (
            <motion.img
              src={track.cover}
              alt={track.titleEn}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-card flex items-center justify-center">
              <span className="font-display text-7xl text-muted-foreground/20 select-none">♪</span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all ${
                playing
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/90 text-primary-foreground opacity-0 group-hover:opacity-100"
              }`}
            >
              {playing ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </motion.div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="px-6 py-5">
          {/* Title */}
          <div className="mb-4">
            <h3 className="font-display text-2xl md:text-3xl text-foreground">{track.titleEn}</h3>
            <p className="font-body text-sm text-muted-foreground mt-1">{track.title}</p>
          </div>

          {/* Progress Bar */}
          <div
            className="w-full h-1.5 bg-muted rounded-full cursor-pointer group/bar"
            onClick={seek}
          >
            <div
              className="h-full bg-primary rounded-full relative transition-all"
              style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="font-body text-xs text-muted-foreground">{formatTime(progress)}</span>
            <span className="font-body text-xs text-muted-foreground">{duration ? formatTime(duration) : "0:00"}</span>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={track.audioSrc}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onTimeUpdate}
          onEnded={() => setPlaying(false)}
        />
      </div>
    </motion.div>
  );
};

const MusicPage = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <SectionHeading title="Music" subtitle="Listen to Nachman Cohen's songs" />

          <div className="space-y-8">
            {tracks.map((track, i) => (
              <TrackRow key={i} track={track} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MusicPage;
