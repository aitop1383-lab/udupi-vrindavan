import React from 'react';
import { motion } from 'framer-motion';

/**
 * AboutUs Component
 * Features:
 * - Philosophy section with a traditional host image.
 * - Staggered quote grid featuring Sanskrit and Kannada verses.
 * - Hover lift animation on each quote card.
 * - Ornate CSS-based corner frame designs.
 */
const AboutUs = () => {
  const quotes = [
    {
      sanskrit: "अन्नेन जातानि जीवन्ति",
      kannada: "ಅನ್ನೇನ ಜಾತಾನಿ ಜೀವಂತಿ",
      transliteration: "Annena jaathani jivanthi",
      translation: "All living beings subsist on food",
    },
    {
      sanskrit: "शतं विहाय भोक्तव्यम्",
      kannada: "ಶತಂ ವಿಹಾಯ ಭೋಕ್ತವ್ಯಂ",
      transliteration: "Shatam Vihaya Bhoktavyam",
      translation: "Set aside a hundred other tasks when it is time for food",
    },
    {
      sanskrit: "आहारो महाभैषज्यम् उच्यते",
      kannada: "ಆಹಾರೋ ಮಹಾಭೈಷಜ್ಯಂ ಉಚ್ಯತೇ",
      transliteration: "Aaharo mahaabhaishajyam uchyathe",
      translation: "Healthy food is called the ultimate medicine",
    },
    {
      sanskrit: "यथा अन्नं तथा मनः",
      kannada: "ಯಥಾ ಅನ್ನಂ ತಥಾ ಮನಃ",
      transliteration: "Yatha annam tatha manah",
      translation: "Your thoughts are influenced by the food you consume",
    },
    {
      sanskrit: "आहारशुद्धौ सत्त्वशुद्धिः",
      kannada: "ಆಹಾರಶುದ್ಧೌ ಸತ್ತ್ವಶುದ್ಧಿಃ",
      transliteration: "Aharasuddhau, Sattva Suddhih",
      translation: "Purity of food leads to purity of mind",
    },
    {
      sanskrit: "क्षुत्स्वादुतां जनयति",
      kannada: "ಕ್ಷುತ್ಸ್ವಾದುತಾಂ ಜನಯತಿ",
      transliteration: "Kshutsvadutam Janayati",
      translation: "Hunger enhances the taste of food",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.93, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="about-us" className="py-32 texture-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Philosophy Section ── */}
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/host.jpeg"
                alt="Traditional Cooking"
                className="w-full h-[700px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-10 bg-brand-blue p-10 rounded-3xl shadow-2xl hidden lg:block z-20 border-4 border-brand-cream">
              <p className="text-brand-gold font-display italic text-3xl mb-3">"ಅನ್ನದಾತಾ ಸುಖೀಭವ"</p>
              <p className="text-brand-cream text-sm opacity-80 uppercase tracking-widest font-bold">
                May the provider of food always be happy
              </p>
            </div>

            {/* Decorative circle */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-brand-gold/20 rounded-full -z-10" />
          </motion.div>

          {/* Right: Philosophy Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Our Philosophy
            </span>
            <h2 className="text-5xl md:text-6xl mb-10 text-brand-blue leading-tight">
              The Heart of <br /><span className="italic text-brand-gold">Hospitality</span>
            </h2>

            {/* Pull Quote */}
            {/* <div className="mb-8 pl-6 border-l-4 border-brand-gold/40">
              <p className="text-2xl md:text-3xl font-display italic text-brand-blue/80 leading-snug">
                "Food is sacred — we treat it that way."
              </p>
            </div> */}

            <div className="space-y-6 text-brand-blue/60 text-lg leading-relaxed">
              <p>
                At Udupi Vrindavan, we believe that food is more than just sustenance; it is sacred. For example, we offer various portion sizes so that you only order based on how hungry you are. We only make those items that we know rather than trying to be everything to everyone. Just as you would not engage a plumber to wire your house, we do not cook North Indian or Chinese food because we can never make it as tasty as the cooks from those regions. You will easily recognise the taste!
              </p>
              <p>
                As owners, we eat the food at our restaurant and therefore do not adulterate it for taste. Therefore, you will not find colourings or preservatives in our restaurant. We do not reheat oil and do not freeze cooked food. We do not microwave food and where our customers don’t mind the use of baking soda - we clearly declare that in our menu (check out the pink page in our menu!) so that you aren’t surprised if you have a bloated stomach :) So, please visit our restaurant or order from our website. You will see our morals in action. We are a small restaurant but with ideals which we are sure, you will appreciate!!
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Ancient Wisdom Quote Grid ── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="mt-32 px-4 max-w-7xl mx-auto"
        >
          {/* Top Badge */}
          <div className="mb-16 w-full flex justify-center px-4">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="relative p-1 bg-white border-[3px] border-brand-blue/10 rounded-sm shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-brand-blue opacity-60 rounded-tl-sm" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-brand-blue opacity-60 rounded-tr-sm" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-brand-blue opacity-60 rounded-bl-sm" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-brand-blue opacity-60 rounded-br-sm" />
              <div className="border border-brand-blue/10 m-1.5 p-10 flex flex-col items-center text-center">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain mb-6 opacity-80" />
                <p className="text-4xl md:text-6xl font-display text-brand-gold italic mb-4 tracking-tight">
                  "ಅನ್ನಂ ಬ್ರಹ್ಮ"
                </p>
                <p className="text-sm md:text-base uppercase tracking-[0.5em] text-brand-blue/50 font-bold">
                  Food is manifestation of the Lord
                </p>
                <div className="mt-6 text-brand-blue/20 text-xs">⬥ ❦ ⬥</div>
              </div>
            </motion.div>
          </div>

          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="text-2xl md:text-3xl text-brand-blue"
            >
              Quality food is the{' '}
              <span className="text-brand-gold font-display">first line of</span> defence against ill health.
            </motion.h2>
            <motion.div
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              className="h-px w-24 bg-brand-gold/30 mx-auto mt-8 mb-6"
            />
            <p className="text-brand-blue/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Our ancestors knew the link between food and the mental state.
            </p>
          </div>

          {/* Quote Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {quotes.map((quote, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(15,47,74,0.12)' }}
                className="relative p-1 bg-white border-[3px] border-brand-blue/10 rounded-sm shadow-xl overflow-hidden cursor-default transition-shadow duration-300"
              >
                {/* Corner ornaments */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-brand-blue opacity-40 rounded-tl-sm" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-brand-blue opacity-40 rounded-tr-sm" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-brand-blue opacity-40 rounded-bl-sm" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-brand-blue opacity-40 rounded-br-sm" />

                <div className="border border-brand-blue/10 m-2 p-4 flex flex-col items-center text-center space-y-5">
                  <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain mb-2 opacity-90" />
                  <h3 className="text-brand-blue/50 text-[10px] font-bold tracking-[0.4em] uppercase">
                    UDUPI VRINDAVAN
                  </h3>
                  <p className="text-3xl md:text-4xl font-bold text-brand-blue leading-tight">
                    {quote.sanskrit}
                  </p>
                  <p className="text-xl font-normal text-brand-blue/90 font-display">
                    {quote.kannada}
                  </p>
                  <p className="text-base font-medium text-brand-blue/80 italic">
                    {quote.transliteration}
                  </p>
                  <div className="pt-6 border-t border-brand-blue/10 w-full">
                    <p className="text-lg text-brand-blue font-normal italic">
                      "{quote.translation}"
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-3 text-brand-blue/30">
                    <div className="h-px w-6 bg-brand-blue/20" />
                    <span className="text-sm">⬥</span>
                    <div className="h-px w-6 bg-brand-blue/20" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default AboutUs;