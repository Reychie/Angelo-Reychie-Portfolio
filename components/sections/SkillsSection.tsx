'use client';

import { motion } from 'framer-motion';
import { useMemo, type CSSProperties } from 'react';

import { Atmosphere } from '@/components/animations/Atmosphere';
import { CampaignScene } from '@/components/animations/OrbitalCampaign';
import { campaignHeadingVariants, campaignItemVariants, scrollMotionItemVariants, ScrollMotion } from '@/components/animations/ScrollMotion';
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
      <CampaignScene variant="systems" />
      <Atmosphere src="/images/space/lunar-surface.jpg" className="skills-atmosphere" position="72% 74%" strength={24} />
      <div className="section-coordinate section-coordinate--skills" aria-hidden="true">CAPABILITY DECK<br />SYSTEMS ONLINE</div>
      <div className="page-grid skills-layout">
        <ScrollMotion className="skills-intro" kind="group" staggerChildren={0.1}>
          <motion.div variants={scrollMotionItemVariants}><SectionLabel number="05" label="Skills" /></motion.div>
          <motion.h2 variants={campaignHeadingVariants}>Tools &<br />Technologies</motion.h2>
          <motion.p variants={scrollMotionItemVariants}>The stack I use to design, build, connect, and ship modern applications.</motion.p>
          <motion.div variants={scrollMotionItemVariants}><TextLink href={site.social.github} external>View my setup</TextLink></motion.div>
        </ScrollMotion>
        <ScrollMotion className="skills-console-motion" delay={0.08} kind="console">
          <div className="skills-console">
            <div className="skills-console__head"><span><i /> Capability matrix</span><span>04 sectors / 20 tools</span></div>
            <div className="skill-groups">
              {preferredSkillGroups.map((group, groupIndex) => (
                <ScrollMotion key={group.title} className="skill-group" delay={groupIndex * 0.055} kind="checkpoint" direction={groupIndex % 2 ? 'right' : 'left'} staggerChildren={0.045}>
                  <div className="skill-group__head"><span>{String(groupIndex + 1).padStart(2, '0')}</span><h3>{group.title}</h3><i /></div>
                  <ul>{group.names.map((name, skillIndex) => {
                    const skill = lookup.get(name);
                    if (!skill) return null;
                    return <motion.li variants={campaignItemVariants} key={name} style={{ '--skill-order': skillIndex } as CSSProperties}><span><SkillIcon name={name} icon={skill.icon as SkillIconKey} /></span><small>{name}</small></motion.li>;
                  })}</ul>
                </ScrollMotion>
              ))}
            </div>
            <div className="skills-console__foot"><span>Frontend to deployment</span><i /><span>Built for useful products</span></div>
          </div>
        </ScrollMotion>
      </div>
    </section>
  );
}
