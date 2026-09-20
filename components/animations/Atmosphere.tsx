'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { CosmicPlate } from '@/components/ui/CosmicPlate';
import { useHydrated } from '@/hooks/useHydrated';

interface AtmosphereProps {
  src: string;
  className?: string;
  position?: string;
  strength?: number;
}

export function Atmosphere({ src, className = '', position = 'center', strength = 40 }: AtmosphereProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const hydrated = useHydrated();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.12]);

  return (
    <div ref={ref} className={`section-atmosphere ${className}`} aria-hidden="true">
      {hydrated && !reduced ? (
        <motion.div className="section-atmosphere__motion" style={{ y, scale }}>
          <CosmicPlate src={src} alt="" position={position} sizes="100vw" />
        </motion.div>
      ) : (
        <div className="section-atmosphere__motion">
          <CosmicPlate src={src} alt="" position={position} sizes="100vw" />
        </div>
      )}
    </div>
  );
}
