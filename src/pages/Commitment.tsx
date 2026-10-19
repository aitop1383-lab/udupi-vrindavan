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
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {EMPLOYEE_BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="benefit-card group relative overflow-hidden flex flex-col min-h-[22rem] rounded-[2rem] border border-brand-blue/10 bg-white/75 p-7 md:p-9 shadow-[0_18px_45px_rgba(15,47,74,0.07)] transition-all duration-500 hover:-translate-y-2 hover:border-brand-gold/50 hover:shadow-[0_28px_65px_rgba(15,47,74,0.14)]"
              style={{ opacity: 0 }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold via-brand-gold/30 to-transparent" />
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-brand-gold/10 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-gold/20" />
              <div className="absolute bottom-0 right-0 h-28 w-28 rounded-tl-[5rem] bg-brand-blue/[0.03] transition-colors group-hover:bg-brand-gold/[0.08]" />

              <div className="relative z-10 flex items-start justify-between gap-5 border-b border-brand-blue/10 pb-7">
                <div className="flex items-center gap-5">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-blue text-brand-cream shadow-lg transition-all duration-500 group-hover:bg-brand-gold group-hover:text-brand-blue group-hover:rotate-6">
                    {getIcon(benefit.title)}
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">0{idx + 1}</p>
                    <h3 className="text-xl font-bold leading-tight text-brand-blue md:text-2xl">
                      {lang === 'kn' ? (benefit as any).kannadaTitle : benefit.title}
                    </h3>
                  </div>
                </div>
                <span className="hidden text-[10px] font-bold uppercase tracking-widest text-brand-blue/35 md:block">{lang === 'kn' ? 'ಮುಖ್ಯ ಸೌಲಭ್ಯ' : 'Core Benefit'}</span>
              </div>

              <div className="relative z-10 flex-grow pt-7">
                <ul className="flex flex-col gap-5">
                  {(lang === 'kn' ? (benefit as any).kannadaItems : benefit.items).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-brand-gold/50 text-brand-gold transition-colors group-hover:bg-brand-gold group-hover:text-brand-blue">
                        <ArrowRightCircle className="size-3.5" />
                      </span>
                      <span className="text-sm leading-7 text-brand-blue/75 md:text-base">{item}</span>
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
