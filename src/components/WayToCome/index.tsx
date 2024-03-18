import { useEffect, useState } from 'react';
import Loading from '@/components/WayToCome/Loading';
import Input from '@/components/WayToCome/Input';
import Button from '@/components/WayToCome/Button';
import ButtonContainer from '@/components/WayToCome/ButtonContainer';
import InputGroup from '@/components/WayToCome/InputGroup';
import RoughMap from '@/components/WayToCome/RoughMap';
import Transportations from '@/components/WayToCome/Transportations';

type StartPoint = {
  name: string;
  lat?: number;
  lng?: number;
}

type Destination = {
  name: string;
  label: string;
  lat: number;
  lng: number;
  parkingRequired: boolean;
}

type Application = {
  name: string;
  imgSrc: string;
  alt: string;
  getDeepLink: (destination: Destination, lat?: string, lng?: string, name?: string) => string;
  getWebLink: (destination: Destination, lat?: string, lng?: string, name?: string) => string;
}

declare global {
  interface Document {
    webkitHidden: boolean;
  }
}

const WayToCome = () => {
  const startPoints: StartPoint[] = [
    { name: '현위치' },
    { name: '잠실역', lat: 37.5132612, lng: 127.1001336 },
    { name: '서울역 (KTX)', lat: 37.5547125, lng: 126.9707878 },
    { name: '수서역 (SRT)', lat: 37.485544, lng: 127.10438 },
    { name: '동대구역 (KTX/SRT)', lat: 35.879667, lng: 128.628476 },
    { name: '서울고속터미널 (서울경부)', lat: 37.5049142, lng: 127.0049151 },
    { name: '서울남부터미널', lat: 37.484918, lng: 127.01629 },
    { name: '동서울터미널 (강변역)', lat: 37.5345963, lng: 127.0941813 },
  ];

  const destinations = [
    {
      name: '루벨',
      label: '웨딩홀',
      lat: 37.5361769,
      lng: 127.1322858,
      parkingRequired: false,
    }, {
      name: '이스트 센트럴 타워 주차장',
      label: '주차장',
      lat: 37.5369008,
      lng: 127.1326323,
      parkingRequired: true,
    },
  ];

  const applications: Application[] = [
    {
      name: '네이버 지도',
      imgSrc: '/icons/navermap.png',
      alt: 'navermap',
      getDeepLink: (destination, lat, lng, name) => `nmap://route/${destination.parkingRequired ? 'car' : 'public'}?slat=${lat}&slng=${lng}&sname=${name}&dlat=${destination.lat}&dlng=${destination.lng}&dname=${destination.name}`,
      getWebLink: (destination, lat, lng, name) => `http://map.naver.com/index.nhn?slng=${lng}&slat=${lat}&stext=${name}&elng=${destination.lng}&elat=${destination.lat}&etext=${destination.name}&menu=route&pathType=${destination.parkingRequired ? 0 : 1}`,
    },
    {
      name: '카카오맵',
      imgSrc: '/icons/kakaomap.png',
      alt: 'kakaomap',
      getDeepLink: (destination, lat, lng, name) => `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${name}`,
      getWebLink: (destination, lat, lng, name) => `https://map.kakao.com/?q=${lat},${lng}`,
    },
    {
      name: '카카오내비',
      imgSrc: '/icons/kakaonavi.png',
      alt: 'kakaonavi',
      getDeepLink: (destination, lat, lng, name) => `kakaonavi://route?sp=${lat},${lng}&ep=37.5662952,126.97794509999994`,
      getWebLink: (destination, lat, lng, name) => `https://map.kakao.com/?q=${lat},${lng}`,
    },
    {
      name: 'T맵',
      imgSrc: '/icons/tmap.png',
      alt: 'tmap',
      getDeepLink: (destination, lat, lng, name) => `https://m.search.tmap.co.kr/tmapview/?version=1&appname=com.skt.tmap&searchKeyword=${lat},${lng}&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}`,
      getWebLink: (destination, lat, lng, name) => `https://m.search.tmap.co.kr/tmapview/?version=1&appname=com.skt.tmap&searchKeyword=${lat},${lng}&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}`,
    },
  ];

  const [from, setFrom] = useState<number | undefined>(undefined);
  const [by, setBy] = useState<number | undefined>(undefined);
  const [to, setTo] = useState<number | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | undefined>(undefined);
  const [currentLocationLoading, setCurrentLocationLoading] = useState<boolean>(false);

  const [intervalCleared, setIntervalCleared] = useState<boolean>(false);
  const [deepLinkInterval, setDeepLinkInterval] = useState<NodeJS.Timeout>();

  const findWay = () => {
    if (from === undefined || by === undefined || to === undefined) {
      alert('출발지점과 어플을 선택해주세요.');
      return;
    }
    let lat = '';
    let lng = '';
    let name = startPoints[from].name;
    if (name === '현위치') {
      if (currentLocation) {
        lat = currentLocation.coords.latitude.toString();
        lng = currentLocation.coords.longitude.toString();
      } else {
        alert('현위치를 찾을 수 없습니다.');
        return;
      }
    } else {
      lat = startPoints[from].lat?.toString() || '';
      lng = startPoints[from].lng?.toString() || '';
    }

    const destination = destinations[to];

    name.replace('현위치', '');

    // if not mobile, open web link
    if (!navigator.userAgent.includes('Android') && !navigator.userAgent.includes('iPhone')) {
      window.open(applications[by].getWebLink(destination, lat, lng, name), '_blank');
      return;
    }

    // if mobile, try deep link
    location.href = applications[by].getDeepLink(destination, lat, lng, name);

    function isHideWeb(timer: NodeJS.Timeout) {
      if (document.webkitHidden || document.hidden) {
        clearTimeout(timer);
        setIntervalCleared(true);
      }
    }

    setIntervalCleared(false);
    const timer = setTimeout(function () {
      if (confirm('새 창에서 가는 길을 확인하시겠습니까?')) {
        window.open(applications[by].getWebLink(destination, lat, lng, name), '_blank');
      }
    }, 2000);
    setDeepLinkInterval(setInterval(() => isHideWeb(timer), 100));
  };

  useEffect(() => {
    if (intervalCleared) {
      clearInterval(deepLinkInterval);
    }
  }, [deepLinkInterval, intervalCleared]);

  const handleClickFrom = (index: number) => {
    if (startPoints[index].name === '현위치') {
      setCurrentLocationLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation(position);
        setCurrentLocationLoading(false);
      }, (error) => {
        alert(error.message);
        setCurrentLocationLoading(false);
      }, {
        enableHighAccuracy: true,
        maximumAge: 10000,
      });
    }
    setFrom(index);
  };

  const findWayButtonDisabled = to === undefined || from === undefined || by === undefined || (startPoints[from].name === '현위치' && !currentLocation);

  return (
    <div className={'flex flex-col gap-10'}>
      <div className={'flex flex-col gap-4'}>
        <ButtonContainer gridColClass={'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}>
          {startPoints.map((startPoint, index) => (
            <Button color={'orange'} key={index} onClick={() => handleClickFrom(index)}>
              {startPoint.name.split(' ').map((word, i) => {
                return (
                  <div key={i}>{word}</div>
                );
              })}
            </Button>
          ))}
        </ButtonContainer>
        <InputGroup>
          <Input
            width={'lg'}
            placeholder={'출발지점'}
            value={from !== undefined ? startPoints[from].name : ''}
            lineColor={'orange'}
          />
          <span className={'self-center'}>에서</span>
        </InputGroup>
        {currentLocationLoading && <Loading text={'현위치를 찾는 중...'}/>}
      </div>
      <div className={'flex flex-col gap-4'}>
        <ButtonContainer gridColClass={'grid-cols-2 sm:grid-cols-4'}>
          {applications.map((application, index) => (
            <Button color={'green'} key={index} onClick={() => setBy(index)}>
              {application.name}
            </Button>
          ))}
        </ButtonContainer>
        <div className={'text-center text-green-300'}>현재 네이버맵만 개발완료</div>
        <InputGroup>
          <Input
            width={'sm'}
            placeholder={'지도 앱'}
            value={by !== undefined ? applications[by].name : ''}
            lineColor={'green'}
          />
          <span className={'self-center'}>(으)로</span>
        </InputGroup>
      </div>
      <div className={'flex flex-col gap-4'}>
        <ButtonContainer gridColClass={'grid-cols-2'}>
          {destinations.map((destination, index) => (
            <Button color={'blue'} key={index} onClick={() => setTo(index)}>
              {destination.label}
            </Button>
          ))}
        </ButtonContainer>
        <InputGroup>
          <Input
            width={'sm'}
            placeholder={'목적지'}
            value={to !== undefined ? destinations[to].label : ''}
            lineColor={'blue'}
          />
          <span className={'self-center'}>까지</span>
        </InputGroup>
      </div>
      <div className={'justify-center flex'}>
        <div className={'flex flex-col'}>
          <button
            className={
              `${findWayButtonDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#FFFAA8]'
              }
             py-3 px-10 text-center text-lg rounded-xl`}
            onClick={findWay}
            disabled={findWayButtonDisabled}
          >
            가는 길 찾기
          </button>
        </div>
      </div>
      <div>
        <RoughMap/>
        <Transportations/>
      </div>
    </div>
  );
};

export default WayToCome;
