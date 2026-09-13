'use client';

import { Canvas } from '@react-three/fiber';
import { useMemo, useState, useSyncExternalStore } from 'react';
import type { Section } from '@/lib/navigation';
import { SECTION_HOLE_X, SECTION_HOLE_Y } from '@/lib/navigation';
import AmbientGlow from '@/components/space/AmbientGlow';
import BlackHole from '@/components/space/BlackHole';
import NightSkyOverlay from '@/components/space/NightSkyOverlay';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function mediaStore(query: string) {
  const subscribe = (onStoreChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', onStoreChange);
    return () => mql.removeEventListener('change', onStoreChange);
  };
  const getSnapshot = () => window.matchMedia(query).matches;
  return { subscribe, getSnapshot };
}

const reducedMotionStore = mediaStore('(prefers-reduced-motion: reduce)');
const mobileStore = mediaStore('(max-width: 768px)');

interface SpaceBackgroundProps {
  activeSection: Section;
}

export default function SpaceBackground({ activeSection }: SpaceBackgroundProps) {
  const reducedMotion = useSyncExternalStore(
    reducedMotionStore.subscribe,
    reducedMotionStore.getSnapshot,
    () => false,
  );
  const isMobile = useSyncExternalStore(mobileStore.subscribe, mobileStore.getSnapshot, () => false);
  const [webgl] = useState(() => supportsWebGL());

  const targetX = isMobile ? 0.5 : (SECTION_HOLE_X[activeSection] ?? 0.74);
  const targetY = isMobile ? 0.42 : (SECTION_HOLE_Y[activeSection] ?? 0.5);
  const dpr = useMemo<[number, number]>(() => (isMobile ? [1, 1.1] : [1, 1.5]), [isMobile]);
  const quality = isMobile ? 0.32 : 1;

  return (
    <div className="space-background" aria-hidden="true">
      {webgl ? (
        <Canvas
          dpr={dpr}
          frameloop={reducedMotion ? 'demand' : 'always'}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: false,
          }}
          camera={{ position: [0, 0, 1], fov: 50 }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          <BlackHole targetX={targetX} targetY={targetY} reducedMotion={reducedMotion} quality={quality} />
        </Canvas>
      ) : (
        <div className="space-fallback-hole" />
      )}
      <NightSkyOverlay />
      <AmbientGlow mobile={isMobile} />
    </div>
  );
}
