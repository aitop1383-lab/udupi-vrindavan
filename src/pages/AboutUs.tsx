import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal, { ImageReveal } from '../components/ui/Reveal';

const ABOUT_IMAGES = [
  "/aboutUs/1.jpeg",
  "/aboutUs/2.jpeg",
  "/aboutUs/3.jpeg",
  "/aboutUs/4.jpeg",
];

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

const AboutUs = () => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about-us" className="relative overflow-hidden bg-brand-ivory py-20 lg:py-32">
      <div className="absolute inset-0 texture-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* ── Philosophy ── */}
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <Reveal x={-30} y={0} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <ImageReveal from="left" className="relative overflow-hidden rounded-[2.5rem] bg-brand-sand shadow-2xl shadow-brand-blue/20 aspect-[4/5]">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImgIdx}
                  src={ABOUT_IMAGES[currentImgIdx]}
                  alt={`Traditional South Indian dining at Udupi Vrindavan - ${currentImgIdx + 1}`}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { opacity: { duration: 1.2, ease: "easeInOut" }, scale: { duration: 5, ease: "linear" } }
                  }}
                  exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-ink/60 to-transparent" />
              <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {ABOUT_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImgIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${currentImgIdx === i ? 'w-8 bg-brand-gold' : 'w-2 bg-white/60 hover:bg-white'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </ImageReveal>

            {/* Floating quote card */}
            <div className="relative z-20 mx-4 -mt-14 rounded-3xl border border-brand-gold/30 bg-brand-blue p-6 text-center shadow-2xl sm:mx-10 sm:p-8 lg:absolute lg:-bottom-10 lg:-right-10 lg:mx-0 lg:mt-0 lg:max-w-xs lg:text-left">
              <p className="font-display text-2xl sm:text-3xl font-bold text-brand-gold">"ಅನ್ನದಾತಾ ಸುಖೀಭವ"</p>
              <div className="my-4 h-px w-12 bg-brand-gold/40 mx-auto lg:mx-0" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cream/80 leading-relaxed">
                May the provider of food always be happy
              </p>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal x={30} y={0} delay={0.1}>
            <span className="eyebrow">Our Philosophy</span>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-brand-blue">
              The Heart of <br className="hidden md:block" /><span className="accent text-[1.1em]">Hospitality</span>
            </h2>

            <div className="mt-8 space-y-6 text-base sm:text-lg leading-relaxed text-brand-blue/75">
              <p>
                At Udupi Vrindavan, we believe that food is more than just sustenance; it is sacred. For example, we offer various portion sizes so that you only order based on how hungry you are. We only make those items that we know rather than trying to be everything to everyone. Just as you would not engage a plumber to wire your house, we do not cook North Indian or Chinese food because we can never make it as tasty as the cooks from those regions. You will easily recognise the taste!
              </p>
              <p className="border-l-2 border-brand-gold/40 pl-5">
                As owners, we eat the food at our restaurant and therefore do not adulterate it for taste. Therefore, you will not find colourings or preservatives in our restaurant. We do not reheat oil and do not freeze cooked food. We do not microwave food and where our customers don't mind the use of baking soda - we clearly declare that in our menu (check out the pink page in our menu!) so that you aren't surprised if you have a bloated stomach :) So, please visit our restaurant or order from our website. You will see our morals in action. We are a small restaurant but with ideals which we are sure, you will appreciate!!
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Ancient Wisdom ── */}
        <div className="mt-28 lg:mt-40">
          {/* Centerpiece */}
          <Reveal className="mx-auto max-w-2xl">
            <div className="relative rounded-[2rem] bg-brand-blue p-2 shadow-2xl shadow-brand-blue/25">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-brand-gold/40 px-6 py-12 text-center sm:px-12 sm:py-14">
                <div className="absolute inset-0 pattern-dots opacity-20" />
                <motion.img
                  src="/logo.png"
                  alt="Udupi Vrindavan logo"
                  initial={{ rotate: -120, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mx-auto mb-6 h-14 w-14 object-contain"
                />
                <p className="relative font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-gold">
                  "ಅನ್ನಂ ಬ್ರಹ್ಮ"
                </p>
                <p className="relative mt-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-brand-cream/75">
                  Food is manifestation of the Lord
                </p>
              </div>
            </div>
          </Reveal>

          {/* Header */}
          <Reveal className="mx-auto mt-20 max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl leading-snug text-brand-blue">
              Quality food is the{' '}
              <span className="accent text-[1.12em]">first line of</span> defence against ill health.
            </h2>
            <div className="hairline mx-auto my-7 w-40" />
            <p className="text-base sm:text-lg leading-relaxed text-brand-blue/65">
              Our ancestors knew the link between food and the mental state.
            </p>
          </Reveal>

          {/* Quote cards (temple-niche shape) */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {quotes.map((quote, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 0.12} scale={0.96}>
                <article className="group relative h-full rounded-2xl bg-white p-1.5 shadow-[0_20px_50px_-30px_rgba(15,47,74,0.45)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(15,47,74,0.55)]">
                  {/* Corner ornaments */}
                  <span className="absolute left-0 top-0 h-10 w-10 rounded-tl-2xl border-l-[3px] border-t-[3px] border-brand-gold/60 transition-all duration-500 group-hover:h-14 group-hover:w-14 group-hover:border-brand-gold" />
                  <span className="absolute right-0 top-0 h-10 w-10 rounded-tr-2xl border-r-[3px] border-t-[3px] border-brand-gold/60 transition-all duration-500 group-hover:h-14 group-hover:w-14 group-hover:border-brand-gold" />
                  <span className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-2xl border-b-[3px] border-l-[3px] border-brand-gold/60 transition-all duration-500 group-hover:h-14 group-hover:w-14 group-hover:border-brand-gold" />
                  <span className="absolute bottom-0 right-0 h-10 w-10 rounded-br-2xl border-b-[3px] border-r-[3px] border-brand-gold/60 transition-all duration-500 group-hover:h-14 group-hover:w-14 group-hover:border-brand-gold" />

                  <div className="flex h-full flex-col items-center rounded-xl border border-brand-blue/10 px-6 pb-8 pt-9 text-center">
                    <img src="/logo.png" alt="Udupi Vrindavan logo" className="h-14 w-14 object-contain transition-transform duration-700 group-hover:rotate-45" />
                    <h3 className="mt-4 text-[10px] font-semibold tracking-[0.4em] uppercase text-brand-blue/45">
                      UDUPI VRINDAVAN
                    </h3>
                    <p className="mt-6 text-2xl md:text-[1.7rem] font-bold leading-tight text-brand-blue">
                      {quote.sanskrit}
                    </p>
                    <p className="mt-3 text-lg text-brand-blue/85">
                      {quote.kannada}
                    </p>
                    <p className="mt-3 font-accent text-lg italic text-brand-bronze">
                      {quote.transliteration}
                    </p>
                    <div className="mt-auto w-full pt-6">
                      <div className="hairline mb-5" />
                      <p className="text-base leading-relaxed text-brand-blue">
                        "{quote.translation}"
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
