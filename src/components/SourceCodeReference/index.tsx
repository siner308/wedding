import { useEffect, useState } from 'react';
import GithubIcon from '@/components/SourceCodeReference/GithubIcon';
import content from '@/app/content.json'
import NoSSR from '@/components/NoSSR';

const SourceCodeReference = () => {
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    const nextCount = count + 1;
    if (nextCount >= 10) {
      location.href = content.githubUrl;
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  return (
    <div className={'flex justify-center gap-4'}>
      <NoSSR><GithubIcon clickCount={count} onClick={handleClick}/></NoSSR>
    </div>
  );
};

export default SourceCodeReference;
