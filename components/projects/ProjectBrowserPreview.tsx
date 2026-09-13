'use client';

import { useEffect, useId, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT, interaction } from '@/lib/motion';
import {
  ArrowUpRightIcon,
  CloseIcon,
  DesktopIcon,
  MobileIcon,
  RefreshIcon,
  TabletIcon,
} from '@/components/icons/InterfaceIcons';

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface ProjectBrowserPreviewProps {
  title: string;
  url: string;
  /** Optional custom open control label. Defaults to View Project. */
  triggerLabel?: string;
}

const DEVICE_WIDTHS: Record<DeviceMode, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
};

const DEVICE_OPTIONS: { id: DeviceMode; label: string; icon: typeof DesktopIcon }[] = [
  { id: 'desktop', label: 'Desktop', icon: DesktopIcon },
  { id: 'tablet', label: 'Tablet', icon: TabletIcon },
  { id: 'mobile', label: 'Mobile', icon: MobileIcon },
];

function displayUrl(raw: string) {
  try {
    const parsed = new URL(raw);
    return `${parsed.host}${parsed.pathname === '/' ? '' : parsed.pathname}${parsed.search}`;
  } catch {
    return raw.replace(/^https?:\/\//, '');
  }
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ProjectBrowserPreview({
  title,
  url,
  triggerLabel = 'View Project',
}: ProjectBrowserPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const isClient = useIsClient();
  const reduce = useReducedMotion();
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const scrollRoot = document.querySelector('.portfolio-scroll-root') as HTMLElement | null;
    const previousScrollOverflow = scrollRoot?.style.overflow ?? '';

    document.body.style.overflow = 'hidden';
    if (scrollRoot) scrollRoot.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      if (scrollRoot) scrollRoot.style.overflow = previousScrollOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  function openPreview() {
    setDeviceMode('desktop');
    setLoading(true);
    setReloadKey(0);
    setIsOpen(true);
  }

  function closePreview() {
    setIsOpen(false);
  }

  function refreshPreview() {
    setLoading(true);
    setReloadKey((current) => current + 1);
  }

  const modal = isClient
    ? createPortal(
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              className="project-browser-root"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.18, ease: EASE_OUT } }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
            >
              <button
                type="button"
                className="project-browser-backdrop"
                aria-label="Close project preview"
                onClick={closePreview}
              />

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="project-browser-window"
                initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98, transition: interaction }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <div className="project-browser-chrome">
                  <div className="project-browser-traffic" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="project-browser-devices" role="group" aria-label="Preview device size">
                    {DEVICE_OPTIONS.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        className={`project-browser-device${deviceMode === id ? ' is-active' : ''}`}
                        aria-pressed={deviceMode === id}
                        aria-label={`${label} preview`}
                        onClick={() => setDeviceMode(id)}
                      >
                        <Icon className="project-browser-icon" />
                        <span className="project-browser-device-label">{label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="project-browser-address" title={url}>
                    <span className="project-browser-address-text">{displayUrl(url)}</span>
                  </div>

                  <div className="project-browser-actions">
                    <button
                      type="button"
                      className="project-browser-icon-btn"
                      aria-label="Reload project preview"
                      onClick={refreshPreview}
                    >
                      <RefreshIcon className="project-browser-icon" />
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-browser-icon-btn"
                      aria-label="Open project in new tab"
                    >
                      <ArrowUpRightIcon className="project-browser-icon" />
                    </a>
                    <button
                      type="button"
                      className="project-browser-icon-btn project-browser-close"
                      aria-label="Close project preview"
                      onClick={closePreview}
                    >
                      <CloseIcon className="project-browser-icon" />
                    </button>
                  </div>
                </div>

                <p id={titleId} className="sr-only">
                  {title} live preview
                </p>

                <div className="project-browser-stage">
                  <div className="project-browser-viewport" style={{ width: DEVICE_WIDTHS[deviceMode] }}>
                    {loading ? (
                      <div className="project-browser-loading" aria-live="polite">
                        <span className="project-browser-spinner" aria-hidden="true" />
                        <span>Loading project...</span>
                      </div>
                    ) : null}

                    <iframe
                      key={reloadKey}
                      src={url}
                      title={`${title} live preview`}
                      className="project-browser-frame"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      onLoad={() => setLoading(false)}
                    />
                  </div>
                </div>

                <p className="project-browser-note">
                  Preview unavailable?{' '}
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Open the project in a new tab
                  </a>
                  .
                </p>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        type="button"
        className="project-link-button"
        onClick={openPreview}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span>{triggerLabel}</span>
      </button>
      {modal}
    </>
  );
}
