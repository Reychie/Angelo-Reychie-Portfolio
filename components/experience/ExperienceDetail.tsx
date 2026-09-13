import { technologyIcons } from '@/lib/content/experience-data';
import type { Experience } from '@/lib/content/experience-data';
import { SkillIcon } from '@/components/icons/TechIcons';
import type { SkillIconKey } from '@/lib/content/skills-data';

interface ExperienceDetailProps {
  experience: Experience;
  className?: string;
}

export default function ExperienceDetail({ experience, className }: ExperienceDetailProps) {
  return (
    <article className={className ?? 'experience-entry space-card rounded-2xl p-6 md:p-8'}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-violet">{experience.period}</p>
          <h3 className="mt-2 text-2xl font-semibold text-foreground">{experience.position}</h3>
          <p className="mt-1 text-sm text-muted">
            {experience.company} · {experience.location}
          </p>
        </div>
        {experience.status ? <span className="experience-status">{experience.status}</span> : null}
      </div>

      <p className="mt-6 text-sm md:text-base leading-relaxed text-muted">{experience.description}</p>

      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {experience.achievements.map((item) => (
          <div key={item} className="experience-highlight rounded-xl border border-border p-4 text-sm leading-relaxed text-foreground">
            {item}
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-5">
        <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Technology stack</p>
        <ul className="mt-3 flex flex-wrap gap-2.5" aria-label="Technologies used">
          {experience.technologies.map((technology) => {
            const icon = technologyIcons[technology as keyof typeof technologyIcons] as SkillIconKey;
            return (
              <li key={technology} className="skill-chip">
                <span className="skill-chip-icon" aria-hidden="true">
                  <SkillIcon name={technology} icon={icon} />
                </span>
                <span>{technology}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
