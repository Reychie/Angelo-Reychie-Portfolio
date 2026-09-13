'use client';

import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  showCursor?: boolean;
}

export default function CustomCursor({ showCursor = true }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!showCursor) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    };
    sync();

    finePointer.addEventListener('change', sync);
    reducedMotion.addEventListener('change', sync);
    return () => {
      finePointer.removeEventListener('change', sync);
      reducedMotion.removeEventListener('change', sync);
    };
  }, [showCursor]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      pos.current.x = event.clientX;
      pos.current.y = event.clientY;
      const target = event.target as HTMLElement | null;
      const hovering = Boolean(target?.closest('a, button, [role="button"]'));
      if (frame.current == null) {
        frame.current = window.requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.35 : 1})`;
            cursorRef.current.style.opacity = '1';
          }
          frame.current = null;
        });
      }
    };

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  if (!showCursor || !enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full border border-white/80 pointer-events-none z-[60] opacity-0 mix-blend-difference"
      aria-hidden="true"
    />
  );
}
