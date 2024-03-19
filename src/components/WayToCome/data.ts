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

export const startPoints: StartPoint[] = [
  { name: '현위치' },
  { name: '잠실역', lat: 37.5132612, lng: 127.1001336 },
  { name: '서울역 (KTX)', lat: 37.5547125, lng: 126.9707878 },
  { name: '수서역 (SRT)', lat: 37.485544, lng: 127.10438 },
  { name: '동대구역 (KTX/SRT)', lat: 35.879667, lng: 128.628476 },
  { name: '서울고속터미널 (서울경부)', lat: 37.5049142, lng: 127.0049151 },
  { name: '서울남부터미널', lat: 37.484918, lng: 127.01629 },
  { name: '동서울터미널 (강변역)', lat: 37.5345963, lng: 127.0941813 },
];

export const destinations: Destination[] = [
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

export const applications: Application[] = [
  {
    name: '네이버 지도',
    imgSrc: '/icons/navermap.png',
    alt: 'navermap',
    getDeepLink: (destination, lat, lng, name) => {
      const method = destination.parkingRequired ? 'car' : 'public';
      return `nmap://route/${method}?slat=${lat}&slng=${lng}&sname=${name}&dlat=${destination.lat}&dlng=${destination.lng}&dname=${destination.name}`;
    },
    getWebLink: (destination, lat, lng, name) => {
      const method = destination.parkingRequired ? 0 : 1; // 0: 자동차, 1: 대중교통
      return `https://map.naver.com/index.nhn?slng=${lng}&slat=${lat}&stext=${name}&elng=${destination.lng}&elat=${destination.lat}&etext=${destination.name}&menu=route&pathType=${method}`;
    },
  },
  {
    name: '카카오맵',
    imgSrc: '/icons/kakaomap.png',
    alt: 'kakaomap',
    getDeepLink: (destination, lat, lng, name) => {
      const method = destination.parkingRequired ? 'CAR' : 'PUBLICTRANSIT';
      return `kakaomap://route?sp=${lat},${lng}&ep=${destination.lat},${destination.lng}&by=${method}`;
    },
    getWebLink: (destination, lat, lng, name) => {
      return `https://map.kakao.com/link/from/${name},${lat},${lng}/to/${destination.name},${destination.lat},${destination.lng}`;
    },
  },
  {
    name: '카카오내비',
    imgSrc: '/icons/kakaonavi.png',
    alt: 'kakaonavi',
    getDeepLink: (destination, lat, lng, name) => {
      return `kakaonavi://route?sp=${lat},${lng}&ep=37.5662952,126.97794509999994`;
    },
    getWebLink: (destination, lat, lng, name) => {
      return `https://map.kakao.com/?q=${lat},${lng}`;
    },
  },
  {
    name: 'T맵',
    imgSrc: '/icons/tmap.png',
    alt: 'tmap',
    getDeepLink: (destination, lat, lng, name) => {
      return `https://m.search.tmap.co.kr/tmapview/?version=1&appname=com.skt.tmap&searchKeyword=${lat},${lng}&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}`;
    },
    getWebLink: (destination, lat, lng, name) => {
      return `https://m.search.tmap.co.kr/tmapview/?version=1&appname=com.skt.tmap&searchKeyword=${lat},${lng}&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}&appname=com.skt.tmap&centerLat=37.5662952&centerLon=126.97794509999994&name=${lat},${lng}`;
    },
  },
];
