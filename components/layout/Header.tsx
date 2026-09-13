'use client';

import { LayoutGroup } from 'framer-motion';
import type { Section } from '@/lib/navigation';
import { NAV_LINKS } from '@/lib/navigation';
import { site } from '@/lib/content/site';
import NavigationItem from '@/components/ui/NavigationItem';
import OrbitMark from '@/components/icons/OrbitMark';

interface HeaderProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="header-bar pointer-events-auto mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-3 md:py-4">
        <button
          type="button"
          onClick={() => onSectionChange('home')}
          className="header-brand flex items-center gap-2.5 hover-scale shrink-0"
          aria-label="Go to home"
        >
          <OrbitMark className="w-7 h-7" />
          <span className="text-sm md:text-base font-semibold tracking-[0.18em] text-foreground">
            {site.shortName}
          </span>
        </button>

        <LayoutGroup>
          <nav className="header-nav nav-shell" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavigationItem
                key={link.id}
                id={link.id}
                label={link.label}
                active={activeSection === link.id}
                onSelect={onSectionChange}
              />
            ))}
          </nav>
        </LayoutGroup>

      </div>
    </header>
  );
}
