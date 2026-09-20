'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { ArrowUpRight, CloseIcon, MenuIcon } from '@/components/icons/InterfaceIcons';
import { navigation, sections, type SectionId } from '@/lib/content/navigation-data';

interface HeaderProps {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function Header({ active, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const scrollTo = (id: SectionId) => {
    setOpen(false);
    onNavigate(id);
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const background = [document.querySelector('main'), document.querySelector('.site-header'), document.querySelector('.section-rail')].filter(Boolean) as HTMLElement[];
    const previousOverflow = document.body.style.overflow;
    background.forEach((element) => element.setAttribute('inert', ''));
    document.body.style.overflow = 'hidden';

    const focusable = () => [...(dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])') ?? [])];
    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const controls = focusable();
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      background.forEach((element) => element.removeAttribute('inert'));
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <button className="monogram" onClick={() => scrollTo('home')} aria-label="Go to home">AA</button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <button key={item.id} onClick={() => scrollTo(item.id)} aria-current={active === item.id ? 'page' : undefined}>{item.label}</button>)}
        </nav>
        <div className="header-actions">
          <span className="header-signal" aria-hidden="true" />
          <motion.button className="header-cta" onClick={() => scrollTo('contact')} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 380, damping: 24 }}>Let&apos;s talk <ArrowUpRight /></motion.button>
          <button type="button" className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} aria-controls="site-mobile-navigation"><MenuIcon /></button>
        </div>
      </header>
      {open ? (
        <div ref={dialogRef} id="site-mobile-navigation" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="mobile-menu__top"><span>Navigate</span><button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><CloseIcon /></button></div>
          <nav aria-label="Mobile navigation">
            {sections.map((item) => <button type="button" key={item.id} onClick={() => scrollTo(item.id)}><span>{item.number}</span>{item.label}<ArrowUpRight /></button>)}
          </nav>
        </div>
      ) : null}
    </>
  );
}
