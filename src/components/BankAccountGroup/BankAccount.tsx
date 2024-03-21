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

  const [open, setOpen] = useState(false);
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
      .writeText(`${bankType} ${bankNumber}`)
      .then(() => {
        setCopied(true);
      });
  };

  return (
    <div className={'w-full'}>
      <div className={'h-14 border flex items-center justify-between cursor-pointer'} onClick={() => setOpen(!open)}>
        <div className={'pl-4 align-middle'}>{holderName}</div>
        <div className={'border-l w-20 text-center'}>{open ? '닫기' : '열기'}</div>
      </div>
      {open && (
        <div onClick={handleCopy} className={'h-20 border flex items-center justify-between bg-amber-100 cursor-pointer'}>
          <div className={'pl-4 flex flex-col justify-center'}>
            {copied
              ? <span>복사되었습니다</span>
              : (
                <>
                  <div>{bankType}</div>
                  <div>{bankNumber}</div>
                </>
              )}
          </div>
          <div className={'border-l w-20 text-center'}>복사</div>
        </div>
      )}
    </div>
  );
};

export default BankAccount;
