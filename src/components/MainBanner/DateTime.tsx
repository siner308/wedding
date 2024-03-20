'use client'

import NoSSR from '@/components/NoSSR';

type Props = {
  date: Date;
}

const DateTime = (props: Props) => {
  const {date} = props;
  return (
    <div>
      <NoSSR>
        {date.toLocaleDateString()} {date.toLocaleTimeString().replace(/(\d{2}):(\d{2}):(\d{2})/, "$1:$2")}
      </NoSSR>
    </div>
  );
};

export default DateTime;
