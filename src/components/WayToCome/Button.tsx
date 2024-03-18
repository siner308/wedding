import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  color: 'orange' | 'green' | 'blue';
}

const Button = (props: Props) => {
  const { children, color, onClick } = props;

  const colorClass = color === 'orange' ? 'bg-orange-300' : color === 'green' ? 'bg-green-300' : 'bg-blue-300';

  return (
    <button
      className={`p-1 h-14 ${colorClass} rounded-lg break-words min-w-20`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;
