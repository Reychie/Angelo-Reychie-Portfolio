import type { ReactNode } from 'react';
import type { CategoryIconKey, SkillIconKey } from '@/lib/content/skills-data';

const brandLogoSlugs: Partial<Record<SkillIconKey, string>> = {
  typescript: 'typescript',
  javascript: 'javascript',
  python: 'python',
  php: 'php',
  react: 'react',
  nextjs: 'nextjs',
  reactnative: 'react',
  html: 'html5',
  css: 'css3',
  tailwind: 'tailwindcss',
  nodejs: 'nodedotjs',
  express: 'nodejs',
  socketio: 'socket-io',
  postgresql: 'postgresql',
  mysql: 'mysql',
  supabase: 'supabase',
  mongodb: 'mongodb',
  gemini: 'google-gemini',
  git: 'git',
  github: 'github',
  postman: 'postman',
  vercel: 'vercel',
};

const localLogos: Partial<Record<SkillIconKey, string>> = {
  cpp: '/images/icons/cpp-logo.png',
  java: '/images/icons/java-logo.png',
  vite: '/images/icons/vite-logo.png',
  vscode: '/images/icons/vscode-logo.png',
};

function BrandLogo({ icon, name }: { icon: SkillIconKey; name: string }) {
  const slug = brandLogoSlugs[icon];
  if (!slug) return null;
  const variant = icon === 'github' ? 'light' : 'default';

  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/${variant}.svg`}
      alt=""
      className="h-4 w-4 shrink-0 object-contain"
      loading="lazy"
      decoding="async"
      aria-hidden="true"
      title={`${name} logo`}
    />
  );
}

function GenericIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}


export function SkillIcon({ name, icon }: { name: string; icon: SkillIconKey }) {
  if (brandLogoSlugs[icon]) return <BrandLogo icon={icon} name={name} />;

  if (icon === 'vectordb') {
    return (
      <GenericIcon>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </GenericIcon>
    );
  }

  if (icon === 'openai') {
    return (
      <GenericIcon>
        <path d="M12 3v3M12 18v3M4.9 6.5l2.1 2.1M17 15.4l2.1 2.1M3 12h3M18 12h3M4.9 17.5l2.1-2.1M17 8.6l2.1-2.1" />
        <circle cx="12" cy="12" r="3.2" />
      </GenericIcon>
    );
  }

  if (icon === 'rls') {
    return (
      <GenericIcon>
        <path d="M12 3l8 4v5c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V7l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </GenericIcon>
    );
  }

  const localSrc = localLogos[icon];
  if (localSrc) {
    return (
      <img
        src={localSrc}
        alt=""
        className="h-4 w-4 shrink-0 object-contain"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        title={`${name} logo`}
      />
    );
  }

  return (
    <GenericIcon>
      <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
    </GenericIcon>
  );
}

export function CategoryIcon({ kind }: { kind: CategoryIconKey }) {
  if (kind === 'code') {
    return (
      <GenericIcon>
        <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />
      </GenericIcon>
    );
  }
  if (kind === 'window') {
    return (
      <GenericIcon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
      </GenericIcon>
    );
  }
  if (kind === 'server') {
    return (
      <GenericIcon>
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <path d="M7 7h.01M7 17h.01" />
      </GenericIcon>
    );
  }
  if (kind === 'database') {
    return (
      <GenericIcon>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </GenericIcon>
    );
  }
  if (kind === 'spark') {
    return (
      <GenericIcon>
        <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8L12 3z" />
      </GenericIcon>
    );
  }
  if (kind === 'shield') {
    return (
      <GenericIcon>
        <path d="M12 3l8 4v5c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V7l8-4z" />
      </GenericIcon>
    );
  }
  return (
    <GenericIcon>
      <path d="M14.7 6.3a4 4 0 01.6 5.3l-7.1 7.1a2 2 0 01-2.8-2.8l7.1-7.1a4 4 0 015.3.6z" />
      <path d="M12 8l4 4" />
    </GenericIcon>
  );
}
