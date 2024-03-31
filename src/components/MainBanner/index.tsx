'use client';

import DateTime from '@/components/MainBanner/DateTime';
import Location from '@/components/MainBanner/Location';

const MainBanner = () => {
  const date = new Date('2024-07-06 12:30');
  const location = '루벨';
  const backgroundImage = '/images/main-banner.jpeg';

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className={'h-[800px] bg-cover bg-center bg-no-repeat relative flex justify-center pointer-events-none'}
    >
      <div
        className={'flex flex-col gap-4 self-end text-3xl font-bold text-center py-20'}
        style={{ textShadow: '2px 2px 4px #FFFFFF' }}
      >
        <DateTime date={date}/>
        <Location value={location}/>
      </div>
    </div>
  );
};

export default MainBanner;
