'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { Atmosphere } from '@/components/animations/Atmosphere';
import { CampaignScene } from '@/components/animations/OrbitalCampaign';
import { campaignHeadingVariants, scrollMotionItemVariants, ScrollMotion } from '@/components/animations/ScrollMotion';
import { CrossMark, TraitIcon } from '@/components/icons/InterfaceIcons';
import { CosmicPlate } from '@/components/ui/CosmicPlate';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { traits } from '@/lib/content/about-data';

const SectionOrbitField = dynamic(() => import('@/components/space/SectionOrbitField'), { ssr: false });

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || webglReady) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setWebglReady(true);
      observer.disconnect();
    }, { threshold: 0.01 });

    observer.observe(section);
    return () => observer.disconnect();
  }, [webglReady]);

  return (
    <section ref={sectionRef} id="about" className="about panel section-pad">
      <CampaignScene variant="orbit" />
      <Atmosphere src="/images/space/earth-horizon.png" className="about-atmosphere" position="68% 52%" strength={28} />
      {webglReady ? <SectionOrbitField className="about-orbit-field" /> : null}
      <div className="section-coordinate section-coordinate--about" aria-hidden="true">ORBIT / 02<br />37.7749° N</div>
      <div className="about-grid page-grid">
        <ScrollMotion className="about-copy" kind="group" staggerChildren={0.1}>
          <motion.div variants={scrollMotionItemVariants}><SectionLabel number="02" label="About" /></motion.div>
          <motion.h2 variants={campaignHeadingVariants}>More Than<br />Just Code</motion.h2>
          <motion.p variants={scrollMotionItemVariants}>I&apos;m Angelo Reychie Alejo, a full-stack developer who likes understanding how every part of a system connects. I turn requirements into useful, maintainable features across interfaces, APIs, databases, and intelligent workflows.</motion.p>
          <motion.div variants={scrollMotionItemVariants}><TextLink href="#projects">Get to know my work</TextLink></motion.div>
        </ScrollMotion>
        <ScrollMotion className="about-visual-motion" delay={0.08} kind="visual" direction="right">
          <div className="about-visual">
            <CosmicPlate src="/images/space/earth-horizon.png" alt="Earth at night seen from orbit" sizes="(max-width: 920px) calc(100vw - 48px), 58vw" position="58% center" />
            <div className="orbit-callout"><span />Different perspective<br />Same curiosity</div>
            <span className="orbit-marker" aria-hidden="true" />
          </div>
        </ScrollMotion>
        <div className="trait-grid">
          {traits.map((trait, index) => (
            <ScrollMotion key={trait.title} className="trait-shell" delay={index * 0.055} kind="checkpoint" direction={index % 2 ? 'right' : 'left'}>
              <article className="trait">
                <div className="trait__telemetry"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
                <div className="trait__icon"><TraitIcon kind={trait.icon} /><span aria-hidden="true" /></div>
                <div><h3>{trait.title}</h3><p>{trait.text}</p></div>
                <span className="trait__corner" aria-hidden="true" />
              </article>
            </ScrollMotion>
          ))}
        </div>
        <ScrollMotion className="about-quote" kind="horizontal"><CrossMark /><blockquote>“The best systems feel clear on the surface because someone cared about the structure beneath.”</blockquote><i /></ScrollMotion>
      </div>
    </section>
  );
}
