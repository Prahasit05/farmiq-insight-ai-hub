import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Leaf, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const soilTypes = [
  { 
    id: 'loam', 
    name: 'Loam Soil',
    description: 'A mixture of sand, silt, and clay. Good for most crops.',
    crops: ['Rice', 'Wheat', 'Vegetables', 'Fruits'],
    tips: [
      'Add organic matter annually to maintain fertility',
      'Good drainage makes this ideal for most crops',
      'Regular soil testing will help maintain optimal pH (6.0-7.0)',
      'Rotate crops to prevent nutrient depletion'
    ]
  },
  { 
    id: 'clay', 
    name: 'Clay Soil',
    description: 'Heavy soil with small particles. Holds water well but drains slowly.',
    crops: ['Rice', 'Wheat', 'Cotton'],
    tips: [
      'Add organic matter to improve structure and drainage',
      'Avoid working clay soil when wet',
      'Raised beds can help with drainage issues',
      'Deep rooted cover crops can help break up clay soil'
    ]
  },
  { 
    id: 'sandy', 
    name: 'Sandy Soil',
    description: 'Light soil with large particles. Drains quickly but doesn\'t hold nutrients well.',
    crops: ['Groundnut', 'Potato', 'Carrot', 'Radish'],
    tips: [
      'Add organic matter to improve water retention',
      'More frequent irrigation and fertilization needed',
      'Mulching helps retain moisture',
      'Consider using water-retaining polymers for water management'
    ]
  },
  { 
    id: 'silt', 
    name: 'Silty Soil',
    description: 'Smooth soil with medium-sized particles. Holds water and nutrients well.',
    crops: ['Vegetables', 'Fruits', 'Wheat', 'Ornamentals'],
    tips: [
      'Add organic matter to improve structure',
      'Avoid compaction by limiting foot and equipment traffic',
      'Cover crops help prevent erosion',
      'Gently incorporate amendments to preserve structure'
    ]
  },
  { 
    id: 'black', 
    name: 'Black Cotton Soil',
    description: 'Dark colored soil with high clay content. Expands when wet, contracts when dry.',
    crops: ['Cotton', 'Sugarcane', 'Wheat', 'Jowar'],
    tips: [
      'Deep plowing can help manage the shrink-swell cycle',
      'Add organic matter to improve structure',
      'Careful irrigation management to prevent waterlogging',
      'Choose crops tolerant of alkaline conditions'
    ]
  },
];

const cropRecommendations = [
  { crop: 'Rice', soilTypes: ['Loam', 'Clay'], season: 'Kharif', tips: 'Needs standing water, transplant seedlings at 20-25 days' },
  { crop: 'Wheat', soilTypes: ['Loam', 'Clay', 'Silt'], season: 'Rabi', tips: 'Well-drained soil, sow after field preparation' },
  { crop: 'Cotton', soilTypes: ['Black Cotton', 'Loam'], season: 'Kharif', tips: 'Deep soils, needs regular irrigation' },
  { crop: 'Potato', soilTypes: ['Sandy', 'Loam'], season: 'Rabi', tips: 'Well-drained soil, earthing up required' },
  { crop: 'Tomato', soilTypes: ['Loam', 'Silt'], season: 'Year-round', tips: 'Well-drained soil, staking required' },
];

const SoilTips = () => {
  const [selectedSoilType, setSelectedSoilType] = useState('loam');
  const [selectedCrop, setSelectedCrop] = useState('');
  
  const selectedSoil = soilTypes.find(soil => soil.id === selectedSoilType);
  
  return (
    <section id="soil-tips" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Soil Health Advisor</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Get personalized tips and recommendations for maintaining healthy soil and choosing the right crops.
        </p>
        
        <Tabs defaultValue="soil-type">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="soil-type">By Soil Type</TabsTrigger>
            <TabsTrigger value="crop">By Crop</TabsTrigger>
          </TabsList>
          
          <TabsContent value="soil-type">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Select Your Soil Type</label>
                <Select value={selectedSoilType} onValueChange={setSelectedSoilType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map(soil => (
                      <SelectItem key={soil.id} value={soil.id}>{soil.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedSoil && (
                <Card className="card-shadow border-farmiq-green-light">
                  <CardHeader className="bg-farmiq-green-light bg-opacity-10">
                    <div className="flex items-center gap-3">
                      <Leaf className="h-6 w-6 text-farmiq-green" />
                      <div>
                        <CardTitle>{selectedSoil.name}</CardTitle>
                        <CardDescription>{selectedSoil.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-farmiq-green mb-2">Recommended Crops</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSoil.crops.map((crop, index) => (
                            <span key={index} className="bg-farmiq-cream px-3 py-1 rounded-full text-sm">
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-farmiq-green mb-2">Soil Management Tips</h4>
                        <ul className="space-y-2 text-sm">
                          {selectedSoil.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Leaf className="h-4 w-4 text-farmiq-green mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full btn-secondary">Get Detailed Soil Report</Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="crop">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">What are you planning to grow?</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropRecommendations.map((item, index) => (
                      <SelectItem key={index} value={item.crop}>{item.crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCrop && (
                <Card className="card-shadow border-farmiq-green-light">
                  <CardHeader className="bg-farmiq-green-light bg-opacity-10">
                    <CardTitle>{selectedCrop} Cultivation Guide</CardTitle>
                    <CardDescription>
                      {cropRecommendations.find(item => item.crop === selectedCrop)?.tips}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-farmiq-green mb-2">Suitable Soil Types</h4>
                        <div className="flex flex-wrap gap-2">
                          {cropRecommendations.find(item => item.crop === selectedCrop)?.soilTypes.map((soil, index) => (
                            <span key={index} className="bg-farmiq-cream px-3 py-1 rounded-full text-sm">
                              {soil} Soil
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-farmiq-green mb-2">Growing Season</h4>
                          <p>{cropRecommendations.find(item => item.crop === selectedCrop)?.season}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-farmiq-green mb-2">Water Requirements</h4>
                          <div className="flex items-center gap-1">
                            <span className="bg-blue-100 h-3 w-8 rounded-full"></span>
                            <span className="bg-blue-200 h-3 w-8 rounded-full"></span>
                            <span className="bg-blue-300 h-3 w-8 rounded-full"></span>
                            <span className="text-sm ml-2">Moderate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full flex items-center justify-center gap-2 btn-secondary">
                      Detailed Growing Guide
                      <ArrowRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SoilTips;
