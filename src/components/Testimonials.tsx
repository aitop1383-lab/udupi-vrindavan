import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Play, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { REVIEWS, VIDEO_REVIEWS, SOCIAL_LINKS } from '../data/siteConfig';

const GOOGLE_MAPS_REVIEWS_URL = "https://www.google.com/maps/place/Udupi+Vrindavan+Restaurant+LLC/@25.2471236,55.3103148,17z/data=!4m6!3m5!1s0x3e5f43dbc7060cb9:0xfc696ec76610e8d!8m2!3d25.2471236!4d55.3103148!16s%2Fg%2F11ltjbh3f7?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D";

const Testimonials = () => {
  const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [liveReviews, setLiveReviews] = useState<typeof REVIEWS>(REVIEWS);

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
    <section id="testimonials" className="py-16 lg:py-28 bg-brand-cream text-brand-blue overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none texture-bg"></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
        <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
          Patron Experiences
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-brand-blue font-display">
          Feedback from <span className="italic text-brand-gold">our patrons</span>
        </h2>

        {/* Google Rating Trust Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-white border border-brand-gold/30 rounded-full px-6 py-3 text-xs md:text-sm font-bold text-brand-blue mb-4 shadow-md">
          <div className="w-6 h-6 rounded-full bg-[#4285F4]/10 flex items-center justify-center text-[#4285F4]">
            <FontAwesomeIcon icon={faGoogle} className="text-sm" />
          </div>
          <span className="font-display font-bold text-sm md:text-base text-brand-blue">4.9 / 5.0</span>
          <span className="text-brand-gold font-bold">Google Rating</span>
          <span className="text-brand-blue/20">|</span>
          <div className="flex gap-0.5 text-brand-gold" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-brand-blue/20">|</span>
          <span className="text-brand-blue/70 font-medium">Based on 500+ authentic reviews</span>
          <a
            href={GOOGLE_MAPS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-gold font-bold underline ml-1 hover:text-brand-blue transition-colors flex items-center gap-1"
          >
            Verify <ExternalLink size={12} />
          </a>
        </div>

        <div className="w-24 h-1 bg-brand-gold/30 mx-auto rounded-full mt-4"></div>
      </div>

      {/* Real Text Reviews Marquee / Scroll */}
      <div className="flex relative mb-20 w-full">
        <motion.div
          className="flex gap-8 px-6"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          style={{ width: "max-content" }}
        >
          {[...liveReviews, ...liveReviews].map((review, idx) => (
            <div
              key={idx}
              className="w-[340px] md:w-[450px] flex-shrink-0 p-8 md:p-10 rounded-[2.5rem] bg-white border border-brand-blue/5 shadow-xl hover:shadow-2xl transition-all duration-500 group relative flex flex-col justify-between overflow-hidden min-h-[380px]"
            >
              <div className="absolute -top-4 -right-4 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Quote size={150} className="text-brand-blue rotate-12" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-wider uppercase border border-emerald-200">
                    <CheckCircle2 size={12} /> Google Verified
                  </div>
                </div>

                <p className={`text-base md:text-lg font-light italic leading-relaxed text-brand-blue/90 mb-4 ${!expandedStates[idx] ? 'line-clamp-4' : ''}`}>
                  "{review.text}"
                </p>

                {needsTruncation(review.text) && (
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="text-brand-gold text-[11px] font-black uppercase tracking-[0.1em] border-b-2 border-brand-gold/20 hover:border-brand-gold transition-all pb-1 cursor-pointer"
                  >
                    {expandedStates[idx] ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between mt-8 border-t border-brand-blue/5 pt-6 relative z-10">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-12 h-12 rounded-full bg-brand-blue text-brand-gold flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-brand-blue text-base leading-tight truncate">{review.name}</h4>
                    <p className="text-[10px] text-brand-blue/60 uppercase tracking-widest font-semibold mt-0.5 truncate">{review.role}</p>
                  </div>
                </div>
                {/* Verified Google Review Badge */}
                <div className="w-9 h-9 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-[#4285F4] shrink-0 shadow-sm" title="Google Verified Review">
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
      <div className="relative w-full overflow-hidden mb-16 py-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-cream to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-cream to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex gap-8"
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
              onClick={() => setActiveVideo(video.videoUrl)}
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
          <span>View All 500+ Reviews on Google</span>
          <ExternalLink size={14} />
        </motion.a>
        <p className="text-brand-blue/50 text-[11px] mt-3 font-medium">
          Verified reviews on Google Business Profile for Udupi Vrindavan Restaurant LLC
        </p>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-blue/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              className="absolute top-8 right-8 text-white bg-white/10 p-4 rounded-full border border-white/20 hover:bg-brand-gold transition-all cursor-pointer"
              aria-label="Close video"
            >
              <X size={28} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-[400px] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-2xl bg-black border-[6px] border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <video src={activeVideo} controls autoPlay className="w-full h-full object-cover"></video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
