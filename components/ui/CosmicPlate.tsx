import Image from 'next/image';

interface CosmicPlateProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  position?: string;
}

export function CosmicPlate({ src, alt, priority = false, className = '', sizes = '100vw', position }: CosmicPlateProps) {
  return (
    <div className={`cosmic-plate ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="cosmic-plate__image" style={position ? { objectPosition: position } : undefined} />
      <div className="cosmic-plate__shade" aria-hidden="true" />
    </div>
  );
}
