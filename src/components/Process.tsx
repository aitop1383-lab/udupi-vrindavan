import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FOOD_JOURNEY_STEPS } from '../data/siteConfig';
import Reveal, { ImageReveal } from './ui/Reveal';
import { EASE } from './ui/motion';

const STEP_IMAGES: Record<string, string> = {
  '01': '/process/01.png',
  '02': '/process/02.png',
  '03': '/process/03.png',
  '04': '/process/04.png',
  '05': '/process/05.png',
  '06': '/process/06.png',
};

const Process = () => {
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 55%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });

  return (
    <section id="process" className="relative overflow-hidden bg-brand-cream py-20 lg:py-32">
      <div className="absolute inset-x-0 top-0 hairline" />
      <div className="absolute inset-0 texture-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">The Journey</span>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-brand-blue">
            The Food <span className="accent text-[1.12em]">You Eat</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-brand-blue/65">
            Every dish that reaches your table is the result of an intentional six-step promise — of quality, craft, and care.
          </p>
        </Reveal>

        {/* Timeline */}
        <ol ref={timelineRef} className="relative mt-16 lg:mt-24">
          {/* Track + animated gold fill */}
          <div className="absolute bottom-0 top-0 left-6 w-[2px] -translate-x-1/2 bg-brand-blue/10 lg:left-1/2" aria-hidden="true">
            <motion.div style={{ scaleY: lineScale }} className="h-full w-full origin-top bg-gradient-to-b from-brand-gold via-brand-gold to-brand-gold/40" />
          </div>

          {FOOD_JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const flip = idx % 2 === 1;
            return (
              <li key={step.id} className="relative pb-16 pl-16 last:pb-0 lg:grid lg:grid-cols-2 lg:items-center lg:gap-24 lg:pb-28 lg:pl-0">
                {/* Node */}
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '-120px 0px' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  className="absolute left-6 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-brand-blue font-display text-sm font-bold text-brand-gold ring-8 ring-brand-cream lg:left-1/2 lg:top-1/2 lg:h-16 lg:w-16 lg:-translate-y-1/2 lg:text-base"
                >
                  {step.id}
                </motion.span>

                {/* Image */}
                <div className={`${flip ? 'lg:order-2' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-80px 0px' }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className={`group relative rounded-[2rem] ${flip ? 'cascade-right lg:ml-2' : 'cascade lg:mr-2'}`}
                  >
                    <ImageReveal
                      from={flip ? 'right' : 'left'}
                      className="relative aspect-[3/2] overflow-hidden rounded-[2rem] bg-[#F6F1E6] ring-1 ring-brand-blue/5"
                    >
                      <img
                        src={STEP_IMAGES[step.id]}
                        alt={`${step.title} - Udupi Vrindavan culinary preparation standard`}
                        loading="lazy"
                        width="600"
                        height="400"
                        className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      />
                    </ImageReveal>
                  </motion.div>
                </div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-100px 0px' }}
                  transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                  className={`relative mt-8 lg:mt-0 ${flip ? 'lg:order-1 lg:text-right' : ''}`}
                >
                  <div className={`relative flex items-center gap-3 ${flip ? 'lg:flex-row-reverse' : ''}`}>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-bronze">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-2xl xl:text-3xl leading-tight text-brand-blue">{step.title}</h3>
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
                    className={`relative my-5 h-[2px] w-14 bg-brand-gold ${flip ? 'origin-left lg:ml-auto lg:origin-right' : 'origin-left'}`}
                  />
                  <p className={`relative max-w-md font-accent text-xl italic leading-relaxed text-brand-blue/80 ${flip ? 'lg:ml-auto' : ''}`}>
                    "{step.desc}"
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Process;
