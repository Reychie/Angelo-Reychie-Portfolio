'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { PointerEvent } from 'react';

export default function ProfileFrame() {
  const [isFocused, setIsFocused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
    setIsFocused(false);
  }

  return (
    <div className="profile-frame-wrap">
      <div
        className="profile-frame"
        tabIndex={0}
        role="img"
        aria-label="Portrait of Angelo Reychie Alejo, full-stack developer"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onFocus={() => setIsFocused(true)}
        onBlur={resetTilt}
        style={{
          transform: `perspective(1100px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        <div className="profile-frame-orbit profile-frame-orbit-one" />
        <div className="profile-frame-orbit profile-frame-orbit-two" />
        <div className="profile-frame-image-wrap">
          <Image src="/images/profile/profile-portrait.jpg" alt="Angelo Reychie Alejo" fill sizes="(max-width: 767px) 72vw, (max-width: 900px) 22rem, 27rem" className="profile-frame-image" priority />
          <div className="profile-frame-scan" aria-hidden="true" />
        </div>
        <div className={`profile-frame-corner ${isFocused ? 'profile-frame-corner-active' : ''}`} aria-hidden="true" />
      </div>
    </div>
  );
}
