export type TraitKind = 'system' | 'build' | 'learn' | 'collaborate';

export const traits: ReadonlyArray<{
  icon: TraitKind;
  title: string;
  text: string;
}> = [
  { icon: 'system', title: 'Systems Thinker', text: 'I enjoy understanding how the pieces of a product work together.' },
  { icon: 'build', title: 'Practical Builder', text: 'Requirements become dependable features, not just polished demos.' },
  { icon: 'learn', title: 'Always Learning', text: 'New technologies are useful when they solve a real problem.' },
  { icon: 'collaborate', title: 'Collaborative', text: 'Clear communication makes complex work easier to build and maintain.' },
];
