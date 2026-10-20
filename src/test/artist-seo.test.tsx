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
    expect(artist.sameAs).toEqual([
      "https://www.instagram.com/nachmencohen",
      "https://youtube.com/@nachman_cohen",
      "https://www.tiktok.com/@nachman_cohen_music",
      "https://open.spotify.com/artist/3FW9FTp7VhD1x4B9TMN2iF",
      "https://music.apple.com/gb/artist/%D7%A0%D7%97%D7%9E%D7%9F-%D7%9B%D7%94%D7%9F-nachmancohen/1895101943",
    ]);
  });
  it("uses real public artist images", () => {
    const artist = schemas.find((item) => item["@type"] === "Person");
    expect(artist.image).toBe(`${SITE_URL}/hero-portrait.jpg`);
    expect(existsSync("public/hero-portrait.jpg")).toBe(true);
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