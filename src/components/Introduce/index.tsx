import Event from '@/components/Introduce/Event';

const Events = () => {
  return (
    <div className={'bg-amber-300 p-1 flex flex-col gap-1'}>
      <Event title={'본식'} location={'루벨 35층 단독홀'} datePeriod={{ start: new Date('2024-07-06 12:30') }} />
      <Event title={'피로연'} location={'루벨 35층 피로연장'} datePeriod={{ start: new Date('2024-07-06 12:00'), end: new Date('2024-07-06 13:30') }} />
    </div>
  );
}

export default Events;
