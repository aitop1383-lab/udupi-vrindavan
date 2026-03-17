import React from 'react';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faWhatsapp, faXTwitter, faTripadvisor } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'; // Internal linking ke liye import kiya
// Importing centralized data from your new config file
import { SOCIAL_LINKS, NAV_LINKS, CONTACT_DETAILS } from '../data/siteConfig';

/**
 * Footer Component
 * A full-width responsive footer containing brand story, navigation links, 
 * operating hours, and contact details.
 */
const Footer = () => {

  return (
    <footer className="bg-brand-blue text-brand-cream pt-20 md:pt-32 pb-12 relative overflow-hidden">

      {/* --- Decorative Elements --- */}
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>

      {/* Background Glow Accent */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- Main Grid Structure --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20 md:mb-24">

          {/* Column 1: Brand Identity & Social Icons */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14">
                <img src="/logo.png" alt="Udupi Vrindavan Logo" />
              </div>
              <span className="font-display text-2xl md:text-3xl font-bold">
                Udupi <span className="text-brand-gold">Vrindavan</span>
              </span>
            </div>

            <p className="opacity-70 text-base leading-relaxed mb-10 max-w-sm">
              Preserving the sacred role of food
              and provider of food since
              inception. Simple, pure vegetarian
              Karnataka food in Dubai.            
            </p>

            {/* Social Media Links (Mapped from siteConfig) */}
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon
                  key={social.id}
                  link={social.href}
                  icon={social.isLucide ? <social.icon size={18} /> : <FontAwesomeIcon icon={social.icon} />}
                />
              ))}
            </div>
          </div>


          {/* Column 2: Quick Navigation Links */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-xl md:text-2xl mb-8 text-brand-gold">
              Quick Links
            </h4>
            <ul className="space-y-4 opacity-70 text-base">
              {NAV_LINKS.map((link, idx) => (
                <li key={idx}>
                  {/* Internal Link logic for SPA navigation */}
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link
                      to={link.href}
                      className="hover:text-brand-gold transition-colors flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-0 h-px bg-brand-gold group-hover:w-4 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-brand-gold transition-colors flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-0 h-px bg-brand-gold group-hover:w-4 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>


          {/* Column 3: Operating Hours */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-xl md:text-2xl mb-8 text-brand-gold">
              Hours & Service
            </h4>
            <ul className="space-y-3 opacity-70 text-base">
              <li className="flex justify-between border-b border-brand-cream/10 pb-2">
                <span>Daily Opening</span>
                <span className="font-bold text-brand-gold">7am - 11pm</span>
              </li>
              <li className="flex justify-between border-b border-brand-cream/10 pb-2 text-sm">
                <span>Online Orders</span>
                <span>Until 10:30pm</span>
              </li>
              <li className="flex justify-between border-b border-brand-cream/10 pb-2 text-sm">
                <span>Lunch Service</span>
                <span>11:30am - 3:30pm</span>
              </li>
              <li className="flex justify-between border-b border-brand-cream/10 pb-2 text-sm">
                <span>Dinner Service</span>
                <span>7pm - 11pm</span>
              </li>
              <li className="flex items-center gap-2 mt-4 text-brand-gold text-xs uppercase">
                <Clock size={16} /> Breakfast starts 7am
              </li>
            </ul>
          </div>


          {/* Column 4: Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-xl md:text-2xl mb-8 text-brand-gold">
              Contact Info
            </h4>
            <ul className="space-y-5 opacity-70 text-base">
              <li className="flex gap-3 items-start">
                <MapPin size={30} className="text-brand-gold flex-shrink-0" />
                {CONTACT_DETAILS.address}
              </li>
              <li className="flex gap-3 items-start">
                <Phone size={20} className="text-brand-gold" />
                {CONTACT_DETAILS.phone}
              </li>
              <li className="flex gap-3 items-start">
                <FontAwesomeIcon icon={faWhatsapp} className="text-[20px] text-brand-gold flex-shrink-0" />
                {CONTACT_DETAILS.whatsapp}
              </li>
              <li className="flex gap-3 items-start">
                <Mail size={20} className="text-brand-gold" />
                {CONTACT_DETAILS.email}
              </li>
            </ul>
          </div>

        </div>


        {/* --- Bottom Section: Legal & Copyright --- */}
        <div className="pt-10 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="opacity-50 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Udupi Vrindavan Restaurant LLC.
          </p>

          <div className="flex gap-8 opacity-50 text-xs tracking-widest uppercase font-bold">
            {/* LINK UPDATED: Pointing to Privacy Policy Page */}
            <Link to="/privacy-policy" className="hover:text-brand-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-brand-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>


        {/* --- Back to Top Button --- */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center text-brand-blue shadow-xl z-50 hover:scale-110 transition-transform"
        >
          <ChevronRight className="-rotate-90" size={24} />
        </button>

      </div>
    </footer>
  );
};

/**
 * SocialIcon Sub-component
 */
const SocialIcon = ({ link, icon }: { link: string; icon: React.ReactNode }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-xl border border-brand-cream/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition"
  >
    {icon}
  </a>
);

export default Footer;