'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';

import { useHydrated } from '@/hooks/useHydrated';
import { sections, type SectionId } from '@/lib/content/navigation-data';
import { portfolioEase } from '@/lib/motion';

type CampaignSceneVariant = 'orbit' | 'docking' | 'trajectory' | 'systems' | 'transmission';

interface OrbitalCampaignProps {
  active: SectionId;
}

interface CampaignSceneProps {
  children?: ReactNode;
  className?: string;
  variant: CampaignSceneVariant;
}

const flightLines = Array.from({ length: 8 }, (_, index) => index);

/**
 * A single fixed compositor layer that makes page progress feel like an orbital
 * journey. It responds through MotionValues, so scrolling never triggers React
 * renders, and it remains decorative to assistive technology.
 */
export function OrbitalCampaign({ active }: OrbitalCampaignProps) {
  const hydrated = useHydrated();
  const reducedMotion = useReducedMotion();
  const shouldAnimate = hydrated && !reducedMotion;
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 72, damping: 24, mass: 0.42, restDelta: 0.0005 });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 110, damping: 34, mass: 0.28 });
  const orbitRotate = useTransform(progress, [0, 1], [-24, 116]);
  const orbitScale = useTransform(progress, [0, 0.48, 1], [0.88, 1.08, 0.92]);
  const scanY = useTransform(progress, [0, 1], ['-42vh', '46vh']);
  const fieldY = useTransform(progress, [0, 1], ['-8vh', '8vh']);
  const warpScale = useTransform(smoothVelocity, [-1400, 0, 1400], [1.62, 1, 1.62]);
  const current = sections.find((section) => section.id === active) ?? sections[0];

  return (
    <div className={`orbital-campaign orbital-campaign--${active}`} aria-hidden="true">
      <motion.div
        className="orbital-campaign__field"
        style={shouldAnimate ? { y: fieldY, scaleY: warpScale } : undefined}
      >
        {flightLines.map((line) => <i key={line} style={{ '--flight-line': line } as React.CSSProperties} />)}
      </motion.div>
      <motion.div
        className="orbital-campaign__compass"
        style={shouldAnimate ? { rotate: orbitRotate, scale: orbitScale } : undefined}
      >
        <span /><span /><span />
      </motion.div>
      <motion.div className="orbital-campaign__scan" style={shouldAnimate ? { y: scanY } : undefined} />
      <div className="orbital-campaign__sector">
        <span>Mission sector</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.strong
            key={current.id}
            initial={shouldAnimate ? { opacity: 0, y: 8, filter: 'blur(4px)' } : false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={shouldAnimate ? { opacity: 0, y: -6, filter: 'blur(3px)' } : undefined}
            transition={{ duration: 0.32, ease: portfolioEase }}
          >
            {current.number} / {current.label}
          </motion.strong>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Section-local campaign geometry. Each variant tells a different chapter of
 * the same visual story while sharing one scroll-progress implementation.
 */
export function CampaignScene({ children, className = '', variant }: CampaignSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const reducedMotion = useReducedMotion();
  const shouldAnimate = hydrated && !reducedMotion;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 76, damping: 25, mass: 0.45, restDelta: 0.0005 });
  const orbitRotate = useTransform(progress, [0, 1], [-35, 95]);
  const vectorY = useTransform(progress, [0, 1], [46, -46]);
  const sweepX = useTransform(progress, [0, 1], ['-34%', '134%']);
  const pulseScale = useTransform(progress, [0, 0.5, 1], [0.88, 1.04, 0.9]);

  return (
    <div ref={ref} className={`campaign-scene campaign-scene--${variant} ${className}`} aria-hidden="true">
      <motion.div className="campaign-scene__orbit" style={shouldAnimate ? { rotate: orbitRotate, scale: pulseScale } : undefined}>
        <i /><i /><i />
      </motion.div>
      <motion.div className="campaign-scene__vector" style={shouldAnimate ? { y: vectorY } : undefined}>
        <span /><span /><span />
      </motion.div>
      <motion.div className="campaign-scene__sweep" style={shouldAnimate ? { x: sweepX } : undefined} />
      {children}
    </div>
  );
}
