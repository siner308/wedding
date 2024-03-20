'use client'

import { useEffect, useState } from 'react';
import content from '@/app/content.json';

const ShareEvent = () => {
  const [clipboardCopied, setClipboardCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClipboardCopied(false);
    }, 3000);
  }, [clipboardCopied]);

  const handleClickShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: content.description,
        url: `${location.protocol}//${location.host}`,
      });
    } else {
      navigator.clipboard.writeText(`${location.protocol}//${location.host}`)
        .then(() => {
          setClipboardCopied(true);
        }).catch(() => {
        alert('주소를 복사하는데 실패했습니다.');
      });
    }
  };
  return (
    <div className={'pb-10 '}>
      <button className={'text-center bg-orange-300 text-2xl h-20 w-full rounded-lg'} onClick={handleClickShare}>{clipboardCopied ? '주소가 복사되었습니다!' : '공유하기'}</button>
    </div>
  );
};

export default ShareEvent;
