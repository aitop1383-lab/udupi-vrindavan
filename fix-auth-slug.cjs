const fs = require('fs');

// 1. Update BlogApi
const apiFile = 'c:/Users/Raaz/Desktop/redesign udupi/src/services/blogApi.ts';
let apiContent = fs.readFileSync(apiFile, 'utf8');

apiContent = apiContent.replace(
  /async getPostBySlug\(slug: string, _useProductionOnly = false\): Promise<BlogPost \| null> \{[\s\S]*?\},/m,
  `async getPostBySlug(slug: string, _useProductionOnly = false): Promise<BlogPost | null> {
    const posts = await this.getPosts();
    const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();
    
    return posts.find(p => {
      const pSlug = p.slug ? p.slug.trim().toLowerCase() : '';
      const generatedSlugFromTitle = p.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      return pSlug === cleanSlug || generatedSlugFromTitle === cleanSlug;
    }) || null;
  },`
);

fs.writeFileSync(apiFile, apiContent, 'utf8');

// 2. Update BlogAdmin Login UI
const adminFile = 'c:/Users/Raaz/Desktop/redesign udupi/src/pages/BlogAdmin.tsx';
let adminContent = fs.readFileSync(adminFile, 'utf8');

adminContent = adminContent.replace(
  /className=\{`w-full px-8 py-4 bg-brand-cream border rounded-2xl focus:outline-none transition-all placeholder:text-brand-blue\/20 text-center font-bold tracking-widest text-lg \$\{/g,
  'className={`w-full px-8 py-4 bg-brand-blue/[0.02] border border-brand-blue/10 focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 rounded-2xl outline-none text-brand-blue text-center font-bold tracking-widest text-lg transition-all placeholder:text-brand-blue/20 ${'
);

// Remove the old border classes inside the conditional
adminContent = adminContent.replace(
  /error \? 'border-red-400 shake shadow-\[0_0_20px_rgba\(239,68,68,0\.1\)\]' : 'border-brand-blue\/5 focus:border-brand-gold focus:shadow-\[0_0_20px_rgba\(212,166,90,0\.1\)\]'/g,
  "error ? '!bg-red-50/50 !border-red-400 shake !ring-4 !ring-red-400/20 text-red-500' : ''"
);

// Make the login container more premium
adminContent = adminContent.replace(
  /className="bg-white\/80 backdrop-blur-xl p-8 md:p-12 rounded-\[2\.5rem\] shadow-\[0_20px_50px_rgba\(15,47,74,0\.1\)\] w-full max-w-md border border-white\/20 relative z-10"/g,
  'className="bg-white/95 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_80px_rgba(15,47,74,0.1)] w-full max-w-md border border-white relative z-10"'
);

// Make the submit button more premium
adminContent = adminContent.replace(
  /className="w-full bg-brand-blue text-brand-cream py-4 rounded-xl font-bold text-lg hover:bg-brand-gold hover:text-brand-blue transition-colors flex items-center justify-center gap-2"/g,
  'className="w-full bg-brand-blue text-brand-cream py-4 rounded-2xl font-bold text-lg hover:bg-brand-gold hover:text-brand-blue transition-colors flex items-center justify-center gap-2 hover:shadow-[0_10px_20px_rgba(212,166,90,0.2)]"'
);

fs.writeFileSync(adminFile, adminContent, 'utf8');
console.log('Fixed BlogApi and BlogAdmin Login UI');
