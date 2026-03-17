import React from 'react';
import { motion } from 'framer-motion';
// Importing the centralized steps data
import { FOOD_JOURNEY_STEPS } from '../data/siteConfig';

/**
 * Process Component
 * Renders the food journey steps using a data-driven approach.
 */
const Process = () => {
  return (
    <section className="py-32 bg-brand-cream relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
            The Journey
          </span>
          <h2 className="text-5xl md:text-6xl text-brand-blue">
            The Food <span className="italic text-brand-gold">You Eat</span>
          </h2>
        </div>

        {/* Grid Container: Mapped from siteConfig */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FOOD_JOURNEY_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }} // Staggered entry effect
              className="relative p-10 bg-white border-b-4 border-transparent hover:border-brand-gold transition-all duration-500 group shadow-sm hover:shadow-2xl"
              style={{ borderRadius: '0px 40px 0px 40px' }} // Custom leaf-style shape
            >
              {/* Large Background Watermark Number */}
              <div className="text-8xl font-display font-bold text-brand-gold/15 absolute top-2 right-6 group-hover:text-brand-gold/20 transition-colors">
                {step.id}
              </div>

              {/* Content Details */}
              <h4 className="text-2xl font-bold mb-4 text-brand-blue tracking-tight">
                {step.title}
              </h4>
              <p className="text-brand-blue/70 leading-relaxed italic">
                "{step.desc}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;