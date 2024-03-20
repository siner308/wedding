'use client';

import Image from 'next/image';

const GithubIcon = (props: { clickCount: number, onClick: () => void }) => {
  const { clickCount, onClick } = props;

  const getRandomPosition = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    return { x, y };
  };

  const { x, y } = getRandomPosition();
  const size = 40 * (clickCount + 1);

  return (
    <button
      style={{
        ...(clickCount != 0 ? {
          bottom: `${y}px`,
          right: `${x}px`,
          position: 'fixed',
        } : {}),
      }}
      onClick={onClick}>
      <Image src={'/icons/github.png'} alt={'github'} width={size} height={size}/>
    </button>
  );
};

export default GithubIcon;
