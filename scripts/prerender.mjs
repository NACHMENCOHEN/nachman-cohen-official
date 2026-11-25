// Renders every public page to static HTML after `vite build`, so search engines
// get the real title, description and text of each page without running JavaScript.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { chromium } from "@playwright/test";

const releases = readFileSync("src/data/releases.ts", "utf8");
const slugs = [...releases.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const publicRoutes = ["", "music", "videos", "about", "contact", ...slugs.map((s) => `music/${s}`)];
const appOnlyRoutes = ["admin", "admin/login", "admin/stories", "admin/music"];

const shell = readFileSync("dist/index.html", "utf8");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".mp4": "video/mp4", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  const path = decodeURIComponent(req.url.split("?")[0]);
  const file = join("dist", path);
  if (existsSync(file) && statSync(file).isFile()) {
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    return res.end(readFileSync(file));
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(shell);
}).listen(4999);

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const rendered = {};
for (const r of publicRoutes) {
  await page.goto(`http://localhost:4999/${r}`, { waitUntil: "networkidle" }).catch(() => {});
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    // show content that waits for scroll animations, and drop live third-party embeds
    document.querySelectorAll("[style]").forEach((el) => {
      if (/opacity:\s*0/.test(el.getAttribute("style"))) el.style.opacity = "1";
      el.style.transform = "";
    });
  });
  const html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
  rendered[r] = html;
  console.log(`prerendered /${r}  ${(await page.title())}`);
}
await browser.close();
server.close();

for (const [r, html] of Object.entries(rendered)) {
  const dir = r ? `dist/${r}` : "dist";
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, html);
  // GitHub Pages serves /about from about.html directly (no redirect to /about/)
  if (r) writeFileSync(`dist/${r}.html`, html);
}
for (const r of appOnlyRoutes) {
  mkdirSync(`dist/${r}`, { recursive: true });
  writeFileSync(`dist/${r}/index.html`, shell);
  writeFileSync(`dist/${r}.html`, shell);
}
writeFileSync("dist/404.html", shell);
