import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../types/blog';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Sparkles, TrendingUp, X, ArrowUpRight, Calendar, Clock, CloudOff, SearchX, Mail } from 'lucide-react';
import Reveal, { ImageReveal } from '../components/ui/Reveal';
import { EASE } from '../components/ui/motion';
import { blogApi } from '../services/blogApi';
import Seo from '../components/Seo';
import SkeletonBlogCard from '../components/SkeletonBlogCard';
import { breadcrumbSchema } from '../data/seoSchemas';

const CATEGORIES = ['All', 'Tradition', 'Health', 'Culture', 'Community', 'Recipe', 'News'];
const blogBreadcrumbSchema = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' }
]);

const blogCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Udupi Vrindavan Journal',
  description: 'Stories about Udupi cuisine, Karnataka traditions, vegetarian food culture, and the story behind Udupi Vrindavan in Dubai.',
  url: 'https://udupivrindavan.com/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Udupi Vrindavan',
    url: 'https://udupivrindavan.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://udupivrindavan.com/logo.png'
    }
  }
};

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogApi.getPosts(true);
        setPosts(data);
      } catch (err) {
        console.error('Failed to load posts:', err);
        setError('Failed to load blog posts. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);
  const isFiltering = !!searchQuery || activeCategory !== 'All';

  return (
    <div className="bg-brand-cream min-h-screen">
      <Seo
        title="Blog | Udupi Vrindavan stories about South Indian food and heritage"
        description="Read stories about Udupi cuisine, Karnataka traditions, vegetarian food culture, and the story behind Udupi Vrindavan in Dubai."
        canonicalPath="/blog"
        type="website"
        jsonLd={[blogBreadcrumbSchema, blogCollectionSchema]}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 texture-bg opacity-40 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, x: 120, skewX: -12 }}
          animate={{ opacity: 1, x: 0, skewX: -12 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute top-0 right-0 h-full w-1/2 translate-x-1/4 bg-brand-gold/[0.07] pointer-events-none"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-gold/30 bg-white/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-bronze backdrop-blur"
            >
              <BookOpen size={13} />
              Udupi Vrindavan Journal
            </motion.div>

            <h1 className="mt-7 text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl text-brand-blue">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1, delay: 0.1, ease: EASE }}>
                  Stories, Flavors
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block accent text-[1.1em]" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1, delay: 0.22, ease: EASE }}>
                  &amp; Heritage
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-brand-blue/65"
            >
              Explore stories about Udupi food, South Indian vegetarian traditions, Karnataka heritage, and what makes Udupi Vrindavan a trusted dining destination in Dubai.
            </motion.p>

            {!isLoading && posts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-xs font-semibold text-brand-cream shadow-lg shadow-brand-blue/20"
              >
                <TrendingUp size={14} className="text-brand-gold" />
                {posts.length} article{posts.length !== 1 ? 's' : ''} published
              </motion.div>
            )}
          </div>

          {/* Collage */}
          <div className="relative mx-auto hidden h-[420px] w-full max-w-md sm:block lg:col-span-5 lg:max-w-none">
            {[
              { src: '/Butter-Dosa.jpg', cls: 'left-0 top-6 h-64 w-52 -rotate-6', d: 0.3 },
              { src: '/heritage/2.jpg', cls: 'right-2 top-0 h-56 w-48 rotate-6', d: 0.45 },
              { src: '/VisitUdupi_Gallery/templewater.jpeg', cls: 'left-1/2 bottom-0 h-60 w-56 -translate-x-1/2 rotate-2', d: 0.6 },
            ].map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: img.d, ease: EASE }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
                className={`absolute overflow-hidden rounded-[1.75rem] border-[6px] border-white shadow-2xl shadow-brand-blue/25 ${img.cls}`}
                style={{ zIndex: i === 2 ? 3 : i }}
              >
                <img src={img.src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.9 }}
              className="absolute -right-2 bottom-10 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gold text-brand-blue shadow-xl"
            >
              <span className="absolute inset-1.5 rounded-full border border-dashed border-brand-blue/40 animate-spin-slow" />
              <BookOpen size={24} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STICKY FILTER BAR ═══ */}
      <div className="sticky top-[72px] z-30 border-y border-brand-blue/5 bg-brand-cream/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 py-3">
          <div className="flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
            <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 md:flex-wrap md:overflow-visible">
              {CATEGORIES.map(cat => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={active}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${active ? 'text-brand-cream' : 'text-brand-blue/60 hover:text-brand-blue'}`}
                  >
                    {active && (
                      <motion.span layoutId="blog-cat-pill" className="absolute inset-0 rounded-full bg-brand-blue shadow-md" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                    <span className="relative">{cat}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full shrink-0 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue/35" size={15} />
              <input
                type="text"
                placeholder="Search articles..."
                aria-label="Search articles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-brand-blue/10 bg-white py-2.5 pl-10 pr-10 text-sm text-brand-blue placeholder:text-brand-blue/35 input-gold-focus"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-brand-blue/5 text-brand-blue/50 hover:bg-brand-blue hover:text-brand-cream cursor-pointer"
                  >
                    <X size={13} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-12 md:py-16">
        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => <SkeletonBlogCard key={n} />)}
          </div>
        )}

        {error && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-400">
              <CloudOff size={28} />
            </div>
            <p className="mb-5 text-brand-blue/60">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-gold hover:text-brand-blue cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && filteredPosts.length > 0 && (
          <>
            {/* Featured */}
            {featuredPost && !isFiltering && (
              <Reveal className="mb-16">
                <div className="mb-8 flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-bronze">
                    <Sparkles size={14} className="text-brand-gold" /> Featured Story
                  </span>
                  <span className="hairline flex-1" />
                </div>

                <Link to={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="grid overflow-hidden rounded-[2rem] bg-brand-blue shadow-[0_30px_70px_-35px_rgba(15,47,74,0.6)] lg:grid-cols-12">
                    <ImageReveal from="left" className="relative min-h-[260px] overflow-hidden sm:min-h-[340px] lg:col-span-7 lg:min-h-[440px]">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className={`absolute inset-0 h-full w-full transition-transform duration-1000 group-hover:scale-105 ${featuredPost.image === '/logo.png' ? 'object-contain p-16' : 'object-cover'}`}
                        onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-blue/30" />
                    </ImageReveal>

                    <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
                      <div className="absolute inset-0 pattern-dots opacity-15 pointer-events-none" />
                      <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
                        {featuredPost.category}
                      </span>
                      <h2 className="relative mt-5 text-2xl md:text-3xl lg:text-4xl leading-snug text-white transition-colors group-hover:text-brand-gold-light">
                        {featuredPost.title}
                      </h2>
                      <p className="relative mt-4 line-clamp-3 text-sm md:text-base leading-relaxed text-brand-cream/65">
                        {featuredPost.excerpt}
                      </p>
                      <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-brand-cream/50">
                          <span className="flex items-center gap-1.5"><Calendar size={13} className="text-brand-gold/70" />{featuredPost.date}</span>
                          <span className="flex items-center gap-1.5"><Clock size={13} className="text-brand-gold/70" />{featuredPost.readTime}</span>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-blue transition-all group-hover:gap-3 group-hover:bg-white">
                          Read <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Grid */}
            {(restPosts.length > 0 || isFiltering) && (
              <>
                <div className="mb-10 flex items-center gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-blue/50">
                    {isFiltering ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''}` : 'Recent Articles'}
                  </span>
                  <span className="hairline flex-1" />
                </div>

                <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  <AnimatePresence mode="popLayout">
                    {(isFiltering ? filteredPosts : restPosts).map((post, index) => (
                      <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.6, delay: Math.min(index, 8) * 0.06, ease: EASE }}
                      >
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            )}
          </>
        )}

        {!isLoading && !error && filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-md py-20 text-center">
            <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-dashed border-brand-gold/50 animate-spin-slow" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue text-brand-gold">
                <SearchX size={26} />
              </span>
            </div>
            <h3 className="mb-2 text-2xl text-brand-blue">No articles found</h3>
            <p className="mb-7 text-sm text-brand-blue/55">Try a different search term or category.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="rounded-full bg-brand-gold px-7 py-3 text-sm font-bold text-brand-blue transition-all hover:-translate-y-0.5 hover:bg-brand-blue hover:text-brand-cream cursor-pointer"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="relative overflow-hidden bg-brand-blue py-20 md:py-24">
        <div className="absolute inset-0 pattern-dots opacity-15 pointer-events-none" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-brand-gold/15" />
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-brand-gold/15" />
        <Reveal className="relative z-10 mx-auto max-w-3xl px-5 sm:px-6 text-center">
          <span className="eyebrow eyebrow-light justify-center">Join the Circle</span>
          <h2 className="mt-5 text-3xl md:text-5xl text-white">
            Stay in the <span className="accent text-[1.12em]">Loop</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-cream/60">
            Get updates on seasonal menus, exclusive events, and authentic stories directly from our kitchen.
          </p>
          <form className="mx-auto mt-9 flex max-w-lg flex-col gap-3 rounded-full sm:flex-row sm:border sm:border-white/15 sm:bg-white/5 sm:p-1.5" onSubmit={e => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                type="email"
                aria-label="Email address"
                placeholder="Your email address"
                className="w-full rounded-full border border-white/15 bg-white/5 py-3.5 pl-12 pr-5 text-sm text-white placeholder:text-white/35 focus:border-brand-gold focus:outline-none sm:border-0 sm:bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="pulse-ring whitespace-nowrap rounded-full bg-brand-gold px-8 py-3.5 text-sm font-bold text-brand-blue transition-colors hover:bg-white cursor-pointer"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-wider text-brand-cream/35">No spam. Unsubscribe anytime.</p>
        </Reveal>
      </section>
    </div>
  );
};

export default BlogPage;
