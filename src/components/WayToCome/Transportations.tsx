import Image from 'next/image';
import { useEffect, useState } from 'react';

const Transportations = () => {
  const [addressCopied, setAddressCopied] = useState<boolean>(false);

  useEffect(() => {
    if (addressCopied) {
      setTimeout(() => {
        setAddressCopied(false);
      }, 700);
    }
  }, [addressCopied, setAddressCopied]);

  const address = '서울시 강동구 천호대로 1077 이스트센트럴타워 35층';
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address).then(r => {
      setAddressCopied(true);
    });
  };
  const onClickParking = () => {
    const findWayContainer = document.getElementById('find-way-container');
    if (!findWayContainer) return;
    window.scrollTo({ top: findWayContainer.offsetTop - 250, behavior: 'smooth' });
  };

  return (
    <div className={'bg-[#db9188] font-light text-white flex flex-col gap-2 p-4'}>
      <div className={'flex gap-2'}>
        <Image className={'h-fit'} src={'/icons/map-marker.png'} alt={'주소'} width={20} height={20}/>
        <p
          id={'transportation-address'}
          onClick={handleCopyAddress}
          className={'cursor-pointer border-b-2'}
        >
          {addressCopied ? '복사되었습니다' : address}
        </p>
      </div>
      <div className={'flex gap-2'}>
        <Image className={'h-fit'} src={'/icons/phone.png'} alt={'전화번호'} width={20} height={20}/>
        <a
          id={'transportation-phone'}
          className={'border-b-2'}
          href={'tel:02-6956-0230'}
        >
          02-6956-0230 (예식장)
        </a>
      </div>
      <div className={'flex gap-2'}>
        <Image className={'h-fit'} src={'/icons/bus.png'} alt={'버스노선'} width={20} height={20}/>
        <div>
          <p>Blue 간선 - 130, 341, 342, 370</p>
          <p>Green 지선 - 3214, 3316</p>
          <p>일반 - 1-4, 23, 30-3, 112, 112-1, 112-5</p>
          <p>직행 - 1113, 1113-1, 1113-2, 1113-11, 9301</p>
          <span className={'text-sm text-amber-300'}>* 상기 버스 탑승 후 강동역 하차</span>
        </div>
      </div>
      <div className={'flex gap-2'}>
        <Image className={'h-fit'} src={'/icons/train.png'} alt={'지하철'} width={20} height={20}/>
        <p>5호선 강동역 1번 출구 연결</p>
      </div>
      <div className={'flex gap-2'}>
        <Image className={'h-fit'} src={'/icons/car.png'} alt={'자가용'} width={20} height={20}/>
        <p>
          <span
            id={'transportation-parking-lot'}
            onClick={onClickParking}
            className={'cursor-pointer border-b-2'}
          >
            이스트 센트럴 타워 주차장
          </span>
          으로 검색 후 오피스 방면으로 출입하면 됩니다.
        </p>
      </div>
    </div>
  );
};

export default Transportations;
