import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './ui/Reveal';

const categories = [
  { name: "Combos", img: "/categories/Combos.jpg", link: "https://order.udupivrindavan.com/shop/?category=355129" },
  { name: "Dosa", img: "/categories/Dosa.jpg", link: "https://order.udupivrindavan.com/shop/?category=355128" },
  { name: "Idli", img: "/categories/Idli.jpg", link: "https://order.udupivrindavan.com/shop/?category=355128" },
  { name: "Snacks", img: "/categories/Snacks.jpg", link: "https://order.udupivrindavan.com/shop/?category=355127" },
  { name: "Hot Beverages", img: "/categories/Hot Beverages.jpg", link: "https://order.udupivrindavan.com/shop/?category=355131" },
  { name: "Cold Beverages", img: "/categories/Cold Beverages.jpg", link: "https://order.udupivrindavan.com/shop/?category=355133" },
];

const SignatureMenu = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);

  const checkScrollLimits = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < max - 10);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScrollLimits();
    el.addEventListener('scroll', checkScrollLimits, { passive: true });
    window.addEventListener('resize', checkScrollLimits);
    return () => {
      el.removeEventListener('scroll', checkScrollLimits);
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('a');
    const amount = card ? card.getBoundingClientRect().width + 24 : 400;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX;
    scrollStart.current = scrollRef.current.scrollLeft;
  };
  const endDrag = () => { isDragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const walk = e.pageX - startX.current;
    if (Math.abs(walk) > 5) dragMoved.current = true;
    e.preventDefault();
    scrollRef.current.scrollLeft = scrollStart.current - walk * 1.3;
  };

  const arrowBtn = (enabled: boolean) =>
    `flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
      enabled
        ? 'border-brand-blue bg-brand-blue text-brand-gold hover:bg-brand-gold hover:text-brand-blue hover:border-brand-gold cursor-pointer'
        : 'border-brand-blue/10 text-brand-blue/25 cursor-not-allowed'
    }`;

  return (
    <section id="menu" className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Header */}
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Our Specialties</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-brand-blue">
              Explore Our <br />
              <span className="accent text-[1.12em]">Categories</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end lg:flex-col lg:items-end">
            <p className="max-w-sm border-l-2 border-brand-gold/40 pl-5 text-base sm:text-lg leading-relaxed text-brand-blue/65 lg:text-right lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-5">
              Pick your favorite category and order directly from our kitchen to your doorstep.
            </p>
            <div className="hidden sm:flex gap-3">
              <button onClick={() => scroll('left')} disabled={!canScrollLeft} className={arrowBtn(canScrollLeft)} aria-label="Scroll Left" title="Scroll Left">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scroll('right')} disabled={!canScrollRight} className={arrowBtn(canScrollRight)} aria-label="Scroll Right" title="Scroll Right">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Slider */}
      <Reveal delay={0.1} className="mt-14">
        <div
          ref={scrollRef}
          className="no-scrollbar -my-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 sm:px-6 pt-6 pb-16 select-none cursor-grab active:cursor-grabbing scroll-px-5 sm:scroll-px-6 xl:px-[calc((100vw-80rem)/2+1.5rem)] xl:scroll-px-[calc((100vw-80rem)/2+1.5rem)]"
          onMouseDown={onMouseDown}
          onMouseLeave={endDrag}
          onMouseUp={endDrag}
          onMouseMove={onMouseMove}
        >
          {categories.map((cat, idx) => (
            <motion.a
              key={idx}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px 0px' }}
              transition={{ duration: 0.8, delay: Math.min(idx, 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              href={cat.link}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              onClick={(e) => { if (dragMoved.current) e.preventDefault(); }}
              className="group/card w-[82vw] max-w-[380px] flex-shrink-0 snap-start sm:w-[360px]"
            >
<<<<<<< HEAD
              <div className="overflow-hidden rounded-[1.75rem] border border-brand-blue/10 bg-brand-ivory transition-all duration-500 group-hover/card:-translate-y-2 group-hover/card:shadow-[0_30px_60px_-30px_rgba(15,47,74,0.5)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.img}
                    alt={`${cat.name} category at Udupi Vrindavan South Indian vegetarian restaurant`}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover/card:scale-105"
=======
              <ChevronRight size={24} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory select-none"
            style={{ cursor: 'grab' }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {categories.map((cat, idx) => (
              <a
                key={idx}
                href={cat.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[300px] md:w-[380px] snap-start group/card flex flex-col items-center"
                // Prevent link navigation on drag
                onClick={(e) => {
                  if (Math.abs(scrollRef.current?.scrollLeft ?? 0 - scrollLeft.current) > 5) {
                    e.preventDefault();
                  }
                }}
              >
                {/* Editorial category card */}
                <div className="relative w-full aspect-[0.86] overflow-hidden rounded-[2rem] border border-brand-blue/10 bg-brand-blue shadow-xl transition-all duration-500 group-hover/card:-translate-y-3 group-hover/card:shadow-2xl group-hover/card:shadow-brand-blue/20">
                  <img
                    src={cat.img}
                    alt={`${cat.name} category at Udupi Vrindavan South Indian vegetarian restaurant`}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 transform group-hover/card:scale-105 transition-transform duration-1000"
>>>>>>> c479ab9f7bf1889a781480cc8e805accdf8a216f
                    draggable={false}
                    loading="lazy"
                  />
<<<<<<< HEAD
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/85 text-xs font-semibold text-brand-cream backdrop-blur">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <h3 className="text-xl text-brand-blue">{cat.name}</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-brand-blue transition-colors group-hover/card:border-brand-gold group-hover/card:bg-brand-gold">
                    <span>Order Now</span>
                    <ArrowUpRight size={14} />
                  </span>
=======
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/20 to-transparent" />
                  <div className="absolute left-5 top-5 flex size-10 items-center justify-center rounded-full border border-brand-cream/40 bg-brand-blue/30 text-sm font-bold text-brand-cream backdrop-blur-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-left">
                    <div className="mb-4 h-px w-10 bg-brand-gold transition-all duration-500 group-hover/card:w-20" />
                    <h3 className="text-brand-cream font-display font-bold text-3xl leading-none opacity-0 translate-y-3 transition-all duration-500 group-hover/card:opacity-100 group-hover/card:translate-y-0">{cat.name}</h3>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-cream/35 bg-brand-cream/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brand-cream backdrop-blur-sm transition-colors group-hover/card:bg-brand-gold group-hover/card:text-brand-blue">
                      <span>Order Now</span>
                      <ArrowRightCircle size={16} className="transform group-hover/card:translate-x-1 transition-transform" />
                    </div>
                  </div>
>>>>>>> c479ab9f7bf1889a781480cc8e805accdf8a216f
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Progress + hint */}
        <div className="mt-6 flex items-center gap-4">
          <div className="relative h-[3px] w-32 overflow-hidden rounded-full bg-brand-gold/20">
            <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-brand-gold transition-transform duration-200" style={{ transform: `translateX(${progress * 200}%)` }} />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-blue/45">
            Drag or swipe to explore
          </span>
        </div>

        {/* Full Menu Button */}
        <Reveal className="mt-16 text-center">
          <a
            href="https://order.udupivrindavan.com/shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-blue px-10 py-4 text-base sm:text-lg font-semibold text-brand-cream shadow-xl shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-blue"
          >
            Browse Full Menu
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default SignatureMenu;
