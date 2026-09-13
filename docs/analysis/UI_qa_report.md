# UI QA Report — Developer in Orbit

Date: 2026-09-08  
Server: `npm run dev` → http://localhost:3000  
Method: source inspection + headless Chromium CDP (`scripts/qa-browser.js`) + `npm run build` (prior)

## Verdict

The redesign architecture is implemented and working in the browser: persistent WebGL black hole, one motion system, simplified nav, evidence-style project cards, GitHub/LinkedIn/Resume still present.

It is **not production-ready** until real screenshots, personal social/repo URLs, and a real resume PDF replace current placeholders.

## Automated browser results

| Check | Result |
| --- | --- |
| Home load | H1 `Angelo Reychie Alejo`, Geist, `#05070b` |
| Canvas | Present on every section |
| Canvas after repeated nav | Still present (persistent) |
| Skills tab | Absent |
| Legacy anim classes | 0 |
| Work / Experience / About / Contact | All navigate, `aria-current` correct, hashes update |
| GitHub / LinkedIn header buttons | Present, `https://github.com` / `https://linkedin.com` |
| Resume links | Present (`/resume.pdf`) |
| Project cards | 3 cards with screenshot, title, role, stack, Case Study, GitHub |
| Viewports 1440–375 | No horizontal overflow; canvas present |
| Console errors (CDP) | None captured |
| Browser warning (Next log) | `THREE.Clock` deprecated (R3F internal) |

## Issues found

### 1 — Project GitHub / social URLs are generic
**Observed:** Header GitHub/LinkedIn and card GitHub open site roots, not a profile or repo.  
**Expected:** Personal profile and project repositories.  
**Root cause:** `lib/site.ts` and `lib/projects-data.ts` still use the original placeholder URLs.  
**File:** `lib/site.ts`, `lib/projects-data.ts`  
**Priority:** High (content)

### 2 — Screenshots are SVG UI mockups
**Observed:** Cards load `/projects/*.svg` product-UI illustrations.  
**Expected:** Real application screenshots.  
**Root cause:** Repo had no PNG/JPG project captures.  
**File:** `public/projects/*`, `lib/projects-data.ts`  
**Priority:** High (content)

### 3 — Resume PDF is a stub
**Observed:** `/resume.pdf` is served but extremely small.  
**Expected:** Full CV.  
**File:** `public/resume.pdf`  
**Priority:** High (content)

### 4 — THREE.Clock deprecation
**Observed:** `[browser] THREE.Clock: This module has been deprecated.`  
**Expected:** No console noise.  
**Root cause:** `@react-three/fiber` still constructs `THREE.Clock` on Three r185. Not from app shader code.  
**File:** `components/BlackHoleBackground.tsx` (R3F `Canvas`)  
**Priority:** Low

### 5 — No Live Demo links
**Observed:** Cards omit Live Demo (by design when `liveUrl` is unset).  
**Expected:** Live Demo when a deploy exists.  
**Priority:** Medium (content)

## Final evaluation

1. Redesign fully implemented? **Mostly yes** (architecture/UI/motion yes; authentic assets no)
2. Black-hole visual identity? **Yes** — persistent WebGL shader + gold/blue disk
3. Background truly persistent? **Yes**
4. Section transitions smooth/consistent? **Yes** — leave 180ms + enter 420ms, same easing
5. Timings/easing consistent? **Yes** — CSS variables only
6. Duplicate animations still present? **No**
7. UI/UX professional for a developer portfolio? **Yes, directionally**
8. Still looks generic? **Partially** — layout is editorial; content still placeholder-ish
9. Color system consistent? **Yes** — near-black, muted, one gold accent
10. Dark theme properly implemented? **Yes** — dark-only
11. Theme toggle complete or incomplete? **Removed** (was incomplete; matches dark editorial brief)
12. Interactive components functional? **Yes** in tested set
13. LinkedIn and GitHub still functional? **Yes** (generic destinations)
14. Resume button functional? **Yes** (file is a stub)
15. Project links functional? **GitHub yes; Live Demo not configured**
16. Project cards implemented correctly? **Structure yes; evidence assets are mockups**
17. Responsive implementation complete? **Yes on 1440, 1280, 1024, 768, 430, 390, 375** (no overflow)
18. Black-hole animation perform well? **Configured correctly** (DPR cap, mobile quality drop); GPU-dependent
19. Accessibility issues? **Reduced-motion supported** (CSS + frozen WebGL). Custom cursor hides native pointer on fine-pointer desktops
20. Console errors/warnings? **No errors; Clock deprecation warning**
21. Broken links / missing assets? **No 404s on tested routes; social/repo URLs are placeholders**
22. Unfinished features? **Real photos, URLs, resume, live demos**
23. Missed original requirements? **Case studies are inline expanders, not separate articles; screenshots are not photographs**
24. Fix before production? **Replace mock screenshots, stub resume, and generic GitHub/LinkedIn/repo URLs with real ones**
