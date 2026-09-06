import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Heritage Component
 * Highlights the cultural roots and culinary traditions of Udupi.
 * Features: Reversed grid on mobile, floating animated badges, parallax background shapes.
 * GSAP: Stagger reveals for text items, scroll-triggered parallax on background shape.
 */
const HERITAGE_IMAGES = [
  "/Lunch.jpg",
  "/ourheritage.jpeg",
  "/categories/Dosa.jpg"
];

const Heritage = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const skewBgRef = useRef<HTMLDivElement>(null);
  const textItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERITAGE_IMAGES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // ── GSAP ScrollTrigger Animations ─────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text column — slide from left
      gsap.fromTo(textColRef.current,
        { opacity: 0, x: -70 },
        {
          opacity: 1, x: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Text items — stagger
      if (textItemsRef.current) {
        const items = textItemsRef.current.querySelectorAll('.heritage-item');
        gsap.fromTo(items,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textItemsRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // Image column — scale in from right
      gsap.fromTo(imageColRef.current,
        { opacity: 0, x: 70, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageColRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Background skew shape — parallax
      gsap.to(skewBgRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="heritage" className="py-16 lg:py-32 bg-brand-blue text-brand-cream relative overflow-hidden">
      
      {/* Decorative Background: Skewed white overlay */}
      <div ref={skewBgRef} className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* --- Text Content Column --- */}
          <div
            ref={textColRef}
            className="order-2 md:order-1"
            style={{ opacity: 0 }}
          >
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Our Roots
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 lg:mb-10 text-brand-gold leading-tight">
              The Heritage <br className="hidden md:block" />of <span className="italic text-brand-cream">Udupi</span>
            </h2>
            
            <div ref={textItemsRef} className="space-y-8 opacity-90 text-lg leading-relaxed">
              <div className="flex gap-4 heritage-item">
                <span className="text-brand-gold/60 text-base font-bold mt-1">01</span>
                <p>
                  Udupi cuisine is a celebrated vegetarian culinary tradition from the coastal region of Karnataka. Known for its balanced flavors and wholesome ingredients, it reflects generations of culinary heritage.
                </p>
              </div>

              <div className="flex gap-4 heritage-item">
                <span className="text-brand-gold/60 text-base font-bold mt-1">02</span>
                <p>
                  Our meals are prepared using fresh grains, lentils, vegetables, and traditional spices that highlight the authentic taste of South Indian cooking.
                </p>
              </div>

              <div className="flex gap-4 heritage-item">
                <span className="text-brand-gold/60 text-base font-bold mt-1">03</span>
                <p>
                  From comforting Sambar and crispy Dosas to nourishing rice dishes and traditional sweets, every meal represents the rich heritage and hospitality of Udupi cuisine.
                </p>
              </div>
            </div>
          </div>

          {/* --- Image & Floating Badge Column --- */}
          <div
            ref={imageColRef}
            className="order-1 md:order-2 relative"
            style={{ opacity: 0 }}
          >
            {/* Main Image Container */}
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-2 border-brand-gold/20 aspect-square relative bg-brand-blue/20">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentIdx}
                  src={HERITAGE_IMAGES[currentIdx]}
                  alt="Traditional Udupi Heritage"
                  initial={{ opacity: 0, scale: 1.0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1.12,
                    transition: {
                      opacity: { duration: 1.2, ease: "easeInOut" },
                      scale: { duration: 6, ease: "linear" }
                    }
                  }}
                  exit={{ 
                    opacity: 0,
                    transition: { duration: 1.2, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Floating Guarantee Badge */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold rounded-full flex items-center justify-center shadow-2xl z-20 p-2 pointer-events-none"
            >
              <div className="text-brand-blue text-center leading-tight">
                <span className="block text-2xl font-bold">100%</span>
                <span className="block text-[10px] font-black uppercase tracking-tighter">
                  Money Back
                </span>
                <span className="block text-[8px] uppercase font-bold tracking-[0.2em] mt-1 opacity-80">
                  Guarantee
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Heritage;