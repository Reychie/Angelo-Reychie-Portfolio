# codebase_analysis

**Workspace:** `c:\Users\User\angelo_portfolio\angelo_portfolio`  
**Source of truth:** CURRENT LOCAL WORKING TREE  
**Dev server:** `npm run dev` → http://localhost:3000  
**Analyzed:** 2026-09-11

## Architecture

| Concern | Implementation |
|---------|----------------|
| Routing | SPA hash sections in `app/page.tsx` (`home`, `about`, `skills`, `projects`, `experience`, `contact`) |
| Layout | `app/layout.tsx` + fixed `SpaceBackground` + `Header` + `SectionTransition` |
| Theme | CSS variables in `app/globals.css` (`--accent`, `--violet`, `--surface`, etc.) |
| Motion | Framer Motion (`lib/motion.ts`, `SectionTransition`) + CSS transitions |
| Data | `lib/site.ts`, `lib/experience-data.ts`, `lib/projects-data.ts`, `lib/skills-data.ts` |

## Local inventory (implementation-critical)

### App
- `app/page.tsx` — section switcher
- `app/layout.tsx` — fonts/metadata
- `app/globals.css` — design system + About profile + Contact shell styles
- `app/projects/page.tsx` — redirect to `/#projects`

### Components (pages/sections)
- `components/HeroSection.tsx`
- `components/AboutSection.tsx` ← uses AboutProfileFrame
- `components/AboutProfileFrame.tsx` ← NEW local-only
- `components/SkillsSection.tsx`
- `components/ProjectsSection.tsx`
- `components/ProjectCard.tsx`
- `components/ExperienceSection.tsx`
- `components/ExperienceDetail.tsx`
- `components/ContactSection.tsx`
- `components/Header.tsx`, `Footer.tsx`, `ProfileFrame.tsx`, `CustomCursor.tsx`, `SectionTransition.tsx`

### Supporting
- `components/ui/*`, `components/icons/*`, `components/skills/*`, `components/space/*`
- `lib/*`

### Public assets (local)
- `public/images/alejo_profile.jpg` ← NEW
- `public/images/kevin_profile.jpg` ← NEW
- `public/images/vscode-logo.png`
- `public/profile-portrait.jpg`
- `public/projects/*.svg`
- `public/resume.pdf`

---

## FILE: components/AboutProfileFrame.tsx

**STATUS:** LOCAL ONLY (not on GitHub)

SOURCE:
```tsx
'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

const DRAG_THRESHOLD = 5;

export default function AboutProfileFrame() {
  const [revealed, setRevealed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const draggingRef = useRef(false);
  const originRef = useRef<{ x: number; y: number } | null>(null);

  const resetReveal = useCallback(() => {
    draggingRef.current = false;
    originRef.current = null;
    setRevealed(false);
  }, []);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    originRef.current = { x: event.clientX, y: event.clientY };
    draggingRef.current = false;
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || !originRef.current) return;
    if ((event.buttons & 1) === 0) {
      resetReveal();
      return;
    }

    const dx = event.clientX - originRef.current.x;
    const dy = event.clientY - originRef.current.y;
    if (!draggingRef.current && Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
      draggingRef.current = true;
      setRevealed(true);
    }
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetReveal();
  }

  return (
    <div className="about-profile-wrap">
      <div
        className={`about-profile-frame${revealed ? ' about-profile-frame-revealed' : ''}`}
        role="img"
        aria-label="Portrait of Angelo Reychie Alejo. Drag inside the frame for an alternate view."
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={resetReveal}
        onLostPointerCapture={resetReveal}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          resetReveal();
        }}
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="about-profile-orbit about-profile-orbit-one" aria-hidden="true" />
        <div className="about-profile-orbit about-profile-orbit-two" aria-hidden="true" />

        <div className="about-profile-image-wrap">
          <Image
            src="/images/alejo_profile.jpg"
            alt="Angelo Reychie Alejo"
            fill
            sizes="(max-width: 899px) 14.5rem, 15rem"
            className={`about-profile-image about-profile-image-primary${revealed ? ' is-hidden' : ''}`}
            draggable={false}
            priority
          />
          <Image
            src="/images/kevin_profile.jpg"
            alt=""
            fill
            sizes="(max-width: 899px) 14.5rem, 15rem"
            className={`about-profile-image about-profile-image-alt${revealed ? ' is-visible' : ''}`}
            draggable={false}
            aria-hidden="true"
          />
          <div className="about-profile-scan" aria-hidden="true" />
        </div>

        <div
          className={`about-profile-corner${isFocused || revealed ? ' about-profile-corner-active' : ''}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
```

---

## FILE: components/AboutSection.tsx

SOURCE:
```tsx
'use client';

