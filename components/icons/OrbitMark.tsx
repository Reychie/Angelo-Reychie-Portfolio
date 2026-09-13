'use client';

import { useId } from 'react';

export default function OrbitMark({ className = 'w-7 h-7' }: { className?: string }) {
  const id = useId();

  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffaff" />
          <stop offset="48%" stopColor="#9b6dff" />
          <stop offset="100%" stopColor="#4d19d8" />
        </radialGradient>
      </defs>
      <ellipse cx="16" cy="16" rx="13" ry="5.4" stroke="rgba(155,109,255,0.72)" strokeWidth="1.15" />
      <ellipse
        cx="16"
        cy="16"
        rx="13"
        ry="5.4"
        stroke="rgba(73,124,255,0.5)"
        strokeWidth="1.15"
        transform="rotate(60 16 16)"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="13"
        ry="5.4"
        stroke="rgba(116,60,255,0.42)"
        strokeWidth="1.15"
        transform="rotate(-60 16 16)"
      />
      <circle cx="16" cy="16" r="3.15" fill={`url(#${id})`} />
    </svg>
  );
}
