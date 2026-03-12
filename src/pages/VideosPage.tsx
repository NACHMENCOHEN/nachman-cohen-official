import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const videos = [
  { id: "dQw4w9WgXcQ", title: "מיין טייערע לעכטעלע — קליפ רשמי" },
  { id: "dQw4w9WgXcQ", title: "דמות עם צבע — קליפ רשמי" },
  { id: "dQw4w9WgXcQ", title: "הופעה חיה — ברוקלין" },
  { id: "dQw4w9WgXcQ", title: "מאחורי הקלעים — הקלטה באולפן" },
];

const VideosPage = () => (
  <div className="pt-28 pb-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="וידאו" subtitle="צפו בקליפים, הופעות חיות ורגעים מאחורי הקלעים" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, i) => (
          <motion.a
            key={i}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.07 }}
            className="card-hover rounded-2xl overflow-hidden group"
          >
            <div className="relative aspect-video bg-secondary">
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Play size={24} className="mr-[-2px]" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-body text-foreground text-sm">{video.title}</h3>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </div>
);

export default VideosPage;
