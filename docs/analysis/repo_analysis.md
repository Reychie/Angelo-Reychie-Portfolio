# repo_analysis

**Repository:** https://github.com/Reychie/angelo_portfolio.git  
**Remote ref analyzed:** `origin/main` @ `d610748`  
**Fetched:** 2026-09-11  
**Source of truth direction:** Local → GitHub (this note documents GitHub only)

## Snapshot

| Item | Value |
|------|-------|
| Default branch | `main` |
| Commit | `d610748` — Enhance portfolio layout and interactivity… |
| Tracked files | 69 |
| Local HEAD relation | Same commit as `origin/main`; **uncommitted local work is ahead** |

## Architecture (GitHub)

Single-page Next.js portfolio with hash section routing (`app/page.tsx`).

Sections: Home, About, Skills, Projects, Experience, Contact.

Stack: Next.js 16, React 19, Tailwind 4, Framer Motion, Three.js / R3F.

## Complete tracked inventory (`origin/main`)

```
.gitignore
AGENTS.md
CLAUDE.md
README.md
UI_analyze.md
UI_notes.md
UI_qa_report.md
UI_record.md
app/favicon.ico
app/globals.css
app/layout.tsx
app/page.tsx
app/projects/page.tsx
codebase_analysis.md
components/AboutSection.tsx
components/BlackHoleBackground.tsx
components/ContactSection.tsx
components/CustomCursor.tsx
components/ExperienceDetail.tsx
components/ExperienceSection.tsx
components/Footer.tsx
components/Header.tsx
components/HeroSection.tsx
components/ProfileFrame.tsx
components/ProjectCard.tsx
components/ProjectsSection.tsx
components/SectionTransition.tsx
components/SkillsSection.tsx
components/icons/InterfaceIcons.tsx
components/icons/OrbitMark.tsx
components/icons/SocialIcons.tsx
components/icons/TechIcons.tsx
components/skills/SkillCategory.tsx
components/skills/SkillItem.tsx
components/space/AmbientGlow.tsx
components/space/BlackHole.tsx
components/space/NightSkyOverlay.tsx
components/space/SpaceBackground.tsx
components/space/blackHoleShader.ts
components/ui/Button.tsx
components/ui/NavigationItem.tsx
components/ui/SocialButton.tsx
eslint.config.mjs
finding_note.md
lib/experience-data.ts
lib/motion.ts
lib/projects-data.ts
lib/site.ts
lib/skills-data.ts
lib/types.ts
next.config.ts
package-lock.json
package.json
postcss.config.mjs
public/file.svg
public/globe.svg
public/images/vscode-logo.png
public/next.svg
public/profile-portrait.jpg
public/projects/ne-attend.svg
public/projects/orbit-desk.svg
public/projects/signal-board.svg
public/resume.pdf
public/vercel.svg
public/window.svg
remote_repo_analysis.md
tsconfig.json
vercel.json
```

## Files NOT on GitHub (present only in local working tree)

- `components/AboutProfileFrame.tsx`
- `public/images/alejo_profile.jpg`
- `public/images/kevin_profile.jpg`

---

## FILE: components/AboutSection.tsx

**STATUS ON GITHUB:** Present (outdated vs local)

SOURCE:
```tsx
'use client';

import type { Section } from '@/lib/types';
import { site } from '@/lib/site';
import Button from '@/components/ui/Button';

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
          <div className="about-orbit-panel" aria-hidden="true">
            <span className="about-orbit about-orbit-a" />
            <span className="about-orbit about-orbit-b" />
            <span className="about-orbit-core" />
            <span className="about-orbit-glow" />
          </div>

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

**STATUS ON GITHUB:** Present (outdated vs local)

SOURCE:
```tsx
import { site } from '@/lib/site';
import Button from '@/components/ui/Button';
import SocialButton from '@/components/ui/SocialButton';

export default function ContactSection() {
  return (
    <section className="relative min-h-full px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.28em] uppercase text-violet">Contact</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Open to new opportunities
          </h2>
          <p className="text-base text-muted leading-relaxed">
            I’m available for professional opportunities, projects, collaborations, and other development work.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 rounded-2xl space-card p-6 text-left">
          <div className="space-y-1">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="text-lg text-foreground hover:text-violet interactive-link break-all"
            >
              {site.email}
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Location</p>
            <p className="text-foreground">{site.location}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <SocialButton platform="github" labeled />
          <SocialButton platform="linkedin" labeled />
          <Button href={site.resumePath} download variant="ghost">
            Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
```

---

## FILE: components/SkillsSection.tsx

**STATUS ON GITHUB:** Present (outdated vs local)

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
            Technical Toolkit
          </h2>
          <p className="text-base text-muted leading-relaxed">
            A structured view of the languages, frameworks, and tools used to ship production work —
            demonstrated in Projects and Experience.
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

**STATUS ON GITHUB:** Present (outdated vs local) — 873 lines on GitHub

**GitHub About styling:** uses `.about-orbit-panel`, `.about-orbit`, `.about-orbit-core`, `.about-orbit-glow`, `@keyframes about-orbit-drift`  
**GitHub Contact styling:** no `.contact-shell` / `.contact-status` / `.contact-info-card` system  
**Full GitHub dump:** exported during sync to `_sync_exports/gh_globals.css` (temporary; not committed)

---

## Matching implementation files (identical at HEAD)

These exist on GitHub at `d610748` and match the last committed local versions (pre–working-tree changes):

`app/layout.tsx`, `app/page.tsx`, `app/projects/page.tsx`,  
`components/ExperienceDetail.tsx`, `components/ExperienceSection.tsx`, `components/ProjectCard.tsx`, `components/ProjectsSection.tsx`,  
`components/HeroSection.tsx`, `components/Header.tsx`, `components/ProfileFrame.tsx`, `components/SectionTransition.tsx`,  
`components/CustomCursor.tsx`, `components/Footer.tsx`, space/*, ui/*, icons/*, skills/*,  
`lib/*`, `package.json`, `next.config.ts`, `vercel.json`, public assets listed above.

## Deployed site observation

https://angelo-alejo-portfolio.vercel.app/ still reflects older/plain Contact and About orbit panel behavior relative to the current local working tree because the newest local files were never committed/pushed.
