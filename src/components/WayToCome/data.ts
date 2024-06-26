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
  type: 'map' | 'navigation';
  name: string;
  openDeepLink: (destination: Destination, lat: number, lng: number, name: string) => void;
  openWebLink: (destination: Destination, lat: number, lng: number, name: string) => void;
}

declare global {
  interface Kakao {
    init: (key: string) => void;
    Navi: {
      start: (options: {
        name: string;
        x: number;
        y: number;
        coordType?: 'wgs84' | 'katec';
        vehicleType?: 'car' | 'train' | 'walk';
        rpOption?: 'traffice' | 'shortest';
        sX?: number;
        sY?: number;
      }) => void;
    };
  }
}

export const startPoints: StartPoint[] = [
  { name: '현위치'},
  { name: '잠실역', lat: 37.5132612, lng: 127.1001336},
  { name: '서울역 (KTX)', lat: 37.5547125, lng: 126.9707878},
  { name: '수서역 (SRT)', lat: 37.485544, lng: 127.10438},
  { name: '동대구역 (KTX/SRT)', lat: 35.879667, lng: 128.628476},
  { name: '서울고속터미널 (서울경부)', lat: 37.5049142, lng: 127.0049151},
  { name: '서울남부터미널', lat: 37.484918, lng: 127.01629},
  { name: '동서울터미널 (강변역)', lat: 37.5345963, lng: 127.0941813},
];

export const destinations: Destination[] = [
  {
    name: '루벨',
    label: '웨딩홀',
    lat: 37.5361769,
    lng: 127.1322858,
    parkingRequired: false,
  },
  {
    name: '이스트 센트럴 타워 주차장',
    label: '주차장',
    lat: 37.5369008,
    lng: 127.1326323,
    parkingRequired: true,
  },
];

export const applications: Application[] = [
  {
    type: 'map',
    name: '네이버 지도',
    openDeepLink: (destination, lat, lng, name) => {
      const method = destination.parkingRequired ? 'car' : 'public';
      location.href = `nmap://route/${method}?slat=${lat}&slng=${lng}&sname=${name}&dlat=${destination.lat}&dlng=${destination.lng}&dname=${destination.name}`;
    },
    openWebLink: (destination, lat, lng, name) => {
      const method = destination.parkingRequired ? 0 : 1; // 0: 자동차, 1: 대중교통
      const url = `https://map.naver.com/index.nhn?slng=${lng}&slat=${lat}&stext=${name}&elng=${destination.lng}&elat=${destination.lat}&etext=${destination.name}&menu=route&pathType=${method}`;
      window.open(url, '_blank');
    },
  },
  {
    type: 'map',
    name: '카카오맵',
    openDeepLink: (destination, lat, lng, name) => {
      const method = destination.parkingRequired ? 'CAR' : 'PUBLICTRANSIT';
      location.href = `kakaomap://route?sp=${lat},${lng}&ep=${destination.lat},${destination.lng}&by=${method}`;
    },
    openWebLink: (destination, lat, lng, name) => {
      const url = `https://map.kakao.com/link/from/${name},${lat},${lng}/to/${destination.name},${destination.lat},${destination.lng}`;
      window.open(url, '_blank');
    },
  },
  {
    type: 'navigation',
    name: '카카오내비',
    openDeepLink: (destination, lat, lng, name) => {
      // @ts-ignore
      Kakao.Navi.start({
        name: destination.name,
        x: destination.lng,
        y: destination.lat,
        coordType: 'wgs84',
        routeInfo: true,
        sX: lng,
        sY: lat,
      });
    },
    openWebLink: (destination, lat, lng, name) => {
      if (navigator.userAgent.includes('Android')) {
        location.href = 'https://play.google.com/store/apps/details?id=com.locnall.KimGiSa&pcampaignid=web_share';
      } else {
        location.href = 'https://apps.apple.com/kr/app/%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%82%B4%EB%B9%84-%EC%A3%BC%EC%B0%A8-%EB%B0%9C%EB%A0%9B-%EC%A0%84%EA%B8%B0%EC%B0%A8%EC%B6%A9%EC%A0%84-%EC%84%B8%EC%B0%A8-%EB%B3%B4%ED%97%98-%EC%A4%91%EA%B3%A0%EC%B0%A8/id417698849';
      }
    },
  },
  {
    type: 'navigation',
    name: 'T맵',
    openDeepLink: (destination, lat, lng, name) => {
      location.href = encodeURI(`tmap://route?startname=${name}&startx=${lng}&starty=${lat}&goalname=${destination.name}&goalx=${destination.lng}&goaly=${destination.lat}`);
    },
    openWebLink: (destination, lat, lng, name) => {
      if (navigator.userAgent.includes('Android')) {
        location.href = 'https://play.google.com/store/apps/details?id=com.skt.tmap.ku&pcampaignid=web_share';
      } else {
        location.href = 'https://apps.apple.com/kr/app/%ED%8B%B0%EB%A7%B5-%EB%8C%80%EC%A4%91%EA%B5%90%ED%86%B5-%EB%8C%80%EB%A6%AC%EC%9A%B4%EC%A0%84-%EC%A3%BC%EC%B0%A8-%EB%A0%8C%ED%84%B0%EC%B9%B4-%EA%B3%B5%ED%95%AD%EB%B2%84%EC%8A%A4/id431589174';
      }
    },
  },
];
