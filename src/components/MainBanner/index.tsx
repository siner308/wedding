import DateTime from '@/components/MainBanner/DateTime';
import Location from '@/components/MainBanner/Location';

const MainBanner = () => {
  const date = new Date('2024-07-06 12:30');
  const location = '루벨 - 서울 강동구 천호동 - 강동역 1번 출구 35층'
  return (
    <div className={'bg-amber-200'}>
      <h1>정현 & 지원</h1>
      <DateTime value={date} />
      <Location value={location} />
    </div>
  );
}

export default MainBanner;
