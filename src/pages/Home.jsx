import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import LimitedOffer from '../components/LimitedOffer';
import CollectionsBanner from '../components/CollectionsBanner';
import AnnouncementBar from '../components/AnnouncementBar';

const Home = () => {
  return (
    <>
      <div className="fixed top-[80px] w-full z-40">
        <AnnouncementBar />
      </div>
      <div className="pt-[120px]">
        <HeroSection />
      </div>
      <FeaturedProducts />
      <LimitedOffer />
      <CollectionsBanner />
    </>
  );
};

export default Home;
