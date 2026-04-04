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
      <header className="relative pt-24 pb-12 md:pt-36 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full overflow-hidden">
          <Link to="/blog" className="flex items-center gap-2 text-brand-gold font-medium mb-10 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs">Back to Journal</span>
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs block mb-6 px-4 py-1.5 border border-brand-gold/20 rounded-full w-fit">
                  {post.category}
                </span>
                <h1
                  className="text-3xl md:text-5xl lg:text-6xl font-display text-brand-blue leading-[1.2] tracking-tight mb-10 break-words"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.title) }}
                />

                <div className="flex flex-wrap items-center gap-6 md:gap-10 text-brand-blue/60 border-t border-brand-blue/10 pt-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold border border-brand-gold/20">
                      {post.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-brand-blue/40 font-bold mb-0.5">Written by</span>
                      <span className="text-sm font-bold text-brand-blue">{post.author}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-brand-blue/40 font-bold mb-0.5">Published</span>
                      <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
                        <Calendar size={14} className="text-brand-gold" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-brand-blue/40 font-bold mb-0.5">Reading Time</span>
                      <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
                        <Clock size={14} className="text-brand-gold" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Actions */}
                <div className="flex items-center gap-4 sm:gap-8 mt-10 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-brand-blue/5 flex-wrap">
                  <button
                    onClick={handleShare}
                    className={`flex items-center gap-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-colors ${copied ? 'text-brand-gold' : 'text-brand-blue/60 hover:text-brand-gold'}`}
                  >
                    <Share2 size={16} className={copied ? 'animate-pulse' : ''} />
                    {copied ? 'Link Copied' : 'Share Story'}
                  </button>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center gap-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-colors ${isLiked ? 'text-red-500' : 'text-brand-blue/60 hover:text-red-500'}`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    {isLiked ? 'Liked' : 'Like'}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>



      {/* Article Content Area */}
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Main Text */}
        <main className="w-full overflow-hidden">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-base md:prose-lg lg:prose-xl max-w-none break-words
            prose-headings:font-display prose-headings:text-brand-blue prose-headings:tracking-tight
            prose-p:text-brand-blue/80 prose-p:leading-[2] prose-p:mb-8
            prose-blockquote:border-none prose-blockquote:p-0
            prose-strong:text-brand-blue prose-strong:font-bold
            prose-img:max-w-full prose-img:h-auto prose-img:rounded-3xl prose-img:mx-auto prose-img:shadow-2xl prose-img:my-16
            prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-a:font-semibold transition-all
          ">
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              className="drop-cap-first"
            />
          </motion.article>

          {/* Tags / Meta */}
          <div className="mt-20 pt-10 border-t border-brand-blue/10 flex flex-wrap gap-4 px-2">
            {['Authentic', 'Healthy', 'Karnataka', 'Wellness'].map(tag => (
              <span key={tag} className="px-6 py-2 rounded-full bg-white border border-brand-blue/5 text-[10px] font-bold text-brand-blue/60 uppercase tracking-widest hover:border-brand-gold/30 hover:text-brand-gold transition-all cursor-default">
                #{tag}
              </span>
            ))}
          </div>
        </main>
      </div>

      {/* Related Stories - Premium Grid Redesign */}
      <section className="mt-32 bg-brand-blue py-32 text-brand-cream relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] block mb-4"
              >
                Curated Suggestions
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-display leading-[1.1]">Continue Your Journey</h2>
            </div>
            <p className="text-brand-cream/60 max-w-md text-sm md:text-base leading-relaxed">
              Explore more hand-picked stories from our universe of {post.category} and authentic living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {relatedPosts.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-3xl mb-8 shadow-2xl">
                    <img
                      src={p.image}
                      className={`w-full h-full transition-transform duration-1000 ease-out group-hover:scale-110 ${p.image === '/logo.png' ? 'object-contain p-6' : 'object-cover'}`}
                      alt={p.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Floating Category Tag */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-brand-cream/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-cream">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="px-2">
                    <div className="flex items-center gap-4 text-brand-gold/60 text-[10px] font-bold uppercase tracking-widest mb-4">
                      <span>{p.date}</span>
                      <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-display group-hover:text-brand-gold transition-colors mb-4 line-clamp-2 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-brand-cream/50 line-clamp-2 text-sm leading-relaxed mb-6">
                      {p.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300">
                      <span>Read Story</span>
                      <ArrowLeft size={16} className="rotate-180" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center">
                <span className="text-brand-gold font-display text-xl leading-none">V</span>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-brand-cream/40">Established</span>
                <span className="text-sm font-semibold">Udupi Vrindavan Journal</span>
              </div>
            </div>
            <Link to="/blog" className="px-10 py-4 bg-brand-gold text-brand-blue font-bold text-xs uppercase tracking-[0.3em] rounded-full hover:bg-white transition-colors duration-300">
              Browse All Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostDetail;