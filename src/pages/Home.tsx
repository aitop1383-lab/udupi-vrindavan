import React, { useEffect, useRef, useState } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { Utensils, ChevronRight } from 'lucide-react';
import Seo from '../components/Seo';
import { SITE_METADATA } from '../data/siteConfig';
import { homeBreadcrumbSchema, restaurantSchema, websiteSchema, ORDER_URL } from '../data/seoSchemas';

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
      <span className="text-[10px] uppercase tracking-widest text-brand-blue/50 font-bold">
        {label}
      </span>
    </m.div>
  );
};

// ─── Animation Variants ─────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Component ──────────────────────────────────────────────
const Home = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-cream pt-10">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* ── LEFT: Content ── */}
            <m.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Tagline Badge */}
              <m.div variants={itemVariants} className="inline-flex items-center gap-4 mb-8">
                <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-xs">
                  Tasty yet healthy food
                </span>
              </m.div>

              {/* Heading */}
              <m.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl text-brand-blue leading-[0.9] mb-8 font-display"
              >
                Authentic <span className="text-brand-gold">Udupi</span> <br />
                <span className="text-brand-blue">Vegetarian Food</span><br />
                in Dubai
              </m.h1>

              {/* Description */}
              <m.p
                variants={itemVariants}
                className="text-xl text-brand-blue/70 mb-12 max-w-lg leading-relaxed font-light"
              >
                Discover a trusted Udupi restaurant in Dubai offering pure vegetarian South Indian dishes such as dosa, idli, vada, and more. From healthy breakfast favourites to comforting lunch and dinner plates, Udupi Vrindavan brings the flavours of Karnataka to Al Karama.
              </m.p>

              {/* CTA Buttons */}
              <m.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-8 items-center"
              >
                {/* Order Online */}
                <m.a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden bg-brand-blue text-brand-cream px-8 py-4 rounded-full font-bold text-xl transition-all shadow-2xl hover:shadow-brand-blue/30 w-full sm:w-auto text-center"
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
              </m.div>

              {/* Stats */}
              <m.div
                ref={statsRef}
                variants={itemVariants}
                className="mt-16 flex gap-12 border-t border-brand-blue/10 pt-10"
              >
                <StatItem target={100} suffix="%" label="Pure Vegetarian" started={statsStarted} />
                <StatItem target={100} suffix="+" label="Varieties" started={statsStarted} />
                <StatItem target={1000} suffix="+" label="Happy Guests" started={statsStarted} />
              </m.div>
            </m.div>

            {/* ── RIGHT: Visual ── */}
            <m.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Image */}
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl cascading-image-reverse aspect-[4/4] m-4">
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
                className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold rounded-full flex items-center justify-center z-20 shadow-xl"
              >
                <div className="text-center text-brand-blue p-4">
                  <span className="block text-[8px] uppercase font-bold tracking-[0.2em] mb-1">Authentic</span>
                  <span className="block text-xl font-bold leading-none">Karnataka</span>
                  <span className="block text-xl font-bold leading-none">Vegetarian</span>
                  <span className="block text-[8px] uppercase font-bold tracking-[0.2em] mt-1">Cuisine</span>
                </div>
                <div className="absolute inset-2 border border-dashed border-brand-blue/30 rounded-full" />
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
