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

export default function handler(req: ApiRequest, res: ApiResponse) {
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

  // For valid routes, serve index.html with 200 OK
  try {
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, 'utf8');
      res.status(200);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    }
  } catch (err) {
    // Fallback to local index.html if dist not found
  }

  try {
    const fallbackPath = path.join(process.cwd(), 'index.html');
    const html = fs.readFileSync(fallbackPath, 'utf8');
    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  } catch (err) {
    res.status(200).send('<!doctype html><html><body><div id="root"></div></body></html>');
  }
}
