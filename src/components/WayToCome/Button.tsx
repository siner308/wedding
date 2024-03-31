import React from 'react';

type Props = {
  id: string;
  children: React.ReactNode;
  onClick: () => void;
  color: 'orange' | 'green' | 'blue';
  disabled?: boolean;
  selected?: boolean;
}

const Button = (props: Props) => {
  const { id, children, color, onClick, disabled, selected } = props;

  let colorClass;
  if (disabled) {
    colorClass = 'bg-gray-300';
  } else if (selected) {
    colorClass = color === 'orange' ? 'bg-orange-300' : color === 'green' ? 'bg-green-300' : 'bg-blue-300';
  } else {
    colorClass = color === 'orange' ? 'bg-orange-200' : color === 'green' ? 'bg-green-200' : 'bg-blue-200';
  }

  return (
    <button
      id={id}
      className={`p-1 h-14 ${colorClass} rounded-lg break-words min-w-20`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;
