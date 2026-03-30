import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../types/blog';
import BlogCard from '../components/BlogCard';
import { Search, BookOpen } from 'lucide-react';
import { blogApi } from '../services/blogApi';
import { Helmet } from 'react-helmet-async';
import SkeletonBlogCard from '../components/SkeletonBlogCard';

const CATEGORIES = ['All', 'Tradition', 'Health', 'Culture', 'Community'];

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogApi.getPosts();
        setPosts(data);
      } catch (err) {
        console.error('Failed to load posts:', err);
        setError('Failed to load blog posts.');
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
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  return (
    <div className="bg-brand-cream min-h-screen">
      <Helmet>
        <title>Blog | Udupi Vrindavan - Stories of Tradition & Taste</title>
        <meta name="description" content="Explore stories, traditions, and authentic insights from Udupi Vrindavan." />
        <link rel="canonical" href="https://udupivrindavan.com/blog" />
        <meta property="og:title" content="Blog | Udupi Vrindavan" />
        <meta property="og:description" content="Explore stories, traditions, and authentic insights from Udupi Vrindavan." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://udupivrindavan.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Udupi Vrindavan" />
        <meta name="twitter:description" content="Explore stories, traditions, and authentic insights from Udupi Vrindavan." />
        <meta name="twitter:site" content="@UdupiVrindavan" />
      </Helmet>

      {/* Hero Section - with section divider like your site */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Ornamental divider */}
            <div className="section-divider mb-6">
              <BookOpen size={20} className="text-brand-gold" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-blue mb-5">
              Stories, Flavors &<br />
              <span className="text-brand-gold">Heritage</span>
            </h1>

            <p className="text-brand-blue/60 text-lg max-w-2xl mx-auto font-sans">
              Discover authentic traditions, recipes, and cultural stories from the heart of Udupi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="sticky top-0 z-10 bg-brand-cream/95 backdrop-blur-sm border-b border-brand-blue/5">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === category
                      ? 'bg-brand-gold text-brand-blue shadow-sm'
                      : 'bg-white text-brand-blue/60 hover:text-brand-blue hover:bg-white/80 border border-brand-blue/10'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-blue/30" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-brand-blue/10 rounded-full pl-10 pr-4 py-2 text-brand-blue text-sm focus:border-brand-gold focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => <SkeletonBlogCard key={n} />)}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-red-500">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-brand-gold underline">
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && filteredPosts.length > 0 && (
          <>
            {/* Section divider for articles */}
            <div className="section-divider mb-12">
              <span className="text-sm font-medium text-brand-blue/40 tracking-wide">RECENT ARTICLES</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {!isLoading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-brand-blue/50">No articles found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-brand-gold underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section - mirroring your "Inner Circle" section */}
      <section className="bg-white border-t border-brand-blue/5 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="section-divider mb-6">
            <span className="text-sm font-medium text-brand-blue/40">JOIN THE CIRCLE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-blue mb-3">
            Inner Circle
          </h2>
          <p className="text-brand-blue/60 mb-6">
            Get updates on seasonal menus, special events, and exclusive stories.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-2.5 border border-brand-blue/10 rounded-full focus:border-brand-gold focus:outline-none bg-brand-cream/50"
            />
            <button className="px-6 py-2.5 bg-brand-gold text-brand-blue rounded-full hover:bg-brand-gold/90 transition font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;