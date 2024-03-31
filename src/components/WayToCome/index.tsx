'use client'

import { useEffect, useState } from 'react';
import Loading from '@/components/WayToCome/Loading';
import Input from '@/components/WayToCome/Input';
import Button from '@/components/WayToCome/Button';
import ButtonContainer from '@/components/WayToCome/ButtonContainer';
import InputGroup from '@/components/WayToCome/InputGroup';
import RoughMap from '@/components/WayToCome/RoughMap';
import Transportations from '@/components/WayToCome/Transportations';
import { applications, destinations, startPoints } from '@/components/WayToCome/data';
import Script from 'next/script';
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

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

  const [kakaoNaviInitialized, setKakaoNaviInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (intervalCleared) {
      clearInterval(deepLinkInterval);
    }
  }, [deepLinkInterval, intervalCleared]);

  const isHideWeb = (timer: NodeJS.Timeout) => {
    if (document.webkitHidden || document.hidden) {
      clearTimeout(timer);
      setIntervalCleared(true);
    }
  };

  const findWay = () => {
    if (from === undefined || by === undefined || to === undefined) {
      alert('출발지점과 어플을 선택해주세요.');
      return;
    }

    const startPoint = startPoints[from];

    let name = startPoint.name;
    if (name === '현위치' && !currentLocation) {
      alert('현위치를 찾을 수 없습니다.');
      return;
    }

    let lat;
    let lng;
    if (currentLocation) {
      lat = currentLocation.coords.latitude;
      lng = currentLocation.coords.longitude;
    } else {
      lat = startPoint.lat;
      lng = startPoint.lng;
    }

    if (!lat || !lng) {
      alert('출발지점의 위치를 찾을 수 없습니다.');
      return;
    }

    const destination = destinations[to];
    const application = applications[by];

    const distance = Math.ceil(Math.sqrt((lat - destination.lat) ** 2 + (lng - destination.lng) ** 2) * 100) / 100;

    sendGAEvent(
      'event',
      'click-find-way',
      {
        valueStartPoint: startPoint.name,
        valueApplication: application.name,
        valueDestination: destination.name,
        distance: distance,
      },
    );
    sendGTMEvent({
      event: 'click-find-way',
      valueStartPoint: startPoint.name,
      valueApplication: application.name,
      valueDestination: destination.name,
      distance: distance,
    });

    name.replace('현위치', '');

    // if not mobile, open web link
    if (!navigator.userAgent.includes('Android') && !navigator.userAgent.includes('iPhone')) {
      application.openWebLink(destination, lat, lng, name);
      return;
    }

    // if mobile, try deep link
    if (application.name === '카카오내비' && !kakaoNaviInitialized) {
      alert('카카오내비 초기화 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    application.openDeepLink(destination, lat, lng, name);

    setIntervalCleared(false);
    const timer = setTimeout(function () {

      if (navigationSelected || confirm('새 창에서 가는 길을 확인하시겠습니까?')) {
        application.openWebLink(destination, lat, lng, name);
      }
    }, 1500);

    if (!navigationSelected) {
      setDeepLinkInterval(setInterval(() => isHideWeb(timer), 100));
    }
  };

  const findWayButtonDisabled = to === undefined || from === undefined || by === undefined || (startPoints[from].name === '현위치' && !currentLocation);

  const handleSetFrom = (index: number) => {
    setFrom(index);
    if (startPoints[index].name === '현위치' && !currentLocation) {
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
  };

  const handleSetBy = (index: number) => {
    setBy(index);

    const isNavigation = applications[index].type === 'navigation';
    const isMobile = navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone');
    if (isNavigation && !isMobile) {
      alert('내비게이션은 모바일에서만 사용 가능합니다.');
    }
  };

  const navigationSelected = by !== undefined && applications[by].type === 'navigation';

  return (
    <div className={'flex flex-col gap-10'}>
      <div id={'find-way-container'} className={"flex flex-col gap-10"}>
        <div className={'flex flex-col gap-4'}>
          <ButtonContainer gridColClass={'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}>
            {startPoints.map((startPoint, index) => (
              <Button
                color={'orange'}
                key={index}
                onClick={() => handleSetFrom(index)}
                selected={from === index}
              >
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
              <Button
                color={'green'}
                key={index}
                onClick={() => handleSetBy(index)}
                selected={by === index}
              >
                {application.name}
              </Button>
            ))}
          </ButtonContainer>
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
              <Button
                color={'blue'}
                key={index}
                onClick={() => setTo(index)}
                selected={to === index}
              >
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
              id={'find-way-button'}
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
      </div>
      <div>
        <RoughMap/>
        <Transportations/>
      </div>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
        integrity="sha384-l+xbElFSnPZ2rOaPrU//2FF5B4LB8FiX5q4fXYTlfcG4PGpMkE1vcL7kNXI6Cci0"
        crossOrigin={'anonymous'}
        onLoad={() => {
          // @ts-ignore
          Kakao.init('d23a3f32a09035942646153c53e2e2f7');
          setKakaoNaviInitialized(true);
        }}
      />
    </div>
  );
};

export default WayToCome;
