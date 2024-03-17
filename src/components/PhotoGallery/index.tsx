'use client';

const PhotoGallery = () => {
  const images = [
    '/sample/400.jpeg',
    '/sample/400-2.jpeg',
  ];

  return (
    <div className={'flex gap-2'}>
      {images.map((image, i) => {
        const imgClass = `url('${image}')`;
        return (
          <div style={{ backgroundImage: imgClass }} className={'bg-no-repeat bg-contain w-full h-[400px]'} key={i} />
        );
      })}
    </div>
  );
};

export default PhotoGallery;
