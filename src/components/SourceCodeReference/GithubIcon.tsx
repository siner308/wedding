'use client';

import Image from 'next/image';

const GithubIcon = (props: { clickCount: number, onClick: () => void }) => {
  const { clickCount, onClick } = props;

  const getRandomPosition = (size: number) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);

    if (x + size > width) {
      x -= size;
    }

    if (y + size > height) {
      y -= size;
    }

    return { x, y };
  };

  const size = 40;
  const { x, y } = getRandomPosition(size);

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
