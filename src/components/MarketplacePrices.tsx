
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ChartBar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface MarketItem {
  name: string;
  price: number;
  change: number;
  unit: string;
}

interface MarketData {
  vegetables: MarketItem[];
  fruits: MarketItem[];
  grains: MarketItem[];
  lastUpdated: string;
}

// Initial market data
const initialMarketData: MarketData = {
  vegetables: [
    { name: 'Tomato', price: 25, change: 3.5, unit: '₹/kg' },
    { name: 'Potato', price: 18, change: -1.2, unit: '₹/kg' },
    { name: 'Onion', price: 35, change: 5.8, unit: '₹/kg' },
    { name: 'Carrot', price: 42, change: -0.7, unit: '₹/kg' },
    { name: 'Cauliflower', price: 30, change: 2.3, unit: '₹/kg' },
    { name: 'Brinjal', price: 28, change: 0, unit: '₹/kg' },
  ],
  fruits: [
    { name: 'Apple', price: 120, change: -4.5, unit: '₹/kg' },
    { name: 'Banana', price: 60, change: 1.8, unit: '₹/dozen' },
    { name: 'Mango', price: 150, change: 3.2, unit: '₹/kg' },
    { name: 'Orange', price: 80, change: 0.9, unit: '₹/kg' },
    { name: 'Watermelon', price: 65, change: -2.1, unit: '₹/piece' },
    { name: 'Papaya', price: 55, change: 1.5, unit: '₹/kg' },
  ],
  grains: [
    { name: 'Wheat', price: 28, change: 0.8, unit: '₹/kg' },
    { name: 'Rice', price: 45, change: 1.2, unit: '₹/kg' },
    { name: 'Maize', price: 22, change: -0.5, unit: '₹/kg' },
    { name: 'Sorghum', price: 32, change: 0.3, unit: '₹/kg' },
    { name: 'Barley', price: 38, change: -1.1, unit: '₹/kg' },
    { name: 'Millet', price: 42, change: 2.7, unit: '₹/kg' },
  ],
  lastUpdated: new Date().toLocaleString()
};

// Function to simulate fetching updated data from an API
// In a real app, this would be an API call to a real market data source
const fetchMarketData = async (region: string, district: string, state: string): Promise<MarketData> => {
  // In a real app, we would use these parameters to fetch specific regional data
  console.log(`Fetching market data for ${region} in ${district}, ${state}`);
  
  try {
    // Simulate an API call with a small delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate slightly randomized data based on the initial data
    const generateRandomizedData = (items: MarketItem[]): MarketItem[] => {
      return items.map(item => {
        const priceChange = (Math.random() * 10) - 5; // Random price change between -5 and +5
        const newPrice = Math.max(5, Math.round(item.price + priceChange));
        const newChange = +(Math.random() * 6 - 3).toFixed(1); // Random change between -3% and +3%
        
        return {
          ...item,
          price: newPrice,
          change: newChange
        };
      });
    };
    
    // Return "fresh" data
    return {
      vegetables: generateRandomizedData(initialMarketData.vegetables),
      fruits: generateRandomizedData(initialMarketData.fruits),
      grains: generateRandomizedData(initialMarketData.grains),
      lastUpdated: new Date().toLocaleString()
    };
  } catch (error) {
    console.error("Failed to fetch market data:", error);
    // Return the initial data if the fetch fails
    return { ...initialMarketData, lastUpdated: new Date().toLocaleString() };
  }
};

const MarketplacePrices = () => {
  const { toast } = useToast();
  const [region, setRegion] = useState('district');
  const [district, setDistrict] = useState('pune');
  const [state, setState] = useState('maharashtra');
  const [duration, setDuration] = useState('daily');
  const [marketData, setMarketData] = useState<MarketData>(initialMarketData);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('vegetables');
  
  // Calculate average price change
  const calculateAverageChange = () => {
    const allItems = [
      ...marketData.vegetables,
      ...marketData.fruits,
      ...marketData.grains
    ];
    
    const totalChange = allItems.reduce((sum, item) => sum + item.change, 0);
    return +(totalChange / allItems.length).toFixed(1);
  };
  
  // Calculate trading volume (random for demo)
  const calculateTradingVolume = () => {
    return (Math.random() * 30 + 15).toFixed(1);
  };
  
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const freshData = await fetchMarketData(region, district, state);
      setMarketData(freshData);
      toast({
        title: "Data Updated",
        description: "Latest market prices have been fetched.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast({
        title: "Update Failed",
        description: "Could not fetch latest market data. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [region, district, state]);
  
  return (
    <section id="marketplace" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Live Marketplace Prices</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Stay updated with the latest prices of agricultural products across different regions.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-5 mb-8">
          <div className="flex-1 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-2">Price Level</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="district">District</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {region === 'district' && (
              <div>
                <label className="block text-sm font-medium mb-2">District</label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="nashik">Nashik</SelectItem>
                    <SelectItem value="nagpur">Nagpur</SelectItem>
                    <SelectItem value="amravati">Amravati</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {(region === 'district' || region === 'state') && (
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Time Duration</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-end">
            <Card className="w-full bg-farmiq-cream">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Market Overview</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-7 w-7"
                    onClick={refreshData}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="sr-only">Refresh</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Average Price Change</p>
                    <div className="flex items-center">
                      {calculateAverageChange() > 0 ? (
                        <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : calculateAverageChange() < 0 ? (
                        <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                      ) : null}
                      <span className={`font-medium ${
                        calculateAverageChange() > 0 ? 'text-green-600' : 
                        calculateAverageChange() < 0 ? 'text-red-600' : ''
                      }`}>
                        {Math.abs(calculateAverageChange())}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Trading Volume</p>
                    <p className="font-medium">{calculateTradingVolume()} Tons</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{marketData.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
            <TabsTrigger value="fruits">Fruits</TabsTrigger>
            <TabsTrigger value="grains">Grains</TabsTrigger>
          </TabsList>
          
          {(['vegetables', 'fruits', 'grains'] as const).map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {marketData[category].map((item, index) => (
                  <Card key={index} className="card-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>{item.name}</CardTitle>
                        <div className="flex items-center">
                          <ChartBar className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">View Chart</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">{item.price} {item.unit.split('/')[0]}</p>
                          <p className="text-xs text-muted-foreground">{item.unit}</p>
                        </div>
                        <div className={`flex items-center ${item.change > 0 ? 'text-green-500' : item.change < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                          {item.change > 0 && <ArrowUp className="h-4 w-4 mr-1" />}
                          {item.change < 0 && <ArrowDown className="h-4 w-4 mr-1" />}
                          <span>{Math.abs(item.change)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MarketplacePrices;
