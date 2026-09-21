'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { PointerEvent as ReactPointerEvent } from 'react';

import { CampaignScene } from '@/components/animations/OrbitalCampaign';
import { ArrowDown } from '@/components/icons/InterfaceIcons';
import { ScrollMotion, scrollMotionItemVariants } from '@/components/animations/ScrollMotion';
import OrbitalField from '@/components/space/OrbitalField';
import { CosmicPlate } from '@/components/ui/CosmicPlate';
import { TextLink } from '@/components/ui/TextLink';

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
      <CampaignScene variant="orbit" />
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
      <ScrollMotion className="hero-copy" kind="group" amount={0.34} delay={0.1} staggerChildren={0.08}>
        <motion.p className="hero-intro" variants={scrollMotionItemVariants}>Hello, I&apos;m</motion.p>
        <motion.h1 variants={scrollMotionItemVariants}>Angelo<br />Reychie <span className="hero-surname">Alejo</span></motion.h1>
        <motion.p className="hero-role" variants={scrollMotionItemVariants}>Full-Stack Developer</motion.p>
        <motion.p className="hero-description" variants={scrollMotionItemVariants}>I build real-world applications across frontend, backend, data, and AI-enabled workflows that turn complex requirements into reliable products people can use.</motion.p>
        <motion.div className="hero-actions" variants={scrollMotionItemVariants}>
          <TextLink href="#projects" primary>View my work</TextLink>
          <a className="scroll-cue" href="#about"><span><ArrowDown /></span>Scroll to explore</a>
        </motion.div>
      </ScrollMotion>
      <ScrollMotion className="hero-status" kind="checkpoint" amount={0.4}><span /><p>Open to new <br />opportunities</p></ScrollMotion>
      <ScrollMotion className="hero-stats" kind="horizontal" amount={0.4} aria-label="Portfolio summary">
        <div><strong>02</strong><span>Selected projects</span></div>
        <div><strong>Full</strong><span>Stack coverage</span></div>
        <div><strong>2026</strong><span>Latest role</span></div>
      </ScrollMotion>
      <ScrollMotion className="hero-aside" kind="horizontal" direction="right" amount={0.4}>Ideas<br />orbit<br />into<br />reality</ScrollMotion>
      <ScrollMotion className="hero-note" kind="fade" delay={0.18} amount={0.4}>Building practical systems<br />with curiosity and care.</ScrollMotion>
    </section>
  );
}
