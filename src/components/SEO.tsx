import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getPageSEO, SHARE_IMAGE, SITE_NAME, SITE_URL } from "@/lib/artist-seo";

interface SEOProps {
  title: string;
  description: string;
  /** Path like "/music". Sets canonical + og:url. */
  path?: string;
  image?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
}

const SEO = ({ title, description, path, image, jsonLd, noindex }: SEOProps) => {
  const location = useLocation();
  const { canonical, robots } = getPageSEO(path ?? location.pathname, window.location.hostname, noindex);
  const shareImage = image ? new URL(image, SITE_URL).href : SHARE_IMAGE;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:width" content={image ? undefined : "1200"} />
      <meta property="og:image:height" content={image ? undefined : "630"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      {jsonLd && <script type="application/ld+json" data-page="true">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;
