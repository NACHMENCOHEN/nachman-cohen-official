// Single source of truth for all songs. Add new releases at the top.
// Only fill links that really exist — empty fields are hidden on the page.
export interface Release {
  slug: string;
  title: string;
  titleEn: string;
  audioSrc: string;
  downloadable?: boolean; // Explicitly false disables website download UI for this release
  cover?: string;
  youtubeId?: string;
  videoTitle?: string;
  videoTitleEn?: string;
  releaseDate?: string; // YYYY-MM-DD
  isNew?: boolean;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  lyricsExcerpt?: string;
  credits?: { role: string; name: string }[];
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeMusicUrl?: string;
}

export const ARTIST = "נחמן כהן";
export const ARTIST_EN = "Nachman Cohen";
export const SITE_URL = "https://nachmancohen.com";

export const releases: Release[] = [
  {
    slug: "lachtige-shabbos",
    title: "לעכטיגע שבת",
    titleEn: "Lachtige Shabbos",
    audioSrc: "/music/lachtige-shabbos.mp3",
    downloadable: false,
    cover: "/covers/lachtige-shabbos.jpg",
    youtubeId: "8okNDLOM3mo",
    videoTitle: "נחמן כהן – לעכטיגע שבת | הקליפ הרשמי",
    videoTitleEn: "Nachman Cohen – Lachtige Shabbos | Official Music Video",
    releaseDate: "2026-10-22",
    isNew: true,
    description: "לעכטיגע שבת – שיר חדש בביצוע ובלחן של נחמן כהן. האזינו וצפו בקליפ הרשמי.",
    metaTitle: "לעכטיגע שבת – נחמן כהן | Lachtige Shabbos – Nachman Cohen",
    metaDescription: "לעכטיגע שבת, השיר החדש של נחמן כהן. לצפייה ולהאזנה בקליפ הרשמי באתר האמן.",
  },
  {
    slug: "asher-bachar-banu",
    title: "אשר בחר בנו",
    titleEn: "Asher Bachar Banu",
    audioSrc: "/music/asher-bachar-banu.mp3",
    cover: "/covers/asher-bachar-banu.jpg",
    youtubeId: "E0sWm7bJUEs",
    videoTitle: "נחמן כהן – אשר בחר בנו | LIVE",
    videoTitleEn: "Nachman Cohen – Asher Bachar Banu | LIVE",
    isNew: false,
    description: "\"אשר בחר בנו\" בביצוע ובלחן נחמן כהן. ביצוע LIVE מתוך אירוע.",
    metaTitle: "נחמן כהן – אשר בחר בנו | Nachman Cohen – Asher Bachar Banu",
    metaDescription: "\"אשר בחר בנו\" בביצוע ובלחן נחמן כהן. ביצוע LIVE מתוך אירוע. Nachman Cohen – Asher Bachar Banu.",
  },
  { slug: "refua", title: "רפואה", titleEn: "Refua", audioSrc: "/music/refua.mp3", cover: "/covers/refua.jpg", youtubeId: "kJYX_CN6XQg" },
  { slug: "lemala", title: "למעלה", titleEn: "Lemala", audioSrc: "/music/lemala.mp3", cover: "/covers/lemala.jpg", youtubeId: "5HJVtOdDoW4" },
  { slug: "tefillin", title: "תפילין (קאבר)", titleEn: "Tefillin (Cover)", audioSrc: "/music/tefillin.mp3", cover: "/covers/tefillin.jpg" },
  { slug: "mein-taiere-lechtele", title: "מיין טייערע לעכטעלע", titleEn: "Mein Taiere Lechtele", audioSrc: "/music/mein-taiere-lechtele.mp3", cover: "/covers/mein-taiere-lechtele.jpg" },
  { slug: "hisoreri", title: "התעוררי (קאבר)", titleEn: "Hisoreri (Cover)", audioSrc: "/music/hisoreri.mp4" },
  { slug: "mein-treireleh", title: "מיין טרייערעלע", titleEn: "Mein Treireleh", audioSrc: "/music/mein-treireleh.mp4", cover: "/covers/mein-treireleh.jpg", youtubeId: "IP8vxbsuQu8" },
  { slug: "u-mordechai-yada", title: "ומרדכי ידע", titleEn: "U'Mordechai Yada", audioSrc: "/music/u-mordechai-yada.mp4", cover: "/covers/u-mordechai-yada.jpg" },
];

export const getRelease = (slug?: string) => releases.find((r) => r.slug === slug);
