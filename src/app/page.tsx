'use client';

import MainBanner from '@/components/MainBanner';
import Events from '@/components/Introduce';
import WayToCome from '@/components/WayToCome';
import InvitationMessage from '@/components/InvitationMessage';
import PhotoGallery from '@/components/PhotoGallery';
import ShareEvent from '@/components/Share';
import SourceCodeReference from '../components/SourceCodeReference';
import BankAccountGroup from '@/components/BankAccountGroup';
import Background from '@/components/Background';
import BackgroundMusic from '@/components/BackgroundMusic';
import NoSSR from '@/components/NoSSR';

export default function Home() {
  return (
    <div>
      <NoSSR><Background/></NoSSR>
      <div className={'flex flex-col gap-16 mb-20'}>
        <div className={'flex flex-col gap-8 max-w-3xl mx-auto shadow-2xl'}>
          <MainBanner/>
          <InvitationMessage/>
          <Events/>
          <PhotoGallery/>
          <WayToCome/>
          <BankAccountGroup/>
        </div>
        <div className={'max-w-3xl w-full mx-auto'}>
          <ShareEvent/>
        </div>
        <div className={'max-w-3xl w-full mx-auto flex flex-col gap-4'}>
          <SourceCodeReference/>
          <NoSSR><BackgroundMusic/></NoSSR>
        </div>
      </div>
    </div>
  );
}
