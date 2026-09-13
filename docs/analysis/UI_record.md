# UI_record

Live browser QA of the **current** section-swap UI.  
`npm run dev` at http://localhost:3000 (Next.js 16.3.4, already running).  
Opened the system browser and headed Chrome 1440×900. Desktop pill nav visible.

No frontend source was modified.

---

## Environment

| Item | Value |
| --- | --- |
| Home | http://localhost:3000/ (URL hash never changes on tab clicks) |
| Extra route | http://localhost:3000/projects |
| Header | `nav[aria-label="Primary"]` buttons, not `<a href="#...">` |
| Pane | `main.fixed.top-20` + `div.key={activeSection}.animate-page-enter` |

Chrome `getAnimations()` + screenshots at load and at ~80 / ~300 / ~650ms after each tab click.

---

## Step 4 — Initial load (refresh Home)

### t ≈ 70ms (`01-t70.png`)

- Header is fully painted: AA logo, moon toggle, pill nav (Home gold), Download CV.
- Hero copy is **faint / low opacity**. Photo column barely visible. Chrome: `.animate-page-enter` **opacity 0**, `page-enter` running at currentTime 0. `fadeInUp` not attached yet (`fade: null`). **8** `.opacity-0` nodes (Hero `mounted === false` gate).
- Running: `page-enter`, `float`.

### t ≈ 270ms (`02-t270.png`)

- Hero readable. `page-enter` already at opacity 1 (0.5s animation). `fadeInUp` present and finished. 6 remaining `.opacity-0` (utility leftovers / unmounted-gated bits).
- Running names: `float` only.

### t ≈ 620–1120ms

- Visually settled Hero. Header never animated. Background orbs keep floating.

### Load notes

- Two-phase Home enter: wrapper `page-enter` 0.5s **and** Hero `opacity-0` until `useEffect`, then 0.6s `fadeInUp` / `slideInLeft`.
- First frame of the page is a dim, half-absent Hero under a solid header — sudden appearance, not a single coordinated fade.

---

## Step 5 — Home as a “page”

- Home is `activeSection === 'home'`, not a Next.js route.
- Clicking Home later **remounts** Hero (`key={activeSection}`). Contact → Home at t80: title `AngeloReychie`, `page-enter` opacity 0 + translateY(30px), **and** `fadeInUp` + `slideInLeft` running together. `opacity0: 6`.
- At t300: wrapper opacity 0.95 while inner fade 0.86 (multiplied fade).
- Animations **restart every time** you return to Home (unlike a persistent section).
- No exit when leaving Home: About replaces it in the same commit.

---

## Step 6 — Header tabs (all combinations)

Every click: URL stays `/`. Previous section **gone** at t80 (title swapped). Header `aria-current="page"` already on the new tab. Incoming pane: `transform: matrix(1,0,0,1,0,30)` (translateY 30px), opacity 0.

| Combination | t80 title | Wrapper | Inner running | fadeUpCount | Footer |
| --- | --- | --- | --- | --- | --- |
| Home → About | About Me | page-enter opacity 0, ty+30 | fadeInUp, slideInLeft, slideInRight, float, rotate-slow | 1 | no |
| About → Skills | Skills & Expertise | same | page-enter, pulse, fadeInUp | **5** | no |
| Skills → Projects | Featured Projects | same | page-enter, pulse, fadeInUp | **8** | no |
| Projects → Experience | Professional Experience | same | page-enter, pulse, fadeInUp, **slideInLeft** (expanded job) | 1+ cards | no |
| Experience → Contact | Let's Connect | same | fadeInUp, slideInLeft, slideInRight, pulse | 1 | **yes** |
| Contact → Home | AngeloReychie | same | float, slideInLeft, fadeInUp | 1 | no |
| Home → Skills | Skills & Expertise | same | 16 running at t80 | 5 | no |
| Skills → Contact | Let's Connect | same | L/R slides + fade | 1 | **yes** |
| Contact → About | About Me | same | L/R slides + fade + float + rotate | 1 | no |

### Per tab

**Home** — Extra `mounted` blank + double enter. 3 looping `float` orbs.

**About** — Heading fades up **inside** a wrapper that also fades up. Photo slides left, copy slides right. `rotate-slow` + `float` backgrounds start with the remount.

**Skills** — No L/R slides. Five `fadeInUp` (heading + 4 cards, delays 0/100/200/300ms). At t300 wrapper opacity **0.91** vs first fade **0.81** (same clock, different duration 0.5 vs 0.6). Cards with delay still incoming after the wrapper has finished.

**Projects (header)** — Eight `fadeInUp` (heading, 6 cards at 60ms stagger, View All). 17 animations at t80. Still **not** `app/projects/page.tsx`.

**Experience** — Card stagger 120ms. Default `expandedId === 0` so `animate-slideInLeft` on the open detail fires on every visit. Timeline `transition: all 0.3s` on dots.

**Contact** — Form `slideInLeft`, info `slideInRight`, heading `fadeInUp`, plus Footer with **no** enter class (footer pops at full opacity while the pane is still at opacity 0 — actually Footer is inside the keyed wrapper so it inherits page-enter opacity, but it has no extra 0.6s fade). Footer present only here.

**Previous page exit** — None. Hero is not fading out when About mounts; it is deleted. Screenshot t80 already shows About at opacity 0 sliding up, never a crossfade.

**Header** — Instant pill jump. `transition-all duration-300` on buttons (color/background), not a shared layout animation. Header itself does not remount.

---

## Step 6b — `/projects` route

- No header (`header: false`).
- No `.animate-page-enter`.
- `fadeInUp` running from opacity 0 (7 nodes). Different architecture from header Projects.

---

## Visual problems observed

1. Tab change: old view **cuts out**, new view starts **invisible and 30px down**.
2. Nested fades multiply (wrapper 0.5s × child 0.6s) → muddy, slower perceived fade; Y translations add (30px + 30px).
3. Skills/Projects keep staggering after the wrapper has finished → cards “late pop”.
4. Home is blank/dimmer than About because of `mounted`.
5. About/Contact slide sideways; Skills/Projects only move up — different language every tab.
6. Contact uniquely grows Footer.
7. Header gold pill does not interpolate position; it restyles in place.
8. `/projects` fades without the page-enter wrapper.

---

## Performance (browser)

- Skills t80: **16** running animations. Projects t80: **17**.
- Header `backdrop-blur-xl` always on.
- About photo `blur(16px)`, Hero `blur(12px)` on remount.
- Infinite `float` / `pulse` / `rotate-slow` restart on every visit (they remount with the section).
- Cursor still sets `left`/`top` every mousemove.
- No document smooth-scroll on tabs (fixed pane). Cost is now **many simultaneous CSS animations per swap**, not hash scrolling.
