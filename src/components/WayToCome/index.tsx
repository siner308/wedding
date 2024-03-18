import { useEffect, useState } from 'react';
import Loading from '@/components/WayToCome/Loading';
import { decl } from 'postcss';

type StartPoint = {
  name: string;
  lat?: number;
  lng?: number;
}

type Application = {
  name: string;
  imgSrc: string;
  alt: string;
  getDeepLink: (lat?: string, lng?: string, name?: string) => string;
  getWebLink: (lat?: string, lng?: string, name?: string) => string;
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

  const destination = {
    name: '루벨',
    lat: 37.5361769,
    lng: 127.1322858,
  };

  const applications: Application[] = [
    {
      name: '네이버 지도',
      imgSrc: '/icons/navermap.png',
      alt: 'navermap',
      getDeepLink: (lat, lng, name) => `nmap://route/public?slat=${lat}&slng=${lng}&sname=${name}&dlat=${destination.lat}&dlng=${destination.lng}&dname=${destination.name}`,
      getWebLink: (lat, lng, name) => `http://map.naver.com/index.nhn?slng=${lng}&slat=${lat}&stext=${name}&elng=${destination.lng}&elat=${destination.lat}&etext=${destination.name}&menu=route&pathType=1`,
    },
    {
      name: '카카오맵',
      imgSrc: '/icons/kakaomap.png',
      alt: 'kakaomap',
      getDeepLink: (lat, lng, name) => `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${name}`,
      getWebLink: (lat, lng, name) => `https://map.kakao.com/?q=${lat},${lng}`,
    },
    {
      name: '카카오내비',
      imgSrc: '/icons/kakaonavi.png',
      alt: 'kakaonavi',
      getDeepLink: (lat, lng, name) => `kakaonavi://route?sp=${lat},${lng}&ep=37.5662952,126.97794509999994`,
      getWebLink: (lat, lng, name) => `https://map.kakao.com/?q=${lat},${lng}`,
    },
    {
      name: 'T맵',
      imgSrc: '/icons/tmap.png',
      alt: 'tmap',
      getDeepLink: (lat, lng, name) => `https://m.search.tmap.co.kr/tmapview/?version=1&appname=com.skt.tmap&searchKeyword=${lat},${lng}&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}`,
      getWebLink: (lat, lng, name) => `https://m.search.tmap.co.kr/tmapview/?version=1&appname=com.skt.tmap&searchKeyword=${lat},${lng}&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}`,
    },
  ];

  const [from, setFrom] = useState<number | undefined>(undefined);
  const [by, setBy] = useState<number | undefined>(undefined);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | undefined>(undefined);
  const [currentLocationLoading, setCurrentLocationLoading] = useState<boolean>(false);

  const [intervalCleared, setIntervalCleared] = useState<boolean>(false);
  const [deepLinkInterval, setDeepLinkInterval] = useState<NodeJS.Timeout>();

  const findWay = () => {
    if (from === undefined || by === undefined) {
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

    name.replace('현위치', '');

    // if not mobile, open web link
    if (!navigator.userAgent.includes('Android') && !navigator.userAgent.includes('iPhone')) {
      window.open(applications[by].getWebLink(lat, lng, name), '_blank');
      return;
    }

    // if mobile, try deep link
    location.href = applications[by].getDeepLink(lat, lng, name);

    function isHideWeb(timer: NodeJS.Timeout) {
      if (document.webkitHidden || document.hidden) {
        clearTimeout(timer);
        setIntervalCleared(true);
      }
    }

    setIntervalCleared(false);
    const timer = setTimeout(function () {
      if (confirm('새 창에서 가는 길을 확인하시겠습니까?')) {
        window.open(applications[by].getWebLink(lat, lng, name), '_blank');
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

  const findWayButtonDisabled = from === undefined || by === undefined || (startPoints[from].name === '현위치' && !currentLocation);

  return (
    <div className={'flex flex-col p-2 gap-10'}>
      <div className={'flex flex-col gap-4'}>
        <div className={'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 place-self-center'}>
          {startPoints.map((startPoint, index) => (
            <button
              className={'p-1 h-14 max-w-40 bg-orange-300 rounded-lg break-words'}
              key={index}
              onClick={() => handleClickFrom(index)}
            >
              {startPoint.name.split(' ').map((word, i) => {
                return (
                  <div key={i}>{word}</div>
                )
              })}
            </button>
          ))}
        </div>
        <div className={'flex justify-center gap-2'}>
          <input
            className={'h-10 w-40 text-xl text-center border-orange-500 border-b-2 rounded-b-none'}
            disabled={true}
            value={from !== undefined ? startPoints[from].name : ''}
            placeholder={'출발지점'}
          />
          <span className={'self-center'}>에서</span>
        </div>
        {currentLocationLoading && <Loading text={'현위치를 찾는 중...'}/>}
      </div>
      <div className={'flex flex-col gap-4'}>
        <div className={'grid grid-cols-2 sm:grid-cols-4 gap-2 place-self-center'}>
          {applications.map((application, index) => (
            <button
              className={'p-1 h-14 bg-blue-300 rounded-lg break-words'}
              key={index}
              onClick={() => setBy(index)}
            >
              {application.name}
            </button>
          ))}
        </div>
        <div className={'text-center text-red-300'}>현재 네이버맵만 개발완료</div>
        <div className={'flex justify-center gap-2'}>
          <input
            className={'h-10 w-40 text-xl text-center border-blue-500 border-b-2 rounded-b-none'}
            disabled={true}
            value={by !== undefined ? applications[by].name : ''}
            placeholder={'지도 앱'}
          />
          <span className={'self-center'}>(으)로</span>
        </div>
      </div>
      <div className={'justify-center flex'}>
        <button
          className={
            `${findWayButtonDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-amber-200'
            }
           py-3 px-10 text-center text-lg rounded-xl`}
          onClick={findWay}
          disabled={findWayButtonDisabled}
        >
          찾아보기
        </button>
      </div>
    </div>
  );
};

export default WayToCome;
