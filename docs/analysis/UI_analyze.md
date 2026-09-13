# UI_analyze

Indexed from the live source tree. Each block is the complete file contents as read from disk.

Project: Next.js App Router (next ^16.3.4), React 19.2.4, Tailwind CSS 4.
Routes found: / (app/page.tsx), /projects (app/projects/page.tsx).

```text
FILE NAME:
page.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\app\page.tsx

SOURCE CODE:
'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <>
      <CustomCursor showCursor={true} />
      <Header />

      <main>
        <section id="home">
          <HeroSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>

        <section id="experience">
          <ExperienceSection />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <footer className="py-8 text-center border-t" style={{ background: '#060d1f', borderColor: 'rgba(59,130,246,0.15)' }}>
        <p className="text-sm font-medium" style={{ color: '#ffffff' }}>
          &copy; 2026 <span style={{ color: '#d4af37' }}>Angelo Reychie Alejo</span>. Crafted with care and code.
        </p>
      </footer>
    </>
  );
}
```

```text
FILE NAME:
layout.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\app\layout.tsx

SOURCE CODE:
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional Developer Portfolio",
  description: "Showcasing professional development projects and experience",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
```

```text
FILE NAME:
globals.css

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\app\globals.css

SOURCE CODE:
@import "tailwindcss";

:root {
  --background: #fafbfc;
  --foreground: #0f172a;
  --primary: #1e40af;
  --primary-light: #3b82f6;
  --primary-dark: #1e3a8a;
  --accent: #d4af37;
  --accent-light: #ffd700;
  --accent-dark: #b8860b;
  --neutral-50: #f8fafc;
  --neutral-100: #f1f5f9;
  --neutral-200: #e2e8f0;
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1e293b;
  --neutral-900: #0f172a;
  --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0f1e;
    --foreground: #f8fafc;
    --primary: #3b82f6;
    --primary-light: #60a5fa;
    --primary-dark: #1e40af;
    --accent: #d4af37;
    --accent-light: #ffd700;
    --accent-dark: #b8860b;
    --neutral-50: #0f172a;
    --neutral-100: #1e293b;
    --neutral-200: #334155;
    --neutral-300: #475569;
    --neutral-400: #64748b;
    --neutral-500: #94a3b8;
    --neutral-600: #cbd5e1;
    --neutral-700: #e2e8f0;
    --neutral-800: #f1f5f9;
    --neutral-900: #f8fafc;
  }
}

/* Class-based dark mode (toggled by JS) */
.dark {
  --background: #0a0f1e;
  --foreground: #f8fafc;
  --primary: #3b82f6;
  --primary-light: #60a5fa;
  --primary-dark: #1e40af;
  --accent: #d4af37;
  --accent-light: #ffd700;
  --accent-dark: #b8860b;
  --neutral-50: #0f172a;
  --neutral-100: #1e293b;
  --neutral-200: #334155;
  --neutral-300: #475569;
  --neutral-400: #64748b;
  --neutral-500: #94a3b8;
  --neutral-600: #cbd5e1;
  --neutral-700: #e2e8f0;
  --neutral-800: #f1f5f9;
  --neutral-900: #f8fafc;
}

/* Light mode explicit (when .dark is removed) */
:root:not(.dark) {
  --background: #fafbfc;
  --foreground: #0f172a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-light: var(--primary-light);
  --color-primary-dark: var(--primary-dark);
  --color-accent: var(--accent);
  --color-accent-light: var(--accent-light);
  --color-accent-dark: var(--accent-dark);
  --color-neutral-50: var(--neutral-50);
  --color-neutral-100: var(--neutral-100);
  --color-neutral-200: var(--neutral-200);
  --color-neutral-300: var(--neutral-300);
  --color-neutral-400: var(--neutral-400);
  --color-neutral-500: var(--neutral-500);
  --color-neutral-600: var(--neutral-600);
  --color-neutral-700: var(--neutral-700);
  --color-neutral-800: var(--neutral-800);
  --color-neutral-900: var(--neutral-900);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --radius: var(--radius);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* ========== KEYFRAME ANIMATIONS ========== */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-20px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(30, 64, 175, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(30, 64, 175, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(30, 64, 175, 0);
  }
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes text-glow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(30, 64, 175, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba(30, 64, 175, 0.6);
  }
}

@keyframes bounce-smooth {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes scale-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes rotate-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* ========== ANIMATION UTILITY CLASSES ========== */

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-slideInLeft {
  animation: slideInLeft 0.6s ease-out forwards;
}

.animate-slideInRight {
  animation: slideInRight 0.6s ease-out forwards;
}

.animate-slideInTop {
  animation: slideInTop 0.5s ease-out forwards;
}

.animate-slideInBottom {
  animation: slideInBottom 0.5s ease-out forwards;
}

.animate-glow {
  animation: glow 2s infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
  background-size: 1000px 100%;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-ring {
  animation: pulse-ring 2s infinite;
}

.animate-gradient-shift {
  animation: gradient-shift 3s ease infinite;
  background-size: 200% 200%;
}

.animate-text-glow {
  animation: text-glow 2s ease-in-out infinite;
}

.animate-bounce-smooth {
  animation: bounce-smooth 2s ease-in-out infinite;
}

.animate-scale-pulse {
  animation: scale-pulse 2s ease-in-out infinite;
}

.animate-rotate-slow {
  animation: rotate-slow 10s linear infinite;
}

/* ========== HOVER & INTERACTION EFFECTS ========== */

.hover-scale {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-scale-sm:hover {
  transform: scale(1.02);
}

.hover-scale-lg:hover {
  transform: scale(1.1);
}

.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .hover-lift:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.hover-glow:hover {
  box-shadow: 0 0 30px rgba(30, 64, 175, 0.4);
  animation: glow 1.5s ease-in-out;
}

.hover-gradient:hover {
  background-size: 200% 200%;
  animation: gradient-shift 2s ease infinite;
}

.group:hover .group-hover-scale {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.group:hover .group-hover-lift {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}

/* ========== INTERACTIVE STATES ========== */

.focus-ring {
  outline: none;
  ring: 2px;
  ring-color: var(--primary);
  ring-offset: 2px;
  border-radius: 0.5rem;
}

.focus-ring:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.active-indicator {
  position: relative;
  border-bottom: 3px solid var(--primary);
}

/* ========== TEXT & DISPLAY EFFECTS ========== */

.text-glow {
  animation: text-glow 2s ease-in-out infinite;
}

.gradient-text {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

.shimmer-text {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* ========== SCROLL BEHAVIOR ========== */

html {
  scroll-behavior: smooth;
  scroll-padding-top: 6rem;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ========== SCROLLBAR STYLING ========== */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(30, 64, 175, 0.3);
  border-radius: 4px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(30, 64, 175, 0.6);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.6);
}

/* ========== ACCESSIBILITY & MOTION ========== */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ========== UTILITY CLASSES ========== */

.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.transition-fast {
  transition: all 0.15s ease-out;
}

.transition-slow {
  transition: all 0.5s ease-in-out;
}

.backdrop-blur-xs {
  backdrop-filter: blur(2px);
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

```text
FILE NAME:
page.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\app\projects\page.tsx

