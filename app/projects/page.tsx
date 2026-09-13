'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Legacy route — redirect into the Projects section. */
export default function AllProjectsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#projects');
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-muted text-sm">
      Redirecting to projects…
    </main>
  );
}
