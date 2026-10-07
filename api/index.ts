import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

type ApiRequest = IncomingMessage & { url?: string; headers: Record<string, string | string[] | undefined> };
type ApiResponse = ServerResponse & {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => ApiResponse;
  send: (body: string) => void;
};

// Valid known public routes
const VALID_ROUTES = new Set([
  '/',
  '/about',
  '/contact',
  '/reach-us',
  '/menu',
  '/privacy',
  '/privacy-policy',
  '/terms-of-service',
  '/visit-udupi',
  '/blog',
  '/blog/admin',
  '/llms.txt',
  '/llms-full.txt',
  '/sitemap.xml',
  '/robots.txt',
  '/Menu.pdf'
]);

const isDynamicValidRoute = (urlPath: string) => {
  const clean = urlPath.split('?')[0].replace(/\/$/, '') || '/';
  if (VALID_ROUTES.has(clean)) return true;
  if (clean.startsWith('/blog/')) return true;
  return false;
};

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const STATIC_ROUTE_METADATA: Record<string, RouteMeta> = {
  '/': {
    title: 'Udupi Vrindavan | Authentic Udupi & South Indian Vegetarian Cuisine in Dubai',
    description: 'Visit Udupi Vrindavan in Al Karama for authentic Udupi and South Indian vegetarian dishes, including dosa, idli, vada, and healthy Karnataka cuisine.',
    canonical: 'https://udupivrindavan.com/',
    image: 'https://udupivrindavan.com/Butter-Dosa.jpg',
    type: 'restaurant'
  },
  '/about': {
    title: 'About Us | Authentic South Indian Vegetarian Dining Philosophy in Dubai',
    description: "Learn about Udupi Vrindavan's philosophy of pure Satvik food, authentic Karnataka culinary traditions, and ethical kitchen practices in Al Karama, Dubai.",
    canonical: 'https://udupivrindavan.com/about',
    image: 'https://udupivrindavan.com/host.jpeg',
    type: 'article'
  },
  '/contact': {
    title: 'Contact Us & Location | Udupi Vrindavan Restaurant Al Karama, Dubai',
    description: 'Get in touch with Udupi Vrindavan Restaurant in Al Karama, Dubai. View address in WASL Opal, phone number, WhatsApp, opening hours, and directions.',
    canonical: 'https://udupivrindavan.com/contact',
    image: 'https://udupivrindavan.com/Butter-Dosa.jpg',
    type: 'website'
  },
  '/reach-us': {
    title: 'Contact Us & Location | Udupi Vrindavan Restaurant Al Karama, Dubai',
    description: 'Get in touch with Udupi Vrindavan Restaurant in Al Karama, Dubai. View address in WASL Opal, phone number, WhatsApp, opening hours, and directions.',
    canonical: 'https://udupivrindavan.com/contact',
    image: 'https://udupivrindavan.com/Butter-Dosa.jpg',
    type: 'website'
  },
  '/visit-udupi': {
    title: 'Visit Udupi | Udupi food, South Indian heritage and Karnataka cuisine',
    description: "Explore Udupi's temple heritage, coastal beauty, and vegetarian cuisine, then visit Udupi Vrindavan in Al Karama, Dubai for authentic South Indian food.",
    canonical: 'https://udupivrindavan.com/visit-udupi',
    image: 'https://udupivrindavan.com/VisitUdupi_Gallery/udupi.webp',
    type: 'website'
  },
  '/blog': {
    title: 'Blog | Udupi Vrindavan stories about South Indian food and heritage',
    description: 'Read stories about Udupi cuisine, Karnataka traditions, vegetarian food culture, and the story behind Udupi Vrindavan in Dubai.',
    canonical: 'https://udupivrindavan.com/blog',
    image: 'https://udupivrindavan.com/Butter-Dosa.jpg',
    type: 'website'
  },
  '/menu': {
    title: 'Dining Menu | Authentic South Indian & Udupi Vegetarian Dishes | Udupi Vrindavan',
    description: 'Explore authentic South Indian and Udupi vegetarian menu dishes at Udupi Vrindavan in Al Karama, Dubai.',
    canonical: 'https://udupivrindavan.com/menu',
    image: 'https://udupivrindavan.com/Butter-Dosa.jpg',
    type: 'website'
  },
  '/privacy': {
    title: 'Privacy Policy | Udupi Vrindavan Restaurant Dubai',
    description: 'Read the privacy policy for Udupi Vrindavan Restaurant LLC and how we safeguard visitor information and user privacy.',
    canonical: 'https://udupivrindavan.com/privacy',
    image: 'https://udupivrindavan.com/logo.png',
    type: 'website'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Udupi Vrindavan Restaurant Dubai',
    description: 'Read the privacy policy for Udupi Vrindavan Restaurant LLC and how we safeguard visitor information and user privacy.',
    canonical: 'https://udupivrindavan.com/privacy',
    image: 'https://udupivrindavan.com/logo.png',
    type: 'website'
  },
  '/terms-of-service': {
    title: 'Terms of Use | Udupi Vrindavan Restaurant Dubai',
    description: 'Review the terms of use for Udupi Vrindavan Restaurant LLC website and services.',
    canonical: 'https://udupivrindavan.com/terms-of-service',
    image: 'https://udupivrindavan.com/logo.png',
    type: 'website'
  }
};

