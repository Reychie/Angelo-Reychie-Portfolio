'use client';

import { motion } from 'framer-motion';
import type { Section } from '@/lib/navigation';
import { interaction } from '@/lib/motion';

interface NavigationItemProps {
  id: Section;
  label: string;
  active: boolean;
  onSelect: (section: Section) => void;
}

export default function NavigationItem({ id, label, active, onSelect }: NavigationItemProps) {
  return (
    <button type="button" onClick={() => onSelect(id)} aria-current={active ? 'page' : undefined} className="nav-item">
      {active ? (
        <motion.span
          layoutId="nav-active"
          className="nav-item-active"
          transition={{ duration: interaction.duration, ease: interaction.ease }}
        />
      ) : null}
      <span className="relative z-[1]">{label}</span>
    </button>
  );
}
