import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('🧪 Starting Udupi Vrindavan Automated Verification Test Suite...\n');

let passedTests = 0;
let failedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

// ── 1. Initial HTML Content Test ──
runTest('Initial HTML contains >500 meaningful characters of business content without JS', () => {
  const htmlPath = path.resolve('index.html');
  assert(fs.existsSync(htmlPath), 'index.html must exist');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Extract text from body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  assert(bodyMatch && bodyMatch[1], 'index.html must have <body> content');
  const bodyText = bodyMatch[1]
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  assert(bodyText.length >= 500, `Initial HTML content length is ${bodyText.length}, expected >= 500 chars`);
  assert(html.includes('Udupi Vrindavan'), 'Initial HTML must mention Udupi Vrindavan');
  assert(html.includes('FB04, WASL Opal, Street 26, Al Karama'), 'Initial HTML must include address');
  assert(html.includes('+971 42 7253 23'), 'Initial HTML must include phone number');
  assert(html.includes('info@UdupiVrindavan.com'), 'Initial HTML must include email');
  assert(html.includes('Eating Food Cooked at Home is best'), 'Initial HTML must include headline');
  console.log(`     (Found ${bodyText.length} characters of initial business HTML content)`);
});

// ── 2. llms.txt Test ──
runTest('/llms.txt exists and contains machine-readable agent guidance', () => {
  const llmsPath = path.resolve('public', 'llms.txt');
  assert(fs.existsSync(llmsPath), 'public/llms.txt must exist');
  const content = fs.readFileSync(llmsPath, 'utf8');

  assert(content.includes('Udupi Vrindavan Restaurant LLC'), 'llms.txt must contain business name');
  assert(content.includes('When to Use This Website'), 'llms.txt must contain "When to Use This Website"');
  assert(content.includes('https://udupivrindavan.com'), 'llms.txt must contain canonical URLs');
  assert(content.includes('FB04, WASL Opal, Street 26, Al Karama'), 'llms.txt must contain location details');
});

// ── 3. llms-full.txt Test ──
runTest('/llms-full.txt exists with full knowledge base', () => {
  const llmsFullPath = path.resolve('public', 'llms-full.txt');
  assert(fs.existsSync(llmsFullPath), 'public/llms-full.txt must exist');
  const content = fs.readFileSync(llmsFullPath, 'utf8');
  assert(content.includes('Satvik Philosophy'), 'llms-full.txt must include Satvik Philosophy');
  assert(content.includes('Operating Hours'), 'llms-full.txt must include Operating Hours');
});

// ── 4. sitemap.xml Test ──
runTest('/sitemap.xml exists and is valid XML with required public routes', () => {
  const sitemapPath = path.resolve('public', 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
  const xml = fs.readFileSync(sitemapPath, 'utf8');

  assert(xml.startsWith('<?xml'), 'sitemap.xml must start with XML declaration');
  assert(xml.includes('<urlset'), 'sitemap.xml must have <urlset>');
  assert(xml.includes('https://udupivrindavan.com/'), 'sitemap must include homepage');
  assert(xml.includes('https://udupivrindavan.com/about'), 'sitemap must include /about');
  assert(xml.includes('https://udupivrindavan.com/contact'), 'sitemap must include /contact');
  assert(xml.includes('https://udupivrindavan.com/privacy'), 'sitemap must include /privacy');
  assert(xml.includes('https://udupivrindavan.com/visit-udupi'), 'sitemap must include /visit-udupi');
  assert(xml.includes('https://udupivrindavan.com/blog'), 'sitemap must include /blog');
  assert(!xml.includes('/blog/admin'), 'sitemap must NOT include private admin routes');
});

// ── 5. robots.txt Test ──
runTest('/robots.txt exists and references sitemap', () => {
  const robotsPath = path.resolve('public', 'robots.txt');
  assert(fs.existsSync(robotsPath), 'public/robots.txt must exist');
  const robots = fs.readFileSync(robotsPath, 'utf8');
  assert(robots.includes('Sitemap: https://udupivrindavan.com/sitemap.xml'), 'robots.txt must point to sitemap');
  assert(robots.includes('Disallow: /blog/admin'), 'robots.txt must disallow /blog/admin');
});

// ── 6. 404 & Content Negotiation Logic Test ──
runTest('Routing logic correctly handles 404s and Markdown Content Negotiation', () => {
  const apiPath = path.resolve('api', 'index.ts');
  assert(fs.existsSync(apiPath), 'api/index.ts must exist');
  const apiCode = fs.readFileSync(apiPath, 'utf8');

  assert(apiCode.includes('res.status(404)'), 'API handler must return HTTP 404 for invalid routes');
  assert(apiCode.includes('text/markdown'), 'API handler must support text/markdown content negotiation');
  assert(apiCode.includes('Vary'), 'API handler must set Vary header for Accept');
  assert(apiCode.includes('VALID_ROUTES'), 'API handler must maintain valid route set');
});

// ── 7. No Table Booking Preservation Test ──
runTest('Verification that no table reservation/booking widgets were added', () => {
  const homePath = path.resolve('src', 'pages', 'Home.tsx');
  const homeCode = fs.readFileSync(homePath, 'utf8');
  assert(!homeCode.toLowerCase().includes('book a table'), 'No booking table forms in Home');
  assert(!homeCode.toLowerCase().includes('reserve table'), 'No table reservation in Home');
});

// ── 8. Booking Redirect to Order Portal Test ──
runTest('/booking and aliases properly redirect to https://order.udupivrindavan.com', () => {
  const appPath = path.resolve('src', 'App.tsx');
  const appCode = fs.readFileSync(appPath, 'utf8');
  assert(appCode.includes('path="/booking"'), 'App.tsx must have /booking route');
  assert(appCode.includes('https://order.udupivrindavan.com'), 'App.tsx /booking must redirect to order portal');

  const apiPath = path.resolve('api', 'index.ts');
  const apiCode = fs.readFileSync(apiPath, 'utf8');
  assert(apiCode.includes('/booking'), 'API handler must include /booking');
  assert(apiCode.includes('https://order.udupivrindavan.com'), 'API handler must redirect booking to order portal');

  const vercelPath = path.resolve('vercel.json');
  const vercelCode = fs.readFileSync(vercelPath, 'utf8');
  assert(vercelCode.includes('booking'), 'vercel.json must include booking redirect');
  assert(vercelCode.includes('https://order.udupivrindavan.com'), 'vercel.json must point booking redirect to order portal');
});

console.log(`\n=============================================`);
console.log(`Test Summary: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log(`=============================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
