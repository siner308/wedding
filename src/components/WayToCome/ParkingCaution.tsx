type Props = {
  open: boolean;
  onClose: () => void;
}

const ParkingCautionModal = (props: Props) => {
  const { open, onClose } = props;
  const previewImage = '/images/parking_caution.jpg';

  return (
    open ? (
      <div className={
        'fixed max-w-[500px] top-[50%] left-[50%] w-[90%] bg-white items-center' +
        ' transform -translate-x-1/2 -translate-y-1/2' +
        ' rounded-xl shadow-2xl flex flex-col overflow-hidden justify-between text-center z-10' +
        ' border border-black'
      }>
        <div id={'parking-caution-content'}>
          <div className={'w-full h-32 p-2 content-center'}>
            주차장 입구는 <u className={'decoration-[#00F802]'}>좌측의 오피스 방향</u>입니다. (아래 사진 참고)
            <br/>
            주차권은 식당을 나가면서 받으실 수 있으며, 주차는 <u>2시간 무료</u>입니다.
          </div>
          <img className={'w-full aspect-[1/1]'} src={previewImage} alt="주차장 입구 미리보기"/>
        </div>
        <div className={'w-full h-16 text-lg py-2 cursor-pointer content-center'} onClick={onClose}>닫기</div>
      </div>
    ) : null
  );
};

export default ParkingCautionModal;
