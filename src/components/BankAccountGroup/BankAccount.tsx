import { useEffect, useState } from 'react';

type Props = {
  holderName: string;
  bankType: string;
  bankNumber: string;
}

const BankAccount = (props: Props) => {
  const {
    holderName,
    bankType,
    bankNumber,
  } = props;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 700);
    }
  }, [copied, setCopied]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`${bankNumber} ${bankType}`)
      .then(() => {
        setCopied(true);
      });
  };

  return (
    <div className={'w-full'}>
      <div onClick={handleCopy} className={'h-20 flex items-center justify-between bg-amber-100 cursor-pointer'}>
        <div className={'pl-4 justify-center'}>
          {copied
            ? <span>복사되었습니다</span>
            : (
              <div>
                <div className={'align-middle'}>{holderName}</div>
                <div className={'flex gap-2'}>
                  <span>{bankType}</span>
                  <span>{bankNumber}</span>
                </div>
              </div>
            )}
        </div>
        <div className={'border-l w-20 text-center'}>복사</div>
      </div>
    </div>
  );
};

export default BankAccount;
