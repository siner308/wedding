type Props = {
  value: string;
}


const Location = (props: Props)  => {
  const { value } = props;
  return (
    <div>
      {value}
    </div>
  );
}

export default Location;
