
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DiseaseDetection from '@/components/DiseaseDetection';
import MarketplacePrices from '@/components/MarketplacePrices';
import SoilTips from '@/components/SoilTips';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <DiseaseDetection />
        <MarketplacePrices />
        <SoilTips />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
