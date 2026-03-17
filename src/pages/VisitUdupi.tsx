import React from "react";
import { motion } from "framer-motion";
import { Map, Plane, Train, Car, Compass, Images, Star, Utensils } from "lucide-react";
import { 
  UDUPI_FEATURES, 
  TRAVEL_MODES, 
  MUST_VISIT_PLACES, 
  CULTURE_GALLERY,
  UDUPI_GEOGRAPHY,
  CUISINE_HIGHLIGHTS
} from "../data/siteConfig";

const VisitUdupi = () => {
  return (
    <div className="bg-[#fdfcf7] min-h-screen pt-16 md:pt-20 overflow-x-hidden font-sans selection:bg-brand-gold/30">
      
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
          className="mt-10 md:mt-16 bg-brand-gold text-brand-blue px-8 md:px-12 py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm shadow-2xl transition-all"
        >
          Explore Trip Planner
        </motion.button>
      </section>
    </div>
  );
};

export default VisitUdupi;