SOURCE CODE:
'use client';

import { useRouter } from 'next/navigation';
import { projects } from '@/lib/projects-data';

export default function AllProjectsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #060d1f 0%, #0a0f1e 50%, #0d1b3e 100%)' }}>
      {/* ===== ANIMATED BACKGROUND ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        {/* Radial glow top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle at top right, #d4af37, transparent 70%)' }} />
        {/* Radial glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle at bottom left, #1e40af, transparent 70%)' }} />
        {/* Scattered particles */}
        {[
          { top: '5%',  left: '10%', s: 4, c: '#d4af37', d: '0s' },
          { top: '15%', left: '80%', s: 3, c: '#3b82f6', d: '0.4s' },
          { top: '35%', left: '3%',  s: 2, c: '#60a5fa', d: '0.9s' },
          { top: '55%', left: '92%', s: 4, c: '#d4af37', d: '1.3s' },
          { top: '75%', left: '15%', s: 3, c: '#3b82f6', d: '1.8s' },
          { top: '88%', left: '70%', s: 2, c: '#d4af37', d: '2.1s' },
          { top: '45%', left: '50%', s: 2, c: '#60a5fa', d: '0.6s' },
          { top: '65%', left: '38%', s: 3, c: '#d4af37', d: '1.1s' },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full animate-pulse" style={{
            top: p.top, left: p.left, width: p.s, height: p.s,
            background: p.c, opacity: 0.5, animationDelay: p.d,
          }} />
        ))}
        {/* Horizontal accent lines */}
        {[15, 35, 55, 75].map((pct) => (
          <div key={pct} className="absolute left-0 right-0 h-px opacity-5" style={{
            top: `${pct}%`,
            background: 'linear-gradient(90deg, transparent, #3b82f6 30%, #d4af37 70%, transparent)',
          }} />
        ))}
        {/* Gold corner frame — top-left */}
        <div className="absolute top-6 left-6 w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-0.5 opacity-20" style={{ background: '#d4af37' }} />
          <div className="absolute top-0 left-0 w-0.5 h-full opacity-20" style={{ background: '#d4af37' }} />
        </div>
        {/* Gold corner frame — bottom-right */}
        <div className="absolute bottom-6 right-6 w-16 h-16">
          <div className="absolute bottom-0 right-0 w-full h-0.5 opacity-20" style={{ background: '#d4af37' }} />
          <div className="absolute bottom-0 right-0 w-0.5 h-full opacity-20" style={{ background: '#d4af37' }} />
        </div>
      </div>

      {/* ===== PAGE CONTENT ===== */}
      <div className="relative px-6 py-12 max-w-7xl mx-auto" style={{ zIndex: 1 }}>

        {/* Top bar — back button + heading */}
        <div className="flex items-center justify-between mb-14">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition-all duration-300 hover-scale"
            style={{
              background: 'rgba(30,64,175,0.12)',
              borderColor: 'rgba(59,130,246,0.3)',
              color: '#93c5fd',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,175,55,0.5)';
              (e.currentTarget as HTMLButtonElement).style.color = '#d4af37';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.3)';
              (e.currentTarget as HTMLButtonElement).style.color = '#93c5fd';
            }}
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          {/* Project count badge */}
          <span className="px-3 py-1 rounded-full text-xs font-bold border" style={{
            background: 'rgba(212,175,55,0.1)',
            borderColor: 'rgba(212,175,55,0.3)',
            color: '#d4af37',
          }}>
            {projects.length} Projects
          </span>
        </div>

        {/* Page heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#d4af37' }}>Portfolio</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            All <span style={{ color: '#d4af37' }}>Projects</span>
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#94a3b8' }}>
            Every project built with passion, precision, and purpose — from concept to production.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#3b82f6' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          </div>
        </div>

        {/* All project cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              className="group relative rounded-2xl overflow-hidden border hover-lift transition-all duration-300 animate-fadeInUp"
              style={{
                background: 'rgba(13,27,62,0.8)',
                borderColor: 'rgba(59,130,246,0.2)',
                animationDelay: `${index * 60}ms`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,175,55,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(59,130,246,0.2)'; }}
            >
              {/* Animated gold top border on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, #1e40af, #d4af37, #1e40af)' }} />

              {/* Icon area */}
              <div className="relative h-36 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(30,64,175,0.15), rgba(212,175,55,0.05))' }}>
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{project.icon}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,27,62,0.6))' }} />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-base font-bold text-white mb-2 group-hover:text-accent transition-colors" style={{ '--tw-text-opacity': 1 } as React.CSSProperties}>
                  {project.title}
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748b' }}>{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 text-xs font-semibold rounded" style={{
                      background: 'rgba(59,130,246,0.15)',
                      color: '#93c5fd',
                      border: '1px solid rgba(59,130,246,0.2)',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: '#d4af37' }}>
                  View Project
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom — back to portfolio */}
        <div className="text-center mt-16">
          <button
            onClick={() => router.push('/')}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white hover-lift transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', boxShadow: '0 4px 20px rgba(59,130,246,0.25)' }}
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 text-center border-t" style={{ borderColor: 'rgba(59,130,246,0.1)' }}>
          <p className="text-xs font-medium" style={{ color: '#334155' }}>
            &copy; 2026 <span style={{ color: '#d4af37' }}>Angelo Reychie Alejo</span>. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
```

```text
FILE NAME:
Header.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\components\Header.tsx

SOURCE CODE:
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [activeLink, setActiveLink] = useState('home');

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleNavClick = (href: string) => {
    setActiveLink(href.replace('#', ''));
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl shadow-sm transition-all duration-300"
      style={{
        background: 'rgba(6,13,31,0.85)',
        borderBottom: '1px solid rgba(59,130,246,0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="#home"
              onClick={() => handleNavClick('#home')}
              className="relative group text-lg md:text-xl font-black cursor-pointer hover-scale transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #60a5fa, #d4af37, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Angelo Reychie Alejo
              <span
                className="absolute -bottom-1 left-0 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ width: '100%', background: 'linear-gradient(90deg, #60a5fa, #d4af37)' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative px-4 py-2 text-sm font-semibold transition-all duration-300 group"
                style={{
                  color: activeLink === link.href.replace('#', '') ? '#d4af37' : '#ffffff',
                }}
                onMouseEnter={e => {
                  if (activeLink !== link.href.replace('#', '')) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#d4af37';
                  }
                }}
                onMouseLeave={e => {
                  if (activeLink !== link.href.replace('#', '')) {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                  }
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-4 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeLink === link.href.replace('#', '') ? 'calc(100% - 32px)' : '0',
                    background: 'linear-gradient(90deg, #1e40af, #d4af37)',
                  }}
                />
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <details className="relative group">
              <summary className="list-none cursor-pointer p-2 rounded-lg transition-colors" style={{ color: '#ffffff' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </summary>
              <div
                className="absolute top-full right-0 mt-2 w-48 rounded-xl shadow-xl overflow-hidden"
                style={{ background: 'rgba(6,13,31,0.97)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="block px-4 py-3 text-sm font-semibold transition-all duration-200"
                    style={{
                      color: activeLink === link.href.replace('#', '') ? '#d4af37' : '#ffffff',
                      borderLeft: activeLink === link.href.replace('#', '') ? '2px solid #d4af37' : '2px solid transparent',
                      background: activeLink === link.href.replace('#', '') ? 'rgba(212,175,55,0.08)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* Compact mobile tab row */}
        <div className="hidden sm:flex lg:hidden mt-3 overflow-x-auto gap-2 -mx-6 px-6 scrollbar-hide pb-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className="whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 flex-shrink-0"
              style={
                activeLink === link.href.replace('#', '')
                  ? { background: 'linear-gradient(135deg, #1e40af, #d4af37)', color: '#ffffff' }
                  : { background: 'rgba(30,64,175,0.15)', color: '#94a3b8', border: '1px solid rgba(59,130,246,0.2)' }
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
```

```text
FILE NAME:
HeroSection.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\components\HeroSection.tsx

SOURCE CODE:
'use client';

import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 40%, #0a1628 70%, #0f172a 100%)', isolation: 'isolate' }}>
      {/* ===== ANIMATED BACKGROUND DESIGN ===== */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(30,64,175,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-20 animate-float" style={{ background: 'radial-gradient(circle, #1e40af 0%, transparent 70%)', animationDuration: '7s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full opacity-15 animate-float" style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)', animationDuration: '9s', animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full opacity-10 animate-float" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', animationDuration: '11s', animationDelay: '4s' }} />

        {/* Diagonal gold accent lines */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #d4af37 0px, #d4af37 1px, transparent 0px, transparent 50%)',
          backgroundSize: '80px 80px',
        }} />

        {/* Bottom wave shape */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10" style={{
          background: 'linear-gradient(to top, #d4af37, transparent)',
        }} />
      </div>

      {/* ===== MAIN TWO-COLUMN LAYOUT ===== */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-16" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ===== LEFT COLUMN — PHOTO ===== */}
          <div className={`flex justify-center lg:justify-start order-2 lg:order-1 ${mounted ? 'animate-slideInLeft' : 'opacity-0'}`}>
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" style={{ background: 'linear-gradient(135deg, #1e40af, #d4af37, #3b82f6)', filter: 'blur(12px)' }} />

              {/* Gold border frame */}
              <div className="relative rounded-3xl p-1" style={{ background: 'linear-gradient(135deg, #d4af37, #1e40af, #d4af37)' }}>
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] rounded-3xl overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #0d1b3e, #1a2d5a)' }}>
                  {/* Photo placeholder with professional look */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 border-accent/50" style={{ background: 'linear-gradient(135deg, #1e40af40, #d4af3740)' }}>
                      <svg className="w-16 h-16 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                      </svg>
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Your Photo Here</p>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent/70 rounded-tl-md" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-accent/70 rounded-tr-md" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-accent/70 rounded-bl-md" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent/70 rounded-br-md" />
                </div>
              </div>

              {/* Floating badge — Years */}
              <div className="absolute -bottom-4 -right-4 px-4 py-3 rounded-xl shadow-xl border border-accent/30" style={{ background: 'linear-gradient(135deg, #0d1b3e, #1a2d5a)' }}>
                <p className="text-2xl font-black text-white leading-none">5+</p>
                <p className="text-xs font-semibold" style={{ color: '#d4af37' }}>Years Exp.</p>
              </div>

              {/* Floating badge — Projects */}
              <div className="absolute -top-4 -left-4 px-4 py-3 rounded-xl shadow-xl border border-primary/30" style={{ background: 'linear-gradient(135deg, #0d1b3e, #1a2d5a)' }}>
                <p className="text-2xl font-black text-white leading-none">50+</p>
                <p className="text-xs font-semibold" style={{ color: '#3b82f6' }}>Projects</p>
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN — TEXT CONTENT ===== */}
          <div className={`order-1 lg:order-2 space-y-6 ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {/* Hello greeting */}
            <div>
              <p className="text-base md:text-lg font-semibold tracking-widest uppercase mb-2" style={{ color: '#d4af37' }}>
                Hello, I&apos;m
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight text-white">
                Angelo
                <span className="block" style={{ WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px #d4af37' }}>Reychie</span>
              </h1>
            </div>

            {/* Role title */}
            <div>
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-accent" />
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#93c5fd' }}>
                  Full-Stack Developer
                </h2>
                <div className="h-px w-8 bg-accent" />
              </div>
              <p className="text-base md:text-lg" style={{ color: '#93c5fd', opacity: 0.8 }}>
                UI/UX Enthusiast &bull; Problem Solver &bull; Innovator
              </p>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#cbd5e1' }}>
              I craft beautiful, functional web experiences with modern technologies. Specialized in creating responsive designs and scalable applications that solve real-world problems with elegance and precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-base rounded-xl overflow-hidden shadow-lg hover-lift transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', color: '#ffffff' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #3b82f6, #d4af37)' }} />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-base rounded-xl border-2 hover-lift transition-all duration-300"
                style={{ borderColor: '#d4af37', color: '#ffffff', background: 'rgba(212,175,55,0.1)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#d4af37';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#0a0f1e';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(212,175,55,0.1)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                }}
              >
                Get In Touch
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/resume.pdf"
                download
                className="group relative inline-flex items-center gap-2 px-5 h-12 rounded-xl border font-bold text-sm transition-all duration-300 hover-scale overflow-hidden"
                style={{ borderColor: 'rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.1)', color: '#ffffff' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#d4af37';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#0a0f1e';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(212,175,55,0.1)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                }}
                aria-label="Download CV"
              >
                <svg className="w-5 h-5 relative z-10 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                <span className="relative z-10">Download CV</span>
              </a>

              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 hover-scale overflow-hidden"
                style={{ borderColor: 'rgba(59,130,246,0.4)', background: 'rgba(30,64,175,0.2)', color: '#ffffff' }}
                aria-label="GitHub">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)' }} />
                <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C19.138 20.195 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 hover-scale overflow-hidden"
                style={{ borderColor: 'rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.1)', color: '#ffffff' }}
                aria-label="Facebook">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, #d4af37, #b8860b)' }} />
                <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 hover-scale overflow-hidden"
                style={{ borderColor: 'rgba(59,130,246,0.4)', background: 'rgba(30,64,175,0.2)', color: '#ffffff' }}
                aria-label="LinkedIn">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)' }} />
                <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-smooth">
        <p className="text-xs font-medium tracking-widest uppercase" style={{ color: '#d4af37', opacity: 0.7 }}>Scroll</p>
        <div className="w-px h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #d4af37, transparent)' }} />
      </div>
    </section>
  );
}
```

```text
FILE NAME:
AboutSection.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\components\AboutSection.tsx

SOURCE CODE:
'use client';

export default function AboutSection() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1a2d5a 50%, #0f172a 100%)',
        isolation: 'isolate',
      }}
    >
      {/* ═══ BACKGROUND LAYER ═══ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Large blue circle left */}
        <div
          className="animate-float"
          style={{
            position: 'absolute',
            left: '-8rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '24rem',
            height: '24rem',
            borderRadius: '9999px',
            opacity: 0.1,
            background: 'radial-gradient(circle, #1e40af, transparent 70%)',
            animationDuration: '8s',
          }}
        />
        {/* Dashed rotating arc top-right */}
        <div
          className="animate-rotate-slow"
          style={{
            position: 'absolute',
            top: '-5rem',
            right: '-5rem',
            width: '20rem',
            height: '20rem',
            borderRadius: '9999px',
            border: '2px dashed #d4af37',
            opacity: 0.1,
            animationDuration: '20s',
          }}
        />
        {/* Dashed rotating arc bottom-left */}
        <div
          className="animate-rotate-slow"
          style={{
            position: 'absolute',
            bottom: '-5rem',
            left: '-5rem',
            width: '15rem',
            height: '15rem',
            borderRadius: '9999px',
            border: '1px dashed #3b82f6',
            opacity: 0.1,
            animationDuration: '15s',
            animationDirection: 'reverse',
          }}
        />
        {/* Horizontal glow line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          opacity: 0.1,
          background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
        }} />
      </div>

      {/* ═══ CONTENT LAYER ═══ */}
      <div
        className="max-w-6xl mx-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Section heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#d4af37' }}>Who I Am</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            About{' '}
            <span style={{ WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px #d4af37' }}>Me</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#d4af37' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #3b82f6, transparent)' }} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Photo placeholder */}
          <div className="animate-slideInLeft flex justify-center">
            <div className="relative group">
              <div
                className="absolute -inset-3 rounded-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"
                style={{ background: 'linear-gradient(135deg, #1e40af, #d4af37)', filter: 'blur(16px)' }}
              />
              <div
                className="relative rounded-2xl p-1"
                style={{ background: 'linear-gradient(135deg, #d4af37, #1e40af, #d4af37)' }}
              >
                <div
                  className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'linear-gradient(145deg, #0d1b3e, #1a2d5a)' }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="w-28 h-28 rounded-full border-4 flex items-center justify-center"
                      style={{ borderColor: 'rgba(212,175,55,0.5)', background: 'rgba(30,64,175,0.3)' }}
                    >
                      <svg className="w-14 h-14" style={{ color: '#93c5fd' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#64748b' }}>Your Photo Here</p>
                  </div>
                  {/* Corner decorations */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 rounded-tl" style={{ borderColor: '#d4af37' }} />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 rounded-br" style={{ borderColor: '#d4af37' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="animate-slideInRight space-y-6">
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#ffffff' }}>
              I&apos;m a passionate full-stack developer with over 5 years of experience building web applications. My journey started with a curiosity about how things work, which evolved into a career dedicated to creating elegant solutions for complex problems.
            </p>

            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#ffffff' }}>
              I specialize in modern web technologies and love working with React, Node.js, and cloud platforms. When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, or mentoring junior developers.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { label: 'Years Exp.', value: '5+', color: '#3b82f6' },
                { label: 'Projects', value: '50+', color: '#d4af37' },
                { label: 'Clients', value: '20+', color: '#3b82f6' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl border hover-lift transition-all duration-300"
                  style={{ background: 'rgba(30,64,175,0.1)', borderColor: 'rgba(59,130,246,0.2)' }}
                >
                  <p className="text-2xl md:text-3xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs mt-1 font-medium" style={{ color: '#94a3b8' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm hover-scale transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', color: '#ffffff' }}
            >
              Get In Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```text
FILE NAME:
SkillsSection.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\components\SkillsSection.tsx

SOURCE CODE:
'use client';

export default function SkillsSection() {
  const skillCategories = [
    { category: 'Frontend', icon: '◈', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
    { category: 'Backend', icon: '◉', skills: ['Node.js', 'Python', 'Express', 'MongoDB', 'PostgreSQL'] },
    { category: 'Tools & Platforms', icon: '◫', skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Firebase'] },
    { category: 'Design', icon: '◬', skills: ['Figma', 'UI/UX Design', 'Responsive Design', 'Accessibility', 'Animation'] },
  ];

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0f1e 0%, #0e1a35 50%, #0d1b3e 100%)',
        isolation: 'isolate',
      }}
    >
      {/* ═══ BACKGROUND LAYER — must be first in DOM and z-index: 0 ═══ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Animated vertical lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${(i + 1) * 14}%`,
              width: '1px',
              opacity: 0.05,
              background: i % 2 === 0
                ? 'linear-gradient(to bottom, transparent, #d4af37, transparent)'
                : 'linear-gradient(to bottom, transparent, #3b82f6, transparent)',
              animationDelay: `${i * 0.4}s`,
              animationDuration: '3s',
            }}
          />
        ))}
        {/* Floating diamond border accents */}
        <div
          className="animate-pulse"
          style={{
            position: 'absolute',
            top: '4rem',
            right: '4rem',
            width: '3rem',
            height: '3rem',
            border: '2px solid #d4af37',
            opacity: 0.15,
            transform: 'rotate(45deg)',
            animationDuration: '12s',
          }}
        />
        <div
          className="animate-pulse"
          style={{
            position: 'absolute',
            bottom: '4rem',
            left: '4rem',
            width: '2rem',
            height: '2rem',
            border: '1px solid #3b82f6',
            opacity: 0.15,
            transform: 'rotate(45deg)',
            animationDuration: '8s',
          }}
        />
        {/* Large glow bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '66%',
          height: '10rem',
          opacity: 0.1,
          filter: 'blur(48px)',
          background: 'radial-gradient(ellipse, #d4af37, transparent 70%)',
        }} />
      </div>

      {/* ═══ CONTENT LAYER — always above background ═══ */}
      <div
        className="max-w-6xl mx-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#d4af37' }}>What I Know</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Skills &amp; <span style={{ color: '#d4af37' }}>Expertise</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#ffffff' }}>
            A comprehensive toolkit built through years of hands-on experience and continuous learning
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#3b82f6' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          </div>
        </div>

        {/* Skill category cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.category}
              className="group p-6 rounded-2xl border hover-lift transition-all duration-300 animate-fadeInUp"
              style={{
                background: 'rgba(30,64,175,0.08)',
                borderColor: 'rgba(59,130,246,0.2)',
                animationDelay: `${i * 100}ms`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,175,55,0.5)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(212,175,55,0.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(59,130,246,0.2)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(30,64,175,0.08)';
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" style={{ color: '#d4af37' }}>{cat.icon}</span>
                <h3 className="text-lg font-bold text-white">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm font-semibold border hover-scale cursor-default transition-all duration-200"
                    style={{
                      background: 'rgba(30,64,175,0.2)',
                      borderColor: 'rgba(59,130,246,0.3)',
                      color: '#93c5fd',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

```text
FILE NAME:
ExperienceSection.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\components\ExperienceSection.tsx

SOURCE CODE:
'use client';

import { useState } from 'react';

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const experiences = [
    {
      id: 0,
      company: 'Tech Company Inc.',
      position: 'Senior Full-Stack Developer',
      period: '2022 – Present',
      description: 'Leading development of scalable web applications using React and Node.js. Mentoring junior developers and implementing best practices.',
      achievements: [
        'Increased application performance by 40% through optimization',
        'Led migration from monolithic to microservices architecture',
        'Mentored 3 junior developers to mid-level proficiency',
      ],
    },
    {
      id: 1,
      company: 'Digital Solutions Ltd.',
      position: 'Full-Stack Developer',
      period: '2020 – 2022',
      description: 'Developed and maintained multiple client projects using modern web technologies. Collaborated with designers and product managers.',
      achievements: [
        'Built 15+ successful web applications on time and budget',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Improved code quality through comprehensive testing suites',
      ],
    },
    {
      id: 2,
      company: 'StartUp Ventures',
      position: 'Junior Developer',
      period: '2019 – 2020',
      description: 'Started my professional journey building frontend components and fixing bugs. Learned best practices and code standards.',
      achievements: [
        'Delivered 5+ successful projects on time',
        'Improved UI component library efficiency by 30%',
        'Gained expertise in the full React ecosystem',
      ],
    },
  ];

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #060d1f 0%, #0d1b3e 40%, #111827 100%)',
        isolation: 'isolate',
      }}
    >
      {/* ═══ BACKGROUND LAYER ═══ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Concentric rings */}
        {[300, 450, 600].map((size, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: size,
              height: size,
              borderRadius: '9999px',
              border: `1px solid ${i % 2 === 0 ? '#d4af37' : '#3b82f6'}`,
              opacity: 0.05,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '4s',
            }}
          />
        ))}
        {/* Diagonal hatch top-left */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '16rem',
          height: '16rem',
          opacity: 0.05,
          backgroundImage: 'repeating-linear-gradient(135deg, #d4af37 0px, #d4af37 1px, transparent 0px, transparent 12px)',
        }} />
        {/* Gold glow right */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: '25%',
          width: '12rem',
          height: '24rem',
          opacity: 0.1,
          filter: 'blur(48px)',
          background: 'radial-gradient(ellipse, #d4af37, transparent 70%)',
        }} />
      </div>

      {/* ═══ CONTENT LAYER ═══ */}
      <div
        className="max-w-4xl mx-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#d4af37' }}>My Journey</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Professional <span style={{ color: '#d4af37' }}>Experience</span>
          </h2>
          <p className="text-base" style={{ color: '#ffffff' }}>
            A journey of growth, learning, and impactful contributions
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#d4af37' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #3b82f6, transparent)' }} />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #1e40af, #d4af37, #1e40af)' }}
          />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="animate-fadeInUp md:pl-16 relative"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-3.5 top-6 w-5 h-5 rounded-full border-2 hidden md:flex items-center justify-center"
                  style={{
                    borderColor: '#d4af37',
                    background: expandedId === exp.id ? '#d4af37' : '#060d1f',
                    boxShadow: expandedId === exp.id ? '0 0 10px rgba(212,175,55,0.6)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                />

                {/* Card header */}
                <button
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  className="w-full p-5 rounded-2xl border text-left hover-lift transition-all duration-300 group"
                  style={{
                    background: expandedId === exp.id ? 'rgba(212,175,55,0.07)' : 'rgba(30,64,175,0.08)',
                    borderColor: expandedId === exp.id ? 'rgba(212,175,55,0.4)' : 'rgba(59,130,246,0.2)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors truncate">
                        {exp.position}
                      </h3>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: '#60a5fa' }}>{exp.company}</p>
                      <p className="text-xs mt-1 font-medium" style={{ color: '#ffffff' }}>{exp.period}</p>
                    </div>
                    <div
                      className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${expandedId === exp.id ? 'rotate-180' : ''}`}
                      style={{ borderColor: '#d4af37' }}
                    >
                      <svg className="w-3.5 h-3.5" style={{ color: '#d4af37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                {expandedId === exp.id && (
                  <div
                    className="mt-2 p-5 rounded-2xl border animate-slideInLeft space-y-4"
                    style={{ background: 'rgba(30,64,175,0.06)', borderColor: 'rgba(212,175,55,0.2)' }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: '#ffffff' }}>
                      {exp.description}
                    </p>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((a, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#ffffff' }}>
                            <span
                              className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                              style={{ background: 'rgba(212,175,55,0.2)' }}
                            >
                              <svg className="w-2.5 h-2.5" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

```text
FILE NAME:
ProjectsSection.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\components\ProjectsSection.tsx

SOURCE CODE:
'use client';

import { useRouter } from 'next/navigation';
import { projects, FEATURED_COUNT } from '@/lib/projects-data';

const featured = projects.slice(0, FEATURED_COUNT);
const hasMoreThanFeatured = projects.length > FEATURED_COUNT;

export default function ProjectsSection() {
  const router = useRouter();

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #0d1b3e 0%, #0a0f1e 50%, #111827 100%)',
        isolation: 'isolate',
      }}
    >
      {/* ═══ BACKGROUND LAYER ═══ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Particle dots */}
        {[
          { top: '10%', left: '5%', size: 3, color: '#d4af37', delay: '0s' },
          { top: '25%', left: '90%', size: 2, color: '#3b82f6', delay: '0.5s' },
          { top: '60%', left: '8%', size: 4, color: '#3b82f6', delay: '1s' },
          { top: '80%', left: '85%', size: 3, color: '#d4af37', delay: '1.5s' },
          { top: '45%', left: '50%', size: 2, color: '#d4af37', delay: '2s' },
          { top: '15%', left: '60%', size: 2, color: '#60a5fa', delay: '0.8s' },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              top: p.top, left: p.left,
              width: p.size, height: p.size,
              background: p.color,
              opacity: 0.4,
              animationDelay: p.delay,
            }}
          />
        ))}
        {/* Corner glows */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '16rem', height: '16rem', opacity: 0.1,
          background: 'radial-gradient(circle at top right, #d4af37, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '16rem', height: '16rem', opacity: 0.1,
          background: 'radial-gradient(circle at bottom left, #1e40af, transparent 70%)',
        }} />
        {/* Subtle horizontal lines */}
        {[20, 40, 60, 80].map((pct) => (
          <div
            key={pct}
            style={{
              position: 'absolute', left: 0, right: 0,
              top: `${pct}%`, height: '1px', opacity: 0.05,
              background: 'linear-gradient(90deg, transparent, #3b82f6 30%, #d4af37 70%, transparent)',
            }}
          />
        ))}
      </div>

      {/* ═══ CONTENT LAYER ═══ */}
      <div
        className="max-w-6xl mx-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#d4af37' }}>My Work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Featured <span style={{ color: '#d4af37' }}>Projects</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#ffffff' }}>
            Showcase of recent work demonstrating expertise in full-stack development and design
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#3b82f6' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          </div>
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              className="group relative rounded-2xl overflow-hidden border hover-lift transition-all duration-300 animate-fadeInUp"
              style={{
                background: 'rgba(13,27,62,0.8)',
                borderColor: 'rgba(59,130,246,0.2)',
                animationDelay: `${index * 60}ms`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(212,175,55,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(59,130,246,0.2)'; }}
            >
              {/* Top border accent on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, #1e40af, #d4af37, #1e40af)' }}
              />
              {/* Icon area */}
              <div
                className="relative h-36 flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(30,64,175,0.15), rgba(212,175,55,0.05))' }}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{project.icon}</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,27,62,0.6))' }}
                />
              </div>
              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#ffffff' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-semibold rounded"
                      style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: '#d4af37' }}>
                  View Project
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Projects — disabled when ≤ FEATURED_COUNT */}
        <div className="text-center mt-12 animate-fadeInUp">
          <button
            onClick={() => hasMoreThanFeatured && router.push('/projects')}
            disabled={!hasMoreThanFeatured}
            aria-disabled={!hasMoreThanFeatured}
            title={
              hasMoreThanFeatured
                ? 'View all projects'
                : `All ${projects.length} projects are shown above — add more to enable this button`
            }
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300"
            style={
              hasMoreThanFeatured
                ? {
                    background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
                  }
                : {
                    background: 'rgba(30,64,175,0.15)',
                    color: 'rgba(255,255,255,0.3)',
                    cursor: 'not-allowed',
                    border: '1px solid rgba(59,130,246,0.15)',
                  }
            }
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
```

```text
FILE NAME:
ContactSection.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\components\ContactSection.tsx

SOURCE CODE:
'use client';

import { useState, FormEvent } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #060d1f 0%, #0a0f1e 60%, #0d1423 100%)',
        isolation: 'isolate',
      }}
    >
      {/* ═══ BACKGROUND LAYER ═══ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Central radial glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          borderRadius: '9999px',
          opacity: 0.08,
          filter: 'blur(48px)',
          background: 'radial-gradient(circle, rgba(30,64,175,0.3), transparent 70%)',
        }} />
        {/* Gold corner frames */}
        {[
          { top: '2rem', left: '2rem', borderTop: true, borderLeft: true },
          { top: '2rem', right: '2rem', borderTop: true, borderRight: true },
          { bottom: '2rem', left: '2rem', borderBottom: true, borderLeft: true },
          { bottom: '2rem', right: '2rem', borderBottom: true, borderRight: true },
        ].map((corner, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: corner.top,
              left: corner.left,
              right: corner.right,
              bottom: corner.bottom,
              width: '3rem',
              height: '3rem',
              borderTop: corner.borderTop ? '2px solid #d4af37' : undefined,
              borderBottom: corner.borderBottom ? '2px solid #d4af37' : undefined,
              borderLeft: corner.borderLeft ? '2px solid #d4af37' : undefined,
              borderRight: corner.borderRight ? '2px solid #d4af37' : undefined,
              borderRadius: corner.borderTop && corner.borderLeft ? '0.5rem 0 0 0'
                : corner.borderTop && corner.borderRight ? '0 0.5rem 0 0'
                : corner.borderBottom && corner.borderLeft ? '0 0 0 0.5rem'
                : '0 0 0.5rem 0',
              opacity: 0.2,
            }}
          />
        ))}
        {/* Animated concentric rings */}
        {[200, 380, 560].map((size, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: size, height: size,
              borderRadius: '9999px',
              border: `1px solid ${i % 2 === 0 ? '#d4af37' : '#3b82f6'}`,
              opacity: 0.05,
              animationDelay: `${i * 0.6}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      {/* ═══ CONTENT LAYER ═══ */}
      <div
        className="max-w-5xl mx-auto"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Heading */}
        <div className="text-center mb-16 animate-fadeInUp">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#d4af37' }}>Say Hello</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let&apos;s <span style={{ color: '#d4af37' }}>Connect</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#ffffff' }}>
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #3b82f6)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#d4af37' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #3b82f6, transparent)' }} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — Form */}
          <div className="animate-slideInLeft">
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Angelo Reychie' },
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'hello@example.com' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-semibold mb-2 text-white">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl border text-white text-sm font-medium placeholder-neutral-600 outline-none transition-all duration-300"
                    style={{ background: 'rgba(30,64,175,0.1)', borderColor: 'rgba(59,130,246,0.3)', color: '#ffffff' }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = '#d4af37';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2 text-white">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium placeholder-neutral-600 outline-none transition-all duration-300 resize-none"
                  style={{ background: 'rgba(30,64,175,0.1)', borderColor: 'rgba(59,130,246,0.3)', color: '#ffffff' }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = '#d4af37';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.1)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-sm text-white hover-lift transition-all duration-300"
                style={{ background: submitted ? 'linear-gradient(135deg, #16a34a, #22c55e)' : 'linear-gradient(135deg, #1e40af, #3b82f6)' }}
              >
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right — Contact Info */}
          <div className="animate-slideInRight space-y-5">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                label: 'EMAIL', value: 'hello@angeloreychie.com', color: '#3b82f6',
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                label: 'PHONE', value: '+1 (555) 123-4567', color: '#d4af37',
              },
              {
                icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                label: 'LOCATION', value: 'San Francisco, USA', color: '#3b82f6',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl border hover-lift transition-all duration-300"
                style={{ background: 'rgba(30,64,175,0.08)', borderColor: 'rgba(59,130,246,0.2)' }}
              >
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg"
                  style={{ background: `${item.color}20` }}
                >
                  <svg className="w-5 h-5" style={{ color: item.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#ffffff' }}>
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-white">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="pt-4 border-t" style={{ borderColor: 'rgba(59,130,246,0.15)' }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: '#ffffff' }}>
                Follow Me
              </p>
              <div className="flex gap-3">
                {[
                  {
                    label: 'GitHub', href: 'https://github.com',
                    icon: <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48C19.138 20.195 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />,
                  },
                  {
                    label: 'Facebook', href: 'https://facebook.com',
                    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
                  },
                  {
                    label: 'LinkedIn', href: 'https://linkedin.com',
                    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative w-10 h-10 flex items-center justify-center rounded-lg border hover-scale transition-all duration-300 overflow-hidden"
                    style={{ borderColor: 'rgba(59,130,246,0.3)', background: 'rgba(30,64,175,0.1)', color: '#ffffff' }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'linear-gradient(135deg, #1e40af, #d4af37)' }}
                    />
                    <svg className="w-4 h-4 relative" style={{ zIndex: 1 }} fill="currentColor" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```text
FILE NAME:
CustomCursor.tsx

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\components\CustomCursor.tsx

SOURCE CODE:
'use client';

import { useEffect, useRef } from 'react';

interface CustomCursorProps {
  showCursor: boolean;
}

export default function CustomCursor({ showCursor }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorBlurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }

      if (cursorBlurRef.current) {
        cursorBlurRef.current.style.left = e.clientX - 20 + 'px';
        cursorBlurRef.current.style.top = e.clientY - 20 + 'px';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
      if (cursorBlurRef.current) cursorBlurRef.current.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (cursorBlurRef.current) cursorBlurRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!showCursor) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 border-2 border-primary dark:border-primary-light rounded-full pointer-events-none z-50 transition-opacity duration-200 opacity-0"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        ref={cursorBlurRef}
        className="fixed w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary-light/20 dark:to-accent-light/20 rounded-full blur-lg pointer-events-none z-40 transition-opacity duration-200 opacity-0"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
```

```text
FILE NAME:
projects-data.ts

FILE PATH:
c:\Users\User\angelo_portfolio\angelo_portfolio\lib\projects-data.ts

SOURCE CODE:
export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-featured platform with payment integration, inventory management, and real-time notifications.',
    icon: '🛍',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
  },
  {
    id: 2,
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for multiple social accounts with real-time data visualization.',
    icon: '📊',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Chart.js'],
    link: '#',
  },
  {
    id: 3,
    title: 'Project Management Tool',
    description: 'Collaborative tool with team features, task tracking, and reporting capabilities.',
    icon: '📋',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
    link: '#',
  },
  {
    id: 4,
    title: 'AI Content Generator',
    description: 'AI-powered platform using machine learning to create personalized content at scale.',
    icon: '🤖',
    technologies: ['Next.js', 'OpenAI API', 'Prisma', 'Stripe'],
    link: '#',
  },
  {
    id: 5,
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking with workout plans, progress tracking, and community.',
    icon: '💪',
    technologies: ['React Native', 'Firebase', 'Redux', 'Google Fit'],
    link: '#',
  },
  {
    id: 6,
    title: 'Learning Management System',
    description: 'Comprehensive LMS for online courses with video streaming, quizzes, and progress.',
    icon: '📚',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'WebSocket'],
    link: '#',
  },
];

