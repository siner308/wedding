type Props = {
  mother: string;
  father: string;
  me: string;
  gender: 'male' | 'female';
}

const Family = (props: Props) => {
  const { me, father, mother, gender } = props;
  return (
    <div className={'mx-auto flex items-center gap-4'}>
      <div>
        <div>{father}</div>
        <div>{mother}</div>
      </div>
      <div>의 {gender === 'male' ? '아들' : '딸'}</div>
      <div
        style={{
          display: 'inline',
          boxShadow: 'inset 0 -10px 0 #D9FCDB',
      }}>
        {me}
      </div>
    </div>
  );
};
export default Family;
