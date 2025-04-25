
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-farmiq-cream to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-farmiq-green mb-4">
              Smart Farming with AI-Powered Insights
            </h1>
            <p className="text-lg md:text-xl text-farmiq-brown mb-8">
              Empowering Indian farmers with data-driven decisions for better yields and sustainable agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">Get Started</Button>
              <Button variant="outline" className="flex items-center gap-2 border-farmiq-green text-farmiq-green">
                Learn More <ArrowRight size={16} />
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-farmiq-green rounded-full absolute -z-10 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                alt="Healthy crops" 
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
