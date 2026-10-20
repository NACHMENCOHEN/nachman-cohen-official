export const SITE_URL = "https://nachmancohen.com";
export const ARTIST_ID = `${SITE_URL}/#artist`;
export const ARTIST_IMAGE = `${SITE_URL}/nachman-artist-profile.png.png`;
export const SHARE_IMAGE = `${SITE_URL}/nachman-social-preview.jpg`;
export const SITE_NAME = "נחמן כהן • Nachman Cohen";

export const artistReference = { "@id": ARTIST_ID };

export const getPageSEO = (pathname: string, hostname: string, noindex = false) => {
  const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const privatePage = /^\/admin(?:\/|$)/.test(path) || path === "/unsubscribe";
  const preview = hostname === "lovable.app" || hostname.endsWith(".lovable.app");
  return {
    canonical: `${SITE_URL}${path}`,
    robots: noindex || privatePage || preview ? "noindex, nofollow" : "index, follow, max-image-preview:large",
  };
};
