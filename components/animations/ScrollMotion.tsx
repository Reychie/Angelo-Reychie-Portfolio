'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

import { useHydrated } from '@/hooks/useHydrated';
import { portfolioEase } from '@/lib/motion';

export type ScrollMotionKind =
  | 'group'
  | 'copy'
  | 'heading'
  | 'visual'
  | 'card'
  | 'checkpoint'
  | 'stage'
  | 'console'
  | 'timeline'
  | 'horizontal'
  | 'fade'
  | 'line';
export type ScrollMotionDirection = 'left' | 'right';

interface ScrollMotionProps {
  children?: ReactNode;
  'aria-label'?: string;
  className?: string;
  delay?: number;
  direction?: ScrollMotionDirection;
  kind?: ScrollMotionKind;
  replay?: boolean;
  amount?: number;
  staggerChildren?: number;
}

const visible = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotateX: 0,
  rotateY: 0,
  filter: 'blur(0px)',
};

export const scrollMotionItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: 5, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.76, ease: portfolioEase },
  },
};

export const campaignHeadingVariants: Variants = {
  hidden: { opacity: 0, y: 42, rotateX: -7, filter: 'blur(7px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.82, ease: portfolioEase },
  },
};

export const campaignItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96, rotateX: 7 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.62, ease: portfolioEase },
  },
};

export const campaignGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.065, delayChildren: 0.14 },
  },
};

function hiddenState(kind: ScrollMotionKind, direction: ScrollMotionDirection) {
  switch (kind) {
    case 'group':
      return { opacity: 0 };
    case 'heading':
      return { opacity: 0, y: 36, rotateX: -6, filter: 'blur(6px)' };
    case 'visual':
      return { opacity: 0, y: 24, scale: 1.065, rotateY: direction === 'right' ? -3 : 3, clipPath: 'inset(0 0 12% 0)' };
    case 'card':
      return { opacity: 0, y: 34, scale: 0.955, rotateX: 6 };
    case 'checkpoint':
      return { opacity: 0, x: direction === 'right' ? 42 : -42, scale: 0.94, rotateY: direction === 'right' ? -5 : 5 };
    case 'stage':
      return { opacity: 0, y: 54, scale: 0.94, rotateX: 5, filter: 'blur(4px)' };
    case 'console':
      return { opacity: 0, y: 40, scale: 0.965, rotateX: 7, filter: 'blur(3px)' };
    case 'timeline':
      return { opacity: 0, x: direction === 'right' ? 48 : -48, scale: 0.97, rotateY: direction === 'right' ? -4 : 4 };
    case 'horizontal':
      return { opacity: 0, x: direction === 'right' ? 30 : -30 };
    case 'fade':
      return { opacity: 0 };
    case 'line':
      return { opacity: 0.35, scaleY: 0 };
    case 'copy':
    default:
      return { opacity: 0, y: 28, filter: 'blur(3px)' };
  }
}

function visibleState(kind: ScrollMotionKind, delay: number, staggerChildren: number) {
  const transition = {
    duration: kind === 'line' ? 1.05 : kind === 'stage' || kind === 'console' ? 0.88 : kind === 'visual' ? 0.84 : 0.76,
    delay,
    ease: portfolioEase,
    staggerChildren,
    delayChildren: staggerChildren ? delay : 0,
  };

  if (kind === 'group') return { opacity: 1, transition };
  if (kind === 'visual') return { ...visible, clipPath: 'inset(0 0 0% 0)', transition };
  if (kind === 'line') return { opacity: 1, scaleY: 1, transition };
  return { ...visible, transition };
}

/**
 * Shared viewport entrance motion for the portfolio. Text-oriented variants
 * never use clip-path so glyph overhangs and descenders remain fully visible.
 */
export function ScrollMotion({
  children,
  className = '',
  delay = 0,
  direction = 'left',
  kind = 'copy',
  replay = true,
  amount = 0.2,
  staggerChildren = 0,
  'aria-label': ariaLabel,
}: ScrollMotionProps) {
  const reducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const shouldReduceMotion = hydrated && reducedMotion;
  const variants = {
    hidden: hiddenState(kind, direction),
    visible: visibleState(kind, delay, staggerChildren),
  };

  return (
    <motion.div
      className={`scroll-motion ${className}`}
      aria-label={ariaLabel}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: !replay, amount, margin: '0px 0px -8% 0px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
