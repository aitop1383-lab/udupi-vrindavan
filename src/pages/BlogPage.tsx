import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../types/blog';
import BlogCard from '../components/BlogCard';
import { Search, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { blogApi } from '../services/blogApi';
import Seo from '../components/Seo';
import SkeletonBlogCard from '../components/SkeletonBlogCard';
import { breadcrumbSchema } from '../data/seoSchemas';

const CATEGORIES = ['All', 'Tradition', 'Health', 'Culture', 'Community', 'Recipe', 'News'];
const blogBreadcrumbSchema = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' }
]);

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

  return (
    <div className="bg-brand-cream min-h-screen">
      <Seo
        title="Blog | Udupi Vrindavan stories about South Indian food and heritage"
        description="Read stories about Udupi cuisine, Karnataka traditions, vegetarian food culture, and the story behind Udupi Vrindavan in Dubai."
        canonicalPath="/blog"
        type="website"
        jsonLd={blogBreadcrumbSchema}
      />

      {/* ══════════════════════════════
          HERO SECTION
      ══════════════════════════════ */}
      <section className="relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/6 rounded-full blur-[160px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2.5 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.35em] px-4 sm:px-5 py-2.5 rounded-full mb-6 sm:mb-8">
              <BookOpen size={13} />
              Udupi Vrindavan Journal
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-brand-blue leading-[1.08] tracking-tight mb-5 sm:mb-6">
              Stories, Flavors<br />
              <span className="text-brand-gold">&amp; Heritage</span>
            </h1>

            <p className="text-brand-blue/55 text-base md:text-xl max-w-2xl mx-auto font-sans leading-relaxed mb-8 sm:mb-10">
              Explore stories about Udupi food, South Indian vegetarian traditions, Karnataka heritage, and what makes Udupi Vrindavan a trusted dining destination in Dubai.
            </p>

            {/* Live stats */}
            {!isLoading && posts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-white/70 border border-brand-blue/8 rounded-full px-5 py-2 text-xs font-bold text-brand-blue/60 shadow-sm"
              >
                <TrendingUp size={13} className="text-brand-gold" />
                {posts.length} article{posts.length !== 1 ? 's' : ''} published
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          STICKY FILTER BAR
      ══════════════════════════════ */}
      <div className="sticky top-0 z-20 bg-brand-cream/95 backdrop-blur-md border-b border-brand-blue/5 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:flex-wrap md:overflow-visible md:pb-0 md:justify-start">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    activeCategory === cat
                      ? 'bg-brand-blue text-brand-cream border-brand-blue shadow-sm'
                      : 'bg-white text-brand-blue/60 hover:text-brand-blue hover:border-brand-gold/30 border-brand-blue/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-blue/30" size={15} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-brand-blue/10 rounded-full pl-9 pr-4 py-2 text-brand-blue text-xs font-medium focus:border-brand-gold focus:outline-none transition-colors placeholder:text-brand-blue/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-blue/30 hover:text-brand-blue/60 transition-colors cursor-pointer text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          CONTENT AREA
      ══════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

        {/* Loading */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => <SkeletonBlogCard key={n} />)}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">😕</span>
            </div>
            <p className="text-brand-blue/60 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-brand-blue text-brand-cream rounded-full text-sm font-bold hover:bg-brand-blue/90 transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Posts */}
        {!isLoading && !error && filteredPosts.length > 0 && (
          <>
            {/* Featured hero post (first) — only when no search/filter active or has result */}
            {featuredPost && !searchQuery && activeCategory === 'All' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-14"
              >
                <div className="section-divider mb-8">
                  <span className="text-xs font-bold text-brand-blue/40 tracking-[0.3em] uppercase flex items-center gap-2">
                    <Sparkles size={13} className="text-brand-gold" /> Featured Story
                  </span>
                </div>

                <a href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(15,47,74,0.12)] bg-brand-blue">
                    <div className="grid md:grid-cols-2 md:min-h-[400px]">
                      {/* Image */}
                      <div className="relative overflow-hidden order-2 md:order-1">
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover min-h-[260px] group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/60 to-transparent md:hidden" />
                      </div>
                      {/* Content */}
                      <div className="order-1 md:order-2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                        <span className="inline-flex items-center gap-2 text-brand-gold font-bold text-[10px] uppercase tracking-[0.3em] mb-5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                          {featuredPost.category}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-display text-white leading-snug mb-4 group-hover:text-brand-gold transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-brand-cream/60 text-sm leading-relaxed line-clamp-3 mb-6">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-3 text-brand-cream/40 text-[10px] font-medium">
                            <span>{featuredPost.date}</span>
                            <span>·</span>
                            <span>{featuredPost.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-brand-gold font-bold text-xs uppercase tracking-wider group-hover:gap-2.5 transition-all duration-300">
                            <span>Read</span>
                            <span className="text-lg leading-none">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            )}

            {/* All other posts grid */}
            {(restPosts.length > 0 || searchQuery || activeCategory !== 'All') && (
              <>
                <div className="section-divider mb-10">
                  <span className="text-xs font-medium text-brand-blue/40 tracking-[0.3em] uppercase">
                    {searchQuery || activeCategory !== 'All' ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? 's' : ''}` : 'Recent Articles'}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {(searchQuery || activeCategory !== 'All' ? filteredPosts : restPosts).map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </>
        )}

        {/* Empty state */}
        {!isLoading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-brand-blue/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-brand-blue/25" />
            </div>
            <h3 className="text-xl font-display font-bold text-brand-blue mb-2">No articles found</h3>
            <p className="text-brand-blue/50 text-sm mb-6">Try a different search term or category.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-6 py-2.5 bg-brand-gold text-brand-blue rounded-full text-sm font-bold hover:bg-brand-gold/90 transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════
          NEWSLETTER / INNER CIRCLE
      ══════════════════════════════ */}
      <section className="bg-brand-blue py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,166,90,0.08),transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-brand-gold/70 font-bold text-[10px] uppercase tracking-[0.35em] mb-6">
            <span className="w-8 h-px bg-brand-gold/30" />
            Join the Circle
            <span className="w-8 h-px bg-brand-gold/30" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-brand-cream/55 mb-8 text-base leading-relaxed">
            Get updates on seasonal menus, exclusive events, and authentic stories directly from our kitchen.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 border border-white/10 rounded-full focus:border-brand-gold focus:outline-none bg-white/5 text-white placeholder:text-white/30 text-sm"
            />
            <button
              type="submit"
              className="px-7 py-3 bg-brand-gold text-brand-blue rounded-full hover:bg-white transition-colors font-bold text-sm cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-brand-cream/25 text-[10px] mt-4 uppercase tracking-wider font-medium">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
