import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, Check, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { socialLinks } from "@/components/social-icons";
import { ARTIST, ARTIST_EN, SITE_URL } from "@/data/releases";
import { usePublishedMusic } from "@/hooks/usePublishedMusic";
import { artistReference } from "@/lib/artist-seo";
import { videoPublicationDates } from "@/data/video-publication";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };
const artistLink = (name: string) => socialLinks.find((s) => s.name === name)?.url;

const ReleasePage = () => {
  const { slug } = useParams();
  const { tracks, loading } = usePublishedMusic();
  const release = tracks.find(r => r.slug === slug);
  const [copied, setCopied] = useState(false);

  const jsonLd = useMemo(() => {
    if (!release) return undefined;
    const url = `${SITE_URL}/music/${release.slug}`;
    const data: object[] = [
      {
        "@context": "https://schema.org",
        "@type": "MusicRecording",
        name: release.title,
        alternateName: release.titleEn,
        byArtist: artistReference,
        url,
        inLanguage: "he",
        ...(release.cover && { image: release.cover.startsWith("http") ? release.cover : `${SITE_URL}${release.cover}` }),
        ...(release.releaseDate && { datePublished: release.releaseDate }),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "בית", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "מוזיקה", item: `${SITE_URL}/music` },
          { "@type": "ListItem", position: 3, name: release.title, item: url },
        ],
      },
    ];
    if (release.youtubeId) {
      data.push({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: release.videoTitle ?? `${ARTIST} – ${release.title}`,
        description: release.description ?? `${ARTIST} – ${release.title} (${ARTIST_EN} – ${release.titleEn})`,
        thumbnailUrl: `https://i.ytimg.com/vi/${release.youtubeId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${release.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${release.youtubeId}`,
        ...(videoPublicationDates[release.youtubeId] && { uploadDate: videoPublicationDates[release.youtubeId] }),
      });
    }
    return data;
  }, [release]);

  if (!release && loading) return <div role="status" className="py-32 text-center text-muted-foreground">טוען שיר...</div>;
  if (!release) return <NotFound />;

  const url = `${SITE_URL}/music/${release.slug}`;
  const shareText = `${ARTIST} – ${release.title}`;
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: shareText, url }); } catch { /* cancelled */ }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const listen = [
    { label: "Spotify", url: release.spotifyUrl ?? artistLink("Spotify") },
    { label: "Apple Music", url: release.appleMusicUrl ?? artistLink("Apple Music") },
    { label: "YouTube Music", url: release.youtubeMusicUrl },
    { label: "YouTube", url: release.youtubeId ? `https://youtu.be/${release.youtubeId}` : undefined },
  ].filter((l) => l.url);

  const others = tracks.filter((r) => r.slug !== release.slug).slice(0, 4);

  return (
    <PageTransition>
      <SEO
        title={release.metaTitle ?? `${ARTIST} – ${release.title} | ${ARTIST_EN} – ${release.titleEn}`}
        description={release.metaDescription ?? `האזינו לשיר "${release.title}" של ${ARTIST}. ${ARTIST_EN} – ${release.titleEn}.`}
        path={`/music/${release.slug}`}
        image={release.cover}
        jsonLd={jsonLd}
      />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <nav aria-label="breadcrumb" className="font-body text-xs text-muted-foreground mb-8 flex gap-2">
            <Link to="/" className="hover:text-primary">בית</Link><span>/</span>
            <Link to="/music" className="hover:text-primary">מוזיקה</Link><span>/</span>
            <span className="text-foreground">{release.title}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={spring}
            className="grid md:grid-cols-[280px_1fr] gap-10 items-center mb-14">
            {release.cover && (
              <div className="rounded-2xl overflow-hidden gold-border-glow">
                <img src={release.cover} alt={`${ARTIST} – ${release.title} – עטיפת השיר`} className="w-full aspect-square object-cover" />
              </div>
            )}
            <div>
              {release.isNew && (
                <span className="inline-block font-body text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-full bg-primary text-primary-foreground mb-4">חדש / NEW</span>
              )}
              <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">{release.title}</h1>
              <p className="font-body text-muted-foreground">{ARTIST}</p>
              <p className="font-body text-sm text-muted-foreground/70 mt-1" dir="ltr" style={{ textAlign: "right" }}>{ARTIST_EN} – {release.titleEn}</p>
              {release.releaseDate && (
                <p className="font-body text-xs text-muted-foreground mt-3">
                  תאריך יציאה: <time dateTime={release.releaseDate}>{new Date(release.releaseDate).toLocaleDateString("he-IL")}</time>
                </p>
              )}
              {release.description && <p className="font-body text-muted-foreground mt-5 leading-relaxed">{release.description}</p>}

              <div className="flex flex-wrap gap-3 mt-6">
                {listen.map((l) => (
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="font-body text-sm px-5 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all">{l.label}</a>
                ))}
                <button onClick={share} className="font-body text-sm px-5 py-2 rounded-full border border-border text-muted-foreground hover:text-primary inline-flex items-center gap-2">
                  {copied ? <Check size={14} /> : <Share2 size={14} />}{copied ? "הקישור הועתק" : "שיתוף"}
                </button>
                <a href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`} target="_blank" rel="noopener noreferrer"
                  className="font-body text-sm px-5 py-2 rounded-full border border-border text-muted-foreground hover:text-primary">WhatsApp</a>
              </div>
            </div>
          </motion.div>

          <audio controls controlsList={release.downloadable === false ? "nodownload" : undefined} preload="metadata" src={release.audioSrc} className="w-full mb-14" aria-label={`האזנה: ${release.title}`} />

          {release.youtubeId && (
            <section className="mb-14">
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-1">{release.videoTitle ?? `${ARTIST} – ${release.title}`}</h2>
              {release.videoTitleEn && <p className="font-body text-sm text-muted-foreground mb-5" dir="ltr" style={{ textAlign: "right" }}>{release.videoTitleEn}</p>}
              <div className="aspect-video rounded-2xl overflow-hidden border border-border">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${release.youtubeId}`}
                  title={release.videoTitle ?? release.title} loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </section>
          )}

          {release.lyricsExcerpt && (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-foreground mb-4">מתוך המילים</h2>
              <p className="font-body text-muted-foreground whitespace-pre-line leading-loose">{release.lyricsExcerpt}</p>
            </section>
          )}

          {release.credits?.length ? (
            <section className="mb-14">
              <h2 className="font-display text-2xl text-foreground mb-4">קרדיטים</h2>
              <ul className="font-body text-sm text-muted-foreground space-y-1">
                {release.credits.map((c) => <li key={c.role}><span className="text-foreground">{c.role}:</span> {c.name}</li>)}
              </ul>
            </section>
          ) : null}

          <section className="border-t border-border pt-10">
            <h2 className="font-display text-2xl text-foreground mb-5">עוד שירים של נחמן כהן</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {others.map((r) => (
                <li key={r.slug}>
                  <Link to={`/music/${r.slug}`} className="group block">
                    {r.cover ? <img src={r.cover} alt={`${ARTIST} – ${r.title}`} loading="lazy" className="rounded-xl aspect-square object-cover w-full" />
                      : <div className="rounded-xl aspect-square bg-card border border-border" />}
                    <span className="block font-body text-sm text-foreground mt-2 group-hover:text-primary">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-6 mt-8 font-body text-sm">
              <Link to="/music" className="text-primary inline-flex items-center gap-1"><ArrowRight size={14} />לכל השירים</Link>
              <Link to="/videos" className="text-muted-foreground hover:text-primary">קליפים והופעות</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary">אודות נחמן כהן</Link>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default ReleasePage;
