import { site } from '@/lib/content/site';

export default function Footer() {
  return (
    <footer className="py-8 px-6">
      <p className="text-center text-sm text-muted">
        © {new Date().getFullYear()} <span className="text-violet">{site.name}</span>
      </p>
    </footer>
  );
}
