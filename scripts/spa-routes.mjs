// Copies dist/index.html into each app route so GitHub Pages answers with 200 instead of 404.
import { readFileSync, mkdirSync, copyFileSync } from "node:fs";

const releases = readFileSync("src/data/releases.ts", "utf8");
const slugs = [...releases.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const routes = ["music", "videos", "about", "contact", "admin", "admin/login", "admin/stories", "admin/music",
  ...slugs.map((s) => `music/${s}`)];

for (const r of routes) {
  mkdirSync(`dist/${r}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${r}/index.html`);
}
copyFileSync("dist/index.html", "dist/404.html");
console.log(`SPA routes written: ${routes.length}`);
