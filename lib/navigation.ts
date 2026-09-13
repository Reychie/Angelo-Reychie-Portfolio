export type Section = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';

export const NAV_LINKS: { id: Section; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const SECTION_HOLE_X: Record<Section, number> = {
  home: 0.74,
  about: 0.8,
  skills: 0.84,
  projects: 0.86,
  experience: 0.8,
  contact: 0.76,
};

export const SECTION_HOLE_Y: Record<Section, number> = {
  home: 0.5,
  about: 0.48,
  skills: 0.46,
  projects: 0.47,
  experience: 0.49,
  contact: 0.52,
};

export function resolveSection(hash: string): Section | null {
  if (!hash) return 'home';
  if (hash === 'work' || hash === 'projects') return 'projects';
  if ((NAV_LINKS as { id: string }[]).some((link) => link.id === hash)) {
    return hash as Section;
  }
  return null;
}
