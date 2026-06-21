import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../types/blog';
import { Calendar, Clock, ArrowLeft, Share2, Heart, BookOpen, ChevronRight, LinkIcon } from 'lucide-react';
import { blogApi } from '../services/blogApi';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';

/* ─── Tiny utility: strip HTML tags ─── */
const stripHtml = (s: string) => s.replace(/<[^>]*>/g, '');
const LIKED_POSTS_KEY = 'udupi_liked_posts';
const LIKE_COUNTS_KEY = 'udupi_like_counts';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const articleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.5]);

  /* ── Reading progress ── */
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.min(100, Math.max(0, ((winH - top) / (height + winH)) * 100));
      setReadProgress(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Fetch ── */
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const data = await blogApi.getPostBySlug(slug);
        if (!data) { navigate('/blog'); return; }
        setPost(data);

        // Keep likes local to avoid third-party CORS failures in the browser.
        try {
          const postId = String(data.id);
          const likedPosts = JSON.parse(localStorage.getItem(LIKED_POSTS_KEY) || '[]');
          const counts = JSON.parse(localStorage.getItem(LIKE_COUNTS_KEY) || '{}');
          setIsLiked(likedPosts.map(String).includes(postId));
          setLikeCount(typeof counts[postId] === 'number' ? counts[postId] : 0);
        } catch (e) {
          console.error('LocalStorage likes parse error', e);
          setLikeCount(0);
        }

        if (data.category) {
          const all = await blogApi.getPosts();
          setRelatedPosts(all.filter(p => p.id !== data.id && p.category === data.category).slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  /* ── Share ── */
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: post?.title || 'Udupi Vrindavan', url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') console.error(err);
    }
  };

  const handleLike = () => {
    if (!post) return;
    const postId = String(post.id);
    const wasLiked = isLiked;
    const nextLiked = !wasLiked;

    try {
      const likedPosts = JSON.parse(localStorage.getItem(LIKED_POSTS_KEY) || '[]').map(String);
      const counts = JSON.parse(localStorage.getItem(LIKE_COUNTS_KEY) || '{}');
      const nextLikedPosts = nextLiked
        ? Array.from(new Set([...likedPosts, postId]))
        : likedPosts.filter((id: string) => id !== postId);
      const nextCount = nextLiked
        ? Math.max(1, Number(counts[postId] || 0) + 1)
        : Math.max(0, Number(counts[postId] || 0) - 1);

      localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(nextLikedPosts));
      localStorage.setItem(LIKE_COUNTS_KEY, JSON.stringify({ ...counts, [postId]: nextCount }));
      setIsLiked(nextLiked);
      setLikeCount(nextCount);
    } catch (e) {
      console.error('Error saving like locally', e);
    }
  };

  /* ════════════════════════
     LOADING SKELETON
  ════════════════════════ */
  if (loading || !post) return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero Skeleton — matches the actual layout */}
      <div className="relative w-full overflow-hidden bg-brand-blue flex flex-col justify-end" style={{ minHeight: 'min(82vh, 720px)' }}>
        {/* Decorative background overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-transparent to-brand-blue/60" />

        {/* Back Link Placeholder */}
        <div className="absolute top-0 left-0 right-0 pt-24 px-6 lg:px-16 z-20">
          <div className="inline-flex items-center gap-2.5 text-white/50">
            <div className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shimmer-dark" />
            <div className="h-3.5 w-24 bg-white/10 rounded shimmer-dark" />
          </div>
        </div>

        {/* Hero content skeleton */}
        <div className="relative lg:absolute bottom-0 right-0 w-full lg:w-[55%] px-6 lg:px-14 pb-12 lg:pb-20 pt-36 lg:pt-0 flex flex-col justify-end z-10">
          {/* Category badge skeleton */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-6 w-24 rounded-full border border-brand-gold/20 shimmer-gold" />
          </div>

          {/* Title skeleton */}
          <div className="space-y-3 mb-7 max-w-xl">
            <div className="h-9 w-full rounded-xl shimmer-dark" />
            <div className="h-9 w-4/5 rounded-xl shimmer-dark" />
          </div>

          {/* Excerpt skeleton */}
          <div className="space-y-2 mb-8 max-w-md hidden md:block">
            <div className="h-4 w-full rounded-lg bg-white/5 shimmer-dark" />
            <div className="h-4 w-5/6 rounded-lg bg-white/5 shimmer-dark" />
          </div>

          {/* Meta bar skeleton */}
          <div className="flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full border border-brand-gold/30 shimmer-gold" />
              <div className="space-y-1.5">
                <div className="h-3 w-16 rounded bg-white/10 shimmer-dark" />
                <div className="h-2.5 w-12 rounded bg-white/5 shimmer-dark" />
              </div>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div className="h-3 w-20 rounded bg-white/5 shimmer-dark" />
            <div className="h-3 w-16 rounded bg-white/5 shimmer-dark" />
          </div>
        </div>
      </div>

      {/* Body Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-12 xl:gap-20 items-start">

          {/* Left Column: Article Body Skeleton */}
          <div className="space-y-10">
            {/* Pull Quote Skeleton */}
            <div className="pl-6 border-l-4 border-brand-gold/30 space-y-2">
              <div className="h-4 w-full rounded shimmer" />
              <div className="h-4 w-5/6 rounded shimmer" />
            </div>

            {/* Paragraph Text Skeletons */}
            <div className="space-y-6">
              {[1, 2, 3].map(p => (
                <div key={p} className="space-y-3">
                  <div className="h-4 w-full rounded shimmer" />
                  <div className="h-4 w-[98%] rounded shimmer" />
                  <div className="h-4 w-[95%] rounded shimmer" />
                  <div className="h-4 w-[92%] rounded shimmer" />
                  <div className="h-4 w-[60%] rounded shimmer" />
                </div>
              ))}
            </div>

            {/* Image Placeholder Skeleton */}
            <div className="w-full aspect-[16/9] rounded-3xl shimmer" />

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-4 w-full rounded shimmer" />
                <div className="h-4 w-[97%] rounded shimmer" />
                <div className="h-4 w-[85%] rounded shimmer" />
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Skeleton */}
          <div className="hidden lg:block space-y-6">
            {/* Author Mini-Card Skeleton */}
            <div className="bg-white rounded-3xl border border-brand-blue/8 shadow-sm overflow-hidden p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/15 shimmer-gold" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 w-24 rounded shimmer" />
                  <div className="h-2.5 w-16 rounded shimmer" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-16 rounded-full shimmer-gold" />
                <div className="h-5 w-16 rounded-full shimmer" />
              </div>
            </div>

            {/* Action Card Skeleton */}
            <div className="bg-white rounded-3xl border border-brand-blue/8 shadow-sm p-5 space-y-3">
              <div className="h-3 w-16 rounded shimmer mb-4" />
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 rounded-2xl shimmer" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  /* ════════════════════════════════════════
     MAIN RENDER
  ════════════════════════════════════════ */
  return (
    <div className="bg-brand-cream min-h-screen">
      <Helmet>
        <title>{stripHtml(post.title)} | Udupi Vrindavan</title>
        <meta name="description" content={stripHtml(post.excerpt)} />
        <link rel="canonical" href={`https://udupivrindavan.com/blog/${post.slug}`} />
        <meta property="og:title" content={stripHtml(post.title)} />
        <meta property="og:description" content={stripHtml(post.excerpt)} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      {/* ── Gold reading progress bar ── */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-gold to-amber-400 z-[100] transition-all duration-100"
        style={{ width: `${readProgress}%` }}
      />

      {/* ══════════════════════════════════════════════
          HERO  — magazine split: image left + meta right
      ══════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative w-full overflow-hidden bg-brand-blue flex flex-col justify-end min-h-[560px] md:min-h-[min(82vh,720px)]">
        {/* Parallax image — left 60% */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src={post.image}
            alt={stripHtml(post.title)}
            className="w-full h-full object-cover scale-110"
            style={{ transformOrigin: 'center top' }}
            onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-blue/50 to-brand-blue" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-transparent to-brand-blue/60" />

        {/* Back link — top left */}
        <div className="absolute top-0 left-0 right-0 pt-24 px-6 lg:px-16 z-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2.5 text-white/70 hover:text-brand-gold transition-all duration-300 group"
          >
            <span className="w-9 h-9 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:border-brand-gold/60 group-hover:bg-brand-gold/10 transition-all">
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]">Back to Journal</span>
          </Link>
        </div>

        {/* Hero content — right side on desktop, bottom on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity: heroOpacity }}
          className="relative lg:absolute bottom-0 right-0 w-full lg:w-[55%] px-4 sm:px-6 lg:px-14 pb-10 sm:pb-12 lg:pb-20 pt-36 lg:pt-0 flex flex-col justify-end z-10"
        >
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/30 text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em]">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3rem] font-display text-white leading-[1.12] tracking-tight mb-7 max-w-xl"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }}
          />

          {/* Excerpt teaser */}
          <p className="text-white/55 text-base leading-relaxed mb-8 max-w-md hidden md:block line-clamp-2">
            {stripHtml(post.excerpt)}
          </p>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold text-sm font-black">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-white text-sm font-bold leading-none">{post.author}</p>
                <p className="text-white/40 text-[10px] mt-0.5 font-medium uppercase tracking-wider">Author</p>
              </div>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Calendar size={13} className="text-brand-gold/60" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Clock size={13} className="text-brand-gold/60" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <BookOpen size={13} className="text-brand-gold/60" />
              <span>Long Read</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          BODY — two-column: article + sticky sidebar
      ══════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-12 xl:gap-20 items-start">

          {/* ── Left column: article ── */}
          <div ref={articleRef}>

            {/* Lead / excerpt pull-quote */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10 pl-6 border-l-4 border-brand-gold"
            >
              <p className="text-lg md:text-xl text-brand-blue/65 italic font-serif leading-[1.85]">
                {stripHtml(post.excerpt)}
              </p>
            </motion.div>

            {/* Article body */}
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="
                prose prose-base md:prose-lg max-w-none
                prose-headings:font-display prose-headings:text-brand-blue prose-headings:tracking-tight prose-headings:leading-snug
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-brand-blue/8
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-brand-blue/90
                prose-p:text-brand-blue/70 prose-p:leading-[1.85] md:prose-p:leading-[2] prose-p:mb-6 md:prose-p:mb-7 prose-p:text-base md:prose-p:text-[17px]
                prose-strong:text-brand-blue prose-strong:font-bold
                prose-em:text-brand-blue/60 prose-em:not-italic prose-em:font-medium
                prose-blockquote:border-l-[5px] prose-blockquote:border-brand-gold prose-blockquote:pl-7 prose-blockquote:py-1 prose-blockquote:bg-brand-gold/[0.04] prose-blockquote:rounded-r-3xl prose-blockquote:not-italic prose-blockquote:my-10 prose-blockquote:pr-6
                prose-blockquote:text-brand-blue/70 prose-blockquote:text-lg prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:leading-relaxed
                prose-img:w-full prose-img:rounded-3xl prose-img:shadow-[0_24px_64px_rgba(15,47,74,0.13)] prose-img:my-14 prose-img:object-cover
                prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
                prose-ul:space-y-2.5 prose-ol:space-y-2.5 prose-ul:pl-5 prose-ol:pl-5
                prose-li:text-brand-blue/70 prose-li:leading-[1.9]
                prose-hr:border-brand-blue/8 prose-hr:my-14
                prose-code:bg-brand-blue/5 prose-code:text-brand-blue/75 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:text-[0.85em] prose-code:font-mono
              "
            >
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content, { 
                ADD_TAGS: ['img', 'iframe', 'video', 'source'], 
                ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'class', 'src', 'alt', 'controls'],
                ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
              }) }} />
            </motion.article>

            {/* Tags row */}
            <div className="mt-12 pt-8 border-t border-brand-blue/8 flex flex-wrap gap-2">
              {['Authentic', 'Karnataka', 'Vegetarian', 'Heritage', post.category].filter((v, i, a) => a.indexOf(v) === i).map(tag => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-white border border-brand-blue/8 text-[10px] font-bold text-brand-blue/50 uppercase tracking-widest hover:border-brand-gold/40 hover:text-brand-gold transition-all cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author card — full width at article bottom */}
            <div className="mt-8 rounded-3xl overflow-hidden border border-brand-blue/8 shadow-sm">
              <div className="bg-brand-blue px-4 sm:px-6 py-4 flex flex-wrap sm:flex-nowrap items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold text-xl font-display font-bold shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-brand-cream/40 font-bold uppercase tracking-widest mb-0.5">Written by</p>
                  <p className="text-white font-bold text-base leading-tight">{post.author}</p>
                  <p className="text-brand-cream/50 text-xs mt-0.5">Udupi Vrindavan · Al Karama, Dubai</p>
                </div>
                <span className="px-3 py-1.5 bg-brand-gold/15 border border-brand-gold/25 text-brand-gold text-[10px] font-bold uppercase tracking-wider rounded-full shrink-0">
                  {post.category}
                </span>
              </div>
              {/* Share bar */}
              <div className="bg-white px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3 lg:hidden">
                <p className="text-brand-blue/50 text-sm font-medium mr-2 flex-1 min-w-0">Enjoyed this story? Share it!</p>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-5 py-2 bg-brand-blue text-brand-cream rounded-full font-bold text-xs hover:bg-brand-gold hover:text-brand-blue transition-all cursor-pointer"
                >
                  <Share2 size={13} />
                  {copied ? 'Link Copied!' : 'Share Story'}
                </button>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs transition-all cursor-pointer border ${isLiked ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-brand-blue/60 border-brand-blue/10 hover:border-red-200 hover:text-red-400'
                    }`}
                >
                  <Heart size={13} fill={isLiked ? 'currentColor' : 'none'} />
                  {likeCount}
                </button>
                <Link
                  to="/blog"
                  className="flex items-center gap-1.5 px-5 py-2 bg-brand-blue/5 text-brand-blue/70 rounded-full font-bold text-xs hover:bg-brand-blue/10 transition-all border border-brand-blue/8"
                >
                  More Articles <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Right column: sticky sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">

              {/* Author mini-card */}
              <div className="bg-white rounded-3xl border border-brand-blue/8 shadow-sm overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-brand-blue to-brand-blue/80 relative">
                  <div className="absolute -bottom-6 left-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold/20 border-2 border-white flex items-center justify-center text-brand-gold text-xl font-display font-black shadow-md">
                      {post.author.charAt(0)}
                    </div>
                  </div>
                </div>
                <div className="px-5 pt-10 pb-5">
                  <p className="font-bold text-brand-blue text-sm">{post.author}</p>
                  <p className="text-brand-blue/45 text-[11px] mt-0.5">Udupi Vrindavan, Dubai</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="px-2.5 py-1 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[9px] font-bold uppercase tracking-wider rounded-full">
                      {post.category}
                    </span>
                    <span className="px-2.5 py-1 bg-brand-blue/5 text-brand-blue/50 text-[9px] font-bold uppercase tracking-wider rounded-full border border-brand-blue/8">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white rounded-3xl border border-brand-blue/8 shadow-sm p-5 space-y-2">
                <p className="text-[10px] font-bold text-brand-blue/35 uppercase tracking-[0.2em] mb-3">Actions</p>
                <button
                  onClick={handleShare}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${copied ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'bg-brand-blue/5 text-brand-blue/70 hover:bg-brand-blue/10 border border-brand-blue/8'
                    }`}
                >
                  {copied ? <LinkIcon size={16} /> : <Share2 size={16} />}
                  {copied ? 'Link copied!' : 'Share this article'}
                </button>
                <button
                  onClick={handleLike}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer border ${isLiked ? 'bg-red-50 text-red-500 border-red-100' : 'bg-brand-blue/5 text-brand-blue/70 border-brand-blue/8 hover:bg-red-50 hover:text-red-400 hover:border-red-100'
                    }`}
                >
                  <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                  {isLiked ? `Liked · ${likeCount}` : `Like · ${likeCount}`}
                </button>
                <Link
                  to="/blog"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-brand-blue/70 bg-brand-blue/5 hover:bg-brand-blue/10 transition-all border border-brand-blue/8"
                >
                  <BookOpen size={16} />
                  Browse all articles
                </Link>
              </div>

              {/* Related — sidebar quick links */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-3xl border border-brand-blue/8 shadow-sm p-5">
                  <p className="text-[10px] font-bold text-brand-blue/35 uppercase tracking-[0.2em] mb-4">
                    More in {post.category}
                  </p>
                  <div className="space-y-4">
                    {relatedPosts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/blog/${p.slug}`}
                        className="group flex items-start gap-3"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-brand-blue leading-snug line-clamp-2 group-hover:text-brand-gold transition-colors">
                            {stripHtml(p.title)}
                          </p>
                          <p className="text-[10px] text-brand-blue/35 mt-1 font-medium">{p.date} · {p.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Reading progress card */}
              <div className="bg-gradient-to-br from-brand-blue to-brand-blue/90 rounded-3xl p-5 text-center">
                <p className="text-brand-cream/50 text-[10px] font-bold uppercase tracking-widest mb-3">Reading Progress</p>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                  <div
                    className="absolute top-0 left-0 h-full bg-brand-gold rounded-full transition-all duration-200"
                    style={{ width: `${readProgress}%` }}
                  />
                </div>
                <p className="text-brand-gold font-black text-2xl">{Math.round(readProgress)}%</p>
                <p className="text-brand-cream/40 text-[10px] mt-1">{readProgress < 100 ? 'Keep reading…' : '🎉 Article complete!'}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          RELATED STORIES — full-width dark section
      ══════════════════════════════════════════════ */}
      {relatedPosts.length > 0 && (
        <section className="bg-brand-blue py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/4 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] block mb-4">Continue Reading</span>
                <h2 className="text-4xl md:text-5xl font-display text-white leading-tight">
                  More <span className="text-brand-gold">{post.category}</span> Stories
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-brand-cream/50 hover:text-brand-gold transition-colors text-sm font-bold uppercase tracking-wider shrink-0 group"
              >
                All Articles <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Cards grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedPosts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <Link to={`/blog/${p.slug}`} className="group block h-full">
                    <div className="bg-white/[0.04] border border-white/8 rounded-3xl overflow-hidden hover:border-brand-gold/25 transition-all duration-500 hover:bg-white/[0.07] h-full flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent" />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[9px] font-bold uppercase tracking-wider text-white">
                          {p.category}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-brand-gold/50 text-[10px] font-bold uppercase tracking-widest mb-3">
                          <span>{p.date}</span>
                          <span className="w-1 h-1 rounded-full bg-brand-gold/30" />
                          <span>{p.readTime}</span>
                        </div>
                        <h3 className="text-lg font-display text-white group-hover:text-brand-gold transition-colors leading-snug line-clamp-2 mb-3 flex-1">
                          {stripHtml(p.title)}
                        </h3>
                        <p className="text-brand-cream/45 text-sm line-clamp-2 leading-relaxed mb-5">
                          {stripHtml(p.excerpt)}
                        </p>
                        <div className="flex items-center gap-2 text-brand-gold text-[11px] font-bold uppercase tracking-[0.15em] group-hover:gap-3 transition-all duration-300 mt-auto">
                          <span>Read Story</span>
                          <ChevronRight size={13} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer bar */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center">
                  <span className="text-brand-gold font-display text-lg leading-none font-bold">V</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-cream/30">Udupi Vrindavan</span>
                  <span className="text-sm font-semibold text-brand-cream/60">Al Karama, Dubai</span>
                </div>
              </div>
              <Link
                to="/blog"
                className="px-8 py-3.5 bg-brand-gold text-brand-blue font-bold text-xs uppercase tracking-[0.25em] rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
              >
                Browse All Stories
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostDetail;
