import { useEffect, useState } from 'react';
import Loading from '@/components/WayToCome/Loading';
import Input from '@/components/WayToCome/Input';
import Button from '@/components/WayToCome/Button';
import ButtonContainer from '@/components/WayToCome/ButtonContainer';
import InputGroup from '@/components/WayToCome/InputGroup';
import RoughMap from '@/components/WayToCome/RoughMap';
import Transportations from '@/components/WayToCome/Transportations';
import { applications, destinations, startPoints } from '@/components/WayToCome/data';


declare global {
  interface Document {
    webkitHidden: boolean;
  }
}

const WayToCome = () => {
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
