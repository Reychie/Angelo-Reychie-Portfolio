'use client';

import type { Project } from '@/lib/content/projects-data';
import type { SkillIconKey } from '@/lib/content/skills-data';
import { SkillIcon } from '@/components/icons/TechIcons';
import ProjectBrowserPreview from '@/components/projects/ProjectBrowserPreview';

interface ProjectCardProps {
  project: Project;
  caseStudyOpen: boolean;
  onCaseStudyToggle: () => void;
}

const technologyIcons: Record<string, SkillIconKey> = {
  React: 'react',
  Vite: 'vite',
  'Node.js': 'nodejs',
  MongoDB: 'mongodb',
  'Socket.IO': 'socketio',
  PHP: 'php',
  MySQL: 'mysql',
  JavaScript: 'javascript',
  'React Native': 'reactnative',
};

export default function ProjectCard({ project, caseStudyOpen, onCaseStudyToggle }: ProjectCardProps) {
  const liveUrl = project.liveUrl?.trim();
  const caseStudyPanelId = `case-study-panel-${project.id}`;

  return (
    <article id={`case-${project.id}`} className="group overflow-hidden rounded-2xl space-card hover-lift self-start">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-[#070711]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.imageAlt}
          className="h-full w-full object-cover object-top transition-transform duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-5 md:p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
          <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-1">Role</p>
          <p className="text-sm text-foreground">{project.role}</p>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => {
            const icon = technologyIcons[technology] ?? 'javascript';
            return (
              <li key={`${project.id}-${technology}`} className="skill-chip">
                <span className="skill-chip-icon" aria-hidden="true">
                  <SkillIcon name={technology} icon={icon} />
                </span>
                <span>{technology}</span>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap gap-x-3 gap-y-2 pt-1 text-sm">
          <button
            type="button"
            onClick={onCaseStudyToggle}
            aria-expanded={caseStudyOpen}
            aria-controls={caseStudyPanelId}
            className={`project-link-button${caseStudyOpen ? ' project-link-button-active' : ''}`}
          >
            <span>{caseStudyOpen ? 'Hide Case Study' : 'View Case Study'}</span>
            <span aria-hidden="true">{caseStudyOpen ? '−' : '+'}</span>
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-button"
            aria-label={`Open ${project.title} GitHub repository`}
          >
            <span>GitHub</span>
            <span aria-hidden="true">↗</span>
          </a>
          {liveUrl ? (
            <>
              <ProjectBrowserPreview title={project.title} url={liveUrl} triggerLabel="View Project" />
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-button"
                aria-label={`Open ${project.title} live site in a new tab`}
              >
                <span>Open Live Site</span>
                <span aria-hidden="true">↗</span>
              </a>
            </>
          ) : (
            <span
              className="project-link-button project-link-button-disabled"
              aria-disabled="true"
              title="Live project link coming soon"
            >
              <span>View Project</span>
            </span>
          )}
        </div>

        {caseStudyOpen ? (
          <div id={caseStudyPanelId} className="pt-3 border-t border-border space-y-3">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-1">Problem</p>
              <p className="text-sm text-foreground leading-relaxed">{project.caseStudy.problem}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-1">Approach</p>
              <p className="text-sm text-foreground leading-relaxed">{project.caseStudy.approach}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted mb-1">Outcome</p>
              <p className="text-sm text-foreground leading-relaxed">{project.caseStudy.outcome}</p>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
