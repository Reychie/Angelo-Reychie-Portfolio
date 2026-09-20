export const sections = [
  { id: 'home', number: '01', label: 'Home' },
  { id: 'about', number: '02', label: 'About' },
  { id: 'projects', number: '03', label: 'Projects' },
  { id: 'experience', number: '04', label: 'Experience' },
  { id: 'skills', number: '05', label: 'Skills' },
  { id: 'contact', number: '06', label: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export const navigation = sections;
