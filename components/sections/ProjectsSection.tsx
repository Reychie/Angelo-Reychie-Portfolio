'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Atmosphere } from '@/components/animations/Atmosphere';
import { CampaignScene } from '@/components/animations/OrbitalCampaign';
import { campaignHeadingVariants, scrollMotionItemVariants, ScrollMotion } from '@/components/animations/ScrollMotion';
import { ChevronLeft, ChevronRight, CrossMark } from '@/components/icons/InterfaceIcons';
import { ProjectCard, type ProjectMotionState } from '@/components/projects/ProjectCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { useHydrated } from '@/hooks/useHydrated';
import { projects } from '@/lib/content/projects-data';
import { site } from '@/lib/content/site';

const initialProjectIndex = Math.max(0, projects.findIndex((project) => project.id === 'useapp'));

export function ProjectsSection() {
  const reducedMotion = useReducedMotion();
  const hydrated = useHydrated();
  const shouldReduceMotion = hydrated && reducedMotion;
  const [activeIndex, setActiveIndex] = useState(initialProjectIndex);
  const [motionState, setMotionState] = useState<ProjectMotionState>('idle');
  const [promotingId, setPromotingId] = useState<string | null>(null);
  const timers = useRef(new Set<number>());
  const orderedProjects = useMemo(
    () => projects.map((_, offset) => projects[(activeIndex + offset) % projects.length]),
    [activeIndex],
  );

  useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current.clear();
  }, []);

  const schedule = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      timers.current.delete(timer);
      callback();
    }, delay);
    timers.current.add(timer);
  };

  const featureProject = (nextIndex: number) => {
    if (nextIndex === activeIndex || motionState !== 'idle') return;
    const target = projects[nextIndex];
    setPromotingId(target.id);
    if (shouldReduceMotion) {
      setActiveIndex(nextIndex);
      setPromotingId(null);
      return;
    }
    setMotionState('departing');
    schedule(() => {
      setActiveIndex(nextIndex);
      setMotionState('settling');
    }, 240);
    schedule(() => {
      setMotionState('idle');
      setPromotingId(null);
    }, 860);
  };

  const move = (nextDirection: number) => {
    featureProject((activeIndex + nextDirection + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="projects panel section-pad">
      <CampaignScene variant="docking" />
      <Atmosphere src="/images/space/lunar-contact.png" className="projects-atmosphere" position="68% 54%" strength={34} />
      <div className="section-coordinate section-coordinate--projects" aria-hidden="true">PROJECT ARRAY<br />02 VERIFIED SYSTEMS</div>
      <div className="page-grid project-layout">
        <ScrollMotion className="projects-intro" kind="group" staggerChildren={0.1}>
          <motion.div variants={scrollMotionItemVariants}><SectionLabel number="03" label="Projects" /></motion.div>
          <motion.h2 variants={campaignHeadingVariants}>Projects I’ve<br />Built</motion.h2>
          <motion.p variants={scrollMotionItemVariants}>A selection of systems and applications I’ve developed across professional, academic, and personal projects.</motion.p>
          <motion.div variants={scrollMotionItemVariants}><TextLink href={site.social.github} external>View GitHub</TextLink></motion.div>
        </ScrollMotion>
        <ScrollMotion className="project-stage" delay={0.08} kind="stage">
          <div className="project-controls" aria-label="Project navigation">
            <motion.button type="button" onClick={() => move(-1)} aria-label="Show previous project" whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }} disabled={motionState !== 'idle'}><ChevronLeft /></motion.button>
            <motion.button type="button" onClick={() => move(1)} aria-label="Show next project" whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }} disabled={motionState !== 'idle'}><ChevronRight /></motion.button>
          </div>
          <div className="sr-only" aria-live="polite">Showing {projects[activeIndex].title} as the featured project.</div>
          <motion.div className="projects-cards" layout={shouldReduceMotion ? false : true}>
            {orderedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={index === 0}
                index={index}
                motionState={motionState}
                promoting={promotingId === project.id}
                onSelect={() => featureProject(projects.findIndex((item) => item.id === project.id))}
              />
            ))}
          </motion.div>
        </ScrollMotion>
        <CrossMark className="project-cross" />
      </div>
    </section>
  );
}
