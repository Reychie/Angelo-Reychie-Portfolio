export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  status?: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 'compassionate-home-health',
    company: 'Compassionate Home Health Services',
    position: 'Full Stack Developer',
    period: 'Dec 2025 – Sep 2026',
    location: 'Pontiac, Michigan, USA',
    status: 'Recent role',
    description:
      'Developed and improved healthcare applications across frontend and backend using TypeScript, Next.js, Node.js, Python, Supabase, and Vercel, including APIs, database features, access controls, workflow automation, third-party integrations, and dashboards. Implemented AI and machine learning capabilities for healthcare workflows, including intelligent assistants, clinical analysis, predictive functionality, data retrieval, and secure integrations between applications. Built AI-assisted development tools with isolated testing environments and real-time previews, while collaborating with developers and team members to fix issues and improve features.',
    achievements: [
      'Built healthcare workflows across frontend, backend, APIs, dashboards, and database features',
      'Implemented AI-assisted clinical analysis, intelligent assistants, predictive functionality, and data retrieval',
      'Created isolated testing environments and real-time previews for AI-assisted development tools',
    ],
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'Python', 'Supabase', 'Vercel'],
  },
];

export const technologyIcons = {
  TypeScript: 'typescript',
  'Next.js': 'nextjs',
  'Node.js': 'nodejs',
  Python: 'python',
  Supabase: 'supabase',
  Vercel: 'vercel',
} as const;
