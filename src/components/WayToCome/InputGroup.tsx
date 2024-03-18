import React from 'react';

type Props = {
  children: React.ReactNode;
}

const InputGroup = (props: Props) => {
  const { children } = props;
  return (
    <div className={'flex justify-center gap-2'}>
      {children}
    </div>
  );
};

export default InputGroup;
