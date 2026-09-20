'use client';

import { Atmosphere } from '@/components/animations/Atmosphere';
import { Reveal } from '@/components/animations/Reveal';
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from '@/components/icons/InterfaceIcons';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { site } from '@/lib/content/site';

export function ContactSection() {
  return (
    <section id="contact" className="contact panel section-pad">
      <Atmosphere src="/images/space/lunar-contact.png" className="contact-atmosphere" position="78% 62%" strength={38} />
      <div className="contact-scrim" aria-hidden="true" />
      <div className="page-grid contact-layout">
        <Reveal className="contact-copy">
          <SectionLabel number="06" label="Contact" />
          <h2>Open to new<br />opportunities</h2>
          <p>I’m available for professional opportunities, projects, collaborations, and other development work.</p>
          <div className="contact-availability"><span aria-hidden="true" /><strong>Available for new roles</strong><i>Professional · Project · Collaboration</i></div>
          <div className="contact-actions">
            <TextLink href={`mailto:${site.email}`} primary>Send an email</TextLink>
            <a className="linkedin-link" href={site.social.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon />Connect on LinkedIn<ArrowUpRight />
            </a>
          </div>
        </Reveal>
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
