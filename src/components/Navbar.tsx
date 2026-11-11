import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type NavItem =
  | { name: string; href: string; dropdown?: undefined }
  | { name: string; href?: undefined; dropdown: { name: string; href: string }[] };

const groupedLinks: NavItem[] = [
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
];

const ORDER_LINK = "https://order.udupivrindavan.com";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileStoryOpen, setMobileStoryOpen] = useState(false);
  const location = useLocation();

  // Track page progress manually so lazily loaded pages (which start short) never report 0/0 as a full bar
  const scrollProgress = useMotionValue(0);
  const scaleX = useSpring(scrollProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.set(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [scrollProgress]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const solid = isScrolled || isMenuOpen || location.pathname !== '/';

  const isActive = (href: string): boolean => {
    const [path, hash] = href.split('#');
    const targetPath = path || '/';
    if (hash) return location.pathname === targetPath && location.hash === `#${hash}`;
    if (href === '/') return location.pathname === '/' && !location.hash;
    return location.pathname === href;
  };

  const isDropdownActive = (dropdown: { href: string }[]) => dropdown.some(item => isActive(item.href));

  const linkTone = solid ? 'text-brand-cream/85 hover:text-brand-gold' : 'text-brand-blue/80 hover:text-brand-blue';

  return (
    <>
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-brand-blue/95 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)] border-b border-brand-gold/15'
          : 'bg-transparent'
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 transition-all duration-500 ${solid ? 'h-[72px]' : 'h-[88px]'}`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Udupi Vrindavan home">
          <img
            src="/logo.png"
            alt="Udupi Vrindavan Logo"
            className="h-12 w-12 object-contain transition-transform duration-700 ease-out group-hover:rotate-[60deg]"
          />
          <span className={`font-display text-lg sm:text-xl font-bold tracking-tight transition-colors ${solid ? 'text-brand-cream' : 'text-brand-blue'}`}>
            Udupi Vrindavan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {groupedLinks.map((link) => {
            if (link.dropdown) {
              const active = isDropdownActive(link.dropdown);
              const open = activeDropdown === link.name;
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${linkTone} ${active ? (solid ? 'text-brand-gold' : 'text-brand-blue') : ''}`}
                    aria-expanded={open}
                    onClick={() => setActiveDropdown(open ? null : link.name)}
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                    {active && <motion.span layoutId="nav-indicator" className="absolute inset-x-4 -bottom-0.5 h-px bg-brand-gold" />}
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-brand-blue/10 bg-brand-ivory p-2 shadow-2xl shadow-brand-blue/20">
                          {link.dropdown.map((subLink, i) => {
                            const subActive = isActive(subLink.href);
                            return (
                              <Link
                                key={subLink.name}
                                to={subLink.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${
                                  subActive ? 'bg-brand-blue text-brand-cream' : 'text-brand-blue hover:bg-brand-sand/60'
                                }`}
                              >
                                <span className="font-medium">{subLink.name}</span>
                                <span className={`text-[10px] font-semibold tracking-widest ${subActive ? 'text-brand-gold' : 'text-brand-blue/30'}`}>
                                  0{i + 1}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${linkTone} ${active ? (solid ? 'text-brand-gold' : 'text-brand-blue') : ''}`}
              >
                {link.name}
                {active && <motion.span layoutId="nav-indicator" className="absolute inset-x-4 -bottom-0.5 h-px bg-brand-gold" />}
              </Link>
            );
          })}

          <a
            href={ORDER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="pulse-ring ml-4 inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-2.5 text-sm font-bold text-brand-blue transition-all hover:scale-105 hover:bg-white"
          >
            Order Now
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className={`lg:hidden flex h-11 w-11 items-center justify-center rounded-full border transition-colors cursor-pointer ${solid ? 'border-brand-gold/40 text-brand-gold' : 'border-brand-blue/15 bg-white/70 text-brand-blue'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold origin-left" style={{ scaleX }} />
    </nav>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-brand-blue border-t border-white/10"
            style={{ top: solid ? 72 : 88 }}
          >
            <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />
            <div className="relative flex min-h-full flex-col px-6 pb-10 pt-6">
              <div className="flex flex-col">
                {groupedLinks.map((link, i) => {
                  if (link.dropdown) {
                    const active = isDropdownActive(link.dropdown);
                    return (
                      <motion.div key={link.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }} className="border-b border-white/10">
                        <button
                          onClick={() => setMobileStoryOpen(!mobileStoryOpen)}
                          className={`flex w-full items-center justify-between py-4 text-left font-display text-2xl font-bold cursor-pointer ${active ? 'text-brand-gold' : 'text-brand-cream'}`}
                        >
                          <span>{link.name}</span>
                          <ChevronDown size={20} className={`transition-transform duration-300 ${mobileStoryOpen ? 'rotate-180 text-brand-gold' : 'text-brand-cream/50'}`} />
                        </button>
                        <AnimatePresence>
                          {mobileStoryOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mb-4 flex flex-col gap-1 border-l border-brand-gold/40 pl-4">
                                {link.dropdown.map(subLink => (
                                  <Link
                                    key={subLink.name}
                                    to={subLink.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`py-2 text-base transition-colors ${isActive(subLink.href) ? 'text-brand-gold font-semibold' : 'text-brand-cream/75 hover:text-brand-gold'}`}
                                  >
                                    {subLink.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }
                  const active = isActive(link.href);
                  return (
                    <motion.div key={link.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }} className="border-b border-white/10">
                      <Link
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-4 font-display text-2xl font-bold transition-colors ${active ? 'text-brand-gold' : 'text-brand-cream hover:text-brand-gold'}`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <a
                href={ORDER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="pulse-ring mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-4 text-base font-bold text-brand-blue"
              >
                Order Now
                <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Navbar;
