'use client';

import { useReducedMotion } from 'framer-motion';

import { sections, type SectionId } from '@/lib/content/navigation-data';

interface SectionRailProps {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function SectionRail({ active, onNavigate }: SectionRailProps) {
  const reducedMotion = useReducedMotion();
  return (
    <aside className="section-rail" aria-label="Section navigation">
      <div className="section-rail__line" aria-hidden="true" />
      {sections.map((section) => (
        <button key={section.id} aria-label={`Go to ${section.label}`} aria-current={active === section.id ? 'step' : undefined} onClick={() => { onNavigate(section.id); document.getElementById(section.id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); }}>
          {section.number}<span>{section.label}</span>
        </button>
      ))}
    </aside>
  );
}
