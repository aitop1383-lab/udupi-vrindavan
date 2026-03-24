import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ChevronRight } from 'lucide-react';

/**
 * Hero Component
 * Isme aapka original design aur full description maintain kiya gaya hai.
 * Comments ko professional English mein add kiya gaya hai.
 */
const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-cream pt-10">
      {/* --- BACKGROUND ELEMENTS --- */}
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-30 texture-bg"></div>

      {/* Decorative Skewed Shape in the background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 -skew-x-12 translate-x-1/4"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT COLUMN: Content Section --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-xs">
                Tasty yet healthy food
              </span>
            </div>

            {/* Main Heading with original typography */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-brand-blue leading-[0.9] mb-8 font-display">
              Eating Food<br />
              <span className="text-brand-gold italic">Cooked at</span> <br />
              <span className="text-brand-blue">Home is best</span>
            </h1>

            {/* Full Original Description (No changes made) */}
            <p className="text-xl text-brand-blue/70 mb-12 max-w-lg leading-relaxed font-light">
            Food cooked and eaten at home with family is the best. The next best place should offer you the same health and taste. After all, no one wants to spend money to get ill. At Udupi Vrindavan Restaurant, you will get to experience healthy, fresh and tasty food. You can listen to your favourite songs, talk to our Front of House staff in Kannada and enjoy the delicacies that remind you of Udupi and the wider Karnataka region.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              {/* Order Online Button with original shadow pulse animation */}
              <motion.a
                href="https://order.udupivrindavan.com/outlet/99670498269910"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden bg-brand-blue text-brand-cream px-8 py-4 rounded-full font-bold text-xl transition-all shadow-2xl hover:shadow-brand-blue/30 w-full sm:w-auto text-center"
                animate={{
                  scale: [1, 1.02, 1.05, 1.02, 1],
                  boxShadow: [
                    "0 0 0 0 #DAA520, 0 0 20px 5px #DAA520",
                    "0 0 0 10px rgba(218, 165, 32, 0.6), 0 0 30px 15px rgba(218, 165, 32, 0.4)",
                    "0 0 0 20px rgba(218, 165, 32, 0.3), 0 0 40px 25px rgba(218, 165, 32, 0.2)",
                    "0 0 0 10px rgba(218, 165, 32, 0.6), 0 0 30px 15px rgba(218, 165, 32, 0.4)",
                    "0 0 0 0 #DAA520, 0 0 20px 5px #DAA520"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Order Online <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.a>

              {/* View Menu Link */}
              <a
                href="/Menu.pdf"
                className="group flex items-center gap-4 text-brand-blue font-bold text-xl hover:text-brand-gold transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-14 h-14 rounded-full border-2 border-brand-blue flex items-center justify-center group-hover:border-brand-gold transition-colors">
                  <Utensils size={24} />
                </div>
                View Dining Menu
              </a>
            </div>

            {/* Original Stats / Trust Badges */}
            <div className="mt-16 flex gap-12 border-t border-brand-blue/10 pt-10">
              <div>
                <span className="block text-3xl font-bold text-brand-blue">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-blue/50 font-bold">Pure Vegetarian</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-brand-blue">100+</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-blue/50 font-bold">Varieties</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-brand-blue">1000+</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-blue/50 font-bold">Happy Guests</span>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT COLUMN: Visual Elements --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Signature Image with Oval Mask and original classes */}
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl cascading-image-reverse aspect-[4/4] m-4">
              <img
                src="/Butter-Dosa.jpg"
                alt="Signature Udupi Dosa"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-blue/40 to-transparent"></div>

              {/* Image Label */}
              <div className="w-full absolute bottom-10 left-10 text-brand-cream">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80 mb-2 block">Signature Dish</span>
                <h3 className="text-3xl font-display font-bold">Butter Dosa</h3>
              </div>
            </div>

            {/* Rotating Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold rounded-full flex items-center justify-center z-20 shadow-xl"
            >
              <div className="text-center text-brand-blue p-4">
                <span className="block text-[8px] uppercase font-bold tracking-[0.2em] mb-1">Authentic</span>
                <span className="block text-xl font-bold leading-none">Karnataka</span>
                <span className="block text-xl font-bold leading-none">Vegetarian </span>
                <span className="block text-[8px] uppercase font-bold tracking-[0.2em] mt-1">Cuisine</span>
              </div>
              <div className="absolute inset-2 border border-dashed border-brand-blue/30 rounded-full"></div>
            </motion.div>

            {/* Decorative Dot Grid */}
            <div className="absolute -top-20 -left-10 grid grid-cols-4 gap-4 opacity-20">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-brand-gold rounded-full"></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- BOTTOM MARQUEE: Original Content maintained --- */}
      <div className="absolute bottom-0 left-0 w-full bg-brand-blue py-4 overflow-hidden whitespace-nowrap z-20">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-brand-cream/30 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mx-8">
              • Pure Satvik Tradition • Authentic Udupi • Karnataka Cooks • Premium Nandini Ghee • Quality Ingredients • Ethical Kitchen •
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Home;