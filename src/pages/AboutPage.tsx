import React from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import AboutUs from './AboutUs';
import Heritage from './Heritage';
import Commitment from './Commitment';
import { breadcrumbSchema, restaurantSchema } from '../data/seoSchemas';

const aboutBreadcrumbSchema = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' }
]);

const AboutPage = () => {
  return (
    <div className="pt-20 bg-brand-cream min-h-screen">
      <Seo
        title="About Us | Authentic South Indian Vegetarian Dining Philosophy in Dubai"
        description="Learn about Udupi Vrindavan's philosophy of pure Satvik food, authentic Karnataka culinary traditions, and ethical kitchen practices in Al Karama, Dubai."
        canonicalPath="/about"
        image="/host.jpeg"
        type="article"
        jsonLd={[aboutBreadcrumbSchema, restaurantSchema]}
      />

      {/* Hero Header */}
      <section className="relative py-16 md:py-24 bg-brand-blue text-brand-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10 texture-bg pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block"
          >
            Our Story &amp; Values
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-brand-cream mb-6 leading-tight"
          >
            Preserving Sacred <span className="text-brand-gold italic">Flavors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-cream/80 max-w-3xl mx-auto leading-relaxed font-light"
          >
            At Udupi Vrindavan, we believe that food is more than just sustenance; it is sacred. We bring authentic Karnataka and Udupi Satvik traditions to Dubai with pure ingredients, skilled Karnataka cooks, and a deep commitment to our patrons and team.
          </motion.p>
        </div>
      </section>

      {/* Core Sections */}
      <AboutUs />
      <Heritage />
      <Commitment />
    </div>
  );
};

export default AboutPage;
