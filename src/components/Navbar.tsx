import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data/siteConfig';

/**
 * Navbar Component
 * - Hash links (e.g. /#about) use plain <a> so the browser scrolls smoothly to the section.
 * - Active state checks both pathname AND hash so section links highlight correctly.
 * - Animated mobile drawer with AnimatePresence.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarBg = isScrolled || location.pathname !== '/'
    ? 'bg-brand-blue py-4 shadow-lg'
    : 'bg-transparent py-6';

  const textColor = isScrolled || location.pathname !== '/'
    ? 'text-brand-cream'
    : 'text-brand-blue';

  /**
   * Determine whether a nav link is "active":
   * - For plain routes ("/", "/visit-udupi"): match pathname exactly.
   * - For hash links ("/#about"): match pathname "/" AND location.hash.
   */
  const isActive = (href: string): boolean => {
    const [path, hash] = href.split('#');
    const targetPath = path || '/';

    if (hash) {
      // Hash link is active ONLY if both pathname and hash match
      return location.pathname === targetPath && location.hash === `#${hash}`;
    }

    // For the root home link "/", only show as active if there's no hash
    if (href === '/') {
      return location.pathname === '/' && !location.hash;
    }

    // For other links like "/blog", standard pathname match
    return location.pathname === href;
  };

  /**
   * Decide whether a link should be a React Router <Link> or a plain <a>.
   * Hash links must be plain <a> so the browser handles smooth scroll to the anchor.
   * External links are always plain <a>.
   */
  const isRouterLink = (href: string): boolean =>
    href.startsWith('/') && !href.startsWith('http');

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
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
            // "Order Online" renders as a special CTA button
            if (link.name === 'Order Online') {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-gold text-brand-blue px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-all shadow-lg hover:scale-105"
                >
                  Order Now
                </a>
              );
            }

            const active = isActive(link.href);
            const linkClass = `relative text-sm font-medium tracking-wide transition-colors hover:text-brand-gold ${textColor}`;

            return isRouterLink(link.href) ? (
              <Link key={link.name} to={link.href} className={linkClass}>
                {link.name}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold rounded-full"
                  />
                )}
              </Link>
            ) : (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-brand-blue border-t border-white/10"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                const mobileClass = `text-lg font-medium py-2 border-b border-white/5 transition-colors ${
                  active ? 'text-brand-gold' : 'text-brand-cream'
                }`;

                if (link.name === 'Order Online') {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-gold text-lg font-bold py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Order Now
                    </a>
                  );
                }

                return isRouterLink(link.href) ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={mobileClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mobileClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;