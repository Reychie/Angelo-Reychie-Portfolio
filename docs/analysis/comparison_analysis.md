# comparison_analysis

**Compared:** Local working tree (SOURCE OF TRUTH) vs `origin/main` @ `d610748`  
**Deployed:** https://angelo-alejo-portfolio.vercel.app/  
**Date:** 2026-09-11  

**Sync direction:** Local → GitHub → Vercel  

## Executive verdict

GitHub `main` is at the same commit as local HEAD, but the **correct final implementation lives in uncommitted local files**.  

Vercel therefore cannot show the latest About profile interaction, Contact shell UI, Skills copy, or profile assets until those files are committed and pushed.

No obsolete GitHub-only implementation files need deletion for this sync.

---

## Summary table

| File | Status | Required action |
|------|--------|-----------------|
| `components/AboutProfileFrame.tsx` | MISSING FROM MAIN REPOSITORY | Add |
| `public/images/alejo_profile.jpg` | MISSING FROM MAIN REPOSITORY | Add |
| `public/images/kevin_profile.jpg` | MISSING FROM MAIN REPOSITORY | Add |
| `components/AboutSection.tsx` | Different / Outdated | Replace with local |
| `components/ContactSection.tsx` | Different / Outdated | Replace with local |
| `components/SkillsSection.tsx` | Different / Outdated | Replace with local |
| `app/globals.css` | Different / Outdated | Replace with local |
| All other tracked source/assets | Match at HEAD | None |

---

## FILE: components/AboutProfileFrame.tsx

STATUS:  
MISSING FROM MAIN REPOSITORY

GITHUB REPOSITORY:  
FILE DOES NOT EXIST

LOCAL CODEBASE:  
Full interactive About profile frame (alejo default, kevin on mouse drag crossfade). See `codebase_analysis.md`.

DIFFERENCE:  
GitHub About page still uses decorative orbit panel only.

REQUIRED ACTION:  
Add this file to the GitHub repository.

---

## FILE: public/images/alejo_profile.jpg

STATUS:  
MISSING FROM MAIN REPOSITORY

GITHUB REPOSITORY:  
FILE DOES NOT EXIST

LOCAL CODEBASE:  
`public/images/alejo_profile.jpg` (128093 bytes) — default About portrait

DIFFERENCE:  
Asset required by `AboutProfileFrame` is absent remotely.

REQUIRED ACTION:  
Add this file to the GitHub repository.

---

## FILE: public/images/kevin_profile.jpg

STATUS:  
MISSING FROM MAIN REPOSITORY

GITHUB REPOSITORY:  
FILE DOES NOT EXIST

LOCAL CODEBASE:  
`public/images/kevin_profile.jpg` (68629 bytes) — drag-reveal alternate image

DIFFERENCE:  
Asset required by `AboutProfileFrame` is absent remotely.

REQUIRED ACTION:  
Add this file to the GitHub repository.

---

## FILE: components/AboutSection.tsx

STATUS:  
Different / Outdated

LOCAL CODEBASE:
```tsx
import AboutProfileFrame from '@/components/AboutProfileFrame';
// ...
<div className="about-composition">
  <AboutProfileFrame />
  ...
</div>
```

GITHUB REPOSITORY:
```tsx
<div className="about-composition">
  <div className="about-orbit-panel" aria-hidden="true">
    <span className="about-orbit about-orbit-a" />
    <span className="about-orbit about-orbit-b" />
    <span className="about-orbit-core" />
    <span className="about-orbit-glow" />
  </div>
  ...
</div>
```

DIFFERENCE:  
GitHub still renders decorative orbit panel. Local mounts interactive dual-image `AboutProfileFrame`.

REQUIRED ACTION:  
Replace with local version.

---

## FILE: components/ContactSection.tsx

STATUS:  
Different / Outdated

LOCAL CODEBASE:  
`contact-shell` with glow/orbit, availability status, interactive email/location cards, Email Me + social + Resume actions.

GITHUB REPOSITORY:  
Plain centered `max-w-2xl` layout with simple two-column email/location card and three buttons.

DIFFERENCE:  
Deployed/GitHub Contact UI is visually plainer than the correct local implementation.

REQUIRED ACTION:  
Replace with local version.

---

## FILE: components/SkillsSection.tsx

STATUS:  
Different / Outdated

LOCAL CODEBASE:
- H2: `Technical Skills`
- Description: `Languages, frameworks, platforms, and tools I use to build and maintain software applications.`

GITHUB REPOSITORY:
- H2: `Technical Toolkit`
- Description: `A structured view of the languages, frameworks, and tools used to ship production work — demonstrated in Projects and Experience.`

DIFFERENCE:  
Copy only; styling classes unchanged.

REQUIRED ACTION:  
Replace with local version.

---

## FILE: app/globals.css

STATUS:  
Different / Outdated (+281 / −76 vs origin)

LOCAL CODEBASE:  
Adds `.about-profile-*`, `.contact-*` systems; removes `.about-orbit-panel` decorative block; reduced-motion rules updated for profile frame.

GITHUB REPOSITORY:  
Older About orbit panel CSS; no Contact shell styles.

DIFFERENCE:  
Styles required by local About/Contact UI are missing remotely.

REQUIRED ACTION:  
Replace with local version.

---

## Deployed vs localhost visual deltas (pre-sync)

| Area | Localhost (correct) | Deployed Vercel (behind) |
|------|---------------------|--------------------------|
| About left panel | alejo/kevin interactive frame | Decorative orbit glow panel |
| Contact | Status + glass shell + Email Me | Simple email/location card |
| Skills heading | Technical Skills | Technical Toolkit (if on latest GH) / older depending on deploy |
| Experience / Projects | Already on GH commit `d610748` | Should match if Vercel built that commit |

Note: If Vercel still shows older Experience/Projects too, its production deploy may be pinned to an older commit; pushing this sync forces a fresh production build from `main`.

---

## POSSIBLY OBSOLETE (GitHub)

None requiring deletion for sync. Existing analysis markdowns (`UI_*.md`, `finding_note.md`, older `codebase_analysis.md`, `remote_repo_analysis.md`) are documentation-only and do not affect runtime. Left intact.

---

## Sync plan (executed after this note)

1. Stage local authoritative files listed above  
2. Commit on `main`  
3. `git push origin main`  
4. `npm run build` verify  
5. Confirm Vercel redeploys from new commit  
6. Side-by-side compare localhost ↔ deployed
