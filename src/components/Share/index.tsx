'use client';

import { useEffect, useState } from 'react';
import content from '@/app/content.json';
import Link from 'next/link';
import invitationMessage from '@/components/InvitationMessage';

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

  const googleCalendarBaseUrl = 'https://www.google.com/calendar/event';
  const googleCalendarParam = new URLSearchParams({
    location: content.addressGoogle,
    action: 'TEMPLATE',
    details: `${content.invitationMessage}

모바일 청첩장: https://wedding.siner.io`,
    text: content.title,
    dates: '20240706T033000Z/20240706T050000Z',
  });
  const googleCalendarLink = `${googleCalendarBaseUrl}?${googleCalendarParam.toString()}`;

  return (
    <div className={'px-4 flex flex-col gap-4'}>
      <button
        className={'text-center border bg-gray-100 text-lg h-14 w-full rounded-md'}
        onClick={handleClickShare}
      >
        {clipboardCopied ? '주소가 복사되었습니다' : '공유하기'}
      </button>
      <Link
        href={googleCalendarLink}
        target={'_blank'}
      >
        <div
          className={'flex justify-center items-center border bg-gray-100 text-lg h-14 rounded-md'}
        >
          구글 캘린더에 추가
        </div>
      </Link>
    </div>
  );
};

export default ShareEvent;
