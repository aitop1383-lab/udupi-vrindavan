import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Play } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// Import centralized data
import { REVIEWS, VIDEO_REVIEWS } from '../data/siteConfig';

const Testimonials = () => {
  const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedStates(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const needsTruncation = (text: string) => text.length > 130;

  return (
    <section className="py-24 bg-brand-cream text-brand-blue overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none texture-bg"></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
        <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Our Wall of Love</span>
        <h2 className="text-5xl md:text-6xl mb-6 text-brand-blue font-display">
          Feedback from <span className="italic text-brand-gold">our patrons</span>
        </h2>
        <div className="w-24 h-1 bg-brand-gold/30 mx-auto rounded-full"></div>
      </div>

      {/* Text Reviews Scroll */}
      <div className="flex relative mb-24 w-full">
        <motion.div
          className="flex gap-8 px-6"
          animate={{ x: isPaused ? undefined : ["0%", "-50%"] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          style={{ width: "max-content" }}
        >
          {[...REVIEWS, ...REVIEWS].map((review, idx) => (
            <div key={idx} className="w-[340px] md:w-[450px] flex-shrink-0 p-8 md:p-10 rounded-[2.5rem] bg-white border border-brand-blue/5 shadow-xl hover:shadow-2xl transition-all duration-500 group relative flex flex-col justify-between overflow-hidden min-h-[400px]">
              <div className="absolute -top-4 -right-4 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Quote size={150} className="text-brand-blue rotate-12" />
              </div>

              <div className="relative z-10">
                <div className="flex gap-1 text-brand-gold mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" strokeWidth={0} />)}
                </div>
                
                <p className={`text-lg md:text-xl font-light italic leading-relaxed text-brand-blue/90 mb-4 ${!expandedStates[idx] ? 'line-clamp-4' : ''}`}>
                  "{review.text}"
                </p>
                
                {needsTruncation(review.text) && (
                  <button 
                    onClick={() => toggleExpand(idx)} 
                    className="text-brand-gold text-[11px] font-black uppercase tracking-[0.1em] border-b-2 border-brand-gold/20 hover:border-brand-gold transition-all pb-1"
                  >
                    {expandedStates[idx] ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-5 mt-10 border-t border-brand-blue/5 pt-8 relative z-10">
                <div className="w-14 h-14 rounded-full bg-brand-blue text-brand-gold flex items-center justify-center font-bold text-xl shadow-lg shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-brand-blue text-base md:text-lg leading-tight truncate">{review.name}</h4>
                  <p className="text-[10px] md:text-[11px] text-brand-blue/50 uppercase tracking-widest font-semibold mt-1">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Video Reviews Scroll */}
      <div className="relative w-full overflow-hidden mb-20 py-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-cream to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-cream to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex gap-10"
          animate={{ x: isVideoPaused ? undefined : ["-50%", "0%"] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          onHoverStart={() => setIsVideoPaused(true)}
          onHoverEnd={() => setIsVideoPaused(false)}
          style={{ width: "max-content" }}
        >
          {[...VIDEO_REVIEWS, ...VIDEO_REVIEWS, ...VIDEO_REVIEWS].map((video, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => setActiveVideo(video.videoUrl)}
              className="group relative w-[180px] md:w-[280px] aspect-[9/16] rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl cursor-pointer flex-shrink-0"
            >
              <img src={video.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-brand-blue/90 opacity-70 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-500 shadow-2xl">
                  <Play className="text-white ml-1 fill-white" size={30} />
                </div>
              </div>
              
              <div className="absolute bottom-6 left-0 right-0 px-6 text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-white text-[9px] font-black uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">Patron Story</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Google Button */}
      <div className="mt-8 text-center relative z-10">
        <motion.a
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: '#D4AF37', 
            color: '#002E54',
            boxShadow: '0 20px 40px rgba(212,175,55,0.3)'
          }}
          whileTap={{ scale: 0.95 }}
          href="https://www.google.com/maps/place/Udupi+Vrindavan+Restaurant+LLC/@25.2471236,55.3103148,17z/data=!4m6!3m5!1s0x3e5f43dbc7060cb9:0xfc696ec76610e8d!8m2!3d25.2471236!4d55.3103148!16s%2Fg%2F11ltjbh3f7?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-4 px-14 py-6 bg-brand-blue text-brand-cream rounded-full transition-all duration-500 font-bold uppercase tracking-[0.2em] text-xs shadow-2xl border border-brand-blue/10"
        >
          <FontAwesomeIcon icon={faGoogle} className="text-xl" />
          <span>Explore All 500+ Reviews</span>
        </motion.a>
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
               className="absolute top-8 right-8 text-white bg-white/10 p-4 rounded-full border border-white/20 hover:bg-brand-gold transition-all"
            >
              <X size={32} />
            </motion.button>
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-[420px] aspect-[9/16] rounded-[3.5rem] overflow-hidden shadow-2xl bg-black border-[8px] border-white/10" 
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