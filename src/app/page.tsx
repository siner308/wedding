import MainBanner from '@/components/MainBanner';
import Events from '@/components/Introduce';
import WayToCome from '@/components/WayToCome';

export default function Home() {
  return (
    <div className={'p-1 flex flex-col gap-1'}>
      <MainBanner />
      <Events />
      <WayToCome />
    </div>
  );
}
