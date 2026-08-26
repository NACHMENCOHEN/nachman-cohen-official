import { useState } from "react";
import { useStories } from "@/hooks/useStories";
import StoryViewer from "@/components/StoryViewer";
import avatar from "@/assets/hero-portrait.jpg";

const LiveUpdates = () => {
  const { stories, loading, hasUnseen, refreshSeen } = useStories();
  const [open, setOpen] = useState(false);

  if (loading || stories.length === 0) return null;

  const close = () => {
    setOpen(false);
    refreshSeen();
  };

  return (
    <section id="live-updates" className="py-10 md:py-14 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-5 justify-center md:justify-start">
          <button
            onClick={() => setOpen(true)}
            aria-label="צפייה בעדכונים חיים"
            className="relative shrink-0 group"
          >
            <span
              className={`block rounded-full p-[3px] transition-all duration-500 ${
                hasUnseen
                  ? "bg-[conic-gradient(from_180deg,hsl(var(--primary)),#f5e3bd,hsl(var(--primary)),#8a6f3f,hsl(var(--primary)))] shadow-[0_0_24px_-6px_hsl(var(--primary)/0.8)] animate-[spin_6s_linear_infinite]"
                  : "bg-muted-foreground/25"
              }`}
            >
              <span className="block rounded-full p-[3px] bg-background">
                <img
                  src={avatar}
                  alt="נחמן כהן"
                  loading="lazy"
                  className={`w-[74px] h-[74px] md:w-[86px] md:h-[86px] rounded-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04] ${
                    hasUnseen ? "" : "opacity-80"
                  }`}
                />
              </span>
            </span>
            {hasUnseen && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-[2px] rounded-full bg-primary text-[10px] font-body text-primary-foreground whitespace-nowrap">
                חדש
              </span>
            )}
          </button>

          <div className="text-right">
            <h2 className="font-display text-xl md:text-2xl text-foreground">עדכונים חיים</h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {hasUnseen
                ? `${stories.length} עדכונים חדשים · זמינים ל־24 שעות`
                : "צפיתם בכל העדכונים · זמינים ל־24 שעות"}
            </p>
          </div>
        </div>
      </div>

      {open && <StoryViewer stories={stories} onClose={close} />}
    </section>
  );
};

export default LiveUpdates;
