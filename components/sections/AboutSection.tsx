'use client';

import { Atmosphere } from '@/components/animations/Atmosphere';
import { Reveal } from '@/components/animations/Reveal';
import { CrossMark, TraitIcon } from '@/components/icons/InterfaceIcons';
import SectionOrbitField from '@/components/space/SectionOrbitField';
import { CosmicPlate } from '@/components/ui/CosmicPlate';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { traits } from '@/lib/content/about-data';

export function AboutSection() {
  return (
    <section id="about" className="about panel section-pad">
      <Atmosphere src="/images/space/earth-horizon.png" className="about-atmosphere" position="68% 52%" strength={28} />
      <SectionOrbitField className="about-orbit-field" />
      <div className="section-coordinate section-coordinate--about" aria-hidden="true">ORBIT / 02<br />37.7749° N</div>
      <div className="about-grid page-grid">
        <Reveal className="about-copy">
          <SectionLabel number="02" label="About" />
          <h2>More Than<br />Just Code</h2>
          <p>I&apos;m Angelo Reychie Alejo, a full-stack developer who likes understanding how every part of a system connects. I turn requirements into useful, maintainable features across interfaces, APIs, databases, and intelligent workflows.</p>
          <TextLink href="#projects">Get to know my work</TextLink>
        </Reveal>
        <Reveal className="about-visual" delay={0.08} kind="visual">
          <CosmicPlate src="/images/space/earth-horizon.png" alt="Earth at night seen from orbit" sizes="(max-width: 920px) calc(100vw - 48px), 58vw" position="58% center" />
          <div className="orbit-callout"><span />Different perspective<br />Same curiosity</div>
          <span className="orbit-marker" aria-hidden="true" />
        </Reveal>
        <div className="trait-grid">
          {traits.map((trait, index) => (
            <Reveal key={trait.title} className="trait-shell" delay={index * 0.055} kind="card">
              <article className="trait">
                <div className="trait__telemetry"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
                <div className="trait__icon"><TraitIcon kind={trait.icon} /><span aria-hidden="true" /></div>
                <div><h3>{trait.title}</h3><p>{trait.text}</p></div>
                <span className="trait__corner" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="about-quote" kind="horizontal"><CrossMark /><blockquote>“The best systems feel clear on the surface because someone cared about the structure beneath.”</blockquote><i /></Reveal>
      </div>
    </section>
  );
}
