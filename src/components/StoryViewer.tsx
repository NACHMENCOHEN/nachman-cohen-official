import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Volume2, VolumeX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { markSeen, timeAgoHe, type Story } from "@/hooks/useStories";
import avatar from "@/assets/hero-portrait.jpg";

type Props = {
  stories: Story[];
  startIndex?: number;
  onClose: () => void;
};

const IMAGE_DURATION = 6000;

const StoryViewer = ({ stories, startIndex = 0, onClose }: Props) => {
  const [index, setIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>();
  const startedRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const story = stories[index];

  const goNext = useCallback(() => {
    setIndex((i) => {
      if (i >= stories.length - 1) {
        onClose();
        return i;
      }
      return i + 1;
    });
  }, [stories.length, onClose]);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  // lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // reset per story + mark seen + count view
  useEffect(() => {
    if (!story) return;
    setProgress(0);
    setLoading(true);
    elapsedRef.current = 0;
    markSeen(story.id);
    supabase.functions.invoke("story-view", { body: { id: story.id } }).catch(() => {});
  }, [story?.id]);

  // progress timer
  useEffect(() => {
    if (!story || loading) return;
    const duration =
      story.media_type === "video"
        ? (videoRef.current?.duration ? videoRef.current.duration * 1000 : story.duration_ms || 15000)
        : IMAGE_DURATION;

    startedRef.current = performance.now();

    const tick = (t: number) => {
      if (paused) {
        startedRef.current = t;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      elapsedRef.current += t - startedRef.current;
      startedRef.current = t;
      const p = Math.min(1, elapsedRef.current / duration);
      setProgress(p);
      if (p >= 1) {
        goNext();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [story?.id, loading, paused, goNext]);

  // pause/resume video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused, story?.id]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goNext();
      if (e.key === "ArrowRight") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  if (!story) return null;

  const next = stories[index + 1];

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in"
    >
      <div className="relative w-full h-[100svh] md:h-[92vh] md:w-auto md:aspect-[9/16] md:rounded-2xl overflow-hidden bg-black md:border md:border-primary/20 md:shadow-2xl">
        {/* media */}
        <div className="absolute inset-0 flex items-center justify-center">
          {story.media_type === "video" ? (
            <video
              key={story.id}
              ref={videoRef}
              src={story.media_url}
              className="w-full h-full object-contain"
              autoPlay
              playsInline
              muted={muted}
              preload="auto"
              onLoadedData={() => setLoading(false)}
              onEnded={goNext}
            />
          ) : (
            <img
              key={story.id}
              src={story.media_url}
              alt={story.caption ?? "Story"}
              className="w-full h-full object-contain"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-primary/80 text-sm font-body">
              טוען...
            </div>
          )}
        </div>

        {/* preload next image only */}
        {next?.media_type === "image" && <img src={next.media_url} alt="" className="hidden" aria-hidden />}

        {/* top gradient + progress */}
        <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <div className="flex gap-1.5">
            {stories.map((s, i) => (
              <div key={s.id} className="h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
                    transition: i === index ? "none" : "width .2s linear",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-3 pointer-events-auto">
            <img
              src={avatar}
              alt="נחמן כהן"
              className="w-9 h-9 rounded-full object-cover object-top ring-1 ring-primary/60"
            />
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm text-white leading-tight">נחמן כהן</p>
              <p className="text-[11px] text-white/60 leading-tight">{timeAgoHe(story.created_at)}</p>
            </div>
            {story.media_type === "video" && (
              <button
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "הפעל קול" : "השתק"}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="סגור"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* tap zones (RTL-agnostic: right = next per user's spec) */}
        <button
          aria-label="הקודם"
          className="absolute inset-y-0 left-0 w-1/3 z-10"
          onClick={goPrev}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
        />
        <button
          aria-label="הבא"
          className="absolute inset-y-0 right-0 w-2/3 z-10"
          onClick={goNext}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
        />

        {/* caption */}
        {(story.event_title || story.caption) && (
          <div className="absolute bottom-0 inset-x-0 z-20 p-5 pb-8 bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
            {story.event_title && (
              <p className="font-display text-primary text-base mb-1">{story.event_title}</p>
            )}
            {story.caption && (
              <p className="font-body text-white/90 text-sm leading-relaxed">{story.caption}</p>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default StoryViewer;
