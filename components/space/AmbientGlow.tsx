interface AmbientGlowProps {
  mobile?: boolean;
}

export default function AmbientGlow({ mobile = false }: AmbientGlowProps) {
  return (
    <>
      <div className="space-glow" />
      <div className={mobile ? 'space-read space-read-mobile' : 'space-read'} />
      <div className="space-vignette" />
      <div className="space-noise" />
    </>
  );
}
