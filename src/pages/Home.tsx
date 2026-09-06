import React, { useEffect, useRef, useState } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Utensils, ChevronRight } from 'lucide-react';
import Seo from '../components/Seo';
import { SITE_METADATA } from '../data/siteConfig';
import { homeBreadcrumbSchema, restaurantSchema, websiteSchema, ORDER_URL } from '../data/seoSchemas';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated Counter Hook ──────────────────────────────────
const useCounter = (target: number, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out quad
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
};

// ─── Stat Item ──────────────────────────────────────────────
const StatItem = ({
  target,
  suffix,
  label,
  started,
}: {
  target: number;
  suffix: string;
  label: string;
  started: boolean;
}) => {
  const count = useCounter(target, 1800, started);
  return (
    <m.div whileHover={{ y: -6 }} className="transition-all cursor-default">
      <span className="block text-3xl font-bold text-brand-blue tabular-nums">
        {count}
        {suffix}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-brand-blue/70 font-bold">
        {label}
      </span>
    </m.div>
  );
};

// ─── Floating Particle ──────────────────────────────────────
const particles = [
  { w: 6, h: 6, left: '8%', top: '20%', delay: '0s', duration: '9s', color: '#D4A65A33' },
  { w: 4, h: 4, left: '15%', top: '65%', delay: '1.5s', duration: '7s', color: '#D4A65A22' },
  { w: 8, h: 8, left: '82%', top: '30%', delay: '0.8s', duration: '11s', color: '#0F2F4A22' },
  { w: 5, h: 5, left: '75%', top: '70%', delay: '2s', duration: '8s', color: '#D4A65A33' },
  { w: 3, h: 3, left: '45%', top: '15%', delay: '3s', duration: '10s', color: '#D4A65A44' },
  { w: 7, h: 7, left: '60%', top: '80%', delay: '1s', duration: '12s', color: '#0F2F4A15' },
];

