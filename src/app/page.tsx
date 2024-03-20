'use client';

import MainBanner from '@/components/MainBanner';
import Events from '@/components/Introduce';
import WayToCome from '@/components/WayToCome';
import InvitationMessage from '@/components/InvitationMessage';
import PhotoGallery from '@/components/PhotoGallery';
import ShareEvent from '@/components/Share';
import SourceCodeReference from '../components/SourceCodeReference';

export default function Home() {
  return (
    <div className={'flex flex-col gap-20 mb-10'}>
      <div className={'flex flex-col gap-8 max-w-3xl mx-auto shadow-2xl'}>
        <MainBanner/>
        <InvitationMessage/>
        <Events/>
        <PhotoGallery/>
        <WayToCome/>
      </div>
      <div className={'max-w-3xl w-full mx-auto'}>
        <ShareEvent/>
      </div>
      <div className={'max-w-3xl w-full mx-auto'}>
        <SourceCodeReference />
      </div>
    </div>
  );
}
