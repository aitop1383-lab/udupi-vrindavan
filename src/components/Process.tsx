import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FOOD_JOURNEY_STEPS } from '../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

// Images mapped to each step — reusing existing public assets
const STEP_IMAGES: Record<string, string> = {
  '01': '/process/01.png',
  '02': '/process/02.png',
  '03': '/process/03.png',
  '04': '/process/04.png',
  '05': '/process/05.png',
  '06': '/process/06.png',
};

/**
 * Process Component — Editorial Zig-Zag Storytelling Layout
 * Desktop: alternating left/right pairs connected by a vertical thread
 * Mobile: clean vertical timeline
 */
const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        // Header reveal
        if (headerRef.current) {
          gsap.fromTo(
            Array.from(headerRef.current.children),
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0,
              duration: 0.9,
              stagger: 0.18,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: headerRef.current,
                start: 'top 82%',
                once: true,
              },
            }
          );
        }

        // Animate each step row
        stepRefs.current.forEach((el, idx) => {
          if (!el) return;
          const isRight = idx % 2 !== 0;
          const numEl = el.querySelector('.step-number');
          const imgEl = el.querySelector('.step-image-wrap');
          const textEl = el.querySelector('.step-text');

          // 1) Number first
          if (numEl) {
            gsap.fromTo(numEl,
              { opacity: 0, y: 30, scale: 0.8 },
              {
                opacity: 1, y: 0, scale: 1,
                duration: 0.65,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 80%', once: true },
              }
            );
          }

          // 2) Image next
          if (imgEl) {
            gsap.fromTo(imgEl,
              { opacity: 0, x: isRight ? 40 : -40, scale: 0.94 },
              {
                opacity: 1, x: 0, scale: 1,
                duration: 0.8,
                delay: 0.12,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 80%', once: true },
              }
            );
          }

          // 3) Text last
          if (textEl) {
            gsap.fromTo(textEl,
              { opacity: 0, y: 24 },
              {
                opacity: 1, y: 0,
                duration: 0.65,
                delay: 0.28,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 80%', once: true },
              }
            );
          }
        });

        // Connecting line grows as you scroll
        if (lineRef.current) {
          gsap.fromTo(lineRef.current,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 65%',
                end: 'bottom 40%',
                scrub: 1.5,
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Pair steps: [01,02], [03,04], [05,06]
  const pairs: (typeof FOOD_JOURNEY_STEPS)[] = [
    [FOOD_JOURNEY_STEPS[0], FOOD_JOURNEY_STEPS[1]],
    [FOOD_JOURNEY_STEPS[2], FOOD_JOURNEY_STEPS[3]],
    [FOOD_JOURNEY_STEPS[4], FOOD_JOURNEY_STEPS[5]],
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-16 lg:py-24 bg-brand-cream relative overflow-hidden"
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Section Header ─────────────────────────── */}
        <div ref={headerRef} className="text-center mb-10 lg:mb-14">
          <span className="text-brand-gold font-bold tracking-[0.35em] uppercase text-[10px] mb-5 block">
            The Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-brand-blue leading-tight">
            The Food <span className="italic text-brand-gold">You Eat</span>
          </h2>
          <p className="mt-6 text-brand-blue/55 max-w-xl mx-auto text-base leading-relaxed">
            Every dish that reaches your table is the result of an intentional six-step promise — of quality, craft, and care.
          </p>
        </div>

        {/* ── Desktop: Zig-Zag ───────────────────────── */}
        <div className="hidden lg:block relative">

          {/* Vertical connecting thread */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px overflow-hidden pointer-events-none">
            <div
              ref={lineRef}
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, #D4A65A 0px, #D4A65A 6px, transparent 6px, transparent 14px)',
              }}
            />
          </div>

          {pairs.map((pair, pairIdx) => (
            <div
              key={pairIdx}
              className={`grid grid-cols-2 ${pairIdx < pairs.length - 1 ? 'mb-24' : ''}`}
            >
              {pair.map((step, stepIdx) => {
                const globalIdx = pairIdx * 2 + stepIdx;
                const isRight = stepIdx === 1;

                return (
                  <div
                    key={step.id}
                    ref={(el) => { stepRefs.current[globalIdx] = el; }}
                    className={`flex items-center gap-10 ${isRight ? 'flex-row-reverse pl-14' : 'flex-row pr-14'}`}
                  >
                    {/* Image */}
                    <div className="step-image-wrap relative flex-shrink-0 w-[240px] xl:w-[280px]">
                      <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/4] shadow-xl">
                        <img
                          src={STEP_IMAGES[step.id]}
                          alt={`${step.title} - Udupi Vrindavan culinary preparation standard`}
                          loading="lazy"
                          width="280"
                          height="350"
                          className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/25 to-transparent" />
                      </div>
                      {/* Ghost watermark number behind image */}
                      <div
                        className={`step-number absolute -top-8 ${isRight ? '-right-4' : '-left-4'} font-display font-bold leading-none select-none pointer-events-none text-brand-gold/25`}
                        style={{ fontSize: 'clamp(5rem, 8vw, 8rem)' }}
                        aria-hidden="true"
                      >
                        {step.id}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="step-text flex-1 min-w-0 text-left">
                      {/* <span className="inline-block text-[10px] font-bold text-brand-gold tracking-[0.3em] uppercase mb-3">
                        Step {step.id}
                      </span> */}
                      <h3 className="text-2xl xl:text-3xl font-display font-bold text-brand-blue mb-4 leading-tight">
                        {step.title}
                      </h3>
                      <div className="w-10 h-[2px] bg-brand-gold mb-5" />
                      <p className="text-brand-blue/65 leading-relaxed text-sm xl:text-base">
                        "{step.desc}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* ── Mobile: Vertical Timeline ──────────────── */}
        <div className="lg:hidden relative">
          {/* Thread removed */}

          <div className="space-y-14">
            {FOOD_JOURNEY_STEPS.map((step, idx) => (
              <div
                key={step.id}
                ref={(el) => { if (!stepRefs.current[idx]) stepRefs.current[idx] = el; }}
                className="relative"
              >
                {/* Timeline dot removed */}

                {/* Ghost number */}
                <div className="step-number text-[3.5rem] font-display font-bold text-brand-gold/28 leading-none mb-1 select-none" aria-hidden="true">
                  {step.id}
                </div>

                {/* Image */}
                <div className="step-image-wrap rounded-[1.5rem] overflow-hidden aspect-video mb-5 shadow-md">
                  <img
                    src={STEP_IMAGES[step.id]}
                    alt={`${step.title} - Udupi Vrindavan culinary preparation standard`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className="step-text">
                  {/* <span className="block text-[10px] font-bold text-brand-gold tracking-[0.3em] uppercase mb-2">
                    Step {step.id}
                  </span> */}
                  <h3 className="text-xl font-display font-bold text-brand-blue mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <div className="w-8 h-[2px] bg-brand-gold mb-3" />
                  <p className="text-brand-blue/65 text-sm leading-relaxed">
                    "{step.desc}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
    </section>
  );
};

export default Process;