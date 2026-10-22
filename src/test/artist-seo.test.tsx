import { readFileSync, existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ARTIST_ID, artistReference, getPageSEO, SITE_URL } from "@/lib/artist-seo";
import { releases } from "@/data/releases";
import { videoPublicationDates } from "@/data/video-publication";

const html = readFileSync("index.html", "utf8");
const schemas = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g), (match) => JSON.parse(match[1]));

describe("artist identity", () => {
  it("uses YouTube's actual upload timestamp without inventing a song release date", () => {
    expect(videoPublicationDates.E0sWm7bJUEs).toBe("2026-09-28T06:47:25-07:00");
    expect(releases.find((release) => release.slug === "asher-bachar-banu")?.releaseDate).toBeUndefined();
  });
  it("defines exactly one solo Person and no conflicting band identity", () => {
    expect(schemas.filter((item) => item["@type"] === "Person")).toHaveLength(1);
    expect(schemas.some((item) => item["@type"] === "MusicGroup")).toBe(false);
    expect(schemas.find((item) => item["@type"] === "Person")["@id"]).toBe(ARTIST_ID);
    expect(artistReference).toEqual({ "@id": "https://nachmancohen.com/#artist" });
  });
  it("connects the site to the artist and all five supplied profiles", () => {
    const artist = schemas.find((item) => item["@type"] === "Person");
    const site = schemas.find((item) => item["@type"] === "WebSite");
    expect(site.name).toBe("נחמן כהן • Nachman Cohen");
    expect(site.about).toEqual(artistReference);
    expect(artist.alternateName).toEqual(["Nachman Cohen", "נחמן כהן - Nachman Cohen"]);
    expect(artist.sameAs).toEqual([
      "https://www.youtube.com/@nachman_cohen",
      "https://music.youtube.com/@nachman_cohen",
      "https://music.apple.com/us/artist/6817063247",
      "https://open.spotify.com/artist/3FW9FTp7VhD1x4B9TMN2iF",
      "https://musicbrainz.org/artist/b15ff3e7-467f-49cb-892b-ce2ca4ece6b5",
      "https://www.instagram.com/nachmencohen",
      "https://www.tiktok.com/@nachman_cohen_music",
    ]);
    expect(artist.sameAs.some((u: string) => u.includes("1895101943"))).toBe(false);
  });
  it("uses real public artist images", () => {
    const artist = schemas.find((item) => item["@type"] === "Person");
    expect(artist.image).toBe(`${SITE_URL}/nachman-artist-profile.png.png`);
    expect(existsSync("public/nachman-artist-profile.png.png")).toBe(true);
    expect(existsSync("public/artist-share.jpg")).toBe(true);
  });
});

describe("indexability", () => {
  it.each(["/", "/about", "/music", "/music/asher-bachar-banu", "/videos", "/contact"])("self-references public page %s", (path) => {
    expect(getPageSEO(path, "nachmancohen.com")).toEqual({ canonical: `${SITE_URL}${path}`, robots: "index, follow, max-image-preview:large" });
  });
  it.each(["/admin", "/admin/login", "/admin/stories", "/unsubscribe"])("does not index management page %s", (path) => {
    expect(getPageSEO(path, "nachmancohen.com").robots).toBe("noindex, nofollow");
  });
  it("keeps Lovable copies and missing pages out of search", () => {
    expect(getPageSEO("/", "nachman-cohen-official.lovable.app").robots).toBe("noindex, nofollow");
    expect(getPageSEO("/missing", "nachmancohen.com", true).robots).toBe("noindex, nofollow");
  });
  it("lists every public release and excludes private flows from the existing sitemap", () => {
    const xml = readFileSync("public/sitemap.xml", "utf8");
    const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), (match) => match[1]);
    expect(urls.sort()).toEqual(["/", "/about", "/music", "/videos", "/contact", ...releases.map((release) => `/music/${release.slug}`)].map((path) => `${SITE_URL}${path}`).sort());
  });
});