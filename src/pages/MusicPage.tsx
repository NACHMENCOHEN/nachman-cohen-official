import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

interface Song {
  title: string;
  album: string;
  duration: string;
  year: string;
}

const albums = [
  {
    name: "Sacred Moments",
    year: "2025",
    songs: [
      { title: "Kol Nidrei", album: "Sacred Moments", duration: "4:32", year: "2025" },
      { title: "Shabbos Medley", album: "Sacred Moments", duration: "6:15", year: "2025" },
      { title: "L'cha Dodi", album: "Sacred Moments", duration: "4:55", year: "2025" },
      { title: "Havdalah", album: "Sacred Moments", duration: "3:22", year: "2025" },
    ],
  },
  {
    name: "Emunah",
    year: "2023",
    songs: [
      { title: "Ani Ma'amin", album: "Emunah", duration: "5:01", year: "2023" },
      { title: "Tehillim Melody", album: "Emunah", duration: "4:18", year: "2023" },
      { title: "Modeh Ani", album: "Emunah", duration: "3:45", year: "2023" },
    ],
  },
  {
    name: "Simcha",
    year: "2021",
    songs: [
      { title: "Wedding Dance", album: "Simcha", duration: "3:48", year: "2021" },
      { title: "Hora Medley", album: "Simcha", duration: "7:20", year: "2021" },
      { title: "Mi Bon Siach", album: "Simcha", duration: "5:10", year: "2021" },
    ],
  },
];

const MusicPage = () => {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Music" subtitle="Explore Nachman Cohen's discography" />

        <div className="space-y-16">
          {albums.map((album, ai) => (
            <motion.div
              key={album.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: ai * 0.1 }}
            >
              <div className="flex items-baseline gap-3 mb-6">
                <h3 className="font-display text-2xl text-foreground">{album.name}</h3>
                <span className="font-ui text-xs text-muted-foreground">{album.year}</span>
              </div>

              <div className="space-y-1">
                {album.songs.map((song, si) => (
                  <motion.div
                    key={song.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...spring, delay: si * 0.07 }}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                  >
                    <button
                      onClick={() => setPlaying(playing === song.title ? null : song.title)}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    >
                      {playing === song.title ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span className="text-sm text-muted-foreground w-6">{si + 1}</span>
                    <span className="flex-1 text-foreground font-body">{song.title}</span>
                    <span className="text-sm text-muted-foreground">{song.duration}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
