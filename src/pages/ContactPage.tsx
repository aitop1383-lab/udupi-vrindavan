import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/ui/PageHero';
import ReachUs from './ReachUs';
import { breadcrumbSchema, restaurantSchema } from '../data/seoSchemas';
import { CONTACT_DETAILS } from '../data/siteConfig';

const contactBreadcrumbSchema = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Contact Us', path: '/contact' }
]);

const ContactPage = () => {
  const facts = [
    { icon: MapPin, label: 'Address', value: 'FB04, WASL Opal, Street 26, Al Karama' },
    { icon: Clock, label: 'Hours', value: 'Open Daily: 7:00 AM – 11:00 PM' },
    { icon: Phone, label: 'Call Us', value: CONTACT_DETAILS.phone, href: `tel:${CONTACT_DETAILS.phone.replace(/\s+/g, '')}` },
    { icon: Mail, label: 'Email', value: CONTACT_DETAILS.email, href: `mailto:${CONTACT_DETAILS.email}` },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Seo
        title="Contact Us & Location | Udupi Vrindavan Restaurant Al Karama, Dubai"
        description="Get in touch with Udupi Vrindavan Restaurant in Al Karama, Dubai. View address in WASL Opal, phone number, WhatsApp, opening hours, and directions."
        canonicalPath="/contact"
        type="website"
        jsonLd={[contactBreadcrumbSchema, restaurantSchema]}
      />

      <PageHero
        eyebrow="Visit & Connect"
        title={<>Contact &amp; <span className="accent text-[1.1em]">Location</span></>}
        description="Located conveniently at WASL Opal in Al Karama, Dubai. Reach out to us for takeout, orders, customer assistance, or find directions to our restaurant."
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-4"
        >
          {facts.map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-gold">{label}</span>
                  <span className="block break-words text-sm leading-relaxed text-brand-cream/90">{value}</span>
                </span>
              </>
            );
            const cls = 'flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors';
            return href ? (
              <a key={label} href={href} className={`${cls} hover:border-brand-gold/40 hover:bg-white/10`}>{body}</a>
            ) : (
              <div key={label} className={cls}>{body}</div>
            );
          })}
        </motion.div>
      </PageHero>

      <ReachUs />
    </div>
  );
};

export default ContactPage;
