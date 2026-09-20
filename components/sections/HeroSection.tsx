'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { PointerEvent as ReactPointerEvent } from 'react';

import { ArrowDown } from '@/components/icons/InterfaceIcons';
import OrbitalField from '@/components/space/OrbitalField';
import { CosmicPlate } from '@/components/ui/CosmicPlate';
import { TextLink } from '@/components/ui/TextLink';
import { portfolioEase } from '@/lib/motion';

export function HeroSection() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 45, damping: 22, mass: 0.8 });
  const smoothY = useSpring(y, { stiffness: 45, damping: 22, mass: 0.8 });
  const plateX = useTransform(smoothX, (value) => value * 1.15);
  const plateY = useTransform(smoothY, (value) => value * 1.1);
  const sheenX = useTransform(smoothX, (value) => value * -0.55);
  const sheenY = useTransform(smoothY, (value) => value * -0.4);

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * -18);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * -12);
  };

  return (
    <section id="home" className="hero panel" onPointerMove={onPointerMove} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <motion.div className="hero-art" style={{ x: plateX, y: plateY }} aria-hidden="true">
        <CosmicPlate src="/images/space/black-hole-hero.png" alt="" priority className="hero-art__plate" position="58% center" />
        <motion.div className="accretion-disk" style={{ x: sheenX, y: sheenY }} />
        <motion.div className="accretion-sheen" style={{ x: sheenX, y: sheenY }} />
        <div className="photon-ring" />
        <div className="star-drift star-drift--one" />
        <div className="star-drift star-drift--two" />
        <OrbitalField />
      </motion.div>
      <div className="hero-pointer-glow" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <motion.div className="hero-copy" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.16 } } }}>
        <motion.p className="hero-intro" variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: portfolioEase } } }}>Hello, I&apos;m</motion.p>
        <motion.h1 variants={{ hidden: { opacity: 0, y: 28, clipPath: 'inset(0 0 100% 0)' }, show: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', transition: { duration: 1, ease: portfolioEase } } }}>Angelo<br />Reychie <span className="hero-surname">Alejo</span></motion.h1>
        <motion.p className="hero-role" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: portfolioEase } } }}>Full-Stack Developer</motion.p>
        <motion.p className="hero-description" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: portfolioEase } } }}>I build real-world applications across frontend, backend, data, and AI-enabled workflows that turn complex requirements into reliable products people can use.</motion.p>
        <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: portfolioEase } } }}>
          <TextLink href="#projects" primary>View my work</TextLink>
          <a className="scroll-cue" href="#about"><span><ArrowDown /></span>Scroll to explore</a>
        </motion.div>
      </motion.div>
      <div className="hero-status"><span /><p>Open to new <br />opportunities</p></div>
      <div className="hero-stats" aria-label="Portfolio summary">
        <div><strong>02</strong><span>Selected projects</span></div>
        <div><strong>Full</strong><span>Stack coverage</span></div>
        <div><strong>2026</strong><span>Latest role</span></div>
      </div>
      <div className="hero-aside">Ideas<br />orbit<br />into<br />reality</div>
      <div className="hero-note">Building practical systems<br />with curiosity and care.</div>
    </section>
  );
}
