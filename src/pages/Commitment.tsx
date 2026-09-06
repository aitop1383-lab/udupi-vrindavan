import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Coins, GraduationCap, ArrowRightCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Importing the data from siteConfig
import { EMPLOYEE_BENEFITS } from '../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

const Commitment = () => {
  const [lang, setLang] = useState<'en' | 'kn'>('en');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerBadgeRef = useRef<HTMLDivElement>(null);

  // Helper to map icons to specific titles
  const getIcon = (title: string) => {
    switch (title) {
      case "Worker Welfare": return <Heart className="w-8 h-8" />;
      case "Empowerment": return <Users className="w-8 h-8" />;
      case "Remuneration": return <Coins className="w-8 h-8" />;
      case "Training": return <GraduationCap className="w-8 h-8" />;
      default: return <Heart className="w-8 h-8" />;
    }
  };

  // ── GSAP ScrollTrigger ─────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header stagger
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Benefit cards — batch reveal with stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.benefit-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Footer badge
      gsap.fromTo(footerBadgeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerBadgeRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="our-commitment" className="py-16 md:py-24 lg:py-32 texture-bg relative overflow-hidden bg-brand-cream">
      
      {/* Decorative Background Animations */}
      <div className="absolute top-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-brand-gold/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-brand-blue/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16">
          <span
            style={{ opacity: 0 }}
            className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            {lang === 'kn' ? 'ನಮ್ಮ ವಾಗ್ದಾನ' : 'Our Promise'}
          </span>
          <h2
            style={{ opacity: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl text-brand-blue leading-tight mb-6"
          >
            {lang === 'kn' ? (
              <>ಸಿಬ್ಬಂದಿ <span className="italic text-brand-gold font-display">ಬದ್ಧತೆ</span></>
            ) : (
              <>Commitment to <span className="italic text-brand-gold font-display">Employees</span></>
            )}
          </h2>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-brand-gold/30"></div>
            <p className="text-sm uppercase tracking-widest text-brand-gold font-bold">
              {lang === 'kn' ? 'ಅನ್ನದಾತಾ ಸುಖೀಭವ' : 'The Provider of Food Shall Be Happy'}
            </p>
            <div className="w-12 h-px bg-brand-gold/30"></div>
          </div>
        </div>

        {/* Language Toggle Switch */}
        <div className="flex justify-center mb-16">
          <div className="bg-brand-blue/5 p-1 rounded-full border border-brand-blue/10 flex items-center gap-1">
            <button
              onClick={() => setLang('en')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                lang === 'en'
                  ? 'bg-brand-blue text-brand-cream shadow-md'
                  : 'text-brand-blue/60 hover:text-brand-blue'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('kn')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                lang === 'kn'
                  ? 'bg-brand-blue text-brand-cream shadow-md'
                  : 'text-brand-blue/60 hover:text-brand-blue'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {EMPLOYEE_BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="benefit-card group bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_40px_rgba(15,47,74,0.05)] border border-brand-gold/10 hover:border-brand-gold/40 hover:shadow-[0_20px_60px_rgba(212,166,90,0.15)] transition-all duration-500 relative overflow-hidden flex flex-col"
              style={{ opacity: 0 }}
            >
              {/* Decorative gradient blob */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl group-hover:bg-brand-gold/20 transition-colors duration-500"></div>
              
              <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="w-16 h-16 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-cream group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-xl shrink-0">
                  {getIcon(benefit.title)}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-brand-blue">
                    {lang === 'kn' ? (benefit as any).kannadaTitle : benefit.title}
                  </h3>
                  <p className="text-brand-gold text-xs uppercase tracking-[0.2em] mt-1 font-bold">
                    {lang === 'kn' ? 'ಮುಖ್ಯ ಸೌಲಭ್ಯ' : 'Core Benefit'}
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex-grow">
                <ul className="space-y-5">
                  {(lang === 'kn' ? (benefit as any).kannadaItems : benefit.items).map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="mt-1 bg-brand-gold/20 p-1 rounded-full text-brand-gold shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                        <ArrowRightCircle className="w-4 h-4" />
                      </div>
                      <span className="text-brand-blue/80 text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Cultural Badge */}
        <div ref={footerBadgeRef} className="mt-20 flex justify-center" style={{ opacity: 0 }}>
          <div className="text-center bg-white/50 backdrop-blur-sm px-10 py-8 rounded-[2rem] border border-brand-gold/20 shadow-inner">
            <div className="w-24 h-0.5 bg-brand-gold mx-auto mb-4"></div>
            <p className="text-brand-blue text-xl md:text-2xl font-display mb-2">
              {lang === 'kn' ? 'ನಮ್ಮ ಸಿಬ್ಬಂದಿಯೇ ನಮ್ಮ ಸಂಸ್ಥೆಯ ಜೀವಾಳ' : 'Our staff are the soul of our organization'}
            </p>
            <p className="text-brand-gold uppercase tracking-widest text-[10px] font-bold opacity-70">
              {lang === 'kn' ? 'ಉಡುಪಿ ಬೃಂದಾವನ ಹಾಸ್ಪಿಟಾಲಿಟಿ ಗ್ರೂಪ್' : 'Udupi Vrindavan Hospitality Group'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commitment;