/** Number of projects to show on the home page featured section */
export const FEATURED_COUNT = 6;
```

---

## Analysis appendix (read-only; no source changes)

### Indexed UI files

1. `app/page.tsx` — home route; sequential section mount
2. `app/layout.tsx` — `html.h-full.scroll-smooth`, `body.min-h-full.flex.flex-col`
3. `app/globals.css` — `html { scroll-behavior: smooth; scroll-padding-top: 6rem; }`
4. `app/projects/page.tsx` — second route `/projects`; `min-h-screen`
5. `components/Header.tsx` — `fixed` header; hash links only
6. `components/HeroSection.tsx` — only home section with `min-h-screen`
7. `components/AboutSection.tsx` — `py-24` content height
8. `components/SkillsSection.tsx` — `py-24` content height
9. `components/ExperienceSection.tsx` — `py-24` content height
10. `components/ProjectsSection.tsx` — `py-24` content height
11. `components/ContactSection.tsx` — `py-24` content height
12. `components/CustomCursor.tsx` — fixed overlay; not a layout participant
13. `lib/projects-data.ts` — featured count drives Projects grid size

### Causal chain

```text
page.tsx renders 6 sections + footer in one <main>
        ↓
each child is a block-level <section> in normal flow
        ↓
Hero is already min-h-screen; five more sections are content-sized
        ↓
document height > viewport
        ↓
html/body do not set overflow:hidden
        ↓
browser document scroll (window.scrollY)
```

### Recommendation

Keep architecture A (one `/` route, viewport-sized sections). Use `min-h-dvh` plus flex centering. Do not split into `/about` `/skills` `/contact`. Do not add mandatory scroll snap. Optionally flatten nested `<section>` tags and fold the footer into Contact.
