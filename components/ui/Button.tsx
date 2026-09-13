import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'icon';

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  'aria-label'?: string;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: never;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  external?: boolean;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classNames(variant: ButtonVariant, extra?: string) {
  const tone = variant === 'primary' ? 'btn-primary' : 'btn-ghost';
  const icon = variant === 'icon' ? 'btn-icon' : '';
  return [tone, icon, extra].filter(Boolean).join(' ');
}

export default function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary';
  const classes = classNames(variant, props.className);

  if (typeof props.href === 'string') {
    const link = props as ButtonAsLink;
    return (
      <a
        href={link.href}
        download={link.download}
        target={link.external ? '_blank' : link.target}
        rel={link.external ? 'noopener noreferrer' : link.rel}
        className={classes}
        aria-label={link['aria-label']}
      >
        {link.children}
      </a>
    );
  }

  const button = props as ButtonAsButton;
  const type = button.type ?? 'button';

  return (
    <button
      type={type}
      className={classes}
      onClick={button.onClick}
      disabled={button.disabled}
      aria-label={button['aria-label']}
      name={button.name}
      value={button.value}
      form={button.form}
    >
      {button.children}
    </button>
  );
}
