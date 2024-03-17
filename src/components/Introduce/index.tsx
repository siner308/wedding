const Events = () => {
  return (
    <div className={'flex justify-between gap-2'}>
      <div className={'w-full h-20 bg-orange-300 mt-20 text-center flex flex-col justify-center'}>
        <div>본식</div>
        <div>12:30 - 13:00</div>
      </div>
      <div className={'w-full h-80 bg-blue-300 text-center flex flex-col justify-center'}>
        <div>식사</div>
        <div>12:00 - 14:00</div>
      </div>
    </div>
  );
};

export default Events;
