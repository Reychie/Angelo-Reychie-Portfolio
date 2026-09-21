'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

import { OrbitalCampaign } from '@/components/animations/OrbitalCampaign';
import { Header } from '@/components/layout/Header';
import { SectionRail } from '@/components/layout/SectionRail';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { sections, type SectionId } from '@/lib/content/navigation-data';

const observerThresholds = Array.from({ length: 41 }, (_, index) => index / 40);

const PortfolioSections = memo(function PortfolioSections() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
});

export default function PortfolioExperience() {
  const [active, setActive] = useState<SectionId>('home');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const topOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  useEffect(() => {
    const visibility = new Map<SectionId, number>();
    const elements = sections.flatMap((section) => {
      const element = document.getElementById(section.id);
      return element ? [{ element, id: section.id }] : [];
    });

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        visibility.set(entry.target.id as SectionId, entry.isIntersecting ? entry.intersectionRect.height : 0);
      }

      let best: { id: SectionId; score: number } = { id: 'home', score: -1 };
      for (const { id } of elements) {
        const score = visibility.get(id) ?? 0;
        if (score > best.score) best = { id, score };
      }
      if (best.score > 0) setActive((current) => current === best.id ? current : best.id);
    }, {
      rootMargin: '-28% 0px -38% 0px',
      threshold: observerThresholds,
    });

    elements.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-shell" data-active-section={active}>
      <a className="skip-link" href="#home">Skip to main content</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress, opacity: topOpacity }} aria-hidden="true" />
      <OrbitalCampaign active={active} />
      <Header active={active} onNavigate={setActive} />
      <SectionRail active={active} onNavigate={setActive} />
      <PortfolioSections />
    </div>
  );
}
