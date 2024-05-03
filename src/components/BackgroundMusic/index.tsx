export const BackgroundMusic = () => {
  const musics = [
    '/musics/노을의 저편에서.mp3',
  ];

  return (
    <>
      <div className={'fixed bottom-4 right-4'}>
        <audio
          controls={true}
          autoPlay={true}
          loop={true}
          src={musics[0]}
          controlsList={'nodownload noplaybackrate'}
        />
      </div>
      <div className={'text-center text-gray-300'}>
        음원: 노을의 저편에서 - 브금대통령
      </div>
    </>
  );
};

export default BackgroundMusic;
