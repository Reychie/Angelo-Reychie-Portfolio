'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { sectionEnter, sectionLeave } from '@/lib/motion';

interface SectionTransitionProps {
  sectionKey: string;
  children: ReactNode;
}

export default function SectionTransition({ sectionKey, children }: SectionTransitionProps) {
  const reduce = useReducedMotion();

  return (
    <div className="portfolio-scroll-root h-full w-full overflow-y-auto pt-28 md:pt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={sectionKey}
          className="min-h-full"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8, transition: sectionLeave }}
          transition={sectionEnter}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
