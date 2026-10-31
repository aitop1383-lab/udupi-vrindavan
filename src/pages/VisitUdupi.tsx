import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Plane, Train, Car, Compass, Images, Landmark, Waves, Utensils, X, ChevronLeft, ChevronRight, ArrowUpRight, Lightbulb } from "lucide-react";
import Seo from "../components/Seo";
import Reveal, { ImageReveal } from "../components/ui/Reveal";
import { breadcrumbSchema } from "../data/seoSchemas";
import {
  UDUPI_FEATURES,
  TRAVEL_MODES,
  MUST_VISIT_PLACES,
  CULTURE_GALLERY,
  UDUPI_GEOGRAPHY,
  CUISINE_HIGHLIGHTS
} from "../data/siteConfig";

const FEATURE_ICONS = [Landmark, Waves, Utensils];

const itineraries = {
  day1: {
    title: "1-Day Spiritual Pilgrimage",
    tagline: "Focus on sacred temples and traditional Satvik dining",
    steps: [
      { time: "06:00 AM", activity: "Temple Darshan", detail: "Start early to witness the divine morning arati and view the deity through the historic Kanakana Kindi." },
      { time: "08:30 AM", activity: "Traditional Breakfast", detail: "Relish legendary Ghee Podi Idlis and piping hot Filter Kaapi at the local eateries near the Car Street." },
      { time: "12:00 PM", activity: "Satvik Lunch at Bhojana Shala", detail: "Experience the ultimate community feast served on banana leaves inside the temple premises." },
      { time: "04:30 PM", activity: "Sunset at Malpe Beach", detail: "Relax on the silver sands of Malpe Beach and capture the stunning coastal sunset." }
    ]
  },
  day2: {
    title: "2-Day Nature & Coastline Explorer",
    tagline: "Discover unique basaltic islands, backwaters, and lighthouses",
    steps: [
      { time: "Day 1 - 09:00 AM", activity: "St. Mary's Island Ferry", detail: "Take a boat from Malpe to explore the geological marvel of hexagonal basaltic lava rock formations." },
      { time: "Day 1 - 05:00 PM", activity: "Kapu Beach Lighthouse", detail: "Climb the historic 1901 lighthouse for a panoramic view of the Arabian Sea at sunset." },
      { time: "Day 2 - 07:30 AM", activity: "Kemmannu Backwater Kayaking", detail: "Paddle through the serene mangrove-lined backwater canals and cross the hanging bridge." },
      { time: "Day 2 - 04:00 PM", activity: "Delta Beach Hangout", detail: "Walk where the Suvarna river meets the sea, enjoying fresh coconut water and peace." }
    ]
  },
  day3: {
    title: "3-Day Ultimate Culinary & Heritage",
    tagline: "A comprehensive immersion into cuisine, monuments, and spiritual roots",
    steps: [
      { time: "Day 1", activity: "Mitra Samaj & Pajaka Heritage", detail: "Enjoy authentic breakfast at Mitra Samaj, then visit Pajaka Kshetra, the birthplace of saint Sri Madhvacharya." },
      { time: "Day 2", activity: "Island Excursion & Neer Dosa Dinner", detail: "Spend the day at St. Mary's Island, and end it with a soft, lacy Neer Dosa dinner in town." },
      { time: "Day 3", activity: "Karkala & Moodabidri Monuments", detail: "Drive inland to see the Gommateshwara monolith in Karkala and the stunning 1000-pillar temple in Moodabidri." }
    ]
  }
};

