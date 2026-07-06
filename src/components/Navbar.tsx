import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar Component
 * - Groups Brand History/Story pages under a clean dropdown.
 * - Active state checks both pathname AND hash.
 * - Animated mobile drawer and accordion submenu with AnimatePresence.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileStoryOpen, setMobileStoryOpen] = useState(false);
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const dropdownTextHover = isScrolled || location.pathname !== '/'
    ? 'hover:bg-white/5 hover:text-brand-gold'
    : 'hover:bg-brand-blue/5 hover:text-brand-blue';

  const dropdownBg = isScrolled || location.pathname !== '/'
    ? 'bg-brand-blue border-white/10'
    : 'bg-white border-brand-blue/10';

  const subtextColor = isScrolled || location.pathname !== '/'
    ? 'text-brand-cream'
    : 'text-brand-blue';

  // Group the navigation links for a cleaner look
  const groupedLinks = [
    { name: "Home", href: "/" },
    {
      name: "Our Story",
      dropdown: [
        { name: "About Us", href: "/#about-us" },
        { name: "Heritage", href: "/#heritage" },
        { name: "Signature Menu", href: "/#menu" },
        { name: "Our Commitment", href: "/#our-commitment" },
        { name: "Testimonials", href: "/#testimonials" }
      ]
    },
    { name: "Visit Udupi", href: "/visit-udupi" },
    { name: "Blog", href: "/blog" },

    { name: "Contact Us", href: "/#contact-us" },
    { name: "Order Online", href: "https://order.udupivrindavan.com" }
  ];

  const isActive = (href: string): boolean => {
    const [path, hash] = href.split('#');
    const targetPath = path || '/';

    if (hash) {
      return location.pathname === targetPath && location.hash === `#${hash}`;
    }

    if (href === '/') {
      return location.pathname === '/' && !location.hash;
    }

    return location.pathname === href;
  };

  const isDropdownActive = (dropdown: { href: string }[]): boolean => {
    return dropdown.some(item => isActive(item.href));
  };

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
          {groupedLinks.map((link) => {
            // "Order Online" renders as a special CTA button
            if (link.name === 'Order Online') {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-gold text-brand-blue px-6 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-brand-blue transition-all shadow-lg hover:scale-105"
                >
                  Order Now
                </a>
              );
            }

            // Group Dropdown Render
            if (link.dropdown) {
              const active = isDropdownActive(link.dropdown);
              const btnClass = `relative text-sm font-medium tracking-wide transition-colors hover:text-brand-gold flex items-center gap-1 cursor-pointer py-1.5 ${textColor}`;

              return (
                <div
                  key={link.name}
                  className="relative group/menu py-1.5"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className={btnClass}>
                    {link.name}
                    <ChevronDown size={13} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-brand-gold rounded-full"
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-44 border rounded-2xl p-2 shadow-2xl flex flex-col gap-1 z-50 backdrop-blur-md ${dropdownBg}`}
                      >
                        {link.dropdown.map(subLink => {
                          const subActive = isActive(subLink.href);
                          return (
                            <Link
                              key={subLink.name}
                              to={subLink.href}
                              onClick={() => setActiveDropdown(null)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${subActive
                                ? 'bg-brand-gold text-brand-blue shadow-sm'
                                : `${subtextColor} ${dropdownTextHover}`
                                }`}
                            >
                              {subLink.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const active = isActive(link.href);
            const linkClass = `relative text-sm font-medium tracking-wide transition-colors hover:text-brand-gold py-1.5 ${textColor}`;

            return isRouterLink(link.href) ? (
              <Link key={link.name} to={link.href} className={linkClass}>
                {link.name}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-brand-gold rounded-full"
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
        <button className="md:hidden text-brand-gold cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              {groupedLinks.map((link) => {
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

                // Mobile accordion grouping
                if (link.dropdown) {
                  const active = isDropdownActive(link.dropdown);
                  return (
                    <div key={link.name} className="flex flex-col">
                      <button
                        onClick={() => setMobileStoryOpen(!mobileStoryOpen)}
                        className={`text-lg font-medium py-2 border-b border-white/5 flex items-center justify-between cursor-pointer w-full text-left ${active ? 'text-brand-gold' : 'text-brand-cream'
                          }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={18} className={`transition-transform duration-300 ${mobileStoryOpen ? 'rotate-180 text-brand-gold' : 'text-brand-cream/50'}`} />
                      </button>
                      <AnimatePresence>
                        {mobileStoryOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col pl-4 bg-brand-blue/30 rounded-xl mt-1.5 border border-white/5"
                          >
                            {link.dropdown.map(subLink => {
                              const subActive = isActive(subLink.href);
                              return (
                                <Link
                                  key={subLink.name}
                                  to={subLink.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className={`text-base font-medium py-2.5 border-b border-white/5 last:border-0 transition-colors ${subActive ? 'text-brand-gold font-bold' : 'text-brand-cream/80 hover:text-brand-gold'
                                    }`}
                                >
                                  {subLink.name}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const active = isActive(link.href);
                const mobileClass = `text-lg font-medium py-2 border-b border-white/5 transition-colors ${active ? 'text-brand-gold font-bold' : 'text-brand-cream'
                  }`;

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
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-gold origin-left z-50"
        style={{ scaleX }}
      />
    </nav>
  );
};

export default Navbar;