import React from 'react';

type Props = {
  children: React.ReactNode;
  gridColClass: string;
}

const ButtonContainer = (props: Props) => {
  const {children, gridColClass } = props;
  return (
    <div className={`grid ${gridColClass} gap-2 place-self-center`}>
      {children}
    </div>
  )
}

export default ButtonContainer;
