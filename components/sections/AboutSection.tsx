'use client';

import type { Section } from '@/lib/navigation';
import { site } from '@/lib/content/site';
import Button from '@/components/ui/Button';
import AboutProfileFrame from '@/components/about/AboutProfileFrame';

interface AboutSectionProps {
  onNavigate?: (section: Section) => void;
}

const focusAreas = [
  { label: 'Focus', value: 'Full stack applications & production systems' },
  { label: 'Based in', value: site.location },
  { label: 'Beyond code', value: 'Astronomy & space exploration' },
];

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  return (
    <section className="relative min-h-full px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-3 max-w-2xl">
          <p className="text-xs tracking-[0.28em] uppercase text-violet">About me</p>
        </div>

        <div className="about-composition">
          <AboutProfileFrame />

          <div className="about-main">
            <div className="space-y-5">
              <div className="space-card rounded-2xl p-6 md:p-8 space-y-5 text-base md:text-lg leading-relaxed text-muted text-left">
                <p>
                  I&apos;m Angelo Reychie Alejo, a Full-Stack Developer who enjoys building applications and figuring out how different parts of a system work together. I like taking a requirement or problem, understanding what needs to be done, and turning it into a working feature.
                </p>
                <p>
                  Most of my experience has involved building new features, fixing issues, improving existing systems, and working with other developers on real projects. I&apos;m comfortable learning things as I go, especially when a project requires something I haven&apos;t worked with before.
                </p>
                <p>
                  Outside of coding, I spend a lot of time reading and watching videos about astronomy, space exploration, and the universe. Space has always been something I&apos;m interested in, and it&apos;s usually what I end up reading about when I&apos;m away from development.
                </p>
              </div>

              <ul className="about-signal-grid" aria-label="About highlights">
                {focusAreas.map((item) => (
                  <li key={item.label} className="about-signal-card space-card">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-muted">{item.label}</p>
                    <p className="mt-2 text-sm text-foreground leading-relaxed">{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-actions">
              <Button onClick={() => onNavigate?.('projects')}>View Projects</Button>
              <Button onClick={() => onNavigate?.('skills')} variant="ghost">
                View Skills
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
