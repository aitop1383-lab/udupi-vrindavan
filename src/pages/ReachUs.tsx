import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
/** * Centralized data import:
 * Pulling social links, delivery partners, and contact details 
 * from the shared configuration file.
 */
import { SOCIAL_LINKS, DELIVERY_PARTNERS, CONTACT_DETAILS } from '../data/siteConfig';

const ReachUs = () => {
  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* --- LEFT SIDE: Content & Information --- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col gap-14"
          >
            {/* Header Section */}
            <div>
              <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                Connect
              </span>
              <h2 className="text-5xl md:text-6xl text-brand-blue font-display mb-12 leading-tight">
                Reach <span className="italic text-brand-gold">Us</span>
              </h2>

              {/* Contact Information Details */}
              <div className="space-y-10">
                {/* Physical Address */}
                <ContactItem 
                  icon={<MapPin size={20} />} 
                  title="Visit Us" 
                  desc={CONTACT_DETAILS.address} 
                />

                {/* Phone & Email Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  <ContactItem 
                    icon={<Phone size={20} />} 
                    title="Call Us" 
                    desc={CONTACT_DETAILS.phone} 
                  />
                  <ContactItem 
                    icon={<Mail size={20} />} 
                    title="Email Us" 
                    desc={CONTACT_DETAILS.email} 
                  />
                </div>

                {/* WhatsApp Call-to-Action Button */}
                <div className="pt-2">
                  <a 
                    href={CONTACT_DETAILS.whatsappLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-4 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#128C7E] transition-all shadow-lg hover:scale-[1.02]"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] uppercase tracking-widest opacity-80">WhatsApp Us</span>
                      <span className="text-lg">{CONTACT_DETAILS.whatsapp}</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* QR Code & Social Media Integration Box */}
            <div className="pt-10 border-t border-brand-blue/5">
              <div className="bg-brand-cream/20 p-8 md:p-10 rounded-[3.5rem] border-2 border-brand-gold/10 group hover:bg-white transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center gap-10">

                  {/* QR Code Illustration */}
                  <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl w-full max-w-[220px] group-hover:scale-105 transition-transform duration-700 text-center shrink-0">
                    <img src="/qrcode.png" alt="Official Website QR" className="w-full object-contain" />
                    <p className="text-[9px] font-black text-brand-blue uppercase tracking-[0.3em] mt-5 opacity-60">Official Website</p>
                  </div>

                  {/* Decorative Vertical Divider (Desktop Only) */}
                  <div className="hidden md:block w-px h-32 bg-brand-gold/20"></div>

                  {/* Social Media Links Section */}
                  <div className="flex flex-col items-center md:items-start gap-6">
                    <div>
                      <h4 className="font-display text-xl text-brand-blue mb-1">
                        Follow Our <span className="text-brand-gold italic">Journey</span>
                      </h4>
                      <p className="text-xs text-brand-blue/50 uppercase tracking-widest font-bold">Stay connected on social media</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {SOCIAL_LINKS.map((social) => (
                        <motion.a
                          key={social.id}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.15, y: -5 }}
                          className={`w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-brand-blue transition-all duration-300 ${social.hoverColor} hover:text-white border border-brand-blue/5`}
                        >
                          {/* Conditional rendering for Lucide or FontAwesome Icons */}
                          {social.isLucide ? <social.icon size={20} /> : <FontAwesomeIcon icon={social.icon} className="text-lg" />}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Partner Integration */}
            <div className="pt-10 border-t border-brand-blue/5">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.4em] text-brand-blue/40 mb-8 text-center md:text-left">
                Also Available On
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {DELIVERY_PARTNERS.map((app) => (
                  <motion.a 
                    key={app.name} 
                    href={app.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.07, y: -3 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="relative flex items-center justify-center h-20 rounded-2xl shadow-sm border border-brand-blue/5 overflow-hidden transition-all" 
                    style={{ backgroundColor: app.bgColor }}
                  >
                    <img src={app.logo} alt={app.name} className="max-h-10 object-contain" />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors"></div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: Interactive Map Display --- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative lg:sticky lg:top-32"
          >
            {/* Outer Decorative Border */}
            <div className="absolute -inset-4 border border-brand-gold/10 rounded-[4rem] pointer-events-none"></div>
            
            <div className="relative h-[600px] lg:h-[750px] bg-brand-cream/30 p-3 rounded-[3.5rem] shadow-2xl border border-brand-gold/20 overflow-hidden">
              {/* Google Maps Embed using Constant Link */}
              <iframe 
                title="Location Map" 
                src={CONTACT_DETAILS.googleMapsEmbed} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                className="rounded-[3rem]" 
              />
              
              {/* Floating "Open in Maps" Overlay Button */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <a 
                  href={CONTACT_DETAILS.googleMapsDirect} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-brand-blue text-white px-10 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:bg-brand-gold hover:scale-105 transition-all whitespace-nowrap"
                >
                  <MapPin size={18} /> Open in Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * Sub-component for individual contact details
 * Groups an icon and descriptive text with consistent hover animations.
 */
const ContactItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex gap-6 group">
    <div className="w-12 h-12 bg-brand-cream rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue transition-all duration-500 shadow-sm">
      <div className="text-brand-gold group-hover:text-white transition-colors">{icon}</div>
    </div>
    <div>
      <h4 className="font-bold text-lg text-brand-blue mb-1">{title}</h4>
      <p className="text-brand-blue/60 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default ReachUs;