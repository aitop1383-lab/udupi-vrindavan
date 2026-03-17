import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Coins, GraduationCap, ArrowRightCircle } from 'lucide-react';
// Importing the data from siteConfig
import { EMPLOYEE_BENEFITS } from '../data/siteConfig';

const Commitment = () => {
  // Helper to map icons to specific titles
  const getIcon = (title: string) => {
    switch (title) {
      case "Worker Welfare": return <Heart className="w-8 h-8" />;
      case "Empowerment": return <Users className="w-8 h-8" />;
      case "Remuneration": return <Coins className="w-8 h-8" />;
      case "Training": return <GraduationCap className="w-8 h-8" />;
      default: return <Heart className="w-8 h-8" />;
    }
  };

  return (
    <section id="commitment" className="py-16 md:py-24 lg:py-32 texture-bg relative overflow-hidden bg-brand-cream">
      
      {/* Decorative Background Animations */}
      <div className="absolute top-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-brand-gold/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-brand-blue/5 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Our Promise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl text-brand-blue leading-tight mb-6"
          >
            Commitment to <span className="italic text-brand-gold">Employees</span>
          </motion.h2>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-brand-gold/30"></div>
            <p className="text-sm uppercase tracking-widest text-brand-gold font-bold">The Provider of Food Shall Be Happy</p>
            <div className="w-12 h-px bg-brand-gold/30"></div>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="space-y-12 lg:space-y-20">
          {EMPLOYEE_BENEFITS.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-500"
            >
              <div className="bg-brand-blue p-6 md:p-8 text-brand-cream relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-brand-gold rounded-2xl flex items-center justify-center text-brand-blue shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {getIcon(benefit.title)}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">{benefit.title}</h3>
                    <p className="text-brand-gold/80 text-sm uppercase tracking-widest mt-1 font-semibold">Core Benefit</p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-10 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  {/* English Items Only - Clean Single Column Layout */}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {benefit.items.map((item, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <ArrowRightCircle className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
                        <span className="text-brand-blue/80 text-base md:text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Cultural Badge */}
        <div className="mt-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-center bg-white/50 backdrop-blur-sm px-10 py-8 rounded-[2rem] border border-brand-gold/20 shadow-inner"
          >
            <div className="w-24 h-0.5 bg-brand-gold mx-auto mb-4"></div>
            <p className="text-brand-blue text-xl md:text-2xl font-display mb-2">Our staff are the soul of our organization</p>
            <p className="text-brand-gold uppercase tracking-widest text-[10px] font-bold opacity-70">Udupi Vrindavan Hospitality Group</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Commitment;