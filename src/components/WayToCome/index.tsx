import WayToComeIcon from '@/components/WayToCome/WayToComeIcon';
import navermap from '../../../public/icons/navermap.png';

const WayToCome = () => {
  // 네이버맵
  return (
    <div className={'flex gap-1'}>
      <WayToComeIcon imgSrc={'/icons/navermap.png'} alt={'navermap'} href={'google.com'} label={'네이버맵'} />
      <WayToComeIcon imgSrc={'/icons/navermap.png'} alt={'navermap'} href={'google.com'} label={'카카오맵'} />
      <WayToComeIcon imgSrc={'/icons/navermap.png'} alt={'navermap'} href={'google.com'} label={'카카오내비'} />
      <WayToComeIcon imgSrc={'/icons/navermap.png'} alt={'navermap'} href={'google.com'} label={'T맵'} />
    </div>
  )
}

export default WayToCome;
