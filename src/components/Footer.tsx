import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, NAV_LINKS, CONTACT_DETAILS } from '../data/siteConfig';
import Reveal from './ui/Reveal';

const HOURS = [
  { label: 'Online Orders', value: 'Until 10:30pm' },
  { label: 'Lunch Service', value: '11:30am - 3:30pm' },
  { label: 'Dinner Service', value: '7pm - 11pm' },
];

const Footer = () => {
  const renderSocialIcon = (social: (typeof SOCIAL_LINKS)[number], size: number) =>
    social.isLucide
      ? React.createElement(social.icon as React.ElementType, { size })
      : <FontAwesomeIcon icon={social.icon as any} />;

  const linkCls = 'group inline-flex items-center text-brand-cream/65 transition-colors hover:text-brand-gold';

  return (
    <footer className="relative overflow-hidden bg-brand-ink text-brand-cream">
      <div className="absolute inset-0 pattern-dots opacity-10 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 pt-16 md:pt-20 pb-10">
        {/* CTA Strip */}
        <Reveal className="relative mb-16 md:mb-20 overflow-hidden rounded-[2rem] bg-brand-blue p-8 md:p-12 ring-1 ring-brand-gold/25">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-brand-gold/20" />
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full border border-brand-gold/20" />
          <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div>
              <p className="eyebrow eyebrow-light justify-center lg:justify-start">Always Pure. Always Fresh.</p>
              <h3 className="mt-4 text-3xl md:text-4xl leading-tight text-brand-cream">
                Taste Karnataka,{' '}
                <span className="accent text-[1.12em]">from our kitchen.</span>
              </h3>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="https://order.udupivrindavan.com/outlet/99670498269910"
                target="_blank"
                rel="noopener noreferrer"
                className="pulse-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest text-brand-blue transition-all hover:scale-105 hover:bg-white"
              >
                Order Online <ArrowUpRight size={16} />
              </a>
              <a
                href={CONTACT_DETAILS.googleMapsDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-brand-gold/40 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-brand-cream transition-colors hover:bg-brand-gold/10"
              >
                Get Directions
              </a>
            </div>
          </div>
        </Reveal>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="mb-6 flex items-center gap-3">
              <img src="/logo.png" alt="Udupi Vrindavan Logo" loading="lazy" decoding="async" className="h-14 w-14 object-contain" />
              <span className="font-display text-2xl font-bold">
                Udupi <span className="text-brand-gold">Vrindavan</span>
              </span>
            </div>
            <p className="mb-8 max-w-sm text-base leading-relaxed text-brand-cream/65">
              Preserving the sacred role of food and provider of food since
              inception. Simple, pure vegetarian Karnataka food in Dubai.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open Udupi Vrindavan ${social.name} profile`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-cream/15 text-brand-cream/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold hover:bg-brand-gold hover:text-brand-blue"
                >
                  {renderSocialIcon(social, 17)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-lg text-brand-gold">Quick Links</h4>
            <ul className="space-y-3 text-[15px]">
              {NAV_LINKS.map((link, idx) => (
                <li key={idx}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link to={link.href} className={linkCls}>
                      <span className="h-px w-0 bg-brand-gold transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className={linkCls}>
                      <span className="h-px w-0 bg-brand-gold transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-lg text-brand-gold">Hours &amp; Service</h4>
            <div className="mb-5 rounded-2xl border border-brand-gold/25 bg-brand-gold/5 p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-brand-cream/75">Daily Opening</span>
                <span className="font-display text-lg font-bold text-brand-gold">7am - 11pm</span>
              </div>
            </div>
            <ul className="space-y-3 text-sm">
              {HOURS.map((h) => (
                <li key={h.label} className="flex justify-between gap-4 border-b border-brand-cream/10 pb-3 text-brand-cream/65">
                  <span>{h.label}</span>
                  <span className="text-right text-brand-cream/85">{h.value}</span>
                </li>
              ))}
              <li className="flex items-center gap-2 pt-2 text-xs uppercase tracking-wider text-brand-gold">
                <Clock size={15} />
                Breakfast starts 7am
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-lg text-brand-gold">Contact Info</h4>
            <ul className="space-y-4 text-[15px] text-brand-cream/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-brand-gold" />
                <span>{CONTACT_DETAILS.address}</span>
              </li>
              <li>
                <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`} className="flex items-start gap-3 transition-colors hover:text-brand-gold">
                  <Phone size={18} className="mt-0.5 flex-shrink-0 text-brand-gold" />
                  {CONTACT_DETAILS.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT_DETAILS.whatsappLink} target="_blank" rel="noreferrer" className="flex items-start gap-3 transition-colors hover:text-brand-gold">
                  <FontAwesomeIcon icon={faWhatsapp} className="mt-0.5 flex-shrink-0 text-lg text-brand-gold" />
                  {CONTACT_DETAILS.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="flex items-start gap-3 break-all transition-colors hover:text-brand-gold">
                  <Mail size={18} className="mt-0.5 flex-shrink-0 text-brand-gold" />
                  {CONTACT_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-brand-cream/10 pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs uppercase tracking-widest text-brand-cream/45">
            © {new Date().getFullYear()} Udupi Vrindavan Restaurant LLC.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-widest text-brand-cream/55">
            <Link to="/privacy" className="transition-colors hover:text-brand-gold">Privacy Policy</Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-brand-gold">Terms of Service</Link>
            <a href="/llms.txt" className="transition-colors hover:text-brand-gold">llms.txt</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
