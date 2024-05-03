'use client';

import DateTime from '@/components/MainBanner/DateTime';
import Location from '@/components/MainBanner/Location';
import localFont from 'next/font/local';

const preloadFont = localFont({
  src: '../../../public/fonts/SUITE-SemiBold.woff2',
  preload: true,
});

const MainBanner = () => {
  const date = new Date('2024-07-06 12:30');
  const location = '강동 루벨';
  const backgroundImage = '/images/main.jpg';

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className={'h-[800px] bg-cover bg-center bg-no-repeat relative flex justify-center pointer-events-none'}
    >
      <div
        className={'bg-white bg-opacity-30 rounded-2xl flex flex-col gap-4 self-end text-3xl text-center py-4 mb-16 px-4'}
      >
        <div className={preloadFont.className}>
          <DateTime date={date}/>
          <Location value={location}/>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
