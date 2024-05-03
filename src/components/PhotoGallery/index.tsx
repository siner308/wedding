'use client';

import { useEffect, useState } from 'react';

const PhotoGallery = () => {
  const [width, setWidth] = useState(0);
  const images = [
    { path: '/images/gallery/1.jpg', width: 266 },
    { path: '/images/gallery/5.jpg', width: 266 },
    { path: '/images/gallery/2.jpg', width: 266 },
    { path: '/images/gallery/4.jpg', width: 266 },
    { path: '/images/gallery/6.jpg', width: 266 },
    { path: '/images/gallery/3.jpg', width: 600 },
  ];

  const handleResize = () => {
    const container = document.querySelector('#gallery');
    if (!container) return;
    const parentWidth = container.parentElement?.clientWidth!;
    const windowWidth = window.outerWidth;
    setWidth(parentWidth > windowWidth ? windowWidth : parentWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id={'gallery'} className={'overflow-x-scroll'} style={{width: `${width}px`}}>
      <div className={'flex gap-2'}>
        {images.map((image, i) => {
          const imgClass = `url('${image.path}')`;
          const width = image.width === 266 ? 'px-[200px]' : 'px-[450px]';
          return (
            <div
              style={{ backgroundImage: imgClass }}
              className={`bg-center bg-no-repeat bg-cover ${width} h-[600px] pointer-events-none`}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PhotoGallery;
