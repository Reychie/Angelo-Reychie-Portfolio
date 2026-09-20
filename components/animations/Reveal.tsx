'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { portfolioEase } from '@/lib/motion';

type RevealKind = 'copy' | 'visual' | 'card' | 'horizontal';

const revealFrom: Record<RevealKind, { opacity: number; x?: number; y?: number; scale?: number; clipPath?: string }> = {
  copy: { opacity: 0, y: 20 },
  visual: { opacity: 0, scale: 1.025, clipPath: 'inset(0 0 12% 0)' },
  card: { opacity: 0, y: 14, scale: 0.99 },
  horizontal: { opacity: 0, x: -18 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  kind?: RevealKind;
}

export function Reveal({ children, className = '', delay = 0, kind = 'copy' }: RevealProps) {
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={revealFrom[kind]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-10% 0px -12%' }}
      transition={{ duration: 0.85, delay, ease: portfolioEase }}
    >{children}</motion.div>
  );
}
