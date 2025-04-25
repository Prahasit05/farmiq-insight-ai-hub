
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-farmiq-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="font-bold text-xl text-farmiq-green hidden sm:block">FarmIQ</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-farmiq-green hover:text-farmiq-green-light font-medium">Home</a>
          <a href="#disease-detection" className="text-farmiq-green hover:text-farmiq-green-light font-medium">Disease Detection</a>
          <a href="#marketplace" className="text-farmiq-green hover:text-farmiq-green-light font-medium">Marketplace</a>
          <a href="#soil-tips" className="text-farmiq-green hover:text-farmiq-green-light font-medium">Soil Tips</a>
        </nav>

        <div className="flex items-center gap-4">
          <Select defaultValue="en">
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
              <SelectItem value="mr">मराठी</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="hidden md:flex">Login</Button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-farmiq-green"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col gap-4">
            <a href="#" className="text-farmiq-green hover:text-farmiq-green-light font-medium py-2 border-b border-gray-100">Home</a>
            <a href="#disease-detection" className="text-farmiq-green hover:text-farmiq-green-light font-medium py-2 border-b border-gray-100">Disease Detection</a>
            <a href="#marketplace" className="text-farmiq-green hover:text-farmiq-green-light font-medium py-2 border-b border-gray-100">Marketplace</a>
            <a href="#soil-tips" className="text-farmiq-green hover:text-farmiq-green-light font-medium py-2 border-b border-gray-100">Soil Tips</a>
            <Button className="mt-2">Login</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
