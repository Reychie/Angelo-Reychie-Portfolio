'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

import { CampaignScene } from '@/components/animations/OrbitalCampaign';
import { ArrowDown } from '@/components/icons/InterfaceIcons';
import { ScrollMotion, scrollMotionItemVariants } from '@/components/animations/ScrollMotion';
import { CosmicPlate } from '@/components/ui/CosmicPlate';
import { TextLink } from '@/components/ui/TextLink';

const OrbitalField = dynamic(() => import('@/components/space/OrbitalField'), { ssr: false });

export function HeroSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const boundsRef = useRef<DOMRectReadOnly | null>(null);
  const pointerRef = useRef({ clientX: 0, clientY: 0 });
  const pointerFrameRef = useRef<number | null>(null);
  const [webglReady, setWebglReady] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 45, damping: 22, mass: 0.8 });
  const smoothY = useSpring(y, { stiffness: 45, damping: 22, mass: 0.8 });
  const plateX = useTransform(smoothX, (value) => value * 1.15);
  const plateY = useTransform(smoothY, (value) => value * 1.1);
  const sheenX = useTransform(smoothX, (value) => value * -0.55);
  const sheenY = useTransform(smoothY, (value) => value * -0.4);

  useEffect(() => {
    if (reduced) return;

    const idleWindow = window as unknown as {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(() => setWebglReady(true), { timeout: 900 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(() => setWebglReady(true), 32);
    return () => globalThis.clearTimeout(timeoutId);
  }, [reduced]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateBounds = () => {
      boundsRef.current = section.getBoundingClientRect();
    };
    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(section);
    updateBounds();

    return () => {
      resizeObserver.disconnect();
      if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
    };
  }, []);

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType === 'touch') return;
    pointerRef.current = { clientX: event.clientX, clientY: event.clientY };
    if (pointerFrameRef.current !== null) return;
    pointerFrameRef.current = requestAnimationFrame(() => {
      pointerFrameRef.current = null;
      const rect = boundsRef.current;
      if (!rect) return;
      x.set(((pointerRef.current.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * -18);
      y.set(((pointerRef.current.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * -12);
    });
  };

  const resetPointer = () => {
    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <section ref={sectionRef} id="home" className="hero panel" onPointerEnter={() => { boundsRef.current = sectionRef.current?.getBoundingClientRect() ?? null; }} onPointerMove={onPointerMove} onPointerLeave={resetPointer}>
      <CampaignScene variant="orbit" />
      <motion.div className="hero-art" style={{ x: plateX, y: plateY }} aria-hidden="true">
        <CosmicPlate src="/images/space/black-hole-hero.png" alt="" priority className="hero-art__plate" position="58% center" />
        <motion.div className="accretion-disk" style={{ x: sheenX, y: sheenY }} />
        <motion.div className="accretion-sheen" style={{ x: sheenX, y: sheenY }} />
        <div className="photon-ring" />
        <div className="star-drift star-drift--one" />
        <div className="star-drift star-drift--two" />
        {webglReady ? <OrbitalField /> : null}
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
