import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data/siteConfig';

/**
 * Navbar Component
 * Features: Responsive design, scroll-triggered background changes, 
 * and data-driven navigation links from siteConfig.
 */
const Navbar = () => {
  // --- States ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // --- Side Effects ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Dynamic Styling Logic ---
  const navbarBg = isScrolled || location.pathname !== '/' 
    ? 'bg-brand-blue py-4 shadow-lg' 
    : 'bg-transparent py-6';

  const textColor = isScrolled || location.pathname !== '/' 
    ? 'text-brand-cream' 
    : 'text-brand-blue';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Udupi Vrindavan Logo" className="w-full h-full object-contain" />
          </div>
          <span className={`font-bold text-xl md:text-2xl tracking-tight transition-colors ${textColor}`}>
            Udupi Vrindavan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            // Logic: Render "Order Online" link as a styled button
            if (link.name === "Order Online") {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-gold text-brand-blue px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-all"
                >
                  Order Now
                </a>
              );
            }

            // Normal links: SPA Link vs Hash Anchor
            return link.href.startsWith('/') && !link.href.includes('#') ? (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-brand-gold ${textColor}`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-brand-gold ${textColor}`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-brand-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-blue absolute top-full left-0 w-full p-6 shadow-xl border-t border-white/10"
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
               link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-brand-cream text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={link.name === "Order Online" ? "text-brand-gold text-lg font-bold" : "text-brand-cream text-lg font-medium"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name === "Order Online" ? "Order Now" : link.name}
                </a>
              )
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;