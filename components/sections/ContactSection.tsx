import { site } from '@/lib/content/site';
import Button from '@/components/ui/Button';
import SocialButton from '@/components/ui/SocialButton';

const gmailComposeUrl =
  'https://mail.google.com/mail/?view=cm&fs=1' +
  `&to=${encodeURIComponent(site.email)}` +
  `&su=${encodeURIComponent('Portfolio Inquiry')}`;

export default function ContactSection() {
  return (
    <section className="relative min-h-full px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="contact-layout max-w-3xl mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.28em] uppercase text-violet">Contact</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Open to new opportunities
          </h2>
          <p className="text-base text-muted leading-relaxed">
            I’m available for professional opportunities, projects, collaborations, and other development work.
          </p>
        </div>

        <div className="contact-shell space-card">
          <div className="contact-shell-glow" aria-hidden="true" />
          <div className="contact-shell-orbit" aria-hidden="true" />

          <div className="contact-status">
            <span className="contact-status-dot" aria-hidden="true" />
            <span>Available for new roles</span>
          </div>

          <div className="contact-card-grid">
            <div className="contact-info-card">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Email</p>
              <p className="contact-info-value break-all">{site.email}</p>
            </div>

            <div className="contact-info-card">
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Location</p>
              <p className="contact-info-value">{site.location}</p>
              <span className="contact-info-hint">Remote-friendly</span>
            </div>
          </div>

          <div className="contact-actions">
            <Button href={gmailComposeUrl} external aria-label="Email Me via Gmail">
              Email Me
            </Button>
            <SocialButton platform="github" labeled />
            <SocialButton platform="linkedin" labeled />
            <Button href={site.resumePath} external variant="ghost">
              View Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
