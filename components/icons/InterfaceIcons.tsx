import type { SVGProps } from 'react';

import type { TraitKind } from '@/lib/content/about-data';

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="M5 15 15 5M7 5h8v8" /></svg>;
}

export function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="M10 3v13M5.5 11.5 10 16l4.5-4.5" /></svg>;
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...props}><path d="M3 6h14M3 14h14" /></svg>;
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...props}><path d="m4 4 12 12M16 4 4 16" /></svg>;
}

export function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="m12.5 4.5-5 5.5 5 5.5" /></svg>;
}

export function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}><path d="m7.5 4.5 5 5.5-5 5.5" /></svg>;
}

export function CrossMark({ className = '' }: { className?: string }) {
  return <span className={`cross-mark ${className}`} aria-hidden="true" />;
}

export function TraitIcon({ kind }: { kind: TraitKind }) {
  const common = { viewBox: '0 0 28 28', fill: 'none', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  if (kind === 'system') return <svg {...common}><path d="M14 2.8 24 7v7.3c0 5.4-4 9.1-10 11-6-1.9-10-5.6-10-11V7l10-4.2Z" /><path d="m9.5 14 2.8 2.8 6.1-6.1" /></svg>;
  if (kind === 'build') return <svg {...common}><circle cx="14" cy="14" r="7.2" /><path d="M14 1.9v3.4M14 22.7v3.4M1.9 14h3.4M22.7 14h3.4M5.4 5.4l2.4 2.4M20.2 20.2l2.4 2.4M22.6 5.4l-2.4 2.4M7.8 20.2l-2.4 2.4" /></svg>;
  if (kind === 'learn') return <svg {...common}><path d="M4.1 10.8 14 5l9.9 5.8L14 16.6 4.1 10.8Z" /><path d="M7.5 13v6.1c3.8 2.8 9.2 2.8 13 0V13M23.9 10.8v7" /></svg>;
  return <svg {...common}><path d="M9.2 13.7a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2ZM19.1 12.4a3.4 3.4 0 1 0 0-6.8" /><path d="M2.8 23c.5-4.2 2.7-6.4 6.4-6.4 3.8 0 6 2.2 6.5 6.4M15.8 15.6c5.2-.6 8.2 1.9 8.7 6.1" /></svg>;
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.36-3.9-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.2-3.09-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.16 1.18a10.98 10.98 0 0 1 5.75 0c2.18-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.83 1.2 3.09 0 4.42-2.71 5.4-5.29 5.69.42.36.78 1.06.78 2.14v3.07c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>;
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M5.2 7.9H1.4V20h3.8V7.9ZM3.3 2A2.2 2.2 0 1 0 3.3 6.4 2.2 2.2 0 0 0 3.3 2ZM20.6 13c0-3.7-2-5.5-4.7-5.5-2.1 0-3.1 1.2-3.6 2V7.9H8.5V20h3.8v-6c0-1.6.3-3.1 2.3-3.1s2 1.8 2 3.2V20h3.8l.2-7Z" /></svg>;
}
