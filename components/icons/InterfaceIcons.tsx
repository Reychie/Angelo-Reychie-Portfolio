import type { SVGProps } from 'react';

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M8 7h9v9" /></svg>;
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>;
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 1 12.9-5.2L20 9.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 0 1-12.9 5.2L4 14.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 4.5v5h-5M4 19.5v-5h5" />
    </svg>
  );
}

export function DesktopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
      <path strokeLinecap="round" d="M8 20.5h8M12 16.5v4" />
    </svg>
  );
}

export function TabletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="5.5" y="3" width="13" height="18" rx="1.8" />
      <path strokeLinecap="round" d="M11 18.5h2" />
    </svg>
  );
}

export function MobileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="7.5" y="2.5" width="9" height="19" rx="1.8" />
      <path strokeLinecap="round" d="M11 18.5h2" />
    </svg>
  );
}

