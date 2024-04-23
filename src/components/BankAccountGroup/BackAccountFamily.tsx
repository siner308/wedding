import BankAccount from '@/components/BankAccountGroup/BankAccount';
import { useState } from 'react';

const bankAccountFamily = {
  'bride': [
    {
      holderName: '박창규 (父)',
      bankType: '농협은행',
      bankNumber: '713-12-076881',
    },
    {
      holderName: '이연화 (母)',
      bankType: '대구은행',
      bankNumber: '508-12-469611-5',
    },
    {
      holderName: '박지원',
      bankType: '카카오뱅크',
      bankNumber: '3333-06-8895745',
    },
  ],
  'groom': [
    {
      holderName: '안재흥 (父)',
      bankType: '국민은행',
      bankNumber: '048-21-0974-754',
    },
    {
      holderName: '정선순 (母)',
      bankType: '국민은행',
      bankNumber: '828201-04-101984',
    },
    {
      holderName: '안정현',
      bankType: '신한은행',
      bankNumber: '110-327-426606',
    },
  ],
};

type Props = {
  type: 'bride' | 'groom';
}

const BankAccountFamily = (props: Props) => {
  const { type } = props;
  const [open, setOpen] = useState(false);

  if (!bankAccountFamily[type]) return null;

  return (
    <div className={'border'}>
      <div
        className={'h-14 flex items-center justify-between cursor-pointer'}
        onClick={() => setOpen(!open)}
      >
        <div className={'pl-4 align-middle'}>{type === 'bride' ? '신부' : '신랑'}측</div>
        <div className={'border-l w-20 text-center'}>{open ? '닫기' : '열기'}</div>
      </div>
      <div
        className={`flex flex-col gap-1`}
      >
        {open
          ? bankAccountFamily[type]
            .map((bankAccount, index) => (
              <BankAccount
                key={index}
                holderName={bankAccount.holderName}
                bankType={bankAccount.bankType}
                bankNumber={bankAccount.bankNumber}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default BankAccountFamily;
