import BankAccount from '@/components/BankAccountGroup/BankAccount';

const BankAccountGroup = () => {
  return (
    <div className={'flex flex-col gap-4 py-4'}>
      <div className={'text-center text-lg'}>
        축하의 마음 전하기
      </div>
      <div className={'flex flex-col gap-4 px-4'}>
        <BankAccount
          holderName={'신랑 안정현'}
          bankType={'신한은행'}
          bankNumber={'110-327-426606'}
        />
        <BankAccount
          holderName={'신부 박지원'}
          bankType={'카카오뱅크'}
          bankNumber={'3333-06-8895745'}
        />
      </div>
    </div>
  );
};

export default BankAccountGroup;
