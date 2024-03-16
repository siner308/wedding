type Props = {
  value: Date;
}

const DateTime = (props: Props) => {
  const {value} = props;
  return (
    <div>
      {value.toLocaleDateString()} {value.toLocaleTimeString()}
    </div>
  );
};

export default DateTime;
