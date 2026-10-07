import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_METADATA } from '../data/siteConfig';

type SeoProps = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  type?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const resolveUrl = (path?: string) => {
  if (!path) return `${SITE_METADATA.siteUrl}/Butter-Dosa.jpg`;
  if (path.startsWith('data:')) return `${SITE_METADATA.siteUrl}/Butter-Dosa.jpg`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_METADATA.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const resolveCanonical = (path: string) => {
  if (!path || path === '/') return `${SITE_METADATA.siteUrl}/`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_METADATA.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonicalPath = '/',
  image,
  type = 'website',
  noIndex = false,
  jsonLd,
}) => {
  const pageTitle = title
    ? title.includes('Udupi Vrindavan')
      ? title
      : `${title} | Udupi Vrindavan`
    : SITE_METADATA.siteName;

  const metaDescription = description || SITE_METADATA.description;
  const canonicalUrl = resolveCanonical(canonicalPath);
  const socialImage = resolveUrl(image);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={SITE_METADATA.keywords.join(', ')} />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:site_name" content={SITE_METADATA.siteName} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@UdupiVrindavan" />
      <meta name="twitter:creator" content="@UdupiVrindavan" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={pageTitle} />

      {jsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      ) : null}
    </Helmet>
  );
};

export default Seo;
