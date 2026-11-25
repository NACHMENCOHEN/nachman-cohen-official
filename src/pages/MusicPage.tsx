import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, RotateCw, Download } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { type Release } from "@/data/releases";
import { usePublishedMusic } from "@/hooks/usePublishedMusic";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

type Track = Release;

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { ...spring, delay: i * 0.05 },
  }),
};

const VideoOnlyCard = ({ track, index }: { track: Track; index: number }) => (
  <motion.div custom={index} variants={cardVariants} className="group">
    <Link to={`/music/${track.slug}`} className="block">
      <div className="relative">
        <div className="relative z-10 aspect-square overflow-hidden rounded-sm ring-1 ring-foreground/15 shadow-[0_18px_40px_-12px_rgba(0,0,0,.8)]">
          <img src={track.cover} alt={`נחמן כהן – ${track.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute top-3 right-3 font-poster tracking-[0.2em] text-xs px-2.5 py-1 bg-primary text-primary-foreground" dir="ltr">NEW</span>
          <span className="absolute bottom-2 left-2 md:bottom-3 md:left-3 w-10 h-10 md:w-12 md:h-12 rounded-full gold-gradient flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <Play size={18} className="text-primary-foreground mr-[-2px]" fill="currentColor" />
          </span>
        </div>
      </div>
      <h3 className="font-condensed text-[1.7rem] md:text-4xl text-foreground mt-4 leading-none line-clamp-2 group-hover:text-primary transition-colors">{track.title}</h3>
      <p className="font-body text-xs text-muted-foreground truncate" dir="ltr" style={{ textAlign: "right" }}>Nachman Cohen – {track.titleEn}</p>
      <p className="font-body text-xs text-primary mt-2">האזינו וצפו בקליפ ←</p>
    </Link>
  </motion.div>
);

const AudioCard = ({ track, index }: { track: Track; index: number }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause();
    else {
      document.querySelectorAll("audio").forEach((el) => { if (el !== a) el.pause(); });
      a.play();
    }
    setPlaying(!playing);
  };

  const syncDuration = () => {
    const dur = audioRef.current?.duration;
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
    const ratio = Math.max(0, Math.min(1, (rect.right - clientX) / rect.width));
    const newTime = ratio * dur;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
    setDuration(dur);
  };

  const skip = (seconds: number) => {
    const a = audioRef.current;
    if (!a || !a.duration || !isFinite(a.duration)) return;
    a.currentTime = Math.max(0, Math.min(a.duration, a.currentTime + seconds));
    setProgress(a.currentTime);
  };

  const formatTime = (t: number) => `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;
  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <motion.div custom={index} variants={cardVariants} className="group">
      {/* sleeve + record */}
      <div className="relative cursor-pointer" onClick={togglePlay}>
        <div
          className={`vinyl absolute top-[6%] h-[88%] aspect-square rounded-full transition-all duration-700 ease-out ${
            playing ? "-left-[22%] spin-slow" : "left-[6%] group-hover:-left-[16%]"
          }`}
          aria-hidden
        />
        <div className="relative z-10 aspect-square overflow-hidden rounded-sm ring-1 ring-foreground/15 shadow-[0_18px_40px_-12px_rgba(0,0,0,.8)] bg-card">
          {track.cover ? (
            <img src={track.cover} alt={`נחמן כהן – ${track.title} – עטיפת השיר`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,hsl(38_30%_18%),hsl(30_5%_8%))]">
              <span className="font-condensed text-5xl md:text-6xl gold-text px-4 text-center">{track.title}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {track.isNew && <span className="absolute top-3 right-3 font-poster tracking-[0.2em] text-xs px-2.5 py-1 bg-primary text-primary-foreground" dir="ltr">NEW</span>}
          <motion.span
            whileTap={{ scale: 0.92 }}
            className="absolute bottom-2 left-2 md:bottom-3 md:left-3 w-10 h-10 md:w-12 md:h-12 rounded-full gold-gradient flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
          >
            {playing ? <Pause size={18} className="text-primary-foreground" fill="currentColor" /> : <Play size={18} className="text-primary-foreground mr-[-2px]" fill="currentColor" />}
          </motion.span>
        </div>
      </div>

      {/* info */}
      <h3 className="font-condensed text-[1.7rem] md:text-4xl text-foreground mt-4 leading-none line-clamp-2">
        <Link to={`/music/${track.slug}`} className="hover:text-primary transition-colors">{track.title}</Link>
      </h3>
      <p className="font-body text-xs text-muted-foreground truncate" dir="ltr" style={{ textAlign: "right" }}>Nachman Cohen – {track.titleEn}</p>

      <div
        ref={barRef}
        className="mt-3 h-4 flex items-center cursor-pointer touch-none select-none group/bar"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setDragging(true); seekToPosition(e.clientX); }}
        onPointerMove={(e) => dragging && seekToPosition(e.clientX)}
        onPointerUp={(e) => { setDragging(false); seekToPosition(e.clientX); }}
      >
        <div className="w-full h-[3px] bg-foreground/10 relative">
          <div className="absolute inset-y-0 right-0 bg-primary" style={{ width: `${pct}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity" style={{ right: `calc(${pct}% - 6px)` }} />
        </div>
      </div>
      <div className="flex items-center justify-between mt-1 font-body text-[11px] text-muted-foreground">
        <span>{formatTime(progress)}</span>
        <div className="flex items-center gap-3">
          <button onClick={() => skip(10)} className="hover:text-foreground transition-colors" aria-label="קדימה 10 שניות"><RotateCw size={13} /></button>
          <button onClick={() => skip(-10)} className="hover:text-foreground transition-colors" aria-label="אחורה 10 שניות"><RotateCcw size={13} /></button>
          {track.downloadable !== false && (
            <a href={track.audioSrc} download className="hover:text-primary transition-colors" aria-label="הורדה"><Download size={13} /></a>
          )}
        </div>
        <span>{duration ? formatTime(duration) : "0:00"}</span>
      </div>

      <audio ref={audioRef} src={track.audioSrc} controlsList={track.downloadable === false ? "nodownload" : undefined} preload="metadata"
        onTimeUpdate={onTimeUpdate} onLoadedMetadata={syncDuration} onDurationChange={syncDuration}
        onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} onEnded={() => setPlaying(false)} />
    </motion.div>
  );
};

const TrackCard = ({ track, index }: { track: Track; index: number }) =>
  !track.audioSrc && track.youtubeId ? <VideoOnlyCard track={track} index={index} /> : <AudioCard track={track} index={index} />;

const MusicPage = () => {
  const { tracks } = usePublishedMusic();
  return (
    <PageTransition>
      <SEO
        title="שירים של נחמן כהן – זמר חסידי | Nachman Cohen Music"
        description="האזינו לשירים של נחמן כהן, זמר חסידי מלונדון: לעכטיגע שבת, אשר בחר בנו, רפואה ועוד. Listen to Nachman Cohen – Hasidic singer from London."
        path="/music"
      />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="max-w-6xl mx-auto mb-14 md:mb-20"
          >
            <div className="flex items-end justify-between gap-6 border-b border-primary/20 pb-6">
              <h1 className="font-condensed text-7xl md:text-9xl text-foreground">מוזיקה</h1>
              <span className="font-poster text-2xl md:text-4xl tracking-[0.2em] text-primary/50 pb-3" dir="ltr">MUSIC</span>
            </div>
            <p className="text-muted-foreground font-body max-w-xl mt-6">
              אוסף השירים של נחמן כהן – מוזיקה חסידית, שירים מרגשים וביצועים מלאי נשמה. לחצו על עטיפה כדי להאזין.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-14 md:gap-y-16 max-w-6xl mx-auto"
          >
            {tracks.map((track, i) => (
              <TrackCard key={track.slug} track={track} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MusicPage;
