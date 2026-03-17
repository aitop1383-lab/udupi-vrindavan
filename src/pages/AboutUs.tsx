import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ChevronRight } from 'lucide-react';

/**
 * AboutUs Component
 * * Features:
 * - Philosophy section with a traditional host image.
 * - Staggered quote grid featuring Sanskrit and Kannada verses.
 * - Ornate CSS-based frame designs for the quote cards.
 */
const AboutUs = () => {
  // --- Data: Ancient Wisdom Quotes ---
  // A collection of verses from ancient scriptures regarding food and health.
  const quotes = [
    {
      "sanskrit": "अन्नेन जातानि जीवन्ति",
      "kannada": "ಅನ್ನೇನ ಜಾತಾನಿ ಜೀವಂತಿ",
      "transliteration": "Annena jaathani jivanthi",
      "translation": "All living beings subsist on food",
    },
    {
      "sanskrit": "शतं विहाय भोक्तव्यम्",
      "kannada": "ಶತಂ ವಿಹಾಯ ಭೋಕ್ತವ್ಯಂ",
      "transliteration": "Shatam Vihaya Bhoktavyam",
      "translation": "Set aside a hundred other tasks when it is time for food",
    },
    {
      "sanskrit": "आहारो महाभैषज्यम् उच्यते",
      "kannada": "ಆಹಾರೋ ಮಹಾಭೈಷಜ್ಯಂ ಉಚ್ಯತೇ",
      "transliteration": "Aaharo mahaabhaishajyam uchyathe",
      "translation": "Healthy food is called the ultimate medicine",
    },
    {
      "sanskrit": "यथा अन्नं तथा मनः",
      "kannada": "ಯಥಾ ಅನ್ನಂ ತಥಾ ಮನಃ",
      "transliteration": "Yatha annam tatha manah",
      "translation": "Your thoughts are influenced by the food you consume",
    },
    {
      "sanskrit": "आहारशुद्धौ सत्त्वशुद्धिः",
      "kannada": "ಆಹಾರಶುದ್ಧೌ ಸತ್ತ್ವಶುದ್ಧಿಃ",
      "transliteration": "Aharasuddhau, Sattva Suddhih",
      "translation": "Purity of food leads to purity of mind",
    },
    {
      "sanskrit": "क्षुत्स्वादुतां जनयति",
      "kannada": "ಕ್ಷುತ್ಸ್ವಾದುತಾಂ ಜನಯತಿ",
      "transliteration": "Kshutsvadutam Janayati",
      "translation": "Hunger enhances the taste of food",
    }
  ];

  return (
    <section id="about" className="py-32 texture-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Top Section: Image and Story --- */}
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Traditional Imagery */}
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
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Badge (Desktop Only) */}
            <div className="absolute -bottom-10 -right-10 bg-brand-blue p-10 rounded-3xl shadow-2xl hidden lg:block z-20 border-4 border-brand-cream">
              <p className="text-brand-gold font-display italic text-3xl mb-3">"ಅನ್ನದಾತಾ ಸುಖೀಭವ"</p>
              <p className="text-brand-cream text-sm opacity-80 uppercase tracking-widest font-bold">
                May the provider of food always be happy
              </p>
            </div>
            {/* Decorative circle ornament */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-brand-gold/20 rounded-full -z-10"></div>
          </motion.div>

          {/* Right Side: Philosophy Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Philosophy</span>
            <h2 className="text-5xl md:text-6xl mb-10 text-brand-blue leading-tight">
              The Heart of <br /><span className="italic text-brand-gold">Hospitality</span>
            </h2>
            <div className="space-y-8 text-brand-blue/80 text-lg leading-relaxed">
              <p>
                At Udupi Vrindavan, we believe that food is more than just sustenance; it is a sacred offering. Our journey began with a simple mission: to bring the authentic flavors of Udupi to your table with uncompromising purity.
              </p>
              <p>
                Inspired by the ancient traditions of the Udupi Krishna Temple, our recipes have been passed down through generations, preserving the essence of South Indian vegetarian cuisine while embracing modern elegance.
              </p>
            </div>
          </motion.div>
        </div>

        {/* --- Bottom Section: Ancient Wisdom Quote Grid --- */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 } // Cards appear one after another
            }
          }}
          className="mt-32 px-4 max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.span
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="text-brand-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block"
            >
              Ancient Wisdom
            </motion.span>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="text-2xl md:text-3xl text-brand-blue"
            >
              Quality food is the <span className="text-brand-gold font-display">first line of</span> health defence
            </motion.h2>
            <motion.div
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              className="h-px w-24 bg-brand-gold/30 mx-auto mt-8 mb-6"
            />
            <p className="text-brand-blue/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore the sacred verses that bridge the gap between nutrition and spirituality.
            </p>
          </div>

          {/* Grid of Ornate Quote Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {quotes.map((quote, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  show: { opacity: 1, scale: 1 }
                }}
                className="relative p-1 bg-white border-[3px] border-brand-blue/10 rounded-sm shadow-xl overflow-hidden"
              >
                {/* CSS Corner Ornaments: Styled to look like a traditional photo frame */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-brand-blue opacity-40 rounded-tl-sm" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-brand-blue opacity-40 rounded-tr-sm" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-brand-blue opacity-40 rounded-bl-sm" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-brand-blue opacity-40 rounded-br-sm" />

                {/* Card Inner Content Container */}
                <div className="border border-brand-blue/10 m-2 p-4 flex flex-col items-center text-center space-y-5">
                  <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain mb-2 opacity-90" />

                  <h3 className="text-brand-blue/50 text-[10px] font-bold tracking-[0.4em] uppercase">
                    {quote.source || "UDUPI VRINDAVAN"}
                  </h3>

                  {/* Sanskrit and Kannada Script */}
                  <p className="text-2xl md:text-3xl font-bold text-brand-blue leading-tight">
                    {quote.sanskrit}
                  </p>
                  <p className="text-2xl font-bold text-brand-blue/90 font-display">
                    {quote.kannada}
                  </p>

                  {/* Phonetic Transliteration */}
                  <p className="text-lg font-medium text-brand-blue/80 italic">
                    {quote.transliteration}
                  </p>

                  {/* English Translation Section */}
                  <div className="pt-6 border-t border-brand-blue/10 w-full">
                    <p className="text-2xl text-brand-blue font-semibold italic">
                      {quote.translation}
                    </p>
                  </div>

                  {/* Decorative Footer Ornament */}
                  <div className="pt-4 flex items-center gap-3 text-brand-blue/30">
                    <div className="h-px w-6 bg-brand-blue/20"></div>
                    <span className="text-sm">⬥</span>
                    <div className="h-px w-6 bg-brand-blue/20"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- Final Calligraphic Badge: Food is Divine --- */}
          <div className="mt-24 w-full flex justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative p-1 bg-white border-[3px] border-brand-blue/10 rounded-sm shadow-2xl max-w-lg w-full overflow-hidden"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-brand-blue opacity-60 rounded-tl-sm" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-brand-blue opacity-60 rounded-tr-sm" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-brand-blue opacity-60 rounded-bl-sm" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-brand-blue opacity-60 rounded-br-sm" />

              <div className="border border-brand-blue/10 m-1.5 p-10 flex flex-col items-center text-center">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain mb-6 opacity-80" />

                <div className="relative inline-flex flex-col items-center">
                  <p className="text-4xl md:text-6xl font-display text-brand-gold italic mb-4 tracking-tight">
                    "ಅನ್ನಂ ಬ್ರಹ್ಮ"
                  </p>

                  {/* Decorative Gradient Divider */}
                  <div className="flex items-center gap-6 w-full px-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-brand-blue/30"></div>
                    <p className="text-[11px] uppercase tracking-[0.5em] text-brand-blue/50 whitespace-nowrap font-bold">
                      Food is Divine
                    </p>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-brand-blue/30"></div>
                  </div>
                </div>

                <div className="mt-6 text-brand-blue/20 text-xs">⬥ ❦ ⬥</div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default AboutUs;