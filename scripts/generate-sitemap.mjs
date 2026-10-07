import fs from 'fs';
import path from 'path';

const GOOGLE_SHEETS_URL = process.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbyaBHnmNalAdlbWn7y5mcuSxWiIrKQUxlOa6ElBaXXmYt86IP-173Zm7yfwSExhdIgpLA/exec';

const STATIC_URLS = [
  { loc: 'https://udupivrindavan.com/', changefreq: 'daily', priority: '1.0' },
  { loc: 'https://udupivrindavan.com/about', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://udupivrindavan.com/contact', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://udupivrindavan.com/visit-udupi', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://udupivrindavan.com/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://udupivrindavan.com/privacy', changefreq: 'yearly', priority: '0.4' },
  { loc: 'https://udupivrindavan.com/terms-of-service', changefreq: 'yearly', priority: '0.4' },
  { loc: 'https://udupivrindavan.com/Menu.pdf', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://udupivrindavan.com/llms.txt', changefreq: 'monthly', priority: '0.6' }
];

async function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const blogUrls = [];

  try {
    const res = await fetch(`${GOOGLE_SHEETS_URL}?action=getPosts`);
    if (res.ok) {
      const posts = await res.json();
      if (Array.isArray(posts)) {
        posts.forEach((p) => {
          const rawSlug = (p.slug || '').trim().toLowerCase();
          const genSlug = (p.title || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          const slug = rawSlug || genSlug;
          if (slug && !blogUrls.some((b) => b.slug === slug)) {
            let lastmod = today;
            if (p.date) {
              const d = new Date(p.date);
              if (!isNaN(d.getTime())) {
                lastmod = d.toISOString().split('T')[0];
              }
            }
            blogUrls.push({
              slug,
              loc: `https://udupivrindavan.com/blog/${slug}`,
              lastmod,
              changefreq: 'monthly',
              priority: '0.7'
            });
          }
        });
      }
    }
  } catch (e) {
    console.warn('Could not fetch latest posts from Google Sheets during sitemap generation. Preserving existing entries.', e);
  }

  // Fallback to massage post if none were fetched
  if (blogUrls.length === 0) {
    blogUrls.push({
      slug: 'massage',
      loc: 'https://udupivrindavan.com/blog/massage',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7'
    });
  }

  const allUrls = [
    ...STATIC_URLS.slice(0, 5).map((u) => ({ ...u, lastmod: today })),
    ...blogUrls,
    ...STATIC_URLS.slice(5).map((u) => ({ ...u, lastmod: today }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Generated sitemap.xml with ${allUrls.length} canonical URLs.`);
}

generateSitemap();
