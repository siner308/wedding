import Modal from '@/components/PhotoGallery/Modal';
import { useState } from 'react';
import Image from 'next/image';

const PhotoGallery = () => {
  const [openModal, setOpenModal] = useState(false);
  const images = [
    '/sample/150.png',
    '/sample/200.png',
    '/sample/300.png',
    '/sample/400.png',
    '/sample/500.png',
    '/sample/600.png',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenModal = (index: number) => {
    setCurrentIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={''}>
      <div className={'gap-4 grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'}>
        {images.map((image, i) => (
          <div key={i} onClick={() => handleOpenModal(i)}>
            <Image src={image} alt={image} width={150} height={150} />
          </div>
        ))}
      </div>
      {openModal ? <Modal index={currentIndex} images={images} onClose={handleCloseModal}/> : null}
    </div>
  );
};

export default PhotoGallery;
