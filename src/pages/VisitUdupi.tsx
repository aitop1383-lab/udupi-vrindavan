import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Plane, Train, Car, Compass, Images, Star, Utensils, X, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { 
  UDUPI_FEATURES, 
  TRAVEL_MODES, 
  MUST_VISIT_PLACES, 
  CULTURE_GALLERY,
  UDUPI_GEOGRAPHY,
  CUISINE_HIGHLIGHTS
} from "../data/siteConfig";

const VisitUdupi = () => {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'day1' | 'day2' | 'day3'>('day1');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeImageIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImageIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % CULTURE_GALLERY.length : null));
      } else if (e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + CULTURE_GALLERY.length) % CULTURE_GALLERY.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

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

  return (
    <div className="bg-[#fdfcf7] min-h-screen pt-16 md:pt-20 overflow-x-hidden font-sans selection:bg-brand-gold/30 texture-bg">
      <Helmet>
        <title>Visit Udupi | Explore the Coast of Karnataka</title>
        <meta name="description" content="Discover the spiritual and culinary heart of Karnataka. Plan your journey to Udupi's pristine beaches and sacred temples." />
        <meta property="og:title" content="Visit Udupi | Explore the Coast of Karnataka" />
        <meta property="og:description" content="A guide to exploring Udupi's heritage, culture, and world-famous cuisine." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://udupivrindavan.com/visit-udupi" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      {/* --- HERO: Cinematic Entrance --- */}
      <section className="relative h-[80vh] md:h-[95vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="/VisitUdupi_Gallery/udupi.webp" 
            className="w-full h-full object-cover" 
            alt="Udupi" 
            fetchPriority="high"
            loading="eager"
            width="1920"
            height="1080"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-brand-blue/40" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-brand-gold tracking-[0.4em] md:tracking-[0.8em] uppercase font-bold text-[10px] md:text-xs mb-4 md:mb-6 block">
              Escape to the Coast
            </span>
            {/* Optimized for mobile font size */}
            <h1 className="text-6xl md:text-[120px] lg:text-[160px] text-white font-display drop-shadow-2xl leading-none">
              UDUPI
            </h1>
            <div className="h-1 md:h-1.5 w-24 md:w-40 bg-brand-gold mx-auto mt-6 md:mt-8 rounded-full shadow-lg" />
          </motion.div>
        </div>
      </section>

      {/* --- WHY VISIT: Elegant Cards --- */}
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
            {UDUPI_FEATURES.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group text-center md:text-left"
              >
                <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-6 md:mb-8 mx-auto md:mx-0 group-hover:bg-brand-gold group-hover:text-brand-blue transition-all duration-500">
                  <Star size={24} />
                </div>
                <h4 className="text-2xl md:text-3xl font-display text-brand-blue mb-4 md:mb-6">{feature.title}</h4>
                <p className="text-brand-blue/60 leading-relaxed text-base md:text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GEOGRAPHY: Overlapping Editorial Layout --- */}
      <section className="py-16 md:py-24 bg-brand-blue/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-6xl text-brand-blue font-display mb-6 md:mb-10 leading-tight">
                Between the <br/><span className="italic text-brand-gold">Ghats & The Sea</span>
              </h2>
              <p className="text-brand-blue/80 text-lg md:text-xl leading-relaxed mb-8 md:mb-10 font-light italic">
                {UDUPI_GEOGRAPHY.desc}
              </p>
              
              <a 
                href={UDUPI_GEOGRAPHY.mapLink} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-brand-blue rounded-[1.5rem] md:rounded-[2rem] text-white shadow-2xl hover:bg-brand-gold hover:text-brand-blue transition-all group"
              >
                <div className="bg-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl group-hover:bg-brand-blue/20">
                  <Map size={24} className="md:w-8 md:h-8" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg md:text-xl uppercase tracking-tighter">View on Map</h4>
                  <span className="text-[10px] md:text-xs opacity-60">Explore Karnataka Coast</span>
                </div>
              </a>
            </motion.div>

            {/* Editorial Image Stack - Adjusted for Mobile */}
            <div className="relative h-[400px] md:h-[600px] w-full order-1 lg:order-2">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="absolute top-0 right-0 w-[85%] h-[85%] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl z-10 border-4 md:border-8 border-white"
              >
                <img src="/VisitUdupi_Gallery/templewater.jpeg" className="w-full h-full object-cover" alt="Temple Tank" />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl z-20 border-4 md:border-8 border-[#fdfcf7]"
              >
                <img src="/VisitUdupi_Gallery/top-view-ocen.jpeg" className="w-full h-full object-cover" alt="Ocean View" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRAVEL: Premium Glassmorphism --- */}
      <section className="py-20 md:py-32 bg-brand-blue text-white relative">
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-gold rounded-full blur-[80px] md:blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display text-brand-gold italic mb-12 md:mb-20">The Journey Inward</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TRAVEL_MODES.map((mode, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl text-left hover:border-brand-gold/50 transition-all duration-500"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-gold text-brand-blue flex items-center justify-center mb-6 md:mb-8 shadow-xl">
                  {mode.type === "Air" ? <Plane size={28} /> : mode.type === "Train" ? <Train size={28} /> : <Car size={28} />}
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{mode.title}</h4>
                <p className="text-white/60 leading-relaxed italic text-sm md:text-base">{mode.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PLACES: Floating Image Cards --- */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl text-center text-brand-blue font-display mb-12 md:mb-24">Must Visit <br className="md:hidden" /> <span className="italic text-brand-gold">Destinations</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {MUST_VISIT_PLACES.map((place, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -15 }}
                className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-white group border border-brand-blue/5"
              >
                <div className="h-64 md:h-80 overflow-hidden relative">
                  <img src={place.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt={place.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent" />
                </div>
                <div className="p-8 md:p-10 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-brand-blue mb-3 md:mb-4 tracking-tighter">{place.title}</h3>
                  <p className="text-brand-blue/60 leading-relaxed text-sm">{place.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MASONRY GALLERY --- */}
      <section className="py-20 md:py-32 bg-[#f8f7f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-12 md:mb-24">
            <h2 className="text-4xl md:text-6xl text-brand-blue font-display shrink-0">Culture & <span className="italic text-brand-gold">Heritage</span></h2>
            <div className="hidden md:block h-px w-full bg-brand-gold/30" />
            <Images className="text-brand-gold opacity-50 shrink-0 hidden md:block" size={40} />
          </div>

          {/* Responsive columns: 1 on mobile, 2 on tablet, 3 on desktop */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-10 space-y-6 md:space-y-10">
            {CULTURE_GALLERY.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setActiveImageIndex(i)}
                className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl group cursor-pointer"
              >
                <img src={`/VisitUdupi_Gallery/${item.src}`} className="w-full group-hover:scale-110 transition duration-1000" alt={item.label} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 md:p-10">
                  <p className="text-white text-lg md:text-xl italic font-display">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CUISINE GRID --- */}
      <section className="py-20 md:py-32 bg-brand-blue text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-display text-brand-gold italic mb-4 md:mb-6">The Gastronomic Soul</h2>
            <p className="text-white/50 uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs">A Tradition of Taste</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {CUISINE_HIGHLIGHTS.map((food, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 text-center backdrop-blur-sm transition-all"
              >
                <p className="font-bold text-base md:text-xl mb-1 md:mb-2">{food.name}</p>
                <p className="text-brand-gold text-[10px] md:text-xs italic">{food.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 md:py-48 text-center relative px-6">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] md:opacity-[0.03] pointer-events-none">
          <Compass size={300} className="text-brand-blue rotate-12 md:w-[600px] md:h-[600px]" />
        </div>
        <h3 className="text-brand-blue font-display italic text-3xl md:text-6xl max-w-4xl mx-auto leading-tight">
          Begin your pilgrimage to the town where every meal is a sacred offering.
        </h3>
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: '#002E54', color: '#fff' }}
          onClick={() => setIsPlannerOpen(true)}
          className="mt-10 md:mt-16 bg-brand-gold text-brand-blue px-8 md:px-12 py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm shadow-2xl transition-all cursor-pointer"
        >
          Explore Trip Planner
        </motion.button>
      </section>

      {/* --- ITINERARY MODAL --- */}
      <AnimatePresence>
        {isPlannerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-blue/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsPlannerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#fdfcf7] border-4 border-brand-gold/30 rounded-[2.5rem] shadow-2xl p-6 md:p-10 max-w-4xl w-full max-h-[85vh] overflow-y-auto relative text-brand-blue"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPlannerOpen(false)}
                className="absolute top-5 right-5 text-brand-blue hover:text-brand-gold bg-brand-blue/5 p-2 rounded-full hover:bg-brand-blue/10 transition-all cursor-pointer"
                title="Close"
              >
                <X size={24} />
              </button>

              {/* Title */}
              <div className="text-center mb-8">
                <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-2 block font-sans">
                  Curated Guide
                </span>
                <h3 className="text-3xl md:text-5xl font-display leading-tight">
                  Udupi <span className="italic text-brand-gold font-display font-serif">Itinerary Planner</span>
                </h3>
                <div className="w-24 h-0.5 bg-brand-gold/30 mx-auto mt-4"></div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-8 font-sans">
                {(Object.keys(itineraries) as Array<keyof typeof itineraries>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      activeTab === key
                        ? "bg-brand-blue text-brand-cream shadow-md scale-105"
                        : "bg-white text-brand-blue/60 hover:text-brand-blue hover:bg-white/80 border border-brand-blue/10"
                    }`}
                  >
                    {itineraries[key].title.split(" ")[0]} ({key === 'day1' ? '1 Day' : key === 'day2' ? '2 Days' : '3 Days'})
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-brand-blue/5 shadow-inner">
                <h4 className="text-2xl font-bold font-display mb-2">
                  {itineraries[activeTab].title}
                </h4>
                <p className="text-brand-blue/60 text-sm italic mb-8 border-l-2 border-brand-gold/30 pl-4 font-sans">
                  {itineraries[activeTab].tagline}
                </p>

                {/* Timeline */}
                <div className="relative border-l-2 border-dashed border-brand-gold/40 ml-4 pl-8 space-y-8">
                  {itineraries[activeTab].steps.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute left-[-41px] top-1.5 w-6 h-6 rounded-full bg-brand-gold border-4 border-brand-cream flex items-center justify-center shadow-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                      </div>
                      
                      <div>
                        <span className="inline-block bg-brand-blue/5 text-brand-blue text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider font-sans">
                          {step.time}
                        </span>
                        <h5 className="text-lg font-bold tracking-tight text-brand-blue font-display">
                          {step.activity}
                        </h5>
                        <p className="text-brand-blue/70 text-sm leading-relaxed mt-1 font-light font-sans">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Advisory Footer */}
              <div className="mt-8 text-center bg-brand-blue/5 p-5 rounded-2xl border border-brand-blue/5">
                <p className="text-xs text-brand-blue/60 leading-relaxed font-light font-sans">
                  💡 <strong>Tip:</strong> Always check temple darshan timings before visiting. Standard dress codes apply for temple entry (men: dhoti/shawl, women: saree/salwar).
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-brand-blue/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 select-none"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-brand-gold bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all cursor-pointer z-[120]"
              title="Close Viewer"
            >
              <X size={28} />
            </button>

            {/* Left Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + CULTURE_GALLERY.length) % CULTURE_GALLERY.length : null));
              }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all cursor-pointer z-[120]"
              title="Previous Image"
            >
              <ChevronRight className="rotate-180" size={28} />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % CULTURE_GALLERY.length : null));
              }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold bg-white/5 hover:bg-white/10 p-4 rounded-full transition-all cursor-pointer z-[120]"
              title="Next Image"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image Card Container */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="relative max-w-4xl w-full flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl max-h-[70vh] flex items-center justify-center bg-black/40">
                <img
                  src={`/VisitUdupi_Gallery/${CULTURE_GALLERY[activeImageIndex].src}`}
                  alt={CULTURE_GALLERY[activeImageIndex].label}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              
              {/* Caption & Counter */}
              <div className="text-center text-white px-6 max-w-2xl">
                <p className="text-brand-gold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2 font-sans font-bold">
                  Image {activeImageIndex + 1} of {CULTURE_GALLERY.length}
                </p>
                <h4 className="text-xl md:text-2xl font-display italic font-semibold">
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