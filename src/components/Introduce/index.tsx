const Events = () => {
  return (
    <div className={'flex justify-between gap-2 place-self-center'}>
      <div className={'w-full flex gap-2'}>
        <div className={'mt-[-10px]'}>
          <div className={'h-16 text-end'}>12:00</div>
          <div className={'h-16 text-end'}>12:30</div>
          <div className={'h-16 text-end'}>13:00</div>
          <div className={'h-16 text-end'}>13:30</div>
          <div className={'h-16 text-end'}>14:00</div>
        </div>
        <div>
          <div className={'w-28 h-16 bg-orange-100 border-white border'}></div>
          <div className={'w-28 h-16 bg-orange-300 text-center flex flex-col justify-center'}>
            <div>본식</div>
            <div>12:30 - 13:00</div>
          </div>
          <div className={'w-28 h-16 bg-orange-100 border-white border'}></div>
          <div className={'w-28 h-16 bg-orange-100 border-white border'}></div>
        </div>
      </div>
      <div className={'w-full'}>
        <div className={'w-28 h-64 bg-blue-300 text-center flex flex-col justify-center'}>
            <div>식사</div>
            <div>12:00 - 14:00</div>
        </div>
      </div>
    </div>
  );
};

export default Events;
