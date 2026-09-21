'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

import { ArrowUpRight, ChevronLeft, GitHubIcon } from '@/components/icons/InterfaceIcons';
import { useHydrated } from '@/hooks/useHydrated';
import type { Project } from '@/lib/content/projects-data';
import { portfolioEase } from '@/lib/motion';

export type ProjectMotionState = 'idle' | 'departing' | 'settling';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index: number;
  motionState: ProjectMotionState;
  promoting: boolean;
  onSelect: () => void;
}

export function ProjectCard({ project, featured = false, index, motionState, promoting, onSelect }: ProjectCardProps) {
  const reduced = useReducedMotion();
  const hydrated = useHydrated();
  const shouldReduceMotion = hydrated && reduced;
  const departure = motionState === 'departing'
    ? promoting
      ? { x: 22, y: 76, scale: 0.91, opacity: 0.54, rotateY: -7 }
      : { x: -12, y: -14, scale: 0.975, opacity: 0.82, rotateY: 3 }
    : { x: 0, y: 0, scale: 1, opacity: 1, rotateY: featured ? 0 : -4 };
  const media = (
    <>
      <Image src={project.image} alt={project.imageAlt} fill sizes={featured ? '(max-width: 800px) 100vw, 60vw' : '(max-width: 800px) 100vw, 34vw'} />
      <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
      {featured && project.liveUrl ? <span className="project-card__live">Live project <ArrowUpRight /></span> : null}
      {!featured ? <span className="project-card__promote">Move to focus <ChevronLeft /></span> : null}
    </>
  );

  return (
    <motion.article
      className={`project-card ${featured ? 'project-card--featured' : 'project-card--secondary'} ${promoting ? 'project-card--promoting' : ''}`}
      layout={shouldReduceMotion ? false : true}
      animate={shouldReduceMotion ? undefined : departure}
      whileHover={shouldReduceMotion || motionState !== 'idle' ? undefined : { y: -9, scale: 1.006, rotateX: -1.2, rotateY: featured ? 1.4 : -2.4 }}
      transition={{ layout: { duration: 0.62, ease: portfolioEase }, duration: motionState === 'departing' ? 0.24 : 0.58, ease: portfolioEase }}
    >
      <div className="project-card__frame" aria-hidden="true" />
      {featured ? (
        <a className="project-card__media" href={project.liveUrl ?? project.githubUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live project`}>{media}</a>
      ) : (
        <button className="project-card__media project-card__select" type="button" onClick={onSelect} aria-label={`Feature ${project.title}`} disabled={motionState !== 'idle'}>{media}</button>
      )}
      <div className="project-card__body">
        <div>
          <p className="project-card__role">{project.role}</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {featured && <p className="project-card__evidence">{project.caseStudy.outcome}</p>}
        </div>
        <div className="project-card__footer">
          <ul aria-label={`${project.title} technologies`}>{project.technologies.slice(0, featured ? 4 : 3).map((tech) => <li key={tech}>{tech}</li>)}</ul>
          <a className="project-card__source" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source on GitHub`}><GitHubIcon /><span>Source</span><ArrowUpRight /></a>
        </div>
      </div>
    </motion.article>
  );
}
