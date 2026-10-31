import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, Play, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { REVIEWS, VIDEO_REVIEWS } from '../data/siteConfig';
import Reveal from './ui/Reveal';

const GOOGLE_MAPS_REVIEWS_URL = "https://www.google.com/maps/place/Udupi+Vrindavan+Restaurant+LLC/@25.2471236,55.3103148,17z/data=!4m6!3m5!1s0x3e5f43dbc7060cb9:0xfc696ec76610e8d!8m2!3d25.2471236!4d55.3103148!16s%2Fg%2F11ltjbh3f7?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D";

const Testimonials = () => {
  const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>({});
  const [activeVideoIdx, setActiveVideoIdx] = useState<number | null>(null);

  const anyExpanded = Object.values(expandedStates).some(Boolean);

  const handleNextVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveVideoIdx((prev) => (prev !== null ? (prev + 1) % VIDEO_REVIEWS.length : null));
  };
  const handlePrevVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveVideoIdx((prev) => (prev !== null ? (prev - 1 + VIDEO_REVIEWS.length) % VIDEO_REVIEWS.length : null));
  };

  useEffect(() => {
    if (activeVideoIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveVideoIdx((p) => (p !== null ? (p + 1) % VIDEO_REVIEWS.length : null));
      else if (e.key === 'ArrowLeft') setActiveVideoIdx((p) => (p !== null ? (p - 1 + VIDEO_REVIEWS.length) % VIDEO_REVIEWS.length : null));
      else if (e.key === 'Escape') setActiveVideoIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideoIdx]);

  const toggleExpand = (index: number) => setExpandedStates(prev => ({ ...prev, [index]: !prev[index] }));
  const needsTruncation = (text: string) => text.length > 130;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-brand-cream py-20 lg:py-32 text-brand-blue">
      {/* Header */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Patron Experiences</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-brand-blue">
              Feedback from <span className="accent text-[1.12em]">our patrons</span>
            </h2>
          </div>

          {/* Google rating */}
          <div className="flex w-full flex-col items-center gap-5 rounded-[1.75rem] bg-brand-blue px-7 py-6 text-brand-cream shadow-xl shadow-brand-blue/20 sm:w-auto sm:flex-row sm:gap-7">
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-bold leading-none text-brand-cream">4.9</span>
                <span className="text-lg font-semibold text-brand-cream/40">/5</span>
              </div>
              <div className="mt-2 flex justify-center gap-1 text-brand-gold" aria-label="4.9 out of 5 stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" strokeWidth={0} />)}
              </div>
            </div>
            <div className="hidden h-14 w-px bg-white/15 sm:block" />
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#4285F4]">
                  <FontAwesomeIcon icon={faGoogle} className="text-xs" />
                </span>
                <span className="text-sm font-semibold">Google Rating</span>
              </div>
              <p className="mb-3 text-xs text-brand-cream/60">Based on 600+ authentic reviews</p>
              <a
                href={GOOGLE_MAPS_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border-b border-brand-gold/40 pb-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-gold transition-colors hover:border-brand-gold hover:text-brand-gold-light"
              >
                Verify on Google <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </Reveal>
        <div className="hairline mt-14" />
      </div>

      {/* Text Reviews Marquee */}
      <div className={`marquee-pause relative mt-6 -mb-8 w-full overflow-hidden ${anyExpanded ? '[&_.animate-marquee]:[animation-play-state:paused]' : ''}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-20 bg-gradient-to-r from-brand-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-20 bg-gradient-to-l from-brand-cream to-transparent" />
        <div className="flex w-max animate-marquee gap-6 px-3 pt-6 pb-16" style={{ animationDuration: '80s' }}>
          {[...REVIEWS, ...REVIEWS].map((review, idx) => (
            <article
              key={idx}
              aria-hidden={idx >= REVIEWS.length}
              className="group relative flex w-[82vw] max-w-[340px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_40px_-28px_rgba(15,47,74,0.4)] ring-1 ring-brand-blue/5 transition-shadow hover:shadow-[0_28px_50px_-28px_rgba(15,47,74,0.5)] sm:w-[360px] sm:max-w-none min-h-[320px]"
            >
              <Quote size={84} className="pointer-events-none absolute -right-2 -top-2 rotate-12 text-brand-gold/10" />
              <div className="relative p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-0.5 text-brand-gold">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-100">
                    <CheckCircle2 size={10} /> Verified
                  </span>
                </div>
                <p className={`font-accent text-lg italic leading-snug text-brand-blue/85 ${!expandedStates[idx] ? 'line-clamp-4' : ''}`}>
                  "{review.text}"
                </p>
                {needsTruncation(review.text) && (
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="mt-3 border-b border-brand-gold/40 pb-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-bronze transition-colors hover:border-brand-gold cursor-pointer"
                  >
                    {expandedStates[idx] ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
              <div className="relative flex items-center justify-between border-t border-brand-blue/5 px-7 py-5">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue font-display font-bold text-brand-gold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="truncate text-sm leading-tight text-brand-blue">{review.name}</h4>
                    <p className="mt-0.5 truncate text-[11px] text-brand-blue/50">{review.role}</p>
                  </div>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4285F4]/10 text-[#4285F4]" title="Google Verified Review">
                  <FontAwesomeIcon icon={faGoogle} className="text-xs" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Video Reviews */}
      <Reveal className="relative z-10 mx-auto mt-20 max-w-7xl px-5 sm:px-6 text-center">
        <span className="eyebrow justify-center">Patron Stories</span>
        <h3 className="mt-4 text-2xl md:text-4xl text-brand-blue">
          Moments &amp; Memories at <span className="accent text-[1.12em]">Udupi Vrindavan</span>
        </h3>
      </Reveal>

      <div className="marquee-pause relative mt-2 -mb-6 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-28 lg:w-40 bg-gradient-to-r from-brand-cream to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-28 lg:w-40 bg-gradient-to-l from-brand-cream to-transparent" />
        <div className="flex w-max animate-marquee gap-6 px-3 pt-10 pb-16" style={{ animationDuration: '55s', animationDirection: 'reverse' }}>
          {[...VIDEO_REVIEWS, ...VIDEO_REVIEWS].map((video, idx) => (
            <button
              key={idx}
              type="button"
              tabIndex={idx >= VIDEO_REVIEWS.length ? -1 : 0}
              onClick={() => {
                const foundIdx = VIDEO_REVIEWS.findIndex((v) => v.id === video.id);
                setActiveVideoIdx(foundIdx !== -1 ? foundIdx : 0);
              }}
              aria-label={`Play patron story ${video.id}`}
              className="group relative aspect-[9/16] w-[170px] md:w-[230px] flex-shrink-0 overflow-hidden rounded-[2rem] ring-4 ring-white shadow-xl transition-transform duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <img
                src={video.thumbnail}
                alt={`Video testimonial thumbnail ${video.id} for Udupi Vrindavan guests`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-ink/20 to-brand-ink/85" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-brand-gold group-hover:bg-brand-gold">
                  <Play className="ml-0.5 fill-white text-white group-hover:fill-brand-blue group-hover:text-brand-blue" size={20} />
                </span>
              </div>
              <span className="absolute inset-x-0 bottom-5 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-white/90">
                Patron Story
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Google CTA */}
      <div className="relative z-10 mt-10 px-5 text-center">
        <a
          href={GOOGLE_MAPS_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex max-w-full items-center justify-center gap-3 rounded-full bg-brand-blue px-6 sm:px-8 py-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-brand-cream shadow-xl shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-blue"
        >
          <FontAwesomeIcon icon={faGoogle} className="shrink-0 text-base text-brand-gold transition-colors group-hover:text-brand-blue" />
          <span className="leading-tight">View All 600+ Reviews on Google</span>
          <ExternalLink size={14} className="shrink-0" />
        </a>
        <p className="mt-4 px-2 text-[11px] text-brand-blue/50">
          Verified reviews on Google Business Profile for Udupi Vrindavan Restaurant LLC
        </p>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/95 p-4 backdrop-blur-2xl md:p-6"
            onClick={() => setActiveVideoIdx(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="pointer-events-none absolute left-5 right-5 top-5 z-30 flex items-center justify-between">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur-md">
                Story {activeVideoIdx + 1} of {VIDEO_REVIEWS.length}
              </span>
              <button
                onClick={() => setActiveVideoIdx(null)}
                className="pointer-events-auto rounded-full border border-white/20 bg-white/10 p-3 text-white transition-all hover:rotate-90 hover:bg-brand-gold hover:text-brand-blue cursor-pointer"
                aria-label="Close video"
              >
                <X size={22} />
              </button>
            </div>

            <button
              onClick={handlePrevVideo}
              className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-brand-gold hover:text-brand-blue md:left-8 md:p-4 cursor-pointer"
              aria-label="Previous video"
              title="Previous video (Left Arrow)"
            >
              <ChevronLeft size={26} />
            </button>

            <motion.div
              key={activeVideoIdx}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-20 aspect-[9/16] w-full max-w-[min(340px,calc((100vh-8rem)*9/16))] md:max-w-[min(400px,calc((100vh-8rem)*9/16))] overflow-hidden rounded-[2rem] border-4 border-white/15 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={VIDEO_REVIEWS[activeVideoIdx].videoUrl}
                src={VIDEO_REVIEWS[activeVideoIdx].videoUrl}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            </motion.div>

            <button
              onClick={handleNextVideo}
              className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-brand-gold hover:text-brand-blue md:right-8 md:p-4 cursor-pointer"
              aria-label="Next video"
              title="Next video (Right Arrow)"
            >
              <ChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
