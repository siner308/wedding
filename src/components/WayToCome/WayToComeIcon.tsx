'use client';

import Image, { StaticImageData } from 'next/image';

type Props = {
  imgSrc: string;
  alt: string;
  href: string;
  label: string;
}

const WayToComeIcon = (props: Props) => {
  const { label, imgSrc, alt, href } = props;

  const onClick = () => {
    window.open(href, '_blank');
  };
  return (
    <div
      className={"cursor-pointer bg-blue-200 p-1"}
      onClick={onClick}
    >
      <Image alt={alt} width={64} height={64} src={imgSrc} />
      <div className={'text-center'}>{label}</div>
    </div>
  );
};

export default WayToComeIcon;
