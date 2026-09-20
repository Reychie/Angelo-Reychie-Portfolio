'use client';

import { motion } from 'framer-motion';

import { Atmosphere } from '@/components/animations/Atmosphere';
import { Reveal } from '@/components/animations/Reveal';
import { SkillIcon } from '@/components/icons/TechIcons';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { experiences, technologyIcons } from '@/lib/content/experience-data';
import { portfolioEase } from '@/lib/motion';

export function ExperienceSection() {
  const role = experiences[0];
  const roleSummary = `${role.description.split('. ')[0]}.`;

  return (
    <section id="experience" className="experience panel section-pad">
      <Atmosphere src="/images/space/planet-edge.png" className="experience-atmosphere" position="78% center" strength={46} />
      <div className="experience-scrim" aria-hidden="true" />
      <div className="page-grid experience-layout">
        <Reveal className="experience-heading">
          <SectionLabel number="04" label="Experience" />
          <h2>A Practical Path<br />Through Real Work</h2>
          <p>My professional experience, including the roles, projects, and responsibilities I’ve worked on.</p>
        </Reveal>
        <Reveal className="timeline experience-role" delay={0.1} kind="horizontal">
          <motion.div className="timeline__line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.05, ease: portfolioEase }} />
          <ol aria-label="Experience timeline">
            <li>
              <time>{role.period}</time>
              <span className="timeline__node timeline__node--current" aria-hidden="true" />
              <article>
                <span className="experience-role__status"><i /> Recent role</span>
                <h3>{role.position}</h3>
                <h4>{role.company}</h4>
                <p>{roleSummary}</p>
              </article>
            </li>
          </ol>
          <div className="experience-stack" aria-label="Technology stack used at Compassionate Home Health Services">
            <div className="experience-stack__label"><span>Stack architecture</span><i /></div>
            <div className="experience-stack__grid">
              {role.technologies.map((technology, index) => (
                <div className="experience-tech" key={technology}>
                  <span className="experience-tech__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="experience-tech__icon"><SkillIcon name={technology} icon={technologyIcons[technology as keyof typeof technologyIcons]} /></span>
                  <strong>{technology}</strong>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
