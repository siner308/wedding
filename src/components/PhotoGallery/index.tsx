'use client';

const PhotoGallery = () => {
  const images = [
    '/sample/sample-1.jpeg',
    '/sample/couple2.jpeg',
  ];

  return (
    <div className={'grid grid-cols-1 lg:grid-cols-2 gap-2 justify-center'}>
      {images.map((image, i) => {
        const imgClass = `url('${image}')`;
        return (
          <div
            style={{ backgroundImage: imgClass }}
            className={'bg-center bg-no-repeat bg-cover w-full h-[400px] pointer-events-none'}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default PhotoGallery;
