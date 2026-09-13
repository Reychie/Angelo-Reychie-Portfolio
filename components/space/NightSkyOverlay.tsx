function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STARS = Array.from({ length: 140 }, (_, index) => {
  const rand = mulberry32(index * 997 + 13);
  return {
    x: rand() * 1920,
    y: rand() * 1080,
    r: 2.2 + rand() * 2.1,
    o: 0.14 + rand() * 0.42,
  };
});

export default function NightSkyOverlay() {
  return (
    <svg
      className="space-stars"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {STARS.map((star, index) => (
        <circle key={index} cx={star.x} cy={star.y} r={star.r} fill="#e8e4ff" opacity={star.o} />
      ))}
    </svg>
  );
}
