import { useState, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { motion } from "framer-motion";

interface Track {
  title: string;
  album: string;
  duration: string;
}

const tracks: Track[] = [
  { title: "Kol Nidrei", album: "Sacred Moments", duration: "4:32" },
  { title: "Shabbos Medley", album: "Sacred Moments", duration: "6:15" },
  { title: "Ani Ma'amin", album: "Emunah", duration: "5:01" },
  { title: "Wedding Dance", album: "Simcha", duration: "3:48" },
  { title: "L'cha Dodi", album: "Sacred Moments", duration: "4:55" },
];

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const track = tracks[currentTrack];

  const next = () => setCurrentTrack((prev) => (prev + 1) % tracks.length);
  const prev = () => setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);

  return (
    <div className="glass-panel p-4 md:p-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward size={18} />
          </motion.button>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground truncate">{track.title}</p>
          <p className="text-xs text-muted-foreground truncate">{track.album}</p>
        </div>

        <div className="hidden sm:flex flex-1 items-center gap-3">
          <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: isPlaying ? "65%" : "0%" }}
              transition={{ duration: isPlaying ? 8 : 0.3 }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{track.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
