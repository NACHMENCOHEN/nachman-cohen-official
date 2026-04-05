import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, RotateCcw, RotateCw, Download } from "lucide-react";

interface Track {
  title: string;
  titleEn: string;
  audioSrc: string;
  cover?: string;
}

interface MusicPlayerProps {
  tracks: Track[];
}

const HomeMusicPlayer = ({ tracks }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [dragging, setDragging] = useState(false);

  const current = tracks[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setPlaying(false);
      setProgress(0);
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const next = () => setCurrentIndex((i) => (i + 1) % tracks.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length);

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
    if (!dur || isNaN(dur)) return;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * dur;
    setProgress(ratio * dur);
    setDuration(dur);
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

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds));
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
      viewport={{ once: true }}
      transition={{ type: "spring", duration: 0.6, bounce: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="rounded-2xl bg-card border border-border p-6 md:p-8 stage-glow">
        <div className="text-center mb-6">
          <p className="font-body text-xs text-primary tracking-widest mb-2">מתנגן כעת</p>
          <h3 className="font-display text-3xl md:text-4xl text-foreground">{current.title}</h3>
          <p className="font-body text-sm text-muted-foreground mt-1">נחמן כהן</p>
        </div>

        <div className="mb-4">
          <div
            ref={barRef}
            className="w-full h-5 cursor-pointer group flex items-center touch-none select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div className="w-full h-1.5 bg-muted rounded-full relative">
              <div className="h-full bg-primary rounded-full pointer-events-none transition-all" style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }} />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: duration ? `calc(${(progress / duration) * 100}% - 7px)` : "0" }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-body text-xs text-muted-foreground">{formatTime(progress)}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => skip(-10)} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="אחורה 10 שניות">
                <RotateCcw size={14} />
              </button>
              <button onClick={() => skip(10)} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="קדימה 10 שניות">
                <RotateCw size={14} />
              </button>
            </div>
            <span className="font-body text-xs text-muted-foreground">{duration ? formatTime(duration) : "0:00"}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button onClick={() => setMuted(!muted)} className="text-muted-foreground hover:text-foreground transition-colors" aria-label={muted ? "הפעל קול" : "השתק"}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button onClick={prev} className="text-foreground hover:text-primary transition-colors" aria-label="הקודם">
            <SkipBack size={22} />
          </button>
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full gold-gradient text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            aria-label={playing ? "השהה" : "נגן"}
          >
            {playing ? <Pause size={22} /> : <Play size={22} className="ms-0.5" />}
          </button>
          <button onClick={next} className="text-foreground hover:text-primary transition-colors" aria-label="הבא">
            <SkipForward size={22} />
          </button>
          <a href={current.audioSrc} download className="text-muted-foreground hover:text-foreground transition-colors" aria-label="הורדה" onClick={(e) => e.stopPropagation()}>
            <Download size={18} />
          </a>
        </div>

        <audio ref={audioRef} src={current.audioSrc} muted={muted} preload="metadata" onTimeUpdate={onTimeUpdate} onLoadedMetadata={syncDuration} onDurationChange={syncDuration} onEnded={next} />
      </div>

      <div className="mt-4 space-y-1">
        {tracks.map((track, i) => (
          <div
            key={i}
            className={`w-full flex items-center justify-between py-3.5 px-5 rounded-xl transition-all cursor-pointer ${
              i === currentIndex ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
            }`}
            onClick={() => setCurrentIndex(i)}
          >
            <div className="flex items-center gap-4">
              <span className="font-body text-xs w-5 text-center">
                {i === currentIndex && playing ? (
                  <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                ) : (
                  i + 1
                )}
              </span>
              <span className="font-body text-sm">{track.title}</span>
            </div>
            <a
              href={track.audioSrc}
              download
              className="text-muted-foreground hover:text-primary transition-colors p-1"
              aria-label={`הורדת ${track.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={14} />
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeMusicPlayer;
