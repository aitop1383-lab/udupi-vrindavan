import React from 'react';
import { motion } from 'framer-motion';

import { EASE } from './motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  blur?: boolean;
  as?: 'div' | 'li' | 'section' | 'article';
};

/** Fades, lifts and un-blurs content into view once, as it enters the viewport. */
const Reveal = ({ children, className, delay = 0, y = 36, x = 0, scale = 1, blur = true, as = 'div' }: RevealProps) => {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
};

type ImageRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: 'bottom' | 'left' | 'right';
};

/** Uncovers a media block with a clip-path wipe while the content settles from a slight zoom. */
export const ImageReveal = ({ children, className, delay = 0, from = 'bottom' }: ImageRevealProps) => {
  const hidden =
    from === 'left' ? 'inset(0% 100% 0% 0%)' : from === 'right' ? 'inset(0% 0% 0% 100%)' : 'inset(100% 0% 0% 0%)';
  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden }}
      // Once revealed, the clip is removed so box-shadows on this element are not cut off
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', transitionEnd: { clipPath: 'none' } }}
      viewport={{ once: true, margin: '-80px 0px' }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-80px 0px' }}
        transition={{ duration: 1.6, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Reveal;
