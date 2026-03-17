import React from 'react';
import { motion } from 'framer-motion';

/**
 * Heritage Component
 * Highlights the cultural roots and culinary traditions of Udupi.
 * Features: Reversed grid on mobile, floating animated badges, and parallax background shapes.
 */
const Heritage = () => {
  return (
    <section id="heritage" className="py-32 bg-brand-blue text-brand-cream relative overflow-hidden">
      
      {/* Decorative Background: Skewed white overlay with low opacity for depth */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* --- Text Content Column --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            // order-2 on mobile ensures text stays below the image, md:order-1 puts it left on desktop
            className="order-2 md:order-1"
          >
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Our Roots
            </span>
            <h2 className="text-5xl md:text-6xl mb-10 text-brand-gold leading-tight">
              The Heritage <br />of <span className="italic text-brand-cream">Udupi</span>
            </h2>
            
            <div className="space-y-8 opacity-90 text-lg leading-relaxed">
              <p>
                Udupi cuisine is a celebrated vegetarian culinary tradition from the coastal region of Karnataka. Known for its balanced flavors and wholesome ingredients, it reflects generations of culinary heritage.
              </p>
              <p>
                Our meals are prepared using fresh grains, lentils, vegetables, and traditional spices that highlight the authentic taste of South Indian cooking.
              </p>
              <p>
                From comforting Sambar and crispy Dosas to nourishing rice dishes and traditional sweets, every meal represents the rich heritage and hospitality of Udupi cuisine.
              </p>
            </div>
          </motion.div>

          {/* --- Image & Floating Badge Column --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative"
          >
            {/* Main Image Container with a distinct 3rem border radius */}
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-2 border-brand-gold/20 aspect-square">
              <img
                src="/Lunch.jpg"
                alt="Traditional Udupi Lunch"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Guarantee Badge: Features a continuous vertical floating animation */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold rounded-full flex items-center justify-center shadow-2xl z-20 p-2"
            >
              <div className="text-brand-blue text-center leading-tight">
                <span className="block text-2xl font-bold">100%</span>
                <span className="block text-[10px] font-black uppercase tracking-tighter">
                  Money Back
                </span>
                <span className="block text-[8px] uppercase font-bold tracking-[0.2em] mt-1 opacity-80">
                  Guarantee
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Heritage;