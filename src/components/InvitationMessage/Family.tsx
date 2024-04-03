type Props = {
  mother: string;
  father: string;
  me: string;
  position: string;
}

const Family = (props: Props) => {
  const { me, father, mother, position } = props;
  return (
    <div className={'mx-auto flex items-center gap-4'}>
      <div>
        <div>{father}</div>
        <div>{mother}</div>
      </div>
      <div>의 {position}</div>
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
