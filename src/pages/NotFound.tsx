import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Compass, MapPin, FileText, ArrowLeft, BookOpen } from 'lucide-react';
import Seo from '../components/Seo';

const NotFound = () => {
  return (
    <div className="bg-brand-cream min-h-screen pt-28 pb-20 flex items-center justify-center relative overflow-hidden texture-bg">
      <Seo
        title="404 — Page Not Found | Udupi Vrindavan"
        description="The page you are looking for does not exist on Udupi Vrindavan. Explore our authentic South Indian vegetarian menu, visit guide, or contact details."
        noIndex
      />

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-brand-gold/20"
        >
          {/* Logo & 404 Header */}
          <div className="w-20 h-20 bg-brand-blue/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <img src="/logo.png" alt="Udupi Vrindavan Logo" className="w-12 h-12 object-contain" />
          </div>

          <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-xs mb-2 block">
            HTTP 404 Error
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-blue mb-4">
            Page Not Found
          </h1>
          <p className="text-brand-blue/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            The page you requested is not available. Please explore the verified links below to discover authentic South Indian flavors at Udupi Vrindavan.
          </p>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 text-left">
            <Link
              to="/"
              className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-blue/5 hover:border-brand-gold/40 hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-gold flex items-center justify-center shrink-0">
                  <Home size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-blue group-hover:text-brand-gold transition-colors">Homepage</h4>
                  <p className="text-[11px] text-brand-blue/50">Return to home</p>
                </div>
              </div>
            </Link>

            <Link
              to="/about"
              className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-blue/5 hover:border-brand-gold/40 hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-gold flex items-center justify-center shrink-0">
                  <Compass size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-blue group-hover:text-brand-gold transition-colors">About Us</h4>
                  <p className="text-[11px] text-brand-blue/50">Our culinary story</p>
                </div>
              </div>
            </Link>

            <Link
              to="/contact"
              className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-blue/5 hover:border-brand-gold/40 hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-gold flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-blue group-hover:text-brand-gold transition-colors">Contact Us</h4>
                  <p className="text-[11px] text-brand-blue/50">WASL Opal, Karama</p>
                </div>
              </div>
            </Link>

            <Link
              to="/visit-udupi"
              className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-blue/5 hover:border-brand-gold/40 hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-gold flex items-center justify-center shrink-0">
                  <Compass size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-blue group-hover:text-brand-gold transition-colors">Visit Udupi</h4>
                  <p className="text-[11px] text-brand-blue/50">Travel &amp; food guide</p>
                </div>
              </div>
            </Link>

            <Link
              to="/blog"
              className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-blue/5 hover:border-brand-gold/40 hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-gold flex items-center justify-center shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-blue group-hover:text-brand-gold transition-colors">Blog Journal</h4>
                  <p className="text-[11px] text-brand-blue/50">Food stories</p>
                </div>
              </div>
            </Link>

            <a
              href="/llms.txt"
              className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-blue/5 hover:border-brand-gold/40 hover:bg-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gold text-brand-blue flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-blue group-hover:text-brand-gold transition-colors">llms.txt</h4>
                  <p className="text-[11px] text-brand-blue/50">Agent instructions</p>
                </div>
              </div>
            </a>
          </div>

          {/* Action Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-brand-blue text-brand-cream px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-gold hover:text-brand-blue transition-all shadow-xl hover:scale-105"
          >
            <ArrowLeft size={18} /> Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
