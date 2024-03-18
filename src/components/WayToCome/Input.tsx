type Props = {
  lineColor: 'orange' | 'green' | 'blue';
  width: 'sm' | 'lg';
  placeholder: string;
  value: string;
}

const Input = (props: Props) => {
  const { width, lineColor, placeholder, value } = props;
  const widthClass = width === 'sm' ? 'w-40' : 'w-60';

  const borderColorClass = lineColor === 'orange' ? 'border-orange-300' : lineColor === 'green' ? 'border-green-300' : 'border-blue-300';

  return (
    <input
      className={`h-10 ${widthClass} text-lg text-center ${borderColorClass} border-b-2 rounded-b-none`}
      disabled={true}
      value={value}
      placeholder={placeholder}
    />
  )
}

export default Input;
