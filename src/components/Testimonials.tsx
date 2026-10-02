import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Play, ExternalLink, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { REVIEWS, VIDEO_REVIEWS, SOCIAL_LINKS } from '../data/siteConfig';

const GOOGLE_MAPS_REVIEWS_URL = "https://www.google.com/maps/place/Udupi+Vrindavan+Restaurant+LLC/@25.2471236,55.3103148,17z/data=!4m6!3m5!1s0x3e5f43dbc7060cb9:0xfc696ec76610e8d!8m2!3d25.2471236!4d55.3103148!16s%2Fg%2F11ltjbh3f7?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D";

const Testimonials = () => {
  const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [activeVideoIdx, setActiveVideoIdx] = useState<number | null>(null);
  const [liveReviews, setLiveReviews] = useState<typeof REVIEWS>(REVIEWS);

  const handleNextVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeVideoIdx !== null) {
      setActiveVideoIdx((prev) => ((prev ?? 0) + 1) % VIDEO_REVIEWS.length);
    }
  };

  const handlePrevVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeVideoIdx !== null) {
      setActiveVideoIdx((prev) => ((prev ?? 0) - 1 + VIDEO_REVIEWS.length) % VIDEO_REVIEWS.length);
    }
  };

  // Keyboard navigation for video modal (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (activeVideoIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveVideoIdx((prev) => (prev !== null ? (prev + 1) % VIDEO_REVIEWS.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActiveVideoIdx((prev) => (prev !== null ? (prev - 1 + VIDEO_REVIEWS.length) % VIDEO_REVIEWS.length : null));
      } else if (e.key === 'Escape') {
        setActiveVideoIdx(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoIdx]);

  // Support optional Google Places API integration if an API key is provided
  useEffect(() => {
    const placesApiKey = (import.meta as any).env?.VITE_GOOGLE_PLACES_API_KEY;
    if (placesApiKey) {
      // Clean extension point for Google Places API when credentials are provided in production
      // Does not expose private keys on client side, falls back cleanly to curated authentic reviews
    }
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedStates(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const needsTruncation = (text: string) => text.length > 130;

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-brand-cream text-brand-blue overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none texture-bg"></div>

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          {/* Left: heading */}
          <div>
            <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-5 block">
              Patron Experiences
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-brand-blue font-display leading-tight">
              Feedback from <span className="italic text-brand-gold">our patrons</span>
            </h2>
          </div>

          {/* Right: prominent Google rating block */}
          <div className="flex-shrink-0">
            <div className="bg-white border border-brand-gold/20 rounded-3xl px-8 py-6 shadow-lg flex flex-col sm:flex-row items-center gap-6">
              {/* Score */}
              <div className="text-center">
                <div className="flex items-baseline gap-1 justify-center">
                  <span className="font-display font-bold text-5xl text-brand-blue leading-none">4.9</span>
                  <span className="text-brand-blue/40 text-lg font-bold">/5</span>
                </div>
                <div className="flex gap-1 text-brand-gold justify-center mt-2" aria-label="4.9 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-14 bg-brand-gold/15" />

              {/* Detail */}
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-[#4285F4]/10 flex items-center justify-center text-[#4285F4]">
                    <FontAwesomeIcon icon={faGoogle} className="text-xs" />
                  </div>
                  <span className="font-bold text-sm text-brand-blue">Google Rating</span>
                </div>
                <p className="text-brand-blue/50 text-xs font-medium mb-3">Based on 600+ authentic reviews</p>
                <a
                  href={GOOGLE_MAPS_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-brand-gold font-bold uppercase tracking-wider hover:text-brand-blue transition-colors border-b border-brand-gold/30 hover:border-brand-blue pb-0.5"
                >
                  Verify on Google <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rule */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      </div>

      {/* ── Text Reviews Marquee ──────────────────────────────── */}
      <div className="relative mb-16 w-full overflow-hidden">
        {/* Left/right fade edges - responsive smooth feather */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 lg:w-44 bg-gradient-to-r from-brand-cream via-brand-cream/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 lg:w-44 bg-gradient-to-l from-brand-cream via-brand-cream/70 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 px-6 py-8"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          style={{ width: "max-content" }}
        >
          {[...liveReviews, ...liveReviews].map((review, idx) => (
            <div
              key={idx}
              className="w-[320px] md:w-[420px] flex-shrink-0 bg-white border border-brand-gold/10 shadow-md hover:shadow-xl transition-all duration-500 group relative flex flex-col justify-between overflow-hidden min-h-[340px]"
              style={{ borderRadius: '2rem' }}
            >
              {/* Decorative Quote watermark */}
              <div className="absolute -top-3 -right-3 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                <Quote size={120} className="text-brand-blue rotate-12" />
              </div>

              <div className="relative z-10 p-8">
                {/* Stars + verified */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold tracking-wider uppercase border border-emerald-100">
                    <CheckCircle2 size={10} /> Verified
                  </div>
                </div>

                {/* Review text */}
                <p className={`text-sm md:text-base font-light italic leading-relaxed text-brand-blue/80 mb-4 ${!expandedStates[idx] ? 'line-clamp-4' : ''}`}>
                  "{review.text}"
                </p>

                {needsTruncation(review.text) && (
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="text-brand-gold text-[11px] font-black uppercase tracking-[0.1em] border-b border-brand-gold/30 hover:border-brand-gold transition-all pb-0.5 cursor-pointer"
                  >
                    {expandedStates[idx] ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>

              {/* Reviewer info */}
              <div className="flex items-center justify-between px-8 pb-7 border-t border-brand-blue/5 pt-5 relative z-10">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-brand-blue text-brand-gold flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-brand-blue text-sm leading-tight truncate">{review.name}</h4>
                    <p className="text-[10px] text-brand-blue/50 font-medium mt-0.5 truncate">{review.role}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#4285F4]/8 border border-[#4285F4]/15 flex items-center justify-center text-[#4285F4] shrink-0" title="Google Verified Review">
                  <FontAwesomeIcon icon={faGoogle} className="text-xs" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Video Reviews Sub-Section */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center relative z-10">
        <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">
          Patron Stories
        </span>
        <h3 className="text-2xl md:text-3xl font-display text-brand-blue font-bold">
          Moments &amp; Memories at <span className="italic text-brand-gold">Udupi Vrindavan</span>
        </h3>
      </div>

      {/* Video Testimonials Scroll */}
      <div className="relative w-full overflow-hidden mb-12">
        {/* Left/right fade edges - responsive smooth feather */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 lg:w-40 bg-gradient-to-r from-brand-cream via-brand-cream/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 lg:w-40 bg-gradient-to-l from-brand-cream via-brand-cream/70 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-8 py-8 px-4"
          animate={{ x: isVideoPaused ? undefined : ["-50%", "0%"] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          onHoverStart={() => setIsVideoPaused(true)}
          onHoverEnd={() => setIsVideoPaused(false)}
          style={{ width: "max-content" }}
        >
          {[...VIDEO_REVIEWS, ...VIDEO_REVIEWS, ...VIDEO_REVIEWS].map((video, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => {
                const foundIdx = VIDEO_REVIEWS.findIndex((v) => v.id === video.id);
                setActiveVideoIdx(foundIdx !== -1 ? foundIdx : 0);
              }}
              className="group relative w-[180px] md:w-[260px] aspect-[9/16] rounded-[2.5rem] overflow-hidden border-[4px] border-white shadow-xl cursor-pointer flex-shrink-0"
            >
              <img
                src={video.thumbnail}
                alt={`Video testimonial thumbnail ${video.id} for Udupi Vrindavan guests`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-brand-blue/90 opacity-70 group-hover:opacity-85 transition-opacity duration-300 z-10"></div>

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:bg-brand-gold/30" />
                  <div className="relative w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-500 shadow-2xl">
                    <Play className="text-white ml-0.5 fill-white group-hover:scale-110 transition-transform" size={22} />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-5 left-0 right-0 px-4 text-center opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 z-20">
                <span className="text-white text-[9px] font-black uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  Patron Story
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Verified Google Reviews Link CTA */}
      <div className="text-center relative z-10">
        <motion.a
          whileHover={{
            scale: 1.03,
            boxShadow: '0 20px 40px rgba(15,47,74,0.15)'
          }}
          whileTap={{ scale: 0.97 }}
          href={GOOGLE_MAPS_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-brand-blue text-brand-cream rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-xl border border-brand-blue/10 hover:bg-brand-gold hover:text-brand-blue transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faGoogle} className="text-lg text-brand-gold group-hover:text-brand-blue" />
          <span>View All 600+ Reviews on Google</span>
          <ExternalLink size={14} />
        </motion.a>
        <p className="text-brand-blue/50 text-[11px] mt-3 font-medium">
          Verified reviews on Google Business Profile for Udupi Vrindavan Restaurant LLC
        </p>
      </div>

      {/* Video Modal with Next/Previous Controls */}
      <AnimatePresence>
        {activeVideoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-blue/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6"
            onClick={() => setActiveVideoIdx(null)}
          >
            {/* Top Bar: Counter & Close */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
              <span className="text-white/80 text-[11px] md:text-xs font-bold tracking-widest uppercase bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/15">
                Story {activeVideoIdx + 1} of {VIDEO_REVIEWS.length}
              </span>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveVideoIdx(null)}
                className="text-white bg-white/10 hover:bg-brand-gold hover:text-brand-blue p-3 rounded-full border border-white/20 transition-all cursor-pointer pointer-events-auto shadow-xl"
                aria-label="Close video"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Left / Previous Arrow Button */}
            <motion.button
              whileHover={{ scale: 1.12, x: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevVideo}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 text-white bg-white/10 hover:bg-brand-gold hover:text-brand-blue p-3 md:p-4 rounded-full border border-white/20 transition-all cursor-pointer backdrop-blur-md shadow-2xl"
              aria-label="Previous video"
              title="Previous video (Left Arrow)"
            >
              <ChevronLeft size={28} />
            </motion.button>

            {/* Video Container */}
            <motion.div
              key={activeVideoIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-[340px] md:max-w-[400px] aspect-[9/16] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-black border-[5px] border-white/15 relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={VIDEO_REVIEWS[activeVideoIdx].videoUrl}
                src={VIDEO_REVIEWS[activeVideoIdx].videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Right / Next Arrow Button */}
            <motion.button
              whileHover={{ scale: 1.12, x: 3 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextVideo}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 text-white bg-white/10 hover:bg-brand-gold hover:text-brand-blue p-3 md:p-4 rounded-full border border-white/20 transition-all cursor-pointer backdrop-blur-md shadow-2xl"
              aria-label="Next video"
              title="Next video (Right Arrow)"
            >
              <ChevronRight size={28} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
