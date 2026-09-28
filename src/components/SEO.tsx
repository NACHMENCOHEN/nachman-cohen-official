import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  /** Path like "/music". Sets canonical + og:url. */
  path?: string;
  image?: string;
  jsonLd?: object | object[];
}

const SITE = "https://nachmancohen.com";

const setMeta = (selector: string, content: string) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute("content", content);
};

const SEO = ({ title, description, path, image, jsonLd }: SEOProps) => {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    if (path !== undefined) {
      const url = `${SITE}${path}`;
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", url);
      setMeta('meta[property="og:url"]', url);
    }
    if (image) {
      const abs = image.startsWith("http") ? image : `${SITE}${image}`;
      setMeta('meta[property="og:image"]', abs);
      setMeta('meta[name="twitter:image"]', abs);
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.page = "true";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      script?.remove();
    };
  }, [title, description, path, image, jsonLd]);

  return null;
};

export default SEO;
