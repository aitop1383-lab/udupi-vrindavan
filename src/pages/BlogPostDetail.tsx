import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../types/blog';
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, Heart, ChevronRight, Quote } from 'lucide-react';
import { blogApi } from '../services/blogApi';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const data = await blogApi.getPostBySlug(slug);
        if (!data) {
          navigate('/blog');
          return;
        }
        setPost(data);

        if (data.category) {
          const allPosts = await blogApi.getPosts();
          const related = allPosts
            .filter(p => p.id !== data.id && p.category === data.category)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  const handleShare = async () => {
    const shareData = {
      title: post?.title.replace(/<[^>]*>/g, '') || 'Udupi Vrindavan Blog',
      text: post?.excerpt || 'Check out this post from Udupi Vrindavan',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  };

  if (loading || !post) return (
    <div className="bg-brand-cream min-h-screen texture-bg pb-20 pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="h-4 w-32 bg-brand-blue/10 rounded-full mb-8 animate-pulse" />
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="h-3 w-20 bg-brand-gold/50 rounded-full mb-4 animate-pulse" />
            <div className="h-16 md:h-24 w-full bg-brand-blue/10 rounded-2xl mb-4 animate-pulse" />
            <div className="h-16 md:h-24 w-3/4 bg-brand-blue/10 rounded-2xl animate-pulse" />
          </div>
          <div className="lg:col-span-5 hidden lg:block">
             <div className="h-32 w-full bg-brand-blue/10 rounded-2xl animate-pulse" />
          </div>
        </div>
        <div className="h-[45vh] md:h-[80vh] w-full bg-brand-blue/10 rounded-2xl animate-pulse mb-20" />
      </div>
    </div>
  );

  return (
    <div className="bg-brand-cream min-h-screen texture-bg pb-20">
      <Helmet>
        <title>{post.title.replace(/<[^>]*>/g, '')} | Udupi Vrindavan</title>
        <meta name="description" content={post.excerpt.replace(/<[^>]*>/g, '')} />
        <link rel="canonical" href={`https://udupivrindavan.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title.replace(/<[^>]*>/g, '')} />
        <meta property="og:description" content={post.excerpt.replace(/<[^>]*>/g, '')} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://udupivrindavan.com/blog/${post.slug}`} />
        <meta property="og:image" content={post.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title.replace(/<[^>]*>/g, '')} />
        <meta name="twitter:description" content={post.excerpt.replace(/<[^>]*>/g, '')} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:site" content="@UdupiVrindavan" />
      </Helmet>


      {/* Modern Editorial Header */}
      <header className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <Link to="/blog" className="flex items-center gap-2 text-brand-gold font-medium mb-8 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest text-xs">Back to Journal</span>
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-xs block mb-4">
                  {post.category}
                </span>
                <h1
                  className="text-4xl md:text-7xl font-display text-brand-blue leading-[1.1] mb-8"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }}
                />
                <div className="flex items-center gap-8 text-brand-blue/60 border-t border-brand-blue/10 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-brand-blue">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Mobile Social Actions */}
                <div className="flex lg:hidden items-center gap-6 mt-8 pt-6 border-t border-brand-blue/10">
                  <button 
                    onClick={handleShare}
                    className={`flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] transition-colors ${copied ? 'text-brand-gold' : 'text-brand-blue/60 hover:text-brand-gold'}`}
                  >
                    <Share2 size={16} className={copied ? 'animate-pulse' : ''} />
                    {copied ? 'Link Copied' : 'Share Story'}
                  </button>
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] transition-colors ${isLiked ? 'text-red-500' : 'text-brand-blue/60 hover:text-red-500'}`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    {isLiked ? 'Liked' : 'Like'}
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
              <p className="text-xl text-brand-blue/60 font-light leading-relaxed italic border-l-2 border-brand-gold pl-6">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image - Wide/Asymmetric */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20">
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative h-[45vh] md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
        >
          <img 
            src={post.image} 
            alt="Featured" 
            fetchPriority="high"
            width="1200"
            height="800"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-brand-blue/10 rounded-2xl" />
        </motion.div>
      </section>

      {/* Article Content Area */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 relative">

        {/* Sticky Social Tools */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-32 flex flex-col gap-6 items-center">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full border transition-all ${isLiked ? 'bg-red-500 border-red-500 text-white' : 'border-brand-blue/10 text-brand-blue hover:border-brand-gold'}`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={handleShare}
              className={`p-3 rounded-full border transition-all ${copied ? 'bg-brand-gold border-brand-gold text-brand-blue' : 'border-brand-blue/10 text-brand-blue hover:border-brand-gold'}`}
              title="Share post"
            >
              <Share2 size={20} className={copied ? 'animate-pulse' : ''} />
            </button>
            <div className="h-20 w-px bg-brand-blue/10" />
            <span className="[writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.3em] font-bold text-brand-blue/40">Share Story</span>
          </div>
        </aside>

        {/* Main Text */}
        <main className="lg:col-span-8 lg:col-start-3">
          <motion.article 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-base md:prose-lg lg:prose-xl max-w-none 
            prose-headings:font-display prose-headings:text-brand-blue
            prose-p:text-brand-blue/80 prose-p:leading-[1.8]
            prose-blockquote:border-none prose-blockquote:p-0
            prose-strong:text-brand-blue prose-img:max-w-full prose-img:h-auto prose-img:rounded-2xl prose-img:mx-auto prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
          ">
            {/* Custom Quote Component for within content */}
            <div className="my-12 py-10 border-y border-brand-gold/20 relative">
              <Quote className="absolute -top-4 left-1/2 -translate-x-1/2 text-brand-gold bg-brand-cream px-2" size={32} />
              <p className="text-3xl font-display text-center text-brand-blue leading-snug">
                Traditional flavors meets modern wellness in every bite at Udupi Vrindavan.
              </p>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              className="drop-cap"
            />
          </motion.article>

          {/* Tags / Meta */}
          <div className="mt-16 pt-8 border-t border-brand-blue/10 flex flex-wrap gap-3">
            {['Authentic', 'Healthy', 'Karnataka'].map(tag => (
              <span key={tag} className="px-4 py-1 rounded-full bg-white border border-brand-blue/5 text-xs font-bold text-brand-blue/60 uppercase">
                #{tag}
              </span>
            ))}
          </div>
        </main>
      </div>

      {/* Related Stories - Horizontal Scroll Style */}
      <section className="mt-32 bg-brand-blue py-24 text-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-display mb-4">Continue Your Journey</h2>
          <p className="text-brand-cream/60">More stories from our {post.category} collection.</p>
        </div>

        <div className="flex gap-8 overflow-x-auto px-6 md:px-[calc((100vw-1280px)/2)] no-scrollbar pb-10">
          {relatedPosts.map((p) => (
            <Link to={`/blog/${p.slug}`} key={p.id} className="min-w-[300px] md:min-w-[450px] group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="text-2xl font-display group-hover:text-brand-gold transition-colors mb-2">{p.title}</h3>
              <p className="text-brand-cream/50 line-clamp-2 text-sm leading-relaxed">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPostDetail;