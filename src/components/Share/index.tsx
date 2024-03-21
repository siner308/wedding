'use client'

import { useEffect, useState } from 'react';
import content from '@/app/content.json';

const ShareEvent = () => {
  const [clipboardCopied, setClipboardCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setClipboardCopied(false);
    }, 700);
  }, [clipboardCopied]);

  const handleClickShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
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
    <div className={'px-4'}>
      <button
        className={'text-center border bg-gray-100 text-lg h-14 w-full rounded-md'}
        onClick={handleClickShare}
      >
        {clipboardCopied ? '주소가 복사되었습니다' : '공유하기'}
      </button>
    </div>
  );
};

export default ShareEvent;
