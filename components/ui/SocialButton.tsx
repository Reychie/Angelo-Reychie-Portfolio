import { site } from '@/lib/content/site';
import Button from '@/components/ui/Button';
import { GitHubIcon, LinkedInIcon } from '@/components/icons/SocialIcons';

type SocialPlatform = 'github' | 'linkedin';

interface SocialButtonProps {
  platform: SocialPlatform;
  labeled?: boolean;
}

const config = {
  github: {
    href: site.social.github,
    label: 'GitHub',
    icon: <GitHubIcon />,
  },
  linkedin: {
    href: site.social.linkedin,
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
} as const;

export default function SocialButton({ platform, labeled = false }: SocialButtonProps) {
  const item = config[platform];

  if (!labeled) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="nav-social" aria-label={item.label}>
        {item.icon}
      </a>
    );
  }

  return (
    <Button href={item.href} external variant="ghost" aria-label={item.label}>
      {item.icon}
      <span>{item.label}</span>
    </Button>
  );
}
