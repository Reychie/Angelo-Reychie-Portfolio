import type { ReactNode } from 'react';

import { ArrowUpRight } from '@/components/icons/InterfaceIcons';

interface TextLinkProps {
  href: string;
  children: ReactNode;
  primary?: boolean;
  external?: boolean;
  className?: string;
}

export function TextLink({ href, children, primary = false, external = false, className = '' }: TextLinkProps) {
  return (
    <a
      className={`action-link ${primary ? 'action-link--primary' : ''} ${className}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <span>{children}</span><ArrowUpRight />
      {primary ? <i className="action-link__sheen" aria-hidden="true" /> : null}
    </a>
  );
}
