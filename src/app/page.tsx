'use client'

import MainBanner from '@/components/MainBanner';
import Events from '@/components/Introduce';
import WayToCome from '@/components/WayToCome';
import InvitationMessage from '@/components/InvitationMessage';
import PhotoGallery from '@/components/PhotoGallery';

export default function Home() {
  return (
    <div className={'flex flex-col gap-8 max-w-3xl mx-auto shadow-2xl pb-10'}>
      <MainBanner />
      <InvitationMessage />
      <Events />
      <PhotoGallery />
      <WayToCome />
    </div>
  );
}
