'use client';

import DateTime from '@/components/MainBanner/DateTime';
import Location from '@/components/MainBanner/Location';

const MainBanner = () => {
  const date = new Date('2024-07-06 12:30');
  const location = '루벨';
  const backgroundImage = '/sample/couple.jpeg';
  return (
    <div
      style={{ filter: 'grayscale(80%)', backgroundImage: `url(${backgroundImage})` }}
      className={'h-[800px] bg-cover bg-center bg-no-repeat relative flex justify-center pointer-events-none'}
    >
      <div className={'flex flex-col gap-4 self-end text-white text-4xl text-center py-20'}>
        <DateTime value={date}/>
        <Location value={location}/>
      </div>
    </div>
  );
};

export default MainBanner;
