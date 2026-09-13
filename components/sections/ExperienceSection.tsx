'use client';

import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { experiences } from '@/lib/content/experience-data';
import type { Experience } from '@/lib/content/experience-data';
import { EASE_OUT, interaction, sectionEnter } from '@/lib/motion';
import ExperienceDetail from '@/components/experience/ExperienceDetail';
import Button from '@/components/ui/Button';

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const titleId = useId();
  const active = experiences.find((item) => item.id === activeId) ?? null;

  useEffect(() => {
    if (!activeId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveId(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeId]);

  return (
    <section className="relative min-h-full px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="experience-heading max-w-2xl">
          <p className="text-xs tracking-[0.28em] uppercase text-violet">Experience</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            A practical path through production work
          </h2>
          <p className="text-base text-muted leading-relaxed">
            My professional experience, including the roles, projects, and responsibilities I’ve worked on.
          </p>
        </div>

        <div className="space-y-5">
          {experiences.map((experience) => (
            <ExperiencePreview
              key={experience.id}
              experience={experience}
              onOpen={() => setActiveId(experience.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="experience-modal-root"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.18, ease: EASE_OUT } }}
            transition={sectionEnter}
          >
            <button
              type="button"
              className="experience-modal-backdrop"
              aria-label="Close experience details"
              onClick={() => setActiveId(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="experience-modal-panel"
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98, transition: interaction }}
              transition={{ duration: 0.32, ease: EASE_OUT }}
            >
              <div className="experience-modal-toolbar">
                <p id={titleId} className="text-sm text-muted">
                  Role details
                </p>
                <Button type="button" variant="ghost" onClick={() => setActiveId(null)}>
                  Close
                </Button>
              </div>
              <div className="experience-modal-body">
                <ExperienceDetail experience={active} className="experience-entry space-card rounded-2xl p-6 md:p-8" />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function ExperiencePreview({
  experience,
  onOpen,
}: {
  experience: Experience;
  onOpen: () => void;
}) {
  return (
    <div className="experience-timeline">
      <div className="experience-timeline-rail" aria-hidden="true">
        <span className="experience-timeline-dot" />
      </div>
      <article className="experience-preview space-card rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1.5">
            <p className="text-xs tracking-[0.2em] uppercase text-violet">{experience.period}</p>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">{experience.position}</h3>
            <p className="text-sm text-muted">{experience.company}</p>
          </div>
          <Button type="button" variant="ghost" className="shrink-0 self-start sm:self-center" onClick={onOpen}>
            View details
          </Button>
        </div>
      </article>
    </div>
  );
}
