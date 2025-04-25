
import { supabase } from "@/integrations/supabase/client";

export interface MarketItem {
  name: string;
  price: number;
  change: number;
  unit: string;
}

export interface MarketData {
  vegetables: MarketItem[];
  fruits: MarketItem[];
  grains: MarketItem[];
  sources?: string[];
  lastUpdated: string;
}

export class MarketDataService {
  static async fetchMarketData(
    region: string,
    district: string,
    state: string
  ): Promise<MarketData> {
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('fetch-market-data', {
        body: { region, district, state }
      });
      
      if (error) {
        console.error("Error fetching market data from edge function:", error);
        throw new Error(error.message);
      }
      
      // If we got data back, return it
      if (data) {
        return {
          vegetables: data.vegetables || [],
          fruits: data.fruits || [],
          grains: data.grains || [],
          sources: data.sources,
          lastUpdated: data.lastUpdated || new Date().toLocaleString()
        };
      }
      
      throw new Error("No data received from market data service");
    } catch (error) {
      console.error("Failed to fetch market data:", error);
      // Return fallback data when the API call fails
      return this.getFallbackData();
    }
  }
  
  // Fallback data in case the API call fails
  private static getFallbackData(): MarketData {
    return {
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
  }
}
