import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Seo from '../components/Seo';
import ReachUs from './ReachUs';
import { breadcrumbSchema, restaurantSchema } from '../data/seoSchemas';
import { CONTACT_DETAILS } from '../data/siteConfig';

const contactBreadcrumbSchema = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Contact Us', path: '/contact' }
]);

const ContactPage = () => {
  return (
    <div className="pt-20 bg-white min-h-screen">
      <Seo
        title="Contact Us & Location | Udupi Vrindavan Restaurant Al Karama, Dubai"
        description="Get in touch with Udupi Vrindavan Restaurant in Al Karama, Dubai. View address in WASL Opal, phone number, WhatsApp, opening hours, and directions."
        canonicalPath="/contact"
        type="website"
        jsonLd={[contactBreadcrumbSchema, restaurantSchema]}
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
            Visit &amp; Connect
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-brand-cream mb-6 leading-tight"
          >
            Contact &amp; <span className="text-brand-gold italic">Location</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-cream/80 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Located conveniently at WASL Opal in Al Karama, Dubai. Reach out to us for takeout, orders, customer assistance, or find directions to our restaurant.
          </motion.p>

          {/* Quick Facts Strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-start gap-3.5">
              <MapPin className="text-brand-gold shrink-0 mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-1">Address</p>
                <p className="text-xs leading-relaxed text-brand-cream/90">FB04, WASL Opal, Street 26, Al Karama</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-start gap-3.5">
              <Clock className="text-brand-gold shrink-0 mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-1">Hours</p>
                <p className="text-xs leading-relaxed text-brand-cream/90">Open Daily: 7:00 AM – 11:00 PM</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-start gap-3.5">
              <Phone className="text-brand-gold shrink-0 mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-1">Call Us</p>
                <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`} className="text-xs leading-relaxed text-brand-cream/90 hover:text-brand-gold block">
                  {CONTACT_DETAILS.phone}
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-start gap-3.5">
              <Mail className="text-brand-gold shrink-0 mt-1" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-1">Email</p>
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-xs leading-relaxed text-brand-cream/90 hover:text-brand-gold block truncate">
                  {CONTACT_DETAILS.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main ReachUs Section */}
      <ReachUs />
    </div>
  );
};

export default ContactPage;
