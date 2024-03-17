'use client'

type Props = {
  value: Date;
}

const DateTime = (props: Props) => {
  const {value} = props;
  return (
    <div>
      {value.toLocaleDateString()} {value.toLocaleTimeString().replace(/(\d{2}):(\d{2}):(\d{2})/, "$1:$2")}
    </div>
  );
};

export default DateTime;
