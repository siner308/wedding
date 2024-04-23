import BankAccountFamily from '@/components/BankAccountGroup/BackAccountFamily';

const BankAccountGroup = () => {
  return (
    <div className={'flex flex-col gap-4 py-4'}>
      <div className={'text-center text-lg'}>
        축하의 마음 전하기
      </div>
      <div className={'flex flex-col gap-4 px-4'}>
        <BankAccountFamily type={'groom'} />
        <BankAccountFamily type={'bride'} />
      </div>
    </div>
  );
};

export default BankAccountGroup;
