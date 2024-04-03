import Family from '@/components/InvitationMessage/Family';
import content from '@/app/content.json';

const InvitationMessage = () => {
  const groom = {
    name: '정현',
    father: '안재흥',
    mother: '정선순',
  };

  const bride = {
    name: '지원',
    father: '박창규',
    mother: '이연화',
  };

  return (
    <div className={'flex flex-col gap-10 text-lg'}>
      <div className={'text-left mx-auto'}>
        {content.invitationMessage
          .split('\n')
          .map((line, index) => (
            <p key={index}>{line}</p>
          ))
        }
      </div>
      <div className={'flex flex-col gap-4 mx-auto border-t border-b p-10'}>
        <Family father={groom.father} mother={groom.mother} position={'장남'} me={groom.name}/>
        <Family father={bride.father} mother={bride.mother} position={'장녀'} me={bride.name}/>
      </div>
    </div>
  );
};

export default InvitationMessage;