const GOOGLE_SHEETS_URL = process.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbyaBHnmNalAdlbWn7y5mcuSxWiIrKQUxlOa6ElBaXXmYt86IP-173Zm7yfwSExhdIgpLA/exec';

let blogPostsCache: Array<{ slug?: string; title?: string; excerpt?: string; date?: string; image?: string; category?: string; author?: string }> | null = null;
let blogCacheTimestamp = 0;
const BLOG_CACHE_TTL = 10 * 60 * 1000;

async function getBlogPostMeta(slug: string): Promise<RouteMeta> {
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();
  const canonicalUrl = `https://udupivrindavan.com/blog/${cleanSlug}`;

  try {
    if (!blogPostsCache || Date.now() - blogCacheTimestamp > BLOG_CACHE_TTL) {
      const response = await fetch(`${GOOGLE_SHEETS_URL}?action=getPosts`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          blogPostsCache = data;
          blogCacheTimestamp = Date.now();
        }
      }
    }

    if (blogPostsCache) {
      const match = blogPostsCache.find((p) => {
        const pSlug = (p.slug || '').trim().toLowerCase();
        const genSlug = (p.title || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        return pSlug === cleanSlug || genSlug === cleanSlug;
      });

      if (match) {
        const cleanTitle = (match.title || '').replace(/<[^>]*>/g, '').trim();
        const cleanExcerpt = (match.excerpt || '').replace(/<[^>]*>/g, '').trim();
        const safeImage = match.image && !match.image.startsWith('data:') && match.image.startsWith('http')
          ? match.image
          : 'https://udupivrindavan.com/Butter-Dosa.jpg';

        const jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl
          },
          headline: cleanTitle,
          description: cleanExcerpt,
          image: [safeImage],
          datePublished: match.date ? new Date(match.date).toISOString() : undefined,
          dateModified: match.date ? new Date(match.date).toISOString() : undefined,
          articleSection: match.category || 'Tradition',
          inLanguage: 'en-US',
          author: {
            '@type': 'Organization',
            name: match.author || 'Udupi Vrindavan Restaurant LLC',
            url: 'https://udupivrindavan.com'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Udupi Vrindavan',
            logo: {
              '@type': 'ImageObject',
              url: 'https://udupivrindavan.com/logo.png'
            }
          }
        };

        return {
          title: `${cleanTitle} | Udupi Vrindavan Blog`,
          description: cleanExcerpt,
          canonical: canonicalUrl,
          image: safeImage,
          type: 'article',
          jsonLd
        };
      }
    }
  } catch (err) {
    console.error('Failed to fetch blog post meta from Google Sheets:', err);
  }

  const titleWords = cleanSlug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${titleWords || 'Journal'} | Udupi Vrindavan Blog`,
    description: `Read about ${titleWords || 'authentic culinary stories'} and South Indian traditions at Udupi Vrindavan, Dubai.`,
    canonical: canonicalUrl,
    image: 'https://udupivrindavan.com/Butter-Dosa.jpg',
    type: 'article'
  };
}

function injectMetadata(html: string, meta: RouteMeta): string {
  let updated = html;

  const escapeAttr = (val: string) => val.replace(/"/g, '&quot;');

  // Title
  updated = updated.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // Meta description
  updated = updated.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${escapeAttr(meta.description)}" />`);

  // Canonical
  updated = updated.replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i, `<link rel="canonical" href="${meta.canonical}" />`);

  // Open Graph
  updated = updated.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${escapeAttr(meta.title)}" />`);
  updated = updated.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${escapeAttr(meta.description)}" />`);
  updated = updated.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:url" content="${meta.canonical}" />`);
  if (meta.image) {
    updated = updated.replace(/<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:image" content="${meta.image}" />`);
  }
  if (meta.type) {
    updated = updated.replace(/<meta\s+property=["']og:type["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:type" content="${meta.type}" />`);
  }

  // Twitter
  updated = updated.replace(/<meta\s+property=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="twitter:title" content="${escapeAttr(meta.title)}" />`);
  updated = updated.replace(/<meta\s+property=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="twitter:description" content="${escapeAttr(meta.description)}" />`);
  if (meta.image) {
    updated = updated.replace(/<meta\s+property=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="twitter:image" content="${meta.image}" />`);
  }

  // Inject route-specific JSON-LD before </head> if provided
  if (meta.jsonLd) {
    const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`;
    updated = updated.replace('</head>', `  ${jsonLdTag}\n</head>`);
  }

  return updated;
}

// Generates markdown representation for Content Negotiation
const getMarkdownForRoute = (urlPath: string): string => {
  const clean = urlPath.split('?')[0].replace(/\/$/, '') || '/';

  if (clean === '/about') {
    return `# About Udupi Vrindavan

> Authentic Udupi & South Indian Vegetarian Cuisine in Al Karama, Dubai.

## Our Philosophy
At Udupi Vrindavan, we believe food is sacred. We offer pure Satvik vegetarian dining prepared without artificial coloring, preservatives, or reheated oils. Our kitchen uses only pure Nandini ghee and coconut oil, crafted by experienced cooks from Karnataka.

## Ancient Wisdom
- "Annena jaathani jivanthi" — All living beings subsist on food.
- "Aaharo mahaabhaishajyam uchyathe" — Healthy food is called the ultimate medicine.
- "Yatha annam tatha manah" — Your thoughts are influenced by the food you consume.

## Location & Contact
- **Address:** FB04, WASL Opal, Street 26, Al Karama, Dubai, UAE
- **Phone:** +971 42 7253 23
- **WhatsApp:** +971 56 301 8186
- **Hours:** Daily 7:00 AM – 11:00 PM
- **Online Orders:** https://order.udupivrindavan.com
`;
  }

  if (clean === '/contact' || clean === '/reach-us') {
    return `# Contact & Location — Udupi Vrindavan

## Restaurant Information
- **Business Name:** Udupi Vrindavan Restaurant LLC
- **Address:** FB04, WASL Opal, Street 26, Al Karama, Dubai, United Arab Emirates
- **Telephone:** +971 42 7253 23
- **WhatsApp:** +971 56 301 8186 (https://wa.me/971563018186)
- **Email:** info@UdupiVrindavan.com
- **Operating Hours:** Daily Monday – Sunday, 7:00 AM – 11:00 PM
- **Cuisine:** Authentic Udupi, South Indian, Karnataka Vegetarian

## Delivery Platforms
Available on Noon, Careem, Talabat, Deliveroo, Smiles, and Keeta.
Direct Online Ordering: https://order.udupivrindavan.com
`;
  }

  if (clean === '/visit-udupi') {
    return `# Visit Udupi Cultural Guide — Udupi Vrindavan

## About Udupi
Udupi is a celebrated coastal town in Karnataka, India, famous for its 13th-century Sri Krishna Temple, silver-sand Malpe Beach, unique basaltic rock formations at St. Mary's Island, and world-renowned Satvik vegetarian culinary traditions.

## Culinary Highlights
- Ghee Roast Dosa
- Neer Dosa
- Kotte Kadubu (steamed in jackfruit leaves)
- Authentic Filter Kaapi

Visit Udupi Vrindavan in Al Karama, Dubai to experience these authentic flavors.
`;
  }

  if (clean === '/menu') {
    return `# Dining Menu — Udupi Vrindavan Restaurant Dubai

Explore our authentic South Indian and Karnataka vegetarian specialties prepared with pure Nandini ghee, fresh ingredients, and traditional cookware.

## Specialties
- Ghee Roast Dosa
- Butter Masala Dosa
- Pudi Dosa
- Soft Steamed Idli & Vada
- Kotte Kadubu
- Authentic Filter Kaapi

- Full Dining Menu PDF: https://udupivrindavan.com/Menu.pdf
- Direct Online Orders: https://order.udupivrindavan.com
`;
  }

  // Default homepage markdown
  return `# Udupi Vrindavan Restaurant LLC

> Authentic Udupi & South Indian Vegetarian Cuisine in Al Karama, Dubai, UAE.

## About Udupi Vrindavan
Food cooked and eaten at home with family is the best. The next best place should offer you the same health and taste. At Udupi Vrindavan Restaurant in Al Karama, Dubai, you experience healthy, fresh and tasty food with genuine Karnataka cooks, pure Nandini ghee, and strict Satvik kitchen ethics without artificial additives or reheated oil.

## Core Details
- **Address:** FB04, WASL Opal, Street 26, Al Karama, Dubai, UAE
- **Telephone:** +971 42 7253 23
- **WhatsApp:** +971 56 301 8186
- **Email:** info@UdupiVrindavan.com
- **Hours:** Daily 7:00 AM – 11:00 PM
- **Cuisine:** Udupi, South Indian, Karnataka Vegetarian (100% Pure Vegetarian)
- **Direct Orders:** https://order.udupivrindavan.com
- **Dining Menu:** https://udupivrindavan.com/Menu.pdf
- **Google Maps:** https://www.google.com/maps/place/Udupi+Vrindavan+Restaurant+LLC/@25.2471236,55.3103148,17z/data=!4m6!3m5!1s0x3e5f43dbc7060cb9:0xfc696ec76610e8d!8m2!3d25.2471236!4d55.3103148!16s%2Fg%2F11ltjbh3f7?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D

## Public Pages
- Home: https://udupivrindavan.com/
- About: https://udupivrindavan.com/about
- Contact: https://udupivrindavan.com/contact
- Visit Udupi: https://udupivrindavan.com/visit-udupi
- Blog: https://udupivrindavan.com/blog
- LLM Index: https://udupivrindavan.com/llms.txt
- Sitemap: https://udupivrindavan.com/sitemap.xml
`;
};

// 404 HTML template
const get404Html = (): string => {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow">
  <title>404 Not Found | Udupi Vrindavan</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f7f3e9; color: #0f2f4a; margin: 0; padding: 40px 20px; display: flex; align-items: center; justify-content: center; min-height: 100vh; box-sizing: border-box; }
    .card { background: #ffffff; max-width: 640px; width: 100%; padding: 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(15,47,74,0.08); border: 1px solid rgba(212,166,90,0.3); text-align: center; }
    h1 { font-size: 36px; margin: 12px 0; color: #0f2f4a; }
    p { font-size: 16px; line-height: 1.6; color: rgba(15,47,74,0.8); margin-bottom: 24px; }
    .links { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin: 24px 0; }
    .btn { display: inline-block; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: bold; font-size: 14px; transition: all 0.2s; }
    .btn-primary { background-color: #0f2f4a; color: #f7f3e9; }
    .btn-secondary { background-color: #f7f3e9; color: #0f2f4a; border: 1px solid rgba(15,47,74,0.15); }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size: 12px; font-weight: bold; color: #d4a65a; letter-spacing: 3px; text-transform: uppercase;">HTTP 404 — Not Found</div>
    <h1>Page Not Found</h1>
    <p>The page you requested does not exist on Udupi Vrindavan. Explore our authentic South Indian dining information using the links below:</p>
    <div class="links">
      <a href="/" class="btn btn-primary">Homepage</a>
      <a href="/about" class="btn btn-secondary">About Us</a>
      <a href="/contact" class="btn btn-secondary">Contact &amp; Location</a>
      <a href="/visit-udupi" class="btn btn-secondary">Visit Udupi</a>
      <a href="/blog" class="btn btn-secondary">Blog</a>
      <a href="/llms.txt" class="btn btn-secondary">llms.txt</a>
      <a href="/sitemap.xml" class="btn btn-secondary">Sitemap</a>
    </div>
  </div>
</body>
</html>`;
};

// Routes that redirect to online ordering portal
const BOOKING_REDIRECT_ROUTES = new Set([
  '/booking',
  '/bookings',
  '/book',
  '/reservation',
  '/reservations',
  '/table-booking'
]);

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const urlPath = req.url || '/';
  const cleanPath = urlPath.split('?')[0].replace(/\/$/, '') || '/';
  const acceptHeader = req.headers['accept'] || '';

  // Redirect /booking requests to official online ordering portal
  if (BOOKING_REDIRECT_ROUTES.has(cleanPath)) {
    res.status(302);
    res.setHeader('Location', 'https://order.udupivrindavan.com');
    return res.send('Redirecting to https://order.udupivrindavan.com...');
  }

  // Always set Vary header for content negotiation
  res.setHeader('Vary', 'Accept, Accept-Encoding');

  // Check for Markdown content negotiation
  if (typeof acceptHeader === 'string' && acceptHeader.includes('text/markdown')) {
    if (!isDynamicValidRoute(cleanPath)) {
      res.status(404);
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      return res.send(`# 404 Not Found\n\nThe requested page \`${cleanPath}\` does not exist.\n\nVisit: https://udupivrindavan.com/ or https://udupivrindavan.com/llms.txt`);
    }

    res.status(200);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.send(getMarkdownForRoute(cleanPath));
  }

  // If the path is not a valid route, return real 404 status
  if (!isDynamicValidRoute(cleanPath)) {
    res.status(404);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(get404Html());
  }

  // Resolve page-specific metadata for SEO crawlers and previews
  let meta: RouteMeta | null = STATIC_ROUTE_METADATA[cleanPath] || null;
  if (!meta && cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.slice('/blog/'.length);
    if (slug) {
      meta = await getBlogPostMeta(slug);
    }
  }

  // For valid routes, serve index.html with 200 OK and injected route metadata
  try {
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      let html = fs.readFileSync(indexPath, 'utf8');
      if (meta) {
        html = injectMetadata(html, meta);
      }
      res.status(200);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    }
  } catch (err) {
    // Fallback to local index.html if dist not found
  }

  try {
    const fallbackPath = path.join(process.cwd(), 'index.html');
    let html = fs.readFileSync(fallbackPath, 'utf8');
    if (meta) {
      html = injectMetadata(html, meta);
    }
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  } catch (err) {
    res.status(200).send('<!doctype html><html><body><div id="root"></div></body></html>');
  }
}
