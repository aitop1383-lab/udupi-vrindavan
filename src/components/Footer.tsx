import React, { useRef, useEffect } from 'react';
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  SOCIAL_LINKS,
  NAV_LINKS,
  CONTACT_DETAILS,
} from '../data/siteConfig';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const renderSocialIcon = (
    social: (typeof SOCIAL_LINKS)[number],
    size: number
  ) =>
    social.isLucide
      ? React.createElement(social.icon as React.ElementType, { size })
      : <FontAwesomeIcon icon={social.icon as any} />;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA strip
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );

      // Grid columns stagger
      if (gridRef.current) {
        const cols = gridRef.current.children;

        gsap.fromTo(
          cols,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Bottom section
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 95%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-brand-blue text-brand-cream py-16 md:py-20"
    >
      {/* Background Glow Accent */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Premium CTA Strip */}
        <div
          ref={ctaRef}
          className="mb-20 p-8 md:p-10 rounded-[2.5rem] border border-brand-gold/20 bg-gradient-to-r from-brand-gold/5 via-brand-gold/10 to-brand-gold/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
          style={{ opacity: 0 }}
        >
          <div>
            <p className="text-brand-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-2">
              Always Pure. Always Fresh.
            </p>

            <h3 className="text-2xl md:text-3xl font-display text-brand-cream leading-tight">
              Taste Karnataka,{' '}
              <span className="italic text-brand-gold">
                from our kitchen.
              </span>
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            <a
              href="https://order.udupivrindavan.com/outlet/99670498269910"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-brand-gold text-brand-blue px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl hover:scale-105 duration-200"
            >
              Order Online
            </a>

            <a
              href={CONTACT_DETAILS.googleMapsDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border border-brand-gold/40 text-brand-cream px-6 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-gold/10 transition-all"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Main Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20 md:mb-24"
        >
          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14">
                <img
                  src="/logo.png"
                  alt="Udupi Vrindavan Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="font-display text-2xl md:text-3xl font-bold">
                Udupi{' '}
                <span className="text-brand-gold">
                  Vrindavan
                </span>
              </span>
            </div>

            <p className="opacity-70 text-base leading-relaxed mb-10 max-w-sm">
              Preserving the sacred role of food and provider of food since
              inception. Simple, pure vegetarian Karnataka food in Dubai.
            </p>

            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon
                  key={social.id}
                  link={social.href}
                  icon={renderSocialIcon(social, 18)}
                />
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-xl md:text-2xl mb-8 text-brand-gold">
              Quick Links
            </h4>

            <ul className="space-y-4 opacity-70 text-base">
              {NAV_LINKS.map((link, idx) => (
                <li key={idx}>
                  {link.href.startsWith('/') &&
                  !link.href.includes('#') ? (
                    <Link
                      to={link.href}
                      className="hover:text-brand-gold transition-colors flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-0 h-px bg-brand-gold group-hover:w-4 transition-all duration-300" />
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-brand-gold transition-colors flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-0 h-px bg-brand-gold group-hover:w-4 transition-all duration-300" />
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-xl md:text-2xl mb-8 text-brand-gold">
              Hours & Service
            </h4>

            <ul className="space-y-3 opacity-70 text-base">
              <li className="flex justify-between border-b border-brand-cream/10 pb-2">
                <span>Daily Opening</span>
                <span className="font-bold text-brand-gold">
                  7am - 11pm
                </span>
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
                <Clock size={16} />
                Breakfast starts 7am
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-xl md:text-2xl mb-8 text-brand-gold">
              Contact Info
            </h4>

            <ul className="space-y-5 opacity-70 text-base">
              <li className="flex gap-3 items-start">
                <MapPin
                  size={20}
                  className="text-brand-gold flex-shrink-0"
                />
                {CONTACT_DETAILS.address}
              </li>

              <li className="flex gap-3 items-start">
                <Phone
                  size={20}
                  className="text-brand-gold"
                />
                {CONTACT_DETAILS.phone}
              </li>

              <li className="flex gap-3 items-start">
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="text-[20px] text-brand-gold flex-shrink-0"
                />
                {CONTACT_DETAILS.whatsapp}
              </li>

              <li className="flex gap-3 items-start">
                <Mail
                  size={20}
                  className="text-brand-gold"
                />
                {CONTACT_DETAILS.email}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          ref={bottomRef}
          className="pt-10 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
          style={{ opacity: 0 }}
        >
          <p className="opacity-50 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Udupi Vrindavan Restaurant LLC.
          </p>

          <div className="flex flex-wrap justify-center gap-6 opacity-60 text-xs tracking-widest uppercase font-bold">
            <Link
              to="/privacy"
              className="hover:text-brand-gold transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              className="hover:text-brand-gold transition-colors"
            >
              Terms of Service
            </Link>

            <a
              href="/llms.txt"
              className="hover:text-brand-gold transition-colors"
            >
              llms.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<{
  link: string;
  icon: any;
}> = ({ link, icon }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open Udupi Vrindavan social profile"
    className="w-10 h-10 rounded-xl border border-brand-cream/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition transform hover:scale-110 duration-300"
  >
    {icon}
  </a>
);

export default Footer;