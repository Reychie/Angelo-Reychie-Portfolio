'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function AboutProfileFrame() {
  const [revealed, setRevealed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="about-profile-wrap">
      <div
        className={`about-profile-frame${revealed ? ' about-profile-frame-revealed' : ''}`}
        role="img"
        aria-label="Portrait of Angelo Reychie Alejo. Hover or focus the frame for an alternate view."
        tabIndex={0}
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        onFocus={() => {
          setIsFocused(true);
          setRevealed(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          setRevealed(false);
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="about-profile-orbit about-profile-orbit-one" aria-hidden="true" />
        <div className="about-profile-orbit about-profile-orbit-two" aria-hidden="true" />

        <div className="about-profile-image-wrap">
          <Image
            src="/images/profile/alejo_profile.jpg"
            alt="Angelo Reychie Alejo"
            fill
            sizes="(max-width: 640px) 17rem, (max-width: 899px) 20rem, 26rem"
            quality={95}
            className={`about-profile-image about-profile-image-primary${revealed ? ' is-hidden' : ''}`}
            draggable={false}
            priority
          />
          <Image
            src="/images/profile/kevin_profile.jpg"
            alt=""
            fill
            sizes="(max-width: 640px) 17rem, (max-width: 899px) 20rem, 26rem"
            quality={95}
            className={`about-profile-image about-profile-image-alt${revealed ? ' is-visible' : ''}`}
            draggable={false}
            aria-hidden="true"
          />
          <div className="about-profile-scan" aria-hidden="true" />
        </div>

        <div
          className={`about-profile-corner${isFocused || revealed ? ' about-profile-corner-active' : ''}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
