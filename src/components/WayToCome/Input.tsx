type Props = {
  lineColor: 'orange' | 'blue';
  width: 'sm' | 'lg';
  placeholder: string;
  value: string;
}

const Input = (props: Props) => {
  const { width, lineColor, placeholder, value } = props;

  const lineColorClass = lineColor === 'orange' ? 'border-orange-500' : 'border-blue-500';
  const widthClass = width === 'sm' ? 'w-40' : 'w-60';

  return (
    <input
      className={`h-10 ${widthClass} text-lg text-center ${lineColorClass} border-b-2 rounded-b-none`}
      disabled={true}
      value={value}
      placeholder={placeholder}
    />
  )
}

export default Input;
