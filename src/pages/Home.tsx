import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Utensils, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import { homeBreadcrumbSchema, restaurantSchema, websiteSchema, ORDER_URL } from '../data/seoSchemas';

// ─── Animated Counter Hook ──────────────────────────────────
const useCounter = (target: number, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
};

const StatItem = ({ target, suffix, label, started }: { target: number; suffix: string; label: string; started: boolean }) => {
  const count = useCounter(target, 1800, started);
  return (
    <div className="flex flex-col gap-1 px-3 sm:px-6 first:pl-0 last:pr-0">
      <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-blue tabular-nums leading-none">
        {count}
        <span className="text-brand-gold">{suffix}</span>
      </span>
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-brand-blue/60 font-semibold leading-snug">
        {label}
      </span>
    </div>
  );
};

const MARQUEE_ITEMS = [
  'Pure Satvik Tradition',
  'Authentic Udupi',
  'Karnataka Cooks',
  'Premium Nandini Ghee',
  'Quality Ingredients',
  'Ethical Kitchen',
];

const ease = [0.22, 1, 0.36, 1] as const;

// Each headline line slides up from behind a mask
const MaskLine = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
    <motion.span
      className="block"
      initial={{ y: '110%', rotate: 2 }}
      animate={{ y: '0%', rotate: 0 }}
      transition={{ duration: 1.05, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
);

const particles = [
  { s: 6, left: '8%', top: '22%', d: 0, dur: 9 },
  { s: 4, left: '18%', top: '68%', d: 1.5, dur: 7 },
  { s: 8, left: '52%', top: '14%', d: 0.8, dur: 11 },
  { s: 5, left: '88%', top: '72%', d: 2, dur: 8 },
  { s: 3, left: '44%', top: '82%', d: 3, dur: 10 },
];

const Home = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const imageY = useTransform(smooth, [0, 1], ['0%', '14%']);
  const imageScale = useTransform(smooth, [0, 1], [1, 1.08]);
  const copyY = useTransform(smooth, [0, 1], ['0%', '-8%']);
  const badgeY = useTransform(smooth, [0, 1], ['0%', '-60%']);

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
    <section ref={sectionRef} className="relative overflow-hidden bg-brand-cream">
      <Seo
        title="Udupi restaurant in Dubai | Authentic South Indian vegetarian food"
        description="Visit Udupi Vrindavan in Al Karama for authentic Udupi and South Indian vegetarian dishes, including dosa, idli, vada, and healthy Karnataka cuisine."
        canonicalPath="/"
        image="/Butter-Dosa.jpg"
        type="website"
        jsonLd={[restaurantSchema, websiteSchema, homeBreadcrumbSchema]}
      />

      {/* Background layers */}
      <div className="absolute inset-0 texture-bg opacity-40 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, x: 120, skewX: -12 }}
        animate={{ opacity: 1, x: 0, skewX: -12 }}
        transition={{ duration: 1.4, ease }}
        className="absolute top-0 right-0 h-full w-1/2 translate-x-1/4 bg-brand-gold/[0.07] pointer-events-none"
      />
      <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-gold/40 pointer-events-none"
          style={{ width: p.s, height: p.s, left: p.left, top: p.top }}
          animate={{ y: [0, -90], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* LEFT: Content */}
          <motion.div style={{ y: copyY }} className="lg:col-span-6 xl:col-span-6 lg:pr-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
              className="eyebrow"
            >
              Tasty yet healthy food
            </motion.span>

            <h1 className="mt-6 text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-brand-blue">
              <MaskLine delay={0.15}>Eating Food</MaskLine>
              <MaskLine delay={0.28}><span className="accent text-[1.12em] leading-[0.9]">Cooked at</span></MaskLine>
              <MaskLine delay={0.41}><span className="text-brand-blue">Home is best</span></MaskLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.6, ease }}
              className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-brand-blue/75"
            >
              Food cooked and eaten at home with family is the best. The next best place should offer you the same health and taste. After all, no one wants to spend money to get ill. At Udupi Vrindavan Restaurant, you will get to experience healthy, fresh and tasty food. You can listen to your favourite songs, talk to our Front of House staff in Kannada and enjoy the delicacies that remind you of Udupi and the wider Karnataka region.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <motion.a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.96 }}
                animate={{
                  boxShadow: [
                    '0 0 0 0px rgba(212, 166, 90, 0)',
                    '0 0 0 10px rgba(212, 166, 90, 0.4)',
                    '0 0 0 20px rgba(212, 166, 90, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="btn-glow group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-blue px-8 py-4 text-lg font-bold text-brand-cream w-full sm:w-auto"
              >
                <span className="absolute inset-0 translate-y-full bg-brand-gold transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 flex items-center justify-center gap-3 transition-all duration-300 group-hover:scale-105 group-hover:text-brand-blue">
                  Order Online <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>

              <motion.a
                href="/Menu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-brand-blue/20 bg-white/60 px-7 py-4 text-base font-semibold text-brand-blue backdrop-blur transition-colors hover:border-brand-gold hover:bg-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/15 text-brand-bronze transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-brand-gold group-hover:text-brand-blue">
                  <Utensils size={16} />
                </span>
                View Dining Menu
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } } }}
              className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-brand-blue/10 border-t border-brand-blue/10 pt-8"
            >
              {[
                { target: 100, suffix: '%', label: 'Pure Vegetarian' },
                { target: 100, suffix: '+', label: 'Varieties' },
                { target: 600, suffix: '+', label: 'Happy Guests' },
              ].map((st) => (
                <motion.div
                  key={st.label}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
                >
                  <StatItem target={st.target} suffix={st.suffix} label={st.label} started={statsStarted} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Visual */}
          <div className="relative mx-auto w-full max-w-[28rem] sm:max-w-[32rem] md:max-w-[35rem] lg:col-span-6 xl:col-span-6 lg:max-w-none">
            <motion.div
              initial={{ clipPath: 'inset(100% -40% -40% -40%)' }}
              animate={{ clipPath: 'inset(-40% -40% -40% -40%)', transitionEnd: { clipPath: 'none' } }}
              transition={{ duration: 1.3, delay: 0.3, ease }}
              className="relative"
            >
              <div className="cascade relative aspect-square overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] lg:rounded-[3.25rem] bg-brand-blue m-3 sm:m-4 lg:m-4 xl:m-6">
                <motion.img
                  src="/Butter-Dosa.jpg"
                  alt="Butter dosa served at Udupi Vrindavan, a classic Udupi restaurant dish"
                  fetchPriority="high"
                  width="700"
                  height="700"
                  style={{ y: imageY, scale: imageScale }}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.8, delay: 0.3, ease }}
                  className="h-[115%] w-full object-cover -mt-[7%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/5 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1, ease }}
                  className="absolute inset-x-0 bottom-0 p-7 sm:p-9 text-brand-cream"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold-light">
                    Signature Dish
                  </span>
                  <h3 className="mt-2 text-3xl sm:text-4xl">Butter Dosa</h3>
                </motion.div>
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              style={{ y: badgeY }}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 1.0 }}
              className="absolute -right-1 -top-2 sm:-right-4 sm:-top-4 lg:-right-3 lg:-top-3 xl:-right-6 xl:-top-6 z-20 flex h-28 w-28 sm:h-34 sm:w-34 lg:h-36 lg:w-36 xl:h-40 xl:w-40 items-center justify-center rounded-full bg-brand-gold shadow-xl shadow-brand-gold/30"
            >
              <div className="absolute inset-1.5 rounded-full border border-dashed border-brand-blue/40 animate-spin-slow" />
              <div className="relative text-center text-brand-blue leading-none">
                <span className="block text-[7px] sm:text-[8px] uppercase font-bold tracking-[0.25em]">Authentic</span>
                <span className="mt-1 block font-display text-sm sm:text-lg font-bold">Karnataka</span>
                <span className="block font-display text-sm sm:text-lg font-bold">Vegetarian</span>
                <span className="mt-1 block text-[7px] sm:text-[8px] uppercase font-bold tracking-[0.25em]">Cuisine</span>
              </div>
            </motion.div>

            {/* Dot grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute -bottom-2 -left-2 hidden sm:grid grid-cols-4 gap-3 pointer-events-none"
            >
              {[...Array(16)].map((_, i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-brand-gold" />)}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-pause relative z-20 overflow-hidden border-y border-brand-gold/30 bg-brand-blue">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-brand-blue to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-brand-blue to-transparent" />
        <div className="flex w-max animate-marquee items-center py-4 sm:py-5">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center" aria-hidden={rep === 1}>
              {[...Array(3)].flatMap(() => MARQUEE_ITEMS).map((item, i) => (
                <span key={`${rep}-${i}`} className="flex items-center gap-6 sm:gap-8 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold-light whitespace-nowrap">
                  {item}
                  <span className="h-1.5 w-1.5 rotate-45 bg-brand-gold" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
