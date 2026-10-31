import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Coins, GraduationCap, Check } from 'lucide-react';
import { EMPLOYEE_BENEFITS } from '../data/siteConfig';
import Reveal from '../components/ui/Reveal';
import { EASE } from '../components/ui/motion';

const getIcon = (title: string) => {
  switch (title) {
    case "Worker Welfare": return <Heart className="h-6 w-6" />;
    case "Empowerment": return <Users className="h-6 w-6" />;
    case "Remuneration": return <Coins className="h-6 w-6" />;
    case "Training": return <GraduationCap className="h-6 w-6" />;
    default: return <Heart className="h-6 w-6" />;
  }
};

const Commitment = () => {
  const [lang, setLang] = useState<'en' | 'kn'>('en');

  return (
    <section id="our-commitment" className="relative overflow-clip bg-brand-blue py-20 text-brand-cream lg:py-32">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="absolute inset-0 pattern-dots opacity-15 pointer-events-none" />
      <div className="absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 h-[26rem] w-[26rem] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* LEFT: sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="eyebrow eyebrow-light">
                  {lang === 'kn' ? 'ನಮ್ಮ ವಾಗ್ದಾನ' : 'Our Promise'}
                </span>
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={lang}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-[1.12] text-brand-cream"
                  >
                    {lang === 'kn' ? (
                      <>ಸಿಬ್ಬಂದಿ <span className="accent">ಬದ್ಧತೆ</span></>
                    ) : (
                      <>Commitment<br /><span className="whitespace-nowrap">to <span className="accent">Employees</span></span></>
                    )}
                  </motion.h2>
                </AnimatePresence>

<<<<<<< HEAD
                <div className="mt-7 flex items-center gap-4">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                    className="h-px w-12 origin-left bg-brand-gold"
                  />
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold-light">
                    {lang === 'kn' ? 'ಅನ್ನದಾತಾ ಸುಖೀಭವ' : 'The Provider of Food Shall Be Happy'}
                  </p>
                </div>

                {/* Language Toggle */}
                <div className="mt-10 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur" role="group" aria-label="Language">
                  {(['en', 'kn'] as const).map((code) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      aria-pressed={lang === code}
                      className={`relative rounded-full px-6 py-2.5 text-xs font-semibold tracking-wider transition-colors duration-300 cursor-pointer ${code === 'en' ? 'uppercase' : ''} ${
                        lang === code ? 'text-brand-blue' : 'text-brand-cream/65 hover:text-brand-cream'
                      }`}
                    >
                      {lang === code && (
                        <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-brand-gold shadow-lg shadow-brand-gold/20" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                      )}
                      <span className="relative">{code === 'en' ? 'English' : 'ಕನ್ನಡ'}</span>
                    </button>
=======
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
>>>>>>> c479ab9f7bf1889a781480cc8e805accdf8a216f
                  ))}
                </div>
              </Reveal>

              {/* Quote card */}
              <Reveal delay={0.15} className="mt-10">
                <figure className="relative overflow-hidden rounded-[2rem] border border-brand-gold/30 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-brand-gold/20" />
                  <div className="absolute -right-2 -top-2 h-24 w-24 rounded-full border border-brand-gold/20" />
                  {/* <img src="/logo.png" alt="Udupi Vrindavan logo" className="relative h-11 w-11 object-contain" /> */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lang}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <blockquote className="mt-5 font-display text-2xl leading-snug text-brand-cream">
                        {lang === 'kn' ? 'ನಮ್ಮ ಸಿಬ್ಬಂದಿಯೇ ನಮ್ಮ ಸಂಸ್ಥೆಯ ಜೀವಾಳ' : 'Our staff are the soul of our organization'}
                      </blockquote>
                      <figcaption className="mt-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
                        <span className="h-px w-8 bg-brand-gold/60" />
                        {lang === 'kn' ? 'ಉಡುಪಿ ಬೃಂದಾವನ ಹಾಸ್ಪಿಟಾಲಿಟಿ ಗ್ರೂಪ್' : 'Udupi Vrindavan Hospitality Group'}
                      </figcaption>
                    </motion.div>
                  </AnimatePresence>
                </figure>
              </Reveal>
            </div>
          </div>

          {/* RIGHT: benefit cards */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            {EMPLOYEE_BENEFITS.map((benefit, idx) => (
              <Reveal key={idx} delay={idx * 0.08} x={40} y={0}>
                <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:border-brand-gold/40 hover:bg-white/[0.07]">
                  {/* Gold accent bar */}
                  <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-brand-gold transition-transform duration-500 group-hover:scale-y-100" />

                  <div className="flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gold text-brand-blue shadow-lg shadow-black/20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        {getIcon(benefit.title)}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold-light/80">
                          0{idx + 1} · {lang === 'kn' ? 'ಮುಖ್ಯ ಸೌಲಭ್ಯ' : 'Core Benefit'}
                        </p>
                        <AnimatePresence mode="wait">
                          <motion.h3
                            key={lang}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="mt-1 text-xl sm:text-2xl leading-tight text-brand-cream"
                          >
                            {lang === 'kn' ? benefit.kannadaTitle : benefit.title}
                          </motion.h3>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Items */}
                    <AnimatePresence mode="wait">
                      <motion.ul
                        key={lang}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                        className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6"
                      >
                        {(lang === 'kn' ? benefit.kannadaItems : benefit.items).map((item, i) => (
                          <motion.li
                            key={i}
                            variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } } }}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-gold/50 text-brand-gold transition-colors duration-300 group-hover:bg-brand-gold group-hover:text-brand-blue">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            <span className="text-sm sm:text-[15px] leading-7 text-brand-cream/75">{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </AnimatePresence>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commitment;
