'use client';

import { useMemo, type CSSProperties } from 'react';

import { Atmosphere } from '@/components/animations/Atmosphere';
import { Reveal } from '@/components/animations/Reveal';
import { SkillIcon } from '@/components/icons/TechIcons';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { skillCategories, type SkillIconKey } from '@/lib/content/skills-data';
import { preferredSkillGroups } from '@/lib/content/skills-view-data';
import { site } from '@/lib/content/site';

export function SkillsSection() {
  const lookup = useMemo(() => new Map(skillCategories.flatMap((category) => category.skills).map((skill) => [skill.name, skill])), []);
  return (
    <section id="skills" className="skills panel section-pad">
      <Atmosphere src="/images/space/lunar-surface.jpg" className="skills-atmosphere" position="72% 74%" strength={24} />
      <div className="section-coordinate section-coordinate--skills" aria-hidden="true">CAPABILITY DECK<br />SYSTEMS ONLINE</div>
      <div className="page-grid skills-layout">
        <Reveal className="skills-intro">
          <SectionLabel number="05" label="Skills" />
          <h2>Tools &<br />Technologies</h2>
          <p>The stack I use to design, build, connect, and ship modern applications.</p>
          <TextLink href={site.social.github} external>View my setup</TextLink>
        </Reveal>
        <div className="skills-console">
          <div className="skills-console__head"><span><i /> Capability matrix</span><span>04 sectors / 20 tools</span></div>
          <div className="skill-groups">
            {preferredSkillGroups.map((group, groupIndex) => (
              <Reveal key={group.title} className="skill-group" delay={groupIndex * 0.06} kind="card">
                <div className="skill-group__head"><span>{String(groupIndex + 1).padStart(2, '0')}</span><h3>{group.title}</h3><i /></div>
                <ul>{group.names.map((name, skillIndex) => {
                  const skill = lookup.get(name);
                  if (!skill) return null;
                  return <li key={name} style={{ '--skill-order': skillIndex } as CSSProperties}><span><SkillIcon name={name} icon={skill.icon as SkillIconKey} /></span><small>{name}</small></li>;
                })}</ul>
              </Reveal>
            ))}
          </div>
          <div className="skills-console__foot"><span>Frontend to deployment</span><i /><span>Built for useful products</span></div>
        </div>
      </div>
    </section>
  );
}