const VisitUdupi = () => {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'day1' | 'day2' | 'day3'>('day1');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImageIndex(null);
      else if (e.key === "ArrowRight") setActiveImageIndex((p) => (p !== null ? (p + 1) % CULTURE_GALLERY.length : null));
      else if (e.key === "ArrowLeft") setActiveImageIndex((p) => (p !== null ? (p - 1 + CULTURE_GALLERY.length) % CULTURE_GALLERY.length : null));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

  useEffect(() => {
    if (!isPlannerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsPlannerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlannerOpen]);

  useEffect(() => {
    const locked = isPlannerOpen || activeImageIndex !== null;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isPlannerOpen, activeImageIndex]);

  const visitBreadcrumbSchema = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Visit Udupi', path: '/visit-udupi' }
  ]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-ivory font-sans">
      <Seo
        title="Visit Udupi | Udupi food, South Indian heritage and Karnataka cuisine"
        description="Explore Udupi's temple heritage, coastal beauty, and vegetarian cuisine, then visit Udupi Vrindavan in Al Karama, Dubai for authentic South Indian food."
        canonicalPath="/visit-udupi"
        image="/VisitUdupi_Gallery/udupi.webp"
        type="website"
        jsonLd={visitBreadcrumbSchema}
      />

      {/* HERO */}
      <section className="relative flex h-[88svh] min-h-[560px] items-end overflow-hidden md:h-screen">
        <motion.div initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: "easeOut" }} className="absolute inset-0">
          <img
            src="/VisitUdupi_Gallery/udupi.webp"
            className="h-full w-full object-cover"
            alt="Scenic Udupi coastline and temple town views"
            fetchPriority="high"
            loading="eager"
            width="1920"
            height="1080"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/60 via-brand-ink/20 to-brand-ink/85" />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 pb-16 md:pb-24 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <span className="eyebrow eyebrow-light justify-center tracking-[0.5em]">
              Escape to the Coast
            </span>
            <h1 className="mt-6 flex justify-center overflow-hidden font-display text-[5.5rem] leading-none tracking-[0.04em] text-white drop-shadow-2xl sm:text-[8rem] md:text-[11rem] lg:text-[13rem]" aria-label="UDUPI">
              {"UDUPI".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 h-1 w-24 origin-center rounded-full bg-brand-gold md:w-36"
            />
          </motion.div>
        </div>
      </section>

      {/* WHY VISIT */}
      <section className="relative -mt-10 md:-mt-16 z-10 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {UDUPI_FEATURES.map((feature, i) => {
              const Icon = FEATURE_ICONS[i] ?? Landmark;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <article className="group h-full rounded-[1.75rem] bg-white p-8 md:p-10 shadow-[0_30px_60px_-35px_rgba(15,47,74,0.45)] ring-1 ring-brand-blue/5 transition-all duration-500 hover:-translate-y-1.5 hover:ring-brand-gold/40">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-bronze transition-colors duration-500 group-hover:bg-brand-gold group-hover:text-brand-blue">
                      <Icon size={22} />
                    </span>
                    <h4 className="mt-7 text-2xl md:text-[1.7rem] text-brand-blue">{feature.title}</h4>
                    <p className="mt-4 text-base leading-relaxed text-brand-blue/65">{feature.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* GEOGRAPHY */}
      <section className="relative bg-brand-sand/40 py-20 md:py-28">
        <div className="absolute inset-0 texture-bg opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal x={-30} y={0} className="order-2 text-center lg:order-1 lg:text-left">
              <h2 className="text-4xl md:text-6xl leading-[1.05] text-brand-blue">
                Between the <br /><span className="accent text-[1.12em]">Ghats &amp; The Sea</span>
              </h2>
              <p className="mt-8 font-accent text-xl md:text-2xl italic leading-relaxed text-brand-blue/80">
                {UDUPI_GEOGRAPHY.desc}
              </p>
              <a
                href={UDUPI_GEOGRAPHY.mapLink}
                target="_blank"
                rel="noreferrer"
                className="group mt-10 inline-flex items-center gap-5 rounded-[1.5rem] bg-brand-blue p-4 pr-7 text-left text-white shadow-2xl shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-blue"
              >
                <span className="rounded-xl bg-white/10 p-3 group-hover:bg-brand-blue/15">
                  <Map size={26} />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold uppercase tracking-tight">View on Map</span>
                  <span className="text-xs opacity-65">Explore Karnataka Coast</span>
                </span>
                <ArrowUpRight size={18} className="ml-2 opacity-70" />
              </a>
            </Reveal>

            <Reveal x={30} y={0} delay={0.1} className="relative order-1 h-[380px] w-full sm:h-[480px] md:h-[580px] lg:order-2">
              <ImageReveal className="absolute right-0 top-0 z-10 h-[85%] w-[78%] overflow-hidden rounded-[3rem] border-[6px] border-white shadow-2xl">
                <img src="/VisitUdupi_Gallery/templewater.jpeg" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" alt="Temple tank reflecting the heritage of Udupi" loading="lazy" />
              </ImageReveal>
              <ImageReveal from="left" delay={0.35} className="absolute bottom-0 left-0 z-20 h-[52%] w-[52%] overflow-hidden rounded-[2rem] border-[6px] border-brand-ivory shadow-2xl">
                <img src="/VisitUdupi_Gallery/top-view-ocen.jpeg" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" alt="Ocean view over the Arabian Sea near Udupi" loading="lazy" />
              </ImageReveal>
              <div className="absolute -left-4 top-10 h-24 w-24 rounded-full border border-brand-gold/50" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRAVEL */}
      <section className="relative overflow-hidden bg-brand-blue py-20 text-white md:py-28">
        <div className="absolute inset-0 pattern-dots opacity-15 pointer-events-none" />
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="mb-14 text-center md:mb-16">
            <h2 className="accent text-5xl md:text-6xl">The Journey Inward</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {TRAVEL_MODES.map((mode, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 md:p-10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-gold/50">
                  <span className="absolute right-6 top-6 font-display text-5xl font-bold text-white/[0.06]">0{i + 1}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold text-brand-blue shadow-xl">
                    {mode.type === "Air" ? <Plane size={26} /> : mode.type === "Train" ? <Train size={26} /> : <Car size={26} />}
                  </span>
                  <h4 className="mt-7 text-2xl">{mode.title}</h4>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-white/65">{mode.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLACES */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal>
            <h2 className="mb-14 text-center text-4xl md:mb-20 md:text-6xl leading-[1.05] text-brand-blue">
              Must Visit <br className="md:hidden" /> <span className="accent text-[1.12em]">Destinations</span>
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {MUST_VISIT_PLACES.map((place, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <article className="group h-full overflow-hidden rounded-[2.5rem] bg-white shadow-[0_30px_60px_-35px_rgba(15,47,74,0.5)] ring-1 ring-brand-blue/5">
                  <div className="relative h-72 overflow-hidden md:h-80">
                    <img src={place.img} className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" alt={`${place.title} - Scenic destination in Udupi, Karnataka`} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent" />
                  </div>
                  <div className="p-8 text-center md:p-9">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-bronze">0{i + 1}</span>
                    <h3 className="mt-2 text-2xl text-brand-blue">{place.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-blue/65">{place.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-brand-cream py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="mb-12 flex flex-col items-center gap-6 md:mb-16 md:flex-row md:gap-10">
            <h2 className="shrink-0 text-4xl md:text-6xl text-brand-blue">Culture &amp; <span className="accent text-[1.12em]">Heritage</span></h2>
            <div className="hidden h-px w-full bg-brand-gold/40 md:block" />
            <Images className="hidden shrink-0 text-brand-gold md:block" size={36} />
          </Reveal>

          <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 md:gap-6 md:space-y-6">
            {CULTURE_GALLERY.map((item, i) => (
              <motion.button
                type="button"
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px 0px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveImageIndex(i)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-[1.5rem] shadow-xl cursor-zoom-in"
                aria-label={`Open image: ${item.label}`}
              >
                <img src={`/VisitUdupi_Gallery/${item.src}`} className="w-full transition duration-1000 group-hover:scale-105" alt={item.label} loading="lazy" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent p-6 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                  <p className="accent text-xl md:text-2xl text-white">{item.label}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CUISINE */}
      <section className="relative overflow-hidden bg-brand-blue py-20 text-white md:py-28">
        <div className="absolute inset-0 pattern-dots opacity-15 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
          <Reveal className="mb-14 text-center md:mb-16">
            <h2 className="accent text-5xl md:text-6xl">The Gastronomic Soul</h2>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/55">A Tradition of Taste</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-6">
            {CUISINE_HIGHLIGHTS.map((food, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-center transition-all duration-500 hover:border-brand-gold/50 hover:bg-white/[0.08] md:p-8">
                  <span className="mb-4 h-1.5 w-1.5 rotate-45 bg-brand-gold" />
                  <p className="font-display text-base font-bold md:text-xl">{food.name}</p>
                  <p className="mt-2 font-accent text-base italic text-brand-gold-light">{food.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-5 py-24 text-center md:py-40">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <Compass className="h-[300px] w-[300px] rotate-12 text-brand-blue md:h-[560px] md:w-[560px]" />
        </div>
        <Reveal>
          <h3 className="mx-auto max-w-4xl font-accent text-3xl italic font-semibold leading-tight text-brand-blue md:text-6xl">
            Begin your pilgrimage to the town where every meal is a sacred offering.
          </h3>
          <button
            onClick={() => setIsPlannerOpen(true)}
            className="mt-10 rounded-full bg-brand-gold px-9 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue shadow-2xl shadow-brand-gold/30 transition-all hover:-translate-y-0.5 hover:bg-brand-blue hover:text-white md:mt-14 md:px-12 md:py-5 md:text-sm cursor-pointer"
          >
            Explore Trip Planner
          </button>
        </Reveal>
      </section>

      {/* ITINERARY MODAL */}
      <AnimatePresence>
        {isPlannerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-brand-ink/80 backdrop-blur-md sm:items-center sm:p-4"
            onClick={() => setIsPlannerOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-brand-ivory p-6 text-brand-blue shadow-2xl sm:rounded-[2rem] md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPlannerOpen(false)}
                className="absolute right-5 top-5 rounded-full bg-brand-blue/5 p-2 text-brand-blue transition-all hover:bg-brand-blue hover:text-brand-gold cursor-pointer"
                title="Close"
                aria-label="Close"
              >
                <X size={22} />
              </button>

              <div className="mb-8 text-center">
                <span className="eyebrow justify-center">Curated Guide</span>
                <h3 className="mt-3 text-3xl md:text-5xl leading-tight">
                  Udupi <span className="accent text-[1.1em]">Itinerary Planner</span>
                </h3>
                <div className="mx-auto mt-5 h-px w-24 bg-brand-gold/40" />
              </div>

              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {(Object.keys(itineraries) as Array<keyof typeof itineraries>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      activeTab === key
                        ? "bg-brand-blue text-brand-cream shadow-md"
                        : "border border-brand-blue/10 bg-white text-brand-blue/60 hover:text-brand-blue"
                    }`}
                  >
                    {itineraries[key].title.split(" ")[0]} ({key === 'day1' ? '1 Day' : key === 'day2' ? '2 Days' : '3 Days'})
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[1.5rem] bg-white p-6 ring-1 ring-brand-blue/5 md:p-8"
                >
                  <h4 className="mb-2 text-2xl">{itineraries[activeTab].title}</h4>
                  <p className="mb-8 border-l-2 border-brand-gold/40 pl-4 text-sm italic text-brand-blue/60">
                    {itineraries[activeTab].tagline}
                  </p>
                  <ol className="relative ml-3 space-y-8 border-l-2 border-dashed border-brand-gold/40 pl-8">
                    {itineraries[activeTab].steps.map((step, idx) => (
                      <li key={idx} className="relative">
                        <span className="absolute -left-[45px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-brand-gold shadow">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                        </span>
                        <span className="mb-2 inline-block rounded-full bg-brand-blue/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
                          {step.time}
                        </span>
                        <h5 className="font-display text-lg font-bold tracking-tight">{step.activity}</h5>
                        <p className="mt-1 text-sm leading-relaxed text-brand-blue/70">{step.detail}</p>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-gold/10 p-5 text-left">
                <Lightbulb size={18} className="mt-0.5 shrink-0 text-brand-bronze" />
                <p className="text-xs leading-relaxed text-brand-blue/70">
                  <strong>Tip:</strong> Always check temple darshan timings before visiting. Standard dress codes apply for temple entry (men: dhoti/shawl, women: saree/salwar).
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex select-none flex-col items-center justify-center bg-brand-ink/95 p-4 backdrop-blur-xl"
            onClick={() => setActiveImageIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute right-5 top-5 z-[120] rounded-full bg-white/10 p-3 text-white transition-all hover:bg-brand-gold hover:text-brand-blue cursor-pointer"
              title="Close Viewer"
              aria-label="Close Viewer"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex((p) => (p !== null ? (p - 1 + CULTURE_GALLERY.length) % CULTURE_GALLERY.length : null)); }}
              className="absolute left-3 top-1/2 z-[120] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-brand-gold hover:text-brand-blue md:left-10 md:p-4 cursor-pointer"
              title="Previous Image"
              aria-label="Previous Image"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex((p) => (p !== null ? (p + 1) % CULTURE_GALLERY.length : null)); }}
              className="absolute right-3 top-1/2 z-[120] -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-brand-gold hover:text-brand-blue md:right-10 md:p-4 cursor-pointer"
              title="Next Image"
              aria-label="Next Image"
            >
              <ChevronRight size={26} />
            </button>

            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative flex w-full max-w-4xl flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex max-h-[70vh] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
                <img
                  src={`/VisitUdupi_Gallery/${CULTURE_GALLERY[activeImageIndex].src}`}
                  alt={CULTURE_GALLERY[activeImageIndex].label}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>
              <div className="max-w-2xl px-6 text-center text-white">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-gold md:text-xs">
                  Image {activeImageIndex + 1} of {CULTURE_GALLERY.length}
                </p>
                <h4 className="accent text-2xl md:text-3xl text-white">
                  {CULTURE_GALLERY[activeImageIndex].label}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitUdupi;
