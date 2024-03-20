import Image from 'next/image';
import { useEffect, useState } from 'react';

const SourceCodeReference = () => {
  const url = 'https://github.com/siner308/wedding';

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (count >= 5) {
      location.href = url;
      setCount(0);
    }
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  const GithubIcon = (props: { clickCount: number }) => {
    const { clickCount } = props;

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
        onClick={handleClick}>
        <Image src={'/icons/github.png'} alt={'github'} width={size} height={size}/>
      </button>
    );
  };

  return (
    <div className={'flex justify-center gap-4'}>
      <span className={'self-center'}>Source Code: </span>
      <GithubIcon clickCount={count}/>
    </div>
  );
};

export default SourceCodeReference;