// ─── Component ──────────────────────────────────────────────
const Home = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // ── GSAP Hero Timeline ─────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' },
        '-=0.3'
      )
      .fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Hero image parallax on scroll
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Stats IntersectionObserver ─────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-brand-cream pt-10">
        <Seo
          title="Udupi restaurant in Dubai | Authentic South Indian vegetarian food"
          description="Visit Udupi Vrindavan in Al Karama for authentic Udupi and South Indian vegetarian dishes, including dosa, idli, vada, and healthy Karnataka cuisine."
          canonicalPath="/"
          image="/Butter-Dosa.jpg"
          type="website"
          jsonLd={[restaurantSchema, websiteSchema, homeBreadcrumbSchema]}
        />
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-30 texture-bg" />

        {/* Decorative Skewed Shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 -skew-x-12 translate-x-1/4" />

        {/* Floating Particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              width: p.w,
              height: p.h,
              left: p.left,
              top: p.top,
              background: p.color,
              '--delay': p.delay,
              '--duration': p.duration,
            } as React.CSSProperties}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* ── LEFT: Content ── */}
            <div ref={contentRef}>
              {/* Tagline Badge */}
              <div ref={taglineRef} className="inline-flex items-center gap-4 mb-8" style={{ opacity: 0 }}>
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-xs">
                  Tasty yet healthy food
                </span>
              </div>

              {/* Heading */}
              <h1
                ref={headingRef}
                className="text-4xl md:text-6xl lg:text-7xl text-brand-blue leading-[0.9] mb-8 font-display"
                style={{ opacity: 0 }}
              >
                Eating Food<br />
                <span className="text-brand-gold italic">Cooked at</span> <br />
                <span className="text-brand-blue">Home is best</span>
              </h1>

              {/* Description */}
              <p
                ref={descRef}
                className="text-xl text-brand-blue/85 mb-12 max-w-lg leading-relaxed font-normal"
                style={{ opacity: 0 }}
              >
              Food cooked and eaten at home with family is the best. The next best place should offer you the same health and taste. After all, no one wants to spend money to get ill. At Udupi Vrindavan Restaurant, you will get to experience healthy, fresh and tasty food. You can listen to your favourite songs, talk to our Front of House staff in Kannada and enjoy the delicacies that remind you of Udupi and the wider Karnataka region.
              </p>

              {/* CTA Buttons */}
              <div
                ref={ctaRef}
                className="flex flex-col sm:flex-row gap-8 items-center"
                style={{ opacity: 0 }}
              >
                {/* Order Online */}
                <m.a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden bg-brand-blue text-brand-cream px-8 py-4 rounded-full font-bold text-xl transition-all shadow-2xl hover:shadow-brand-blue/30 w-full sm:w-auto text-center btn-glow"
                  animate={{
                    boxShadow: [
                      '0 0 0 0px rgba(212, 166, 90, 0)',
                      '0 0 0 10px rgba(212, 166, 90, 0.4)',
                      '0 0 0 20px rgba(212, 166, 90, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 group-hover:scale-105 transition-transform duration-300">
                    Order Online <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </m.a>

                {/* View Menu */}
                <a
                  href="/Menu.pdf"
                  className="group flex items-center gap-4 text-brand-blue font-bold text-xl hover:text-brand-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-brand-blue flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold/10 transition-all duration-300">
                    <Utensils size={24} />
                  </div>
                  View Dining Menu
                </a>
              </div>

              {/* Stats */}
              <m.div
                ref={statsRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-16 flex gap-12 border-t border-brand-blue/10 pt-10"
              >
                <StatItem target={100} suffix="%" label="Pure Vegetarian" started={statsStarted} />
                <StatItem target={100} suffix="+" label="Varieties" started={statsStarted} />
                <StatItem target={1000} suffix="+" label="Happy Guests" started={statsStarted} />
              </m.div>
            </div>

            {/* ── RIGHT: Visual ── */}
            <m.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Image with parallax wrapper */}
              <div ref={heroImageRef} className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl cascading-image-reverse aspect-[4/4] m-4">
                  <img
                    src="/Butter-Dosa.jpg"
                    alt="Butter dosa served at Udupi Vrindavan, a classic Udupi restaurant dish"
                    fetchPriority="high"
                    width="600"
                    height="600"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                <div className="absolute inset-0 bg-linear-to-t from-brand-blue/40 to-transparent" />
                {/* Image Label */}
                <div className="w-full absolute bottom-10 left-10 text-brand-cream">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80 mb-2 block">
                    Signature Dish
                  </span>
                  <h3 className="text-3xl font-display font-bold">Butter Dosa</h3>
                </div>
              </div>

              {/* Rotating Badge */}
              <m.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 md:-top-10 md:-right-10 w-28 h-28 md:w-40 md:h-40 bg-brand-gold rounded-full flex items-center justify-center z-20 shadow-xl"
              >
                <div className="text-center text-brand-blue p-2 md:p-4">
                  <span className="block text-[7px] md:text-[8px] uppercase font-bold tracking-[0.2em] mb-0.5 md:mb-1">Authentic</span>
                  <span className="block text-sm md:text-xl font-bold leading-none">Karnataka</span>
                  <span className="block text-sm md:text-xl font-bold leading-none">Vegetarian</span>
                  <span className="block text-[7px] md:text-[8px] uppercase font-bold tracking-[0.2em] mt-0.5 md:mt-1">Cuisine</span>
                </div>
                <div className="absolute inset-1.5 md:inset-2 border border-dashed border-brand-blue/30 rounded-full" />
              </m.div>

              {/* Dot Grid */}
              <div className="absolute -top-20 -left-10 grid grid-cols-4 gap-4 opacity-20">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-brand-gold rounded-full" />
                ))}
              </div>
            </m.div>
          </div>
        </div>

        {/* ── Seamless Marquee ── */}
        <div className="absolute bottom-0 left-0 w-full bg-brand-blue py-4 overflow-hidden whitespace-nowrap z-20">
          <div className="marquee-track">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="text-brand-cream/30 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mx-8"
              >
                • Pure Satvik Tradition • Authentic Udupi • Karnataka Cooks • Premium Nandini Ghee • Quality Ingredients • Ethical Kitchen •
              </span>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Home;
