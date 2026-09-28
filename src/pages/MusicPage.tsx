import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, RotateCw, Download } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

interface Track {
  title: string;
  titleEn: string;
  audioSrc: string;
  cover?: string;
}

const tracks: Track[] = [
  { title: "אשר בחר בנו", titleEn: "Asher Bachar Banu", audioSrc: "/music/asher-bachar-banu.mp3", cover: "/covers/asher-bachar-banu.jpg" },
  { title: "רפואה", titleEn: "Refua", audioSrc: "/music/refua.mp3", cover: "/covers/refua.jpg" },
  { title: "למעלה", titleEn: "Lemala", audioSrc: "/music/lemala.mp3", cover: "/covers/lemala.jpg" },
  { title: "תפילין (קאבר)", titleEn: "Tefillin (Cover)", audioSrc: "/music/tefillin.mp3", cover: "/covers/tefillin.jpg" },
  { title: "מיין טייערע לעכטעלע", titleEn: "Mein Taiere Lechtele", audioSrc: "/music/mein-taiere-lechtele.mp3", cover: "/covers/mein-taiere-lechtele.jpg" },
  { title: "התעוררי (קאבר)", titleEn: "Hisoreri (Cover)", audioSrc: "/music/hisoreri.mp4" },
  { title: "דמות עם צבע", titleEn: "Dmut Im Tzeva", audioSrc: "/music/dmut-im-tzeva.mp3", cover: "/covers/dmut-im-tzeva.jpg" },
  { title: "מיין טרייערעלע", titleEn: "Mein Treireleh", audioSrc: "/music/mein-treireleh.mp4", cover: "/covers/mein-treireleh.jpg" },
  { title: "ומרדכי ידע", titleEn: "U'Mordechai Yada", audioSrc: "/music/u-mordechai-yada.mp4", cover: "/covers/u-mordechai-yada.jpg" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
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

  const syncDuration = () => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration;
    if (dur && isFinite(dur)) setDuration(dur);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current || dragging) return;
    setProgress(audioRef.current.currentTime);
    syncDuration();
  };

  const seekToPosition = (clientX: number) => {
    if (!audioRef.current || !barRef.current) return;
    const dur = audioRef.current.duration;
    if (!dur || !isFinite(dur)) return;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = ratio * dur;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
    setDuration(dur);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
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

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration;
    if (!dur || !isFinite(dur)) return;
    const newTime = Math.max(0, Math.min(dur, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
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
      <div className="relative aspect-square overflow-hidden cursor-pointer group" onClick={togglePlay}>
        {track.cover ? (
          <motion.img src={track.cover} alt={track.title} className="w-full h-full object-cover" whileHover={{ scale: 1.04 }} transition={{ duration: 0.4 }} />
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
              playing ? "bg-primary text-primary-foreground opacity-100" : "bg-primary/90 text-primary-foreground opacity-0 group-hover:opacity-100"
            }`}
          >
            {playing ? <Pause size={18} /> : <Play size={18} className="ms-0.5" />}
          </motion.div>
        </div>
      </div>

      <div className="px-4 py-3.5">
        <h3 className="font-body text-sm font-medium text-foreground truncate">{track.title}</h3>
        <p className="font-body text-xs text-muted-foreground mt-0.5 truncate">נחמן כהן</p>

        <div className="mt-3">
          <div
            ref={barRef}
            className="w-full h-5 cursor-pointer group/bar flex items-center touch-none select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div className="w-full h-1.5 bg-muted rounded-full relative">
              <div className="h-full bg-primary rounded-full pointer-events-none" style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }} />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary shadow-md pointer-events-none opacity-0 group-hover/bar:opacity-100 transition-opacity"
                style={{ left: duration ? `calc(${(progress / duration) * 100}% - 7px)` : "0" }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-body text-[10px] text-muted-foreground">{formatTime(progress)}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => skip(-10)} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="אחורה 10 שניות">
                <RotateCcw size={12} />
              </button>
              <button onClick={() => skip(10)} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="קדימה 10 שניות">
                <RotateCw size={12} />
              </button>
            </div>
            <span className="font-body text-[10px] text-muted-foreground">{duration ? formatTime(duration) : "0:00"}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3">
        <a href={track.audioSrc} download className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Download size={12} />
          <span>הורדה</span>
        </a>
      </div>

      <audio ref={audioRef} src={track.audioSrc} preload="metadata" onTimeUpdate={onTimeUpdate} onLoadedMetadata={syncDuration} onDurationChange={syncDuration} onEnded={() => setPlaying(false)} />
    </motion.div>
  );
};

const MusicPage = () => {
  return (
    <PageTransition>
      <SEO
        title="מוזיקה של נחמן כהן | זמר חסידי"
        description="האזינו לשירים של נחמן כהן. אוסף השירים עם מוזיקה חסידית, שירים מרגשים וביצועים מלאי נשמה."
      />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">מוזיקה</h1>
            <p className="text-muted-foreground font-body max-w-lg mx-auto mb-2">האזינו לשירים של נחמן כהן</p>
            <p className="text-muted-foreground/70 font-body text-sm max-w-xl mx-auto">
              אוסף השירים של נחמן כהן עם מוזיקה חסידית, שירים מרגשים וביצועים מלאי נשמה, רגש וחיבור אמיתי.
            </p>
          </motion.div>

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
      <NewsletterSubscribe />
    </PageTransition>
  );
};

export default MusicPage;