import type { Section } from '@/lib/types';
import { site } from '@/lib/site';
import Button from '@/components/ui/Button';
import AboutProfileFrame from '@/components/AboutProfileFrame';

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
      <div className="about-layout max-w-5xl mx-auto md:mr-auto md:ml-0 lg:ml-4 space-y-8">
        <div className="space-y-3 max-w-2xl">
          <p className="text-xs tracking-[0.28em] uppercase text-violet">About me</p>
        </div>

        <div className="about-composition">
          <AboutProfileFrame />

          <div className="space-y-5">
            <div className="space-card rounded-2xl p-6 md:p-8 space-y-5 text-base md:text-lg leading-relaxed text-muted text-left">
              <p>
                I&apos;m Angelo Reychie Alejo, a Full Stack Developer who enjoys building applications and figuring out how different parts of a system work together. I like taking a requirement or problem, understanding what needs to be done, and turning it into a working feature.
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
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={() => onNavigate?.('projects')}>View Projects</Button>
          <Button onClick={() => onNavigate?.('skills')} variant="ghost">
            View Skills
          </Button>
        </div>
      </div>
    </section>
  );
}
```

---

## FILE: components/ContactSection.tsx

SOURCE:
```tsx
import { site } from '@/lib/site';
import Button from '@/components/ui/Button';
import SocialButton from '@/components/ui/SocialButton';

export default function ContactSection() {
  return (
    <section className="relative min-h-full px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="contact-layout max-w-3xl mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.28em] uppercase text-violet">Contact</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Open to new opportunities
          </h2>
          <p className="text-base text-muted leading-relaxed">
            I’m available for professional opportunities, projects, collaborations, and other development work.
          </p>
        </div>

        <div className="contact-shell space-card">
          <div className="contact-shell-glow" aria-hidden="true" />
          <div className="contact-shell-orbit" aria-hidden="true" />

          <div className="contact-status">
            <span className="contact-status-dot" aria-hidden="true" />
            <span>Available for new roles</span>
          </div>

          <div className="contact-card-grid">
            <a href={`mailto:${site.email}`} className="contact-info-card contact-info-card-email">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Email</p>
              <p className="contact-info-value break-all">{site.email}</p>
              <span className="contact-info-hint">Send a message ↗</span>
            </a>

            <div className="contact-info-card">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Location</p>
              <p className="contact-info-value">{site.location}</p>
              <span className="contact-info-hint">Remote-friendly</span>
            </div>
          </div>

          <div className="contact-actions">
            <Button href={`mailto:${site.email}`}>Email Me</Button>
            <SocialButton platform="github" labeled />
            <SocialButton platform="linkedin" labeled />
            <Button href={site.resumePath} download variant="ghost">
              Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## FILE: components/SkillsSection.tsx

SOURCE:
```tsx
import { skillCategories } from '@/lib/skills-data';
import SkillCategory from '@/components/skills/SkillCategory';

export default function SkillsSection() {
  return (
    <section className="relative min-h-full px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs tracking-[0.28em] uppercase text-violet">Skills</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Technical Skills
          </h2>
          <p className="text-base text-muted leading-relaxed">
            Languages, frameworks, platforms, and tools I use to build and maintain software applications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {skillCategories.map((category) => (
            <SkillCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## FILE: app/globals.css

**Local length:** ~1060+ lines  
**Key local-only style systems:**
- `.about-profile-*` (interactive dual-image frame)
- `.contact-shell`, `.contact-status`, `.contact-info-card`, `.contact-actions`
- Removed GitHub’s decorative-only `.about-orbit-panel` block in favor of profile frame styles

(Full file is on disk at `app/globals.css` — too large to duplicate twice; treated as authoritative local file.)

---

## FILE: public/images/alejo_profile.jpg

**STATUS:** LOCAL ONLY — default About portrait (128093 bytes)

## FILE: public/images/kevin_profile.jpg

**STATUS:** LOCAL ONLY — drag-reveal alternate portrait (68629 bytes)

---

## Local runtime visual checklist (npm run dev)

| Section | Expected local behavior |
|---------|-------------------------|
| Home | Hero + ProfileFrame + black hole background |
| About | alejo_profile default; drag reveals kevin_profile; signal cards |
| Skills | Heading “Technical Skills”; updated description |
| Projects | “Projects I’ve Built”; Case Study / GitHub / View Project buttons |
| Experience | Compact timeline + modal detail |
| Contact | Status chip, email/location cards, Email Me + socials + Resume |

## Already committed on GitHub (matches local HEAD, not working tree)

Experience modal system, ProjectCard button styles, site email, projects/experience copy from prior commit `d610748` are already on GitHub. Only the newer About/Contact/Skills/CSS/assets working-tree changes remain unsynced.
