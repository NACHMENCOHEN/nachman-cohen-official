# Architecture rules

- Use react-helmet-async for route-owned metadata and canonicals; keep static sitewide identity and social fallback in index.html because this is a client-rendered Vite application.
- Use the shared artist SEO constants for stable solo-artist entity references; every recording references that entity instead of declaring another artist.
- Keep the existing static sitemap synchronized with public music catalog routes; exclude administrative and subscription-management flows and never infer lastmod from a build date.
- Keep public portrait and share-sized renditions sourced from the existing artist photograph; metadata URLs must resolve as actual image files.