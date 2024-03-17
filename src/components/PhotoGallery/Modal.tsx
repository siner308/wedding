import { useState } from 'react';
import Image from 'next/image';

type Props = {
  index: number;
  images: string[];
  onClose: () => void;
}

const Modal = (props: Props) => {
  const { index, images, onClose } = props;
  const [currentIndex, setCurrentIndex] = useState(index);

  const imageInfoList = images.map((src, i) => ({ src: src, index: i }));
  const sliceSize = 5;
  const currentImageInfo = imageInfoList[currentIndex];

  const sliceStart = currentIndex - 2 < 0 ? 0 : currentIndex + 3 > imageInfoList.length ? imageInfoList.length - sliceSize : currentIndex - 2;
  const sliceEnd = currentIndex - 2 < 0 ? sliceSize : currentIndex + 3 > imageInfoList.length ? imageInfoList.length : currentIndex + 3;
  const slicedImages = imageInfoList.slice(sliceStart, sliceEnd);

  const prevDisabled = currentIndex == 0;
  const nextDisabled = currentIndex == imageInfoList.length - 1;

  return (
    <div
      className={'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'}>
      <div className={'relative p-4 w-full max-w-2xl max-h-full'}>
        <div id={'modal-content'} className={'relative items-center bg-white rounded-lg shadow dark:bg-gray-700 flex flex-col gap-8'}>
          <div id={'current-image'}>
            <Image src={currentImageInfo.src} alt={currentImageInfo.src} width={500} height={500}/>
          </div>
          <div id={'photo-gallery-image-container'} className={'flex gap-8'}>
            {slicedImages.map((image) => (
              <div key={image.index} onClick={() => setCurrentIndex(image.index)}>
                <Image src={image.src} alt={image.src} width={100} height={100}/>
              </div>
            ))}
          </div>
          <div className={'flex gap-10'}>
            <button className={`${prevDisabled ? 'bg-gray-300' : 'bg-blue-300'} p-3 rounded-2xl`} disabled={prevDisabled} onClick={() => setCurrentIndex(currentIndex - 1)}>prev</button>
            <button className={`${nextDisabled ? 'bg-gray-300' : 'bg-blue-300'} p-3 rounded-2xl`} disabled={nextDisabled} onClick={() => setCurrentIndex(currentIndex + 1)}>next</button>
          </div>
          <button className={'bg-orange-300 h-14 w-full text-center text-2xl rounded-b-lg'} onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
