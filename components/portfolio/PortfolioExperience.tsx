'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { Header } from '@/components/layout/Header';
import { SectionRail } from '@/components/layout/SectionRail';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { sections, type SectionId } from '@/lib/content/navigation-data';

export default function PortfolioExperience() {
  const [active, setActive] = useState<SectionId>('home');
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const topOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bandTop = window.innerHeight * 0.28;
        const bandBottom = window.innerHeight * 0.62;
        let best: { id: SectionId; score: number } = { id: 'home', score: -1 };
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (!element) continue;
          const rect = element.getBoundingClientRect();
          const visible = Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop);
          if (visible > best.score) best = { id: section.id, score: visible };
        }
        if (best.score > 0) setActive(best.id);
      });
    };
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <div ref={rootRef} className="portfolio-shell">
      <a className="skip-link" href="#home">Skip to main content</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress, opacity: topOpacity }} aria-hidden="true" />
      <Header active={active} onNavigate={setActive} />
      <SectionRail active={active} onNavigate={setActive} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}
