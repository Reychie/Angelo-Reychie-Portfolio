'use client';

import type { Section } from '@/lib/navigation';
import { site } from '@/lib/content/site';
import Button from '@/components/ui/Button';
import ProfileFrame from '@/components/hero/ProfileFrame';
import { ArrowUpRightIcon } from '@/components/icons/InterfaceIcons';
import { GitHubIcon, LinkedInIcon } from '@/components/icons/SocialIcons';

const socialLinks = [
  { href: site.social.github, label: 'GitHub', icon: GitHubIcon },
  { href: site.social.linkedin, label: 'LinkedIn', icon: LinkedInIcon },
];

function SocialLink({ href, label, icon: Icon }: { href: string; label: string; icon: typeof GitHubIcon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label={label}>
      <Icon />
      <span>{label}</span>
      <ArrowUpRightIcon className="w-3.5 h-3.5" />
    </a>
  );
} 

interface HeroSectionProps {
  onNavigate?: (section: Section) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-full flex items-center px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="w-full max-w-[82rem] mx-auto hero-grid">
        <div className="max-w-xl lg:max-w-2xl space-y-7">

          <p className="hero-badge">
            <span className="hero-badge-dot" />
            Developer in Orbit
          </p>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
              {site.name}
            </h1>
            <p className="text-lg md:text-xl">
              <span className="text-gradient">{site.role}</span>
            </p>
          </div>

          <p className="text-base md:text-lg leading-relaxed text-muted max-w-lg">{site.tagline}</p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={() => onNavigate?.('projects')}>View Projects</Button>
            <Button href={site.resumePath} external variant="ghost">
              View Resume
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {socialLinks.map((link) => <SocialLink key={link.label} {...link} />)}
          </div>
        </div>
        <ProfileFrame />
      </div>
    </section>
  );
}
