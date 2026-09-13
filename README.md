# Angelo Portfolio

Personal portfolio site for **Angelo Reychie Alejo** — Full-Stack Developer.

## Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Project structure

```text
app/                 # Next.js routes and global styles
components/
  layout/            # Header, Footer, cursor, transitions
  sections/          # Page sections
  hero/ about/ experience/ projects/ skills/
  space/             # Background / Three.js scene
  ui/                # Shared UI primitives
  icons/             # Icon components
lib/
  content/           # Site copy and domain data
  navigation.ts      # Section routing helpers
  motion.ts          # Shared motion tokens
public/
  images/            # Profile, icons, legacy assets
  projects/          # Project screenshots
  documents/         # Resume PDF
docs/analysis/       # Development notes and analysis
```

## Deploy

Configured for Vercel (`vercel.json`).
