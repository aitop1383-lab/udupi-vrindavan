import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { SOCIAL_LINKS, DELIVERY_PARTNERS, CONTACT_DETAILS } from '../data/siteConfig';
import Reveal, { ImageReveal } from '../components/ui/Reveal';

const ReachUs = () => {
  const renderSocialIcon = (social: (typeof SOCIAL_LINKS)[number]) =>
    social.isLucide
      ? React.createElement(social.icon as React.ElementType, { size: 18 })
      : <FontAwesomeIcon icon={social.icon as any} className="text-base" />;

  return (
    <section id="contact-us" className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <Reveal x={-30} y={0} className="flex flex-col gap-12">
            <div>
              <span className="eyebrow">Connect</span>
              <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-brand-blue">
                Reach <span className="accent text-[1.12em]">Us</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-brand-blue/65">
                Visit Udupi Vrindavan in Al Karama, Dubai for authentic Udupi and South Indian vegetarian food, or contact us for menu, ordering, WhatsApp, call, and directions.
              </p>

              <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-brand-blue/10 bg-brand-ivory">
                <ContactItem icon={<MapPin size={18} />} title="Visit Us" desc={CONTACT_DETAILS.address} href={CONTACT_DETAILS.googleMapsDirect} />
                <div className="border-t border-brand-blue/10">
                  <ContactItem icon={<Phone size={18} />} title="Call Us" desc={CONTACT_DETAILS.phone} href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}`} />
                </div>
                <div className="border-t border-brand-blue/10">
                  <ContactItem icon={<Mail size={18} />} title="Email Us" desc={CONTACT_DETAILS.email} href={`mailto:${CONTACT_DETAILS.email}`} />
                </div>
              </div>

              <a
                href={CONTACT_DETAILS.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-4 rounded-2xl bg-[#25D366] px-7 py-4 font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1EBE5B]"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] uppercase tracking-widest opacity-85">WhatsApp Us</span>
                  <span className="text-lg">{CONTACT_DETAILS.whatsapp}</span>
                </span>
              </a>
            </div>

            {/* QR & Social */}
            <div className="group/qr flex flex-col items-center gap-8 rounded-[2.5rem] border-2 border-brand-gold/10 bg-brand-cream/20 p-7 sm:p-9 transition-all duration-500 hover:bg-white hover:border-brand-gold/25 hover:shadow-xl sm:flex-row">
              <div className="w-44 shrink-0 rounded-[2rem] bg-white p-5 text-center shadow-2xl transition-transform duration-700 group-hover/qr:scale-105">
                <img src="/qrcode.png" alt="QR code for the official Udupi Vrindavan website" className="w-full object-contain" />
                <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.25em] text-brand-blue/60">Official Website</p>
              </div>
              <div className="hidden sm:block h-32 w-px shrink-0 bg-brand-gold/20" />
              <div className="flex flex-col items-center gap-5 sm:items-start">
                <div className="text-center sm:text-left">
                  <h4 className="text-xl text-brand-blue">
                    Follow Our <span className="accent text-[1.15em]">Journey</span>
                  </h4>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-brand-blue/50">Stay connected on social media</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-blue/5 bg-white text-brand-blue shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-white ${social.hoverColor}`}
                    >
                      {renderSocialIcon(social)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Partners */}
            <div>
              <h4 className="mb-6 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-blue/45 sm:text-left">
                Also Available On
              </h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {DELIVERY_PARTNERS.map((app) => (
                  <a
                    key={app.name}
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={app.name}
                    className="flex h-20 items-center justify-center rounded-2xl ring-1 ring-brand-blue/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{ backgroundColor: app.bgColor }}
                  >
                    <img src={app.logo} alt={`${app.name} delivery partner logo`} className="max-h-10 max-w-[70%] object-contain" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* RIGHT: Map */}
          <div className="relative lg:sticky lg:top-28">
            <ImageReveal from="right" className="relative h-[460px] sm:h-[560px] lg:h-[720px] overflow-hidden rounded-[2rem] bg-brand-cream p-2 shadow-2xl shadow-brand-blue/15 ring-1 ring-brand-gold/25">
              <iframe
                title="Location Map"
                src={CONTACT_DETAILS.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-[1.6rem]"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <a
                  href={CONTACT_DETAILS.googleMapsDirect}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 whitespace-nowrap rounded-full bg-brand-blue px-8 py-4 font-semibold text-brand-cream shadow-2xl transition-all hover:bg-brand-gold hover:text-brand-blue"
                >
                  <MapPin size={18} /> Open in Maps
                </a>
              </div>
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, title, desc, href }: { icon: React.ReactNode; title: string; desc: string; href?: string }) => (
  <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex gap-4 p-6 transition-colors hover:bg-white">
    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-bronze transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-brand-gold">
      {icon}
    </span>
    <span className="min-w-0">
      <span className="mb-1 block font-display text-base font-bold text-brand-blue">{title}</span>
      <span className="block break-words text-sm leading-relaxed text-brand-blue/65">{desc}</span>
    </span>
  </a>
);

export default ReachUs;
