import Family from '@/components/InvitationMessage/Family';

const InvitationMessage = () => {
  const groom = {
    name: '안정현',
    father: '안재흥',
    mother: '정선순'
  }

  const bride = {
    name: '박지원',
    father: '박창규',
    mother: '이연화'
  }

  return (
    <div className={'flex flex-col gap-10 text-lg'}>
      <div className={'text-center'}>
        <p>저희들의 오늘이 있기까지 보내주신</p>
        <p>따뜻한 사랑과 깊은 관심에 진심으로 감사하오며,</p>
        <p>저희 두사람은 여러분의 축복을 받으며</p>
        <p>진실한 가약을 맺고자 합니다.</p>
        <p>부디 참석하시어 기쁨의 자리를 축복으로</p>
        <p>더욱 빛내 주시길 바라옵니다.</p>
      </div>
      <div className={'flex flex-col gap-4'}>
        <Family father={groom.father} mother={groom.mother} gender={'male'} me={groom.name} />
        <Family father={bride.father} mother={bride.mother} gender={'female'} me={bride.name} />
      </div>
    </div>
  )
}

export default InvitationMessage;
