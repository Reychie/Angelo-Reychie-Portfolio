# UI_notes

Investigation of the **current** frontend (section-swap + `animate-page-enter`).  
Logged during source inspection; completed after Chrome QA (`UI_record.md`).  
**No frontend source was modified.**

---

## Step 1 — Architecture (verified from source)

### Index

```text
app/layout.tsx
app/page.tsx                 `/` client switcher
app/globals.css
app/projects/page.tsx        `/projects` only
components/Header.tsx
components/HeroSection.tsx
components/AboutSection.tsx
components/SkillsSection.tsx
components/ExperienceSection.tsx
components/ProjectsSection.tsx
components/ContactSection.tsx
components/Footer.tsx
components/CustomCursor.tsx
lib/types.ts
lib/projects-data.ts
```

Next.js App Router. Dependencies: no Framer Motion, GSAP, Motion. Tailwind v4 via `@import "tailwindcss"` + `@theme inline` in `globals.css`. No `tailwind.config`.

### How navigation works

`Header` buttons call `onSectionChange(id)`. `app/page.tsx` holds `activeSection`. **Only one** section is mounted. The pane is:

```tsx
<div key={activeSection} className="h-full w-full overflow-y-auto animate-page-enter">
```

`key` remounts the pane on every tab. Previous section unmounts in the same commit. URL stays `/`. `html { scroll-behavior: smooth }` does not drive tab changes. `main` is `fixed inset-x-0 bottom-0 top-20 overflow-hidden`.

Header + CustomCursor stay mounted. Footer mounts only with Contact.

Animations: global keyframes in `globals.css`; pane uses `.animate-page-enter` (0.5s); each section still has its own 0.6s enters. **Two systems, both fire on remount. No exit system.**

---

## Findings (source + browser)

- Chrome Home → About t80: title already “About Me”; `page-enter` opacity 0, `translateY(30px)`; `fadeInUp` + `slideInLeft` + `slideInRight` all `running`. Hero not in the document.
- Skills t300: wrapper opacity **0.913** vs inner fade **0.815** at the same `currentTime` (~380ms) because 0.5s vs 0.6s easing curves differ. Perceived opacity ≈ product ≈ **0.74**.
- Skills/Projects: 5 and 8 `fadeInUp` nodes; delayed cards still animating after wrapper finished.
- Contact → Home t80: `opacity0: 6` plus page-enter **and** Hero slide/fade — third delay layer (`mounted`).
- `/projects`: no header, no `page-enter`, only `fadeInUp`.

---

## Root causes

### Root Cause #1 — Instant unmount; enter-only remount via `key`

**File:**  
`c:\Users\User\angelo_portfolio\angelo_portfolio\app\page.tsx`

**Relevant component:** `Home`

**Relevant CSS class:** `animate-page-enter`

**Relevant Code:**

```tsx
const [activeSection, setActiveSection] = useState<Section>('home');

<main className="fixed inset-x-0 bottom-0 top-20 overflow-hidden">
  <div key={activeSection} className="h-full w-full overflow-y-auto animate-page-enter">
    {activeSection === 'home' && <HeroSection onNavigate={setActiveSection} />}
    {activeSection === 'about' && <AboutSection onNavigate={setActiveSection} />}
    {activeSection === 'skills' && <SkillsSection />}
    {activeSection === 'experience' && <ExperienceSection />}
    {activeSection === 'projects' && <ProjectsSection />}
    {activeSection === 'contact' && (
      <>
        <ContactSection />
        <Footer />
      </>
    )}
  </div>
</main>
```

**Problem:**  
Changing tabs remounts the incoming tree and **destroys** the outgoing tree immediately. There is no `AnimatePresence`, no exit keyframe, no overlapping views.

**Why It Causes Unsmooth or Inconsistent Animation:**  
React commits: old section removed, new section inserted at opacity 0 / translateY(30px). The eye sees a **cut**, then a fade-up. Smooth page transitions require the old view to interpolate out while the new view interpolates in. CSS cannot animate an unmounted node. `animate-page-enter` has no pair. Chrome confirmed the title swap at t80 with wrapper opacity still 0.

**Affected Pages/Components:**  
Every header tab: Home, About, Skills, Experience, Projects, Contact.

**Severity:**  
Critical

---

### Root Cause #2 — Nested duplicate enters (0.5s wrapper × 0.6s children)

**File:**  
`c:\Users\User\angelo_portfolio\angelo_portfolio\app\globals.css`  
`c:\Users\User\angelo_portfolio\angelo_portfolio\app\page.tsx`  
plus each `*Section.tsx`

**Relevant CSS class:** `.animate-page-enter`, `.animate-fadeInUp`, `.animate-slideInLeft`, `.animate-slideInRight`

**Relevant Code:**

