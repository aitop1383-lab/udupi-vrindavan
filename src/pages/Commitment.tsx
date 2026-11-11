import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Coins, GraduationCap } from 'lucide-react';
import { EMPLOYEE_BENEFITS } from '../data/siteConfig';
import Reveal from '../components/ui/Reveal';
import { EASE } from '../components/ui/motion';

const getIcon = (title: string) => {
  switch (title) {
    case "Worker Welfare": return <Heart className="h-5 w-5" />;
    case "Empowerment": return <Users className="h-5 w-5" />;
    case "Remuneration": return <Coins className="h-5 w-5" />;
    case "Training": return <GraduationCap className="h-5 w-5" />;
    default: return <Heart className="h-5 w-5" />;
  }
};

const Commitment = () => {
  const [lang, setLang] = useState<'en' | 'kn'>('en');

  return (
    <section id="our-commitment" className="relative overflow-hidden bg-brand-blue py-20 text-brand-cream lg:py-32">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="absolute inset-0 pattern-dots opacity-15 pointer-events-none" />
      <div className="absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 h-[26rem] w-[26rem] rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* ── Intro ── */}
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal x={-30} y={0} className="lg:col-span-7">
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
                className="mt-5 text-4xl leading-[1.08] text-brand-cream sm:text-5xl md:text-6xl"
              >
                {lang === 'kn' ? (
                  <>ಸಿಬ್ಬಂದಿ <span className="accent text-[1.08em]">ಬದ್ಧತೆ</span></>
                ) : (
                  <>Commitment <br className="hidden sm:block" />to <span className="accent text-[1.12em]">Employees</span></>
                )}
              </motion.h2>
            </AnimatePresence>

            <div className="mt-7 flex items-center gap-4">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="h-px w-12 shrink-0 origin-left bg-brand-gold"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold-light sm:text-sm">
                {lang === 'kn' ? 'ಅನ್ನದಾತಾ ಸುಖೀಭವ' : 'The Provider of Food Shall Be Happy'}
              </p>
            </div>
          </Reveal>

          <Reveal x={30} y={0} delay={0.1} className="lg:col-span-5">
            {/* Language toggle */}
            <div className="flex lg:justify-end">
              <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur" role="group" aria-label="Language">
                {(['en', 'kn'] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                    className={`relative cursor-pointer rounded-full px-6 py-2.5 text-xs font-semibold tracking-wider transition-colors duration-300 ${code === 'en' ? 'uppercase' : ''} ${
                      lang === code ? 'text-brand-blue' : 'text-brand-cream/65 hover:text-brand-cream'
                    }`}
                  >
                    {lang === code && (
                      <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-brand-gold shadow-lg shadow-brand-gold/20" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                    )}
                    <span className="relative">{code === 'en' ? 'English' : 'ಕನ್ನಡ'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pull quote */}
            <figure className="relative mt-8 border-l-2 border-brand-gold/70 pl-6 sm:pl-8">
              <span aria-hidden="true" className="pointer-events-none absolute -top-10 right-0 select-none font-accent text-[9rem] leading-none text-brand-gold/15">
                &ldquo;
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <blockquote className="font-accent text-[1.65rem] font-semibold italic leading-snug text-brand-cream sm:text-3xl lg:text-[2.1rem]">
                    {lang === 'kn' ? 'ನಮ್ಮ ಸಿಬ್ಬಂದಿಯೇ ನಮ್ಮ ಸಂಸ್ಥೆಯ ಜೀವಾಳ' : 'Our staff are the soul of our organization'}
                  </blockquote>
                  <figcaption className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
                    {lang === 'kn' ? 'ಉಡುಪಿ ಬೃಂದಾವನ ಹಾಸ್ಪಿಟಾಲಿಟಿ ಗ್ರೂಪ್' : 'Udupi Vrindavan Hospitality Group'}
                  </figcaption>
                </motion.div>
              </AnimatePresence>
            </figure>
          </Reveal>
        </div>

        <div className="hairline mt-16 lg:mt-20" />

        {/* ── Benefits ── */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {EMPLOYEE_BENEFITS.map((benefit, idx) => (
            <Reveal key={benefit.title} delay={(idx % 2) * 0.12} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/40 hover:bg-white/[0.07] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-9">
                {/* Corner ring ornament */}
                <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full border border-brand-gold/15 transition-transform duration-700 group-hover:scale-110" />
                {/* Bottom gold line */}
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-gold transition-transform duration-500 group-hover:scale-x-100" />

                {/* Header */}
                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <p className="flex items-baseline gap-3">
                      <span className="font-accent text-5xl font-semibold italic leading-none text-brand-gold/80 transition-colors duration-500 group-hover:text-brand-gold sm:text-6xl">
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold-light/80">
                        <span aria-hidden="true">· </span>{lang === 'kn' ? 'ಮುಖ್ಯ ಸೌಲಭ್ಯ' : 'Core Benefit'}
                      </span>
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.h3
                        key={lang}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 text-2xl leading-tight text-brand-cream sm:text-[1.75rem]"
                      >
                        {lang === 'kn' ? benefit.kannadaTitle : benefit.title}
                      </motion.h3>
                    </AnimatePresence>
                  </div>

                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-blue shadow-lg shadow-black/25 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
                    <span aria-hidden="true" className="absolute inset-1 rounded-full border border-dashed border-brand-blue/30" />
                    {getIcon(benefit.title)}
                  </div>
                </div>

                <div className="hairline relative mt-7" />

                {/* Items */}
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={lang}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                    className="relative mt-7 flex flex-col gap-5"
                  >
                    {(lang === 'kn' ? benefit.kannadaItems : benefit.items).map((item, i) => (
                      <motion.li
                        key={i}
                        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}
                        className="grid grid-cols-[0.875rem_1fr] gap-4"
                      >
                        <span aria-hidden="true" className="mt-[0.6rem] h-2 w-2 rotate-45 bg-brand-gold/70 transition-colors duration-300 group-hover:bg-brand-gold" />
                        <span className="text-[15px] leading-7 text-brand-cream/75 transition-colors duration-300 group-hover:text-brand-cream/90">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Commitment;
