const Events = () => {
  return (
    <div className={'flex justify-between gap-2 place-self-center'}>
      <div className={'w-40'}>
        <div className={'h-20 text-end mt-[-4px]'}>12:00</div>
        <div className={'h-20 text-end mt-[-3px]'}>12:30</div>
        <div className={'h-20 text-end mt-[-2px]'}>13:00</div>
        <div className={'h-20 text-end mt-[-1px]'}>13:30</div>
      </div>
      <div className={'w-40'}>
        <div className={'h-20 bg-orange-100 border-white border'}></div>
        <div className={'h-20 bg-orange-300 text-center flex flex-col justify-center'}>
          <div>본식</div>
          <div>12:30 - 13:00</div>
        </div>
        <div className={'h-20 bg-orange-100 border-white border'}></div>
        <div className={'h-20 bg-orange-100 border-white border'}></div>
      </div>
      <div className={'w-40'}>
        <div className={'h-80 bg-blue-300 text-center flex flex-col justify-center'}>
            <div>식사</div>
            <div>12:00 - 14:00</div>
        </div>
      </div>
      <div className={'w-40'}></div>
    </div>
  );
};

export default Events;
