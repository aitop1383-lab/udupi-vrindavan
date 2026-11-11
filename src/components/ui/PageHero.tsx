import React from 'react';
import { motion } from 'framer-motion';

type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

/** Navy header band used at the top of standalone pages. */
const PageHero = ({ eyebrow, title, description, icon, children }: PageHeroProps) => (
  <section className="relative overflow-hidden bg-brand-blue text-brand-cream pt-36 pb-20 md:pt-44 md:pb-28">
    <div className="absolute inset-0 pattern-dots opacity-25 pointer-events-none" />
    <div className="absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />
    <div className="absolute inset-x-0 bottom-0 hairline" />

    <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 text-center">
      {icon ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold text-brand-blue shadow-lg shadow-black/25"
        >
          <span aria-hidden="true" className="absolute inset-1 rounded-full border border-dashed border-brand-blue/30" />
          {icon}
        </motion.div>
      ) : null}
      {eyebrow ? (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow eyebrow-light justify-center"
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 text-4xl sm:text-5xl md:text-7xl leading-[1.05] text-brand-cream"
      >
        {title}
      </motion.h1>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-7 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-brand-cream/75 font-light"
        >
          {description}
        </motion.p>
      ) : null}
      {children}
    </div>
  </section>
);

export default PageHero;
