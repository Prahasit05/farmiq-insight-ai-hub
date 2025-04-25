
import React from 'react';
import { Home, Upload, ChartBar, Leaf, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-farmiq-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-xl text-farmiq-green">FarmIQ</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Empowering Indian farmers with AI-powered insights for better yields and sustainable agriculture.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-farmiq-green">Features</h3>
            <ul className="space-y-2">
              <li><a href="#disease-detection" className="text-sm hover:text-farmiq-green">AI Disease Detection</a></li>
              <li><a href="#marketplace" className="text-sm hover:text-farmiq-green">Marketplace Prices</a></li>
              <li><a href="#soil-tips" className="text-sm hover:text-farmiq-green">Soil Health Advisor</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-farmiq-green">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-farmiq-green">Knowledge Base</a></li>
              <li><a href="#" className="text-sm hover:text-farmiq-green">Disease Library</a></li>
              <li><a href="#" className="text-sm hover:text-farmiq-green">Community Forum</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-farmiq-green">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-farmiq-green">support@farmiq.in</a></li>
              <li><a href="#" className="text-sm hover:text-farmiq-green">+91 800 123 4567</a></li>
              <li><a href="#" className="text-sm hover:text-farmiq-green">Contact Form</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 FarmIQ. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-farmiq-green">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-farmiq-green">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex justify-around py-2">
          <a href="#" className="flex flex-col items-center py-2">
            <Home className="h-6 w-6 text-farmiq-green" />
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="#disease-detection" className="flex flex-col items-center py-2">
            <Upload className="h-6 w-6 text-farmiq-green" />
            <span className="text-xs mt-1">Upload</span>
          </a>
          <a href="#marketplace" className="flex flex-col items-center py-2">
            <ChartBar className="h-6 w-6 text-farmiq-green" />
            <span className="text-xs mt-1">Prices</span>
          </a>
          <a href="#soil-tips" className="flex flex-col items-center py-2">
            <Leaf className="h-6 w-6 text-farmiq-green" />
            <span className="text-xs mt-1">Soil</span>
          </a>
          <a href="#" className="flex flex-col items-center py-2">
            <User className="h-6 w-6 text-farmiq-green" />
            <span className="text-xs mt-1">Profile</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
