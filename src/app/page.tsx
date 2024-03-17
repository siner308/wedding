'use client'

import MainBanner from '@/components/MainBanner';
import Events from '@/components/Introduce';
import WayToCome from '@/components/WayToCome';
import InvitationMessage from '@/components/InvitationMessage';
import PhotoGallery from '@/components/PhotoGallery';

export default function Home() {
  return (
    <div className={'px-8 flex flex-col gap-8 max-w-screen-lg mx-auto'}>
      <MainBanner />
      <InvitationMessage />
      <Events />
      <PhotoGallery />
      <WayToCome />
    </div>
  );
}
