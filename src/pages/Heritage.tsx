import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal, { ImageReveal } from '../components/ui/Reveal';

const HERITAGE_IMAGES = [
  "/heritage/1.jpg",
  "/heritage/2.jpg",
  "/heritage/3.jpg"
];

const HERITAGE_POINTS = [
  "Udupi cuisine is a celebrated vegetarian culinary tradition from the coastal region of Karnataka. Known for its balanced flavors and wholesome ingredients, it reflects generations of culinary heritage.",
  "Our meals are prepared using fresh grains, lentils, vegetables, and traditional spices that highlight the authentic taste of South Indian cooking.",
  "From comforting Sambar and crispy Dosas to nourishing rice dishes and traditional sweets, every meal represents the rich heritage and hospitality of Udupi cuisine.",
];

const Heritage = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERITAGE_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="heritage" className="relative overflow-hidden bg-brand-blue py-20 text-brand-cream lg:py-32">
      <div className="absolute inset-0 pattern-dots opacity-15 pointer-events-none" />
      <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Text */}
          <Reveal x={-30} y={0} className="order-2 lg:order-1">
            <span className="eyebrow eyebrow-light">Our Roots</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-brand-gold">
              The Heritage <br className="hidden md:block" />of <span className="accent text-[1.12em] text-brand-cream">Udupi</span>
            </h2>

            <ol className="mt-12 space-y-0">
              {HERITAGE_POINTS.map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px 0px' }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-white/10 py-7 last:border-b"
                >
                  <span className="font-accent text-3xl italic font-semibold text-brand-gold/80 transition-colors group-hover:text-brand-gold">
                    0{i + 1}
                  </span>
                  <p className="text-base sm:text-lg leading-relaxed text-brand-cream/80 transition-colors group-hover:text-brand-cream">{text}</p>
                </motion.li>
              ))}
            </ol>
          </Reveal>

          {/* Image */}
          <Reveal x={30} y={0} delay={0.1} className="order-1 lg:order-2 relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-3 sm:-inset-5 rounded-[3rem] border border-brand-gold/25" />
            <ImageReveal from="right" className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-brand-ink shadow-2xl">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentIdx}
                  src={HERITAGE_IMAGES[currentIdx]}
                  alt="Traditional Udupi Heritage"
                  initial={{ opacity: 0, scale: 1.0 }}
                  animate={{
                    opacity: 1,
                    scale: 1.1,
                    transition: { opacity: { duration: 1.2, ease: "easeInOut" }, scale: { duration: 6, ease: "linear" } }
                  }}
                  exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-ink/70 to-transparent" />
              <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                {HERITAGE_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${currentIdx === i ? 'w-8 bg-brand-gold' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                    aria-label={`Go to heritage slide ${i + 1}`}
                  />
                ))}
              </div>
            </ImageReveal>

            {/* Guarantee badge */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 150, damping: 13, delay: 0.6 }}
              className="absolute -right-2 -top-6 sm:-right-8 sm:-top-8 z-20 flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full bg-brand-gold text-brand-blue shadow-2xl shadow-black/30 pointer-events-none"
            >
              <div className="absolute inset-1.5 rounded-full border border-dashed border-brand-blue/30 animate-spin-slow" />
              <div className="text-center leading-tight">
                <span className="block font-display text-2xl sm:text-3xl font-bold">100%</span>
                <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-tight">Money Back</span>
                <span className="mt-1 block text-[8px] uppercase font-semibold tracking-[0.2em] opacity-80">Guarantee</span>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Heritage;
