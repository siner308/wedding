import Image from 'next/image';
import { CSSProperties } from 'react';

declare module 'react' {
  interface CSSProperties {
    '--translate-x'?: string;
    '--degree'?: string;
  }
}

const Leaf = () => {
  const fallDelay = `${Math.random() * 12}s`;
  const shakeDelay = `${Math.random() * 3}s`;

  const shakeDegree = `${Math.random() * 180}deg`;

  const leftPosition = `${Math.random() * 100}%`;
  const translateX = `${Math.random() * (80 - 20) + 20}px`;

  const fallDuration = `${Math.random() * (16 - 9) + 9}s`;
  const shakeDuration = `${Math.random() * (3 - 2) + 2}s`;

  const style: CSSProperties = {
    position: 'fixed',
    top: '-10%',
    zIndex: 1,
    left: leftPosition,
    // Animation names 'fall' and 'shake' must be defined in your global CSS
    animation: `${fallDuration} linear ${fallDelay} infinite fall, ${shakeDuration} ease-in-out ${shakeDelay} infinite shake`,
    // Custom properties for shake animation
    '--translate-x': translateX,
    '--degree': shakeDegree,
  }

  return (
    <Image style={style} src={`/icons/floral-leaf-${Math.floor(Math.random() * 4) + 1}.png`} width={16} height={16} alt={'leaf'} />
  );
};

export default Leaf;