```css
@keyframes page-enter {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-page-enter { animation: page-enter 0.5s ease-out; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
```

```tsx
<div className="text-center mb-16 animate-fadeInUp">  /* About, Skills, … */
```

**Problem:**  
The same motion (opacity 0→1, Y +30px) is applied on the parent **and** the children, with **different durations** (0.5s vs 0.6s). Slide variants add ±30px X on children. `page-enter` is **not** `forwards`; children are.

**Why It Causes Unsmooth or Inconsistent Animation:**  
Transforms compose. A heading with `fadeInUp` inside `page-enter` starts at 30px + 30px = **60px** down. Opacities multiply (Chrome Skills t300: 0.91 × 0.81 ≈ 0.74). Parent finishes at 500ms while children run to 600ms (plus stagger). The motion eases twice (`ease-out` on both), which feels like a stall then a second catch-up. This is why tab changes feel muddy rather than a single 500ms fade.

**Affected Pages/Components:**  
All sections inside the keyed wrapper. Worst on Skills/Projects (many `fadeInUp` children). About/Contact also compose X slides with Y page-enter.

**Severity:**  
Critical

---

### Root Cause #3 — Per-section enter recipes still diverge

**File:**  
`components/HeroSection.tsx`, `AboutSection.tsx`, `SkillsSection.tsx`, `ExperienceSection.tsx`, `ProjectsSection.tsx`, `ContactSection.tsx`

**Relevant Code:**

```tsx
// Hero — extra mounted gate
${mounted ? 'animate-slideInLeft' : 'opacity-0'}
${mounted ? 'animate-fadeInUp' : 'opacity-0'}

// About / Contact
animate-fadeInUp + animate-slideInLeft + animate-slideInRight

// Skills
animate-fadeInUp + style={{ animationDelay: `${i * 100}ms` }}  // 4 cards

// Projects
animate-fadeInUp + animationDelay: `${index * 60}ms`  // 6 cards + heading + CTA

// Experience
animationDelay: `${index * 120}ms`
expanded panel: className="... animate-slideInLeft"  // default expandedId === 0
```

**Problem:**  
A shared wrapper was added, but inner one-shot classes were not removed or unified. Each remount replays a **different choreography**.

**Why It Causes Unsmooth or Inconsistent Animation:**  
About always comes from left+right. Skills only rises, with 100ms card lag after the 0.5s pane. Projects uses 60ms. Experience uses 120ms **and** a left slide on the open job. Home waits for `useEffect` then plays 0.6s on top of 0.5s. Users read this as “every page has a different transition,” because they do.

**Affected Pages/Components:**  
All six header targets.

**Severity:**  
High

---

### Root Cause #4 — Hero `mounted` gate on every Home visit

**File:**  
`c:\Users\User\angelo_portfolio\angelo_portfolio\components\HeroSection.tsx`

**Relevant CSS class:** `opacity-0`, `animate-slideInLeft`, `animate-fadeInUp`

**Relevant Code:**

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);

