'use client';

import { motion } from 'framer-motion';

import { Atmosphere } from '@/components/animations/Atmosphere';
import { CampaignScene } from '@/components/animations/OrbitalCampaign';
import { campaignHeadingVariants, scrollMotionItemVariants, ScrollMotion } from '@/components/animations/ScrollMotion';
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from '@/components/icons/InterfaceIcons';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { site } from '@/lib/content/site';

const email = 'alejo.angeloreychie@gmail.com';
const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

export function ContactSection() {
  return (
    <section id="contact" className="contact panel section-pad">
      <CampaignScene variant="transmission" />
      <Atmosphere src="/images/space/lunar-contact.png" className="contact-atmosphere" position="78% 62%" strength={38} />
      <div className="contact-scrim" aria-hidden="true" />
      <div className="page-grid contact-layout">
        <ScrollMotion className="contact-copy" kind="group" staggerChildren={0.11}>
          <motion.div variants={scrollMotionItemVariants}><SectionLabel number="06" label="Contact" /></motion.div>
          <motion.h2 variants={campaignHeadingVariants}>Open to new<br />opportunities</motion.h2>
          <motion.p variants={scrollMotionItemVariants}>I’m available for professional opportunities, projects, collaborations, and other development work.</motion.p>
          <motion.div className="contact-availability" variants={scrollMotionItemVariants}><span aria-hidden="true" /><strong>Available for new roles</strong><i>Professional · Project · Collaboration</i></motion.div>
          <motion.div className="contact-actions" variants={scrollMotionItemVariants}>
            <TextLink href={gmailUrl} primary external>Send an Email</TextLink>
            <a className="linkedin-link" href={site.social.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon />Connect on LinkedIn<ArrowUpRight />
            </a>
          </motion.div>
        </ScrollMotion>
        <div className="contact-aside">Good<br />ideas<br />travel<br />far<i /></div>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <div><a href={site.social.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a><a href={site.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a></div>
          <span>{site.location}</span>
        </footer>
      </div>
    </section>
  );
}
