import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

// ── Promo config ──
const PROMO_CONFIG = {
  videoSrc: "/videos/promo.mp4",
  startDate: new Date("2025-03-24"),
  endDate: new Date("2025-04-07"),
  storageKey: "promo-video-last-shown",
  frequencyMs: 24 * 60 * 60 * 1000, // once per day
};

const isWithinPromoPeriod = () => {
  const now = new Date();
  return now >= PROMO_CONFIG.startDate && now <= PROMO_CONFIG.endDate;
};

const shouldShowToday = () => {
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
  const { lang } = useLanguage();
  const isHe = lang === "he";

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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={dismiss}
      dir={isHe ? "rtl" : "ltr"}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" />

      {/* modal */}
      <div
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/60 animate-in zoom-in-95 fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 end-3 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
          aria-label={isHe ? "סגור" : "Close"}
        >
          <X size={18} />
        </button>

        {/* video */}
        <video
          ref={videoRef}
          src={PROMO_CONFIG.videoSrc}
          controls
          autoPlay
          muted
          playsInline
          className="w-full aspect-video object-contain bg-black"
        />

        {/* skip button */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center z-20">
          <button
            onClick={dismiss}
            className="px-6 py-2.5 rounded-full text-sm font-medium bg-white/10 text-white/90 hover:bg-white/20 hover:text-white backdrop-blur-md border border-white/10 transition-all"
          >
            {isHe ? "דלג" : "Skip"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoVideoModal;