<div className={`... ${mounted ? 'animate-slideInLeft' : 'opacity-0'}`}>
<div className={`... ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
```

**Problem:**  
Because Home remounts on tab change, this is not only a first-load hydration trick. Every click on Home starts with hidden photo/copy (`opacity0: 6` in Chrome), then a second 0.6s animation after `useEffect`.

**Why It Causes Unsmooth or Inconsistent Animation:**  
Other tabs attach inner animations on first paint of the remount. Home is **one frame (or more) later** and looks emptier (load screenshot t70: faint hero). Combined with `page-enter`, Home is the most delayed, so it “feels different from other pages.”

**Affected Pages/Components:**  
Hero / Home, including Contact → Home.

**Severity:**  
High

---

### Root Cause #5 — Missing AnimatePresence / exit configuration

**File:**  
Project-wide. `package.json` has no animation library. No `template.tsx`.

**Relevant Code:**  
None. Absence of:

- `AnimatePresence` + `initial` / `animate` / `exit`
- CSS View Transitions
- A second stacked pane for the outgoing section

**Problem:**  
Enter exists (`page-enter`). Exit does not. Libraries that support exit require the outgoing component to stay mounted until the exit tween ends.

**Why It Causes Unsmooth or Inconsistent Animation:**  
The new pane’s 0.5s fade-up plays against a **hard cut** of the old pane. That mismatch (0ms out / 500ms in) is the definition of an unsmooth page change.

**Affected Pages/Components:**  
All header switches.

**Severity:**  
High

---

### Root Cause #6 — Header chrome is a different transition language

**File:**  
`c:\Users\User\angelo_portfolio\angelo_portfolio\components\Header.tsx`

**Relevant CSS class:** `transition-all duration-300`, `hover-scale`, `backdrop-blur-xl`

**Relevant Code:**

```tsx
const handleNavigate = (section: Section) => {
  onSectionChange(section);
  setMenuOpen(false);
};

className="relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300"
style={active
  ? { background: 'linear-gradient(135deg, #1e40af, #d4af37)', color: '#ffffff' }
  : { color: '#94a3b8', background: 'transparent' }}
```

**Problem:**  
Active pill is a style swap (`transition: all` 300ms), not a shared-element slide. `transition-all` can interpolate unexpected properties. Header does not remount (good) but its 300ms / `all` / gradient fill does not match pane 500ms ease-out translate.

**Why It Causes Unsmooth or Inconsistent Animation:**  
The gold background pops onto the clicked label while the main pane is still opacity 0. Chrome: `aria-current="page"` already About while About pane opacity is 0. Header and content are desynchronized.

**Affected Pages/Components:**  
Header vs all sections.

**Severity:**  
Medium

---

### Root Cause #7 — Contact-only Footer remount

**File:**  
`app/page.tsx`, `components/Footer.tsx`

**Relevant Code:**

```tsx
{activeSection === 'contact' && (
  <>
    <ContactSection />
    <Footer />
  </>
)}
```

**Problem:**  
Footer has no animation class. It appears only on Contact, inside the keyed wrapper.

**Why It Causes Unsmooth or Inconsistent Animation:**  
Contact’s document structure is taller and unique. Footer is fully opaque in CSS while riding `page-enter`, then sits still while form `slideInLeft` (0.6s) continues. Other pages have no footer. Inconsistent page geometry and timing.

**Affected Pages/Components:**  
Contact vs every other tab.

**Severity:**  
Medium

---

### Root Cause #8 — Paint-heavy loops remount with every tab

**File:**  
Section backgrounds + `Header.tsx` + `CustomCursor.tsx` + `globals.css` `.hover-lift`

**Relevant Code:**

```css
.hover-lift { transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); }
```

```tsx
className="fixed top-0 ... h-20 backdrop-blur-xl ..."
cursorRef.current.style.left = e.clientX + 'px';
```

Hero/About `filter: blur(12px|16px)`. Infinite `animate-float`, `animate-pulse`, `animate-rotate-slow` live **inside** the remounted section, so they **restart** every visit. Chrome Skills t80: **16** running animations; Projects: **17**.

**Problem:**  
GPU-friendly keyframes (`transform`/`opacity`) are swamped by blur, backdrop-filter, `transition: all`, box-shadow hover, and JS `left`/`top` cursor writes, all during the 500–600ms enter window.

**Why It Causes Unsmooth or Inconsistent Animation:**  
Main-thread and paint work during the nested enter. Tabs with more nodes (Projects 8 fades) hitch more than About (1 fade + 2 slides). Inconsistency is partly **cost**, not only choreography.

**Affected Pages/Components:**  
All `/` sections; cursor and header globally on `/`.

**Severity:**  
Medium

---

### Root Cause #9 — `/projects` uses a third animation path

**File:**  
`c:\Users\User\angelo_portfolio\angelo_portfolio\app\projects\page.tsx`

**Relevant CSS class:** `animate-fadeInUp` only (no `animate-page-enter`)

**Relevant Code:**  
Heading and cards use `animate-fadeInUp` with `animationDelay: ${index * 60}ms`. No Header. Real App Router remount.

**Problem:**  
Header “Projects” is in-page state. `/projects` is a route. Chrome: `pageEnter: null`, `header: false`, 7 `fadeInUp` running.

**Why It Causes Unsmooth or Inconsistent Animation:**  
If the user opens `/projects` they get a single-layer 0.6s fade, not the nested 0.5×0.6 header-tab motion. Two “Projects” experiences.

**Affected Pages/Components:**  
`ProjectsSection` vs `app/projects/page.tsx`.

**Severity:**  
Medium

---

### Root Cause #10 — Unused / conflicting motion tokens

**File:**  
`app/globals.css`, `app/layout.tsx`

**Relevant Code:**

```css
.animate-slideInTop { animation: slideInTop 0.5s ease-out forwards; } /* unused in TSX */
html { scroll-behavior: smooth; scroll-padding-top: 6rem; }
```

```tsx
<html className="... scroll-smooth">
```

**Problem:**  
0.5s utilities exist unused; live inner enters are 0.6s; pane enter is 0.5s. Document smooth-scroll no longer serves header nav (`overflow-hidden` pane). `body { font-family: Arial }` ignores Geist variables.

**Why It Causes Unsmooth or Inconsistent Animation:**  
Low direct hitch. Shows there is still no single timing token. `scroll-smooth` is leftover from hash nav and can surprise in-pane `overflow-y-auto` scrolling.

**Affected Pages/Components:**  
Global.

**Severity:**  
Low

---

## Main Question 1

**Why are transitions not smooth when navigating from one page to another?**

Because navigation is a **React remount with no exit**. `key={activeSection}` deletes the old section and inserts a new pane at `opacity: 0; transform: translateY(30px)`. Chrome sees the new title at t80 while that pane is still fully transparent. Simultaneously, children start **the same fade/slide again** at 0.6s. Nested opacities multiply and nested `translateY(30px)` adds. The old view cannot fade out (it is unmounted). Header’s gold pill is already on the new tab (`transition-all` 300ms) while content is still invisible. That cut + double ease-out + header/content desync is the unsmooth “page” change — not a mistuned single tween.

---

## Main Question 2

**Why are animations inconsistent between pages?**

Two reasons, both in code:

1. **Architecture:** every tab remounts, so inner classes **replay**, and those classes were never unified.
2. **Separate implementations:** Hero adds a `mounted` / `opacity-0` delay; About/Contact use left+right slides; Skills staggers 100ms (5 fades); Projects 60ms (8 fades); Experience 120ms plus default `slideInLeft` on the open job; Contact also mounts Footer. The shared `animate-page-enter` (0.5s up) is the only common layer, and it **stacks** with those differences instead of replacing them.

No Framer Motion. No shared `<PageTransition>` config. `/projects` is a third path (route remount, no pane wrapper).

---

## Main Question 3

See Root Causes #1–#10. Primary files: `app/page.tsx`, `app/globals.css`, `components/HeroSection.tsx`, and each section TSX.

---

## Final comparison

| Page | Animation Type | Duration | Delay | Easing | Enter Animation | Exit Animation | Implementation | Consistent? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Wrapper (all tabs) | CSS `page-enter` | 0.5s | 0 | ease-out | opacity 0→1, Y +30px | None | `app/page.tsx` + `globals.css` | Shared shell |
| Hero / Home | page-enter + mounted gate + fade/slide | 0.5s then 0.6s | useEffect | ease-out | Photo left, copy up | Instant unmount | `HeroSection.tsx` | No |
| About | page-enter + fade + L/R slide | 0.5s + 0.6s | 0 | ease-out | Up + left + right (nested) | Instant unmount | `AboutSection.tsx` | No |
| Skills | page-enter + 5× fadeInUp | 0.5s + 0.6s | cards i×100ms | ease-out | Up only, stagger after pane | Instant unmount | `SkillsSection.tsx` | No |
| Experience | page-enter + fade stagger + expand slide | 0.5s + 0.6s | cards i×120ms | ease-out | Up + left on open job | Instant unmount | `ExperienceSection.tsx` | No |
| Projects `#` | page-enter + 8× fadeInUp | 0.5s + 0.6s | cards i×60ms | ease-out | Up, densest stagger | Instant unmount | `ProjectsSection.tsx` | No |
| Contact | page-enter + fade + L/R + Footer | 0.5s + 0.6s | 0 | ease-out | Up + left + right; footer no extra | Instant unmount | `ContactSection.tsx` + `Footer.tsx` | No |
| `/projects` route | fadeInUp only | 0.6s | cards i×60ms | ease-out | Up on App Router mount | Instant unmount | `app/projects/page.tsx` | Different |
| Header | CSS `transition-all` | 0.3s | 0 | (default) | Pill fill/color | None | `Header.tsx` | Different layer |

---

## Final root-cause summary

1. **Primary:** Tab navigation remounts via `key={activeSection}` with **enter-only** `animate-page-enter` and **no exit** (`app/page.tsx`).

2. **Secondary:** Inner 0.6s `fadeInUp` / `slideIn*` still run inside that wrapper (`globals.css` + each section), composing transforms and opacities; Hero `mounted` gate; unequal staggers; Contact-only Footer; header 300ms `transition-all`; paint-heavy blur/cursor; `/projects` third path.

3. **Why it feels unsmooth:** Cut of the old view + double ease-out on the new view + header already “arrived” + Skills/Projects staggers outliving the 0.5s pane.

4. **Why pages differ:** Inner animations are still **implemented separately per TSX file** and now **replay on every remount**, so differences are more visible than when they only ran once at first paint.

5. **Layers:** Combination of **component mounting / missing exit (dominant)**, **CSS/TSX duplicate enters**, **no animation library**, and **performance** (blur, many simultaneous keyframes). Not App Router route transitions (URL stays `/`).

6. **Files primarily responsible:** `app/page.tsx`, `app/globals.css`, `components/HeroSection.tsx`, `AboutSection.tsx`, `SkillsSection.tsx`, `ExperienceSection.tsx`, `ProjectsSection.tsx`, `ContactSection.tsx`, `Header.tsx`. `app/layout.tsx` only leftover `scroll-smooth`. `CustomCursor.tsx` adds main-thread tracking. `app/projects/page.tsx` is the route outlier.
