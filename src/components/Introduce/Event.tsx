type Props = {
  title: string;
  location: string;
  datePeriod: {
    start: Date;
    end?: Date;
  };
}


const Event = (props: Props) => {
  const { title, location, datePeriod } = props;

  // 시간을 포함한 포맷. 같은 날짜라면 날짜를 한번만 표시하고 시간 ~ 시간으로 표시
  const datePeriodString = datePeriod.end
    ? datePeriod.start.toLocaleDateString() === datePeriod.end.toLocaleDateString()
      ? `${datePeriod.start.toLocaleDateString()} ${datePeriod.start.toLocaleTimeString()} ~ ${datePeriod.end.toLocaleTimeString()}`
      : `${datePeriod.start.toLocaleDateString()} ${datePeriod.start.toLocaleTimeString()} ~ ${datePeriod.end.toLocaleDateString()} ${datePeriod.end.toLocaleTimeString()}`
    : `${datePeriod.start.toLocaleDateString()} ${datePeriod.start.toLocaleTimeString()}`;
  return (
    <div className={'bg-blue-200'}>
      <h1>{title}</h1>
      <div>
        {datePeriodString}
      </div>
      <div>
        {location}
      </div>
    </div>
  );
}

export default Event;
