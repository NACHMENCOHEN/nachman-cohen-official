import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const PROMO_CONFIG = {
  videoSrc: "/videos/promo.mp4",
  startDate: new Date("2026-03-24"),
  endDate: new Date("2026-04-07"),
  storageKey: "promo-video-last-shown",
  frequencyMs: 24 * 60 * 60 * 1000,
  testMode: true,
};

const isWithinPromoPeriod = () => {
  const now = new Date();
  return now >= PROMO_CONFIG.startDate && now <= PROMO_CONFIG.endDate;
};

const shouldShowToday = () => {
  if (PROMO_CONFIG.testMode) return true;
  try {
    const last = localStorage.getItem(PROMO_CONFIG.storageKey);
    if (!last) return true;
    return Date.now() - Number(last) >= PROMO_CONFIG.frequencyMs;
  } catch {
    return true;
  }
};

const markShown = () => {
  try {
    localStorage.setItem(PROMO_CONFIG.storageKey, String(Date.now()));
  } catch {}
};

const PromoVideoModal = () => {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isWithinPromoPeriod() && shouldShowToday()) {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    markShown();
    setOpen(false);
    if (videoRef.current) videoRef.current.pause();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={dismiss}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" />
      <div
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/60 animate-in zoom-in-95 fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-3 start-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
          aria-label="סגור"
        >
          <X size={18} />
        </button>
        <video ref={videoRef} src={PROMO_CONFIG.videoSrc} controls autoPlay muted playsInline className="w-full aspect-video object-contain bg-black" />
        <div className="absolute bottom-4 inset-x-0 flex justify-center z-20">
          <button onClick={dismiss} className="px-6 py-2.5 rounded-full text-sm font-medium bg-white/10 text-white/90 hover:bg-white/20 hover:text-white backdrop-blur-md border border-white/10 transition-all">
            דלג
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoVideoModal;
