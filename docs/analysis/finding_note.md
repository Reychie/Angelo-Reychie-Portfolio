# Finding note: V0 preview vs deployed portfolio

## Executive finding

The deployed site does not appear smaller because of a different frontend implementation. The remote GitHub `main`, local workspace, and V0 implementation are synchronized at commit `91d9b0fc82536eb5d5ae6a0a9752917548b6d1f2`. The relevant UI code, CSS, viewport metadata, fonts, breakpoints, and shared containers match.

The observable difference is explained by viewport comparison and the intentional `max-w-7xl` desktop cap. A ~1902px-wide reference leaves roughly `(1902 - 1280) / 2 ≈ 311px` side space around the capped content, while a ~1595px-wide reference leaves roughly `(1595 - 1280) / 2 ≈ 157px`. The same 1280px layout therefore looks smaller relative to the wider screenshot even though its absolute component sizes are unchanged.

## Findings by area

### `app/layout.tsx` / viewport metadata
- Remote: `width: device-width`, `initialScale: 1`.
- Current: identical.
- Difference: none.
- Visual impact: rules out browser viewport scaling as the cause.
- Severity: Critical to investigate, but no defect found.
- Required fix: none.

### `app/page.tsx` / page shell
- Remote: fixed `main` with `inset-0`, overflow hidden; section transition owns scrolling.
- Current: identical.
- Difference: none.
- Visual impact: consistent viewport composition.
- Severity: Minor.
- Required fix: none.

### `Header.tsx` / navigation
- Remote/current: `max-w-7xl`, responsive gutters, centered desktop nav, mobile two-row grid.
- Difference: none.
- Visual impact: same header width and typography.
- Severity: Moderate if mismatched, not present.
- Required fix: none.

### `HeroSection.tsx` / hero composition
- Remote/current: `max-w-7xl`, responsive gutters, 1.04fr/0.96fr grid, 3.75rem maximum heading, shared buttons.
- Difference: none.
- Visual impact: identical hero proportions at equivalent viewport sizes.
- Severity: Critical if mismatched, not present.
- Required fix: none.

### `globals.css` / shared dimensions
- Remote/current: same root tokens, button dimensions, portrait frame dimensions, grid gap, nav breakpoints, and responsive portrait widths.
- Difference: none.
- Visual impact: no deploy-only CSS shrink rule exists.
- Severity: Critical if present, not present.
- Required fix: none.

### Other sections
- About, Skills, Projects, Experience, Contact, Footer, cards, icons, and interactions all use the same shared source tree and CSS classes.
- Difference: none found.
- Visual impact: no evidence of a page-specific scaling bug.
- Severity: Moderate.
- Required fix: none.

## Deployment state

The current main tree was redeployed to Vercel production as `angelo-portfolio-nqikssxi5-gelokai1.vercel.app` and aliased to `angelosystem.tech`. The Vercel preview URL is deployment-protected, so it cannot be treated as an unauthenticated visual reference. The production alias and preview should be compared with the exact same viewport dimensions and browser zoom.

## What was fixed

No blind size changes were made. The correct fix is synchronization/deployment, not enlarging every component. The repository and deployed production were brought to the current `main` build; the source already contains the V0 sizing system.

## Remaining difference

If the user wants the UI to occupy more of a very wide desktop viewport, that is a new design choice: raise or remove `max-w-7xl`, then proportionally revise hero grid and portrait sizes. It is not a bug fix and would make the 1595px screenshot wider than the supplied V0 composition. For faithful matching, keep the current cap and compare equal viewport widths, device pixel ratio, browser zoom, font load state, and deployment commit.
