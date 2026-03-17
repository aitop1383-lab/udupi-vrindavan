import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightCircle, ChevronRight } from 'lucide-react';

const SignatureMenu = () => {
  const categories = [
    { name: "Combos", img: "/categories/Combos.jpg", link: "https://order.udupivrindavan.com/shop/?category=355129" },
    { name: "Dosa", img: "/categories/Dosa.jpg", link: "https://order.udupivrindavan.com/shop/?category=355128" },
    { name: "Idli", img: "/categories/Idli.jpg", link: "https://order.udupivrindavan.com/shop/?category=355128" },
    { name: "Snacks", img: "/categories/Snacks.jpg", link: "https://order.udupivrindavan.com/shop/?category=355127" },
    { name: "Hot Beverages", img: "/categories/Hot Beverages.jpg", link: "https://order.udupivrindavan.com/shop/?category=355131" },
    { name: "Cold Beverages", img: "/categories/Cold Beverages.jpg", link: "https://order.udupivrindavan.com/shop/?category=355133" },
  ];

  return (
    <section id="menu" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Wapas Purana wala text aur style */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
          <div className="max-w-2xl">
            <span className="text-brand-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
              Our Specialties
            </span>
            <h2 className="text-5xl md:text-7xl text-brand-blue leading-tight">
              Explore Our <br />
              <span className="italic text-brand-gold font-display">Categories</span>
            </h2>
          </div>
          <p className="text-brand-blue/60 max-w-sm text-lg leading-relaxed border-l-2 border-brand-gold/20 pl-6">
            Pick your favorite category and order directly from our kitchen to your doorstep.
          </p>
        </div>

        {/* Categories Horizontal Slider */}
        <div className="relative group">
          <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing">
            {categories.map((cat, idx) => (
              <motion.a
                key={idx}
                href={cat.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[300px] md:w-[400px] snap-start group/card flex flex-col items-center"
              >
                {/* Image Container - Big & Rounded */}
                <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden border border-brand-gold/10 transition-all duration-500 group-hover/card:shadow-2xl group-hover/card:-translate-y-2">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-1000"
                  />
                </div>

                {/* Order Button - Exactly below the image with your original style */}
                <div className="mt-8 inline-flex items-center gap-2 py-3 px-8 rounded-full bg-brand-blue text-brand-cream group-hover/card:bg-brand-gold group-hover/card:text-brand-blue transition-all duration-300 shadow-lg">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Order Now</span>
                  <ArrowRightCircle size={16} className="transform group-hover/card:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Scroll Progress Decor */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-1 w-12 bg-brand-gold rounded-full"></div>
            <div className="h-1 w-4 bg-brand-gold/20 rounded-full"></div>
            <span className="text-[9px] font-bold text-brand-blue/40 uppercase tracking-[0.3em] ml-2">Swipe to view more categories</span>
          </div>
        </div>

        {/* Full Menu Button - Wapas tumhara wala link aur style */}
        <div className="mt-20 text-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://order.udupivrindavan.com/shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-brand-blue text-brand-cream px-12 py-5 rounded-full font-bold text-lg hover:bg-brand-gold hover:text-brand-blue transition-all shadow-xl group"
          >
            Browse Full Menu
            <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default SignatureMenu;
