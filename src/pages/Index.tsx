import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Pause, Phone, MessageCircle, Music, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

/* ── Mini track player for homepage ── */
const HomeTrack = ({ title, titleEn, audioSrc, index }: { title: string; titleEn: string; audioSrc: string; index: number }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...spring, delay: index * 0.06 }}
      className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-secondary/50 transition-colors border-b border-border gap-4"
    >
      <div className="flex items-center gap-4 flex-1">
        <span className="font-body text-xs text-muted-foreground w-5">{index + 1}</span>
        <div>
          <span className="text-foreground font-body text-sm">{titleEn}</span>
          <span className="text-muted-foreground font-body text-xs mr-2 ml-2">({title})</span>
        </div>
      </div>
      <button
        onClick={togglePlay}
        className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-opacity shrink-0"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>
      <audio ref={audioRef} src={audioSrc} onEnded={() => setPlaying(false)} />
    </motion.div>
  );
};

/* ── Data ── */
const featuredTracks = [
  { title: "רפואה", titleEn: "Refua", audioSrc: "/music/refua.m4a" },
  { title: "למעלה", titleEn: "Lemala", audioSrc: "/music/lemala.mp3" },
  { title: "תפילין", titleEn: "Tefillin (Cover)", audioSrc: "/music/tefillin.mp3" },
];

const latestReleases = [
  { title: "מיין טייערע לעכטעלע", titleEn: "Mein Taiere Lechtele", type: "New Single" },
  { title: "תפילין", titleEn: "Tefillin", type: "New Single" },
  { title: "ומרדכי ידע", titleEn: "U'Mordechai Yada", type: "Music Video" },
];

/* ── Page ── */
const Index = () => {
  return (
    <div>
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top scale-110 blur-2xl brightness-50"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, duration: 1, delay: 0.1 }}
          className="absolute inset-0 z-[1] flex items-start justify-center"
        >
          <img
            src={heroImg}
            alt="Nachman Cohen"
            className="h-full object-contain"
          />
        </motion.div>

        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 z-[2] bg-background/20" />

        <div className="relative z-10 text-center pb-16 md:pb-24 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.5 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground mb-3"
          >
            Nachman Cohen
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.65 }}
            className="font-body text-sm text-muted-foreground mb-10 tracking-widest"
          >
            Hasidic Singer | Official Website
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/music"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-7 py-3.5 rounded-full"
              >
                <Music size={16} />
                Listen to Music
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-7 py-3.5 rounded-full border border-foreground/30 text-foreground backdrop-blur-sm"
              >
                <Calendar size={16} />
                Book a Show
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 2. MUSIC PREVIEW ═══════════════ */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="text-center mb-12"
          >
            <p className="font-body text-xs font-medium text-muted-foreground mb-3 tracking-widest">MUSIC</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Listen to Songs</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {featuredTracks.map((track, i) => (
              <HomeTrack key={i} title={track.title} titleEn={track.titleEn} audioSrc={track.audioSrc} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.3 }}
            className="text-center mt-10"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                to="/music"
                className="inline-block font-body font-medium text-xs px-6 py-3 rounded-full border border-foreground text-foreground"
              >
                All Songs →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 4. NEW RELEASES ═══════════════ */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="text-center mb-12"
          >
            <p className="font-body text-xs font-medium text-muted-foreground mb-3 tracking-widest">NEW</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Latest Releases</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {latestReleases.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.08 }}
                className="text-center py-8 px-4 rounded-2xl border border-border hover:bg-secondary/40 transition-colors"
              >
                <p className="font-body text-xs text-muted-foreground mb-2">{item.type}</p>
                <h3 className="font-display text-xl text-foreground">{item.titleEn}</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. BOOKING ═══════════════ */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="text-center"
          >
            <p className="font-body text-xs font-medium text-muted-foreground mb-3 tracking-widest">BOOKING</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              Book Nachman Cohen
            </h2>
            <p className="font-body text-lg text-foreground mb-2">
              Weddings • Bar Mitzvah • Private Events
            </p>
            <p className="font-body text-muted-foreground mb-6">For bookings please call:</p>

            <a
              href="tel:+447435952083"
              className="inline-block font-display text-3xl md:text-4xl text-foreground hover:text-muted-foreground transition-colors mb-10"
              dir="ltr"
            >
              +44 7435 952083
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="tel:+447435952083"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-medium text-sm px-7 py-3.5 rounded-full"
              >
                <Phone size={16} />
                Call Now
              </motion.a>
              <motion.a
                href="https://wa.me/447435952083"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-7 py-3.5 rounded-full border border-foreground text-foreground"
              >
                <MessageCircle size={16} />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 6. ABOUT PREVIEW ═══════════════ */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={spring}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="font-body text-xs font-medium text-muted-foreground mb-3 tracking-widest">ABOUT</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-8">Nachman Cohen</h2>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                to="/about"
                className="inline-block font-body font-medium text-xs px-6 py-3 rounded-full border border-foreground text-foreground"
              >
                Read More →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
