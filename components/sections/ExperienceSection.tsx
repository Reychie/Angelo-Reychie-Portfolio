'use client';

import { motion } from 'framer-motion';

import { Atmosphere } from '@/components/animations/Atmosphere';
import { CampaignScene } from '@/components/animations/OrbitalCampaign';
import { campaignGridVariants, campaignHeadingVariants, campaignItemVariants, scrollMotionItemVariants, ScrollMotion } from '@/components/animations/ScrollMotion';
import { SkillIcon } from '@/components/icons/TechIcons';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { experiences, technologyIcons } from '@/lib/content/experience-data';

export function ExperienceSection() {
  const role = experiences[0];
  const roleSummary = `${role.description.split('. ')[0]}.`;

  return (
    <section id="experience" className="experience panel section-pad">
      <CampaignScene variant="trajectory" />
      <Atmosphere src="/images/space/planet-edge.png" className="experience-atmosphere" position="78% center" strength={46} />
      <div className="experience-scrim" aria-hidden="true" />
      <div className="page-grid experience-layout">
        <ScrollMotion className="experience-heading" kind="group" staggerChildren={0.1}>
          <motion.div variants={scrollMotionItemVariants}><SectionLabel number="04" label="Experience" /></motion.div>
          <motion.h2 variants={campaignHeadingVariants}>A Practical Path<br />Through Real Work</motion.h2>
          <motion.p variants={scrollMotionItemVariants}>My professional experience, including the roles, projects, and responsibilities I’ve worked on.</motion.p>
        </ScrollMotion>
        <ScrollMotion className="timeline experience-role" delay={0.1} kind="timeline" direction="right" staggerChildren={0.09}>
          <ScrollMotion className="timeline__line" kind="line" amount={0.35} />
          <motion.ol variants={campaignItemVariants} aria-label="Experience timeline">
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
          </motion.ol>
          <motion.div className="experience-stack" variants={campaignItemVariants} aria-label="Technology stack used at Compassionate Home Health Services">
            <div className="experience-stack__label"><span>Stack architecture</span><i /></div>
            <motion.div className="experience-stack__grid" variants={campaignGridVariants}>
              {role.technologies.map((technology, index) => (
                <motion.div className="experience-tech" variants={campaignItemVariants} key={technology}>
                  <span className="experience-tech__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="experience-tech__icon"><SkillIcon name={technology} icon={technologyIcons[technology as keyof typeof technologyIcons]} /></span>
                  <strong>{technology}</strong>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </ScrollMotion>
      </div>
    </section>
  );
}
