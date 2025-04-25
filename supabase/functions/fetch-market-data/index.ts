
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Mock external APIs - in a real implementation, these would be actual API calls
const mockAgmarknetAPI = async () => {
  // Simulating fetching from Agmarknet (Indian agricultural market data)
  return {
    source: "Agmarknet",
    vegetables: [
      { name: "Tomato", price: Math.floor(Math.random() * 10) + 20, change: +(Math.random() * 6 - 3).toFixed(1), unit: "₹/kg" },
      { name: "Potato", price: Math.floor(Math.random() * 5) + 15, change: +(Math.random() * 6 - 3).toFixed(1), unit: "₹/kg" },
      { name: "Onion", price: Math.floor(Math.random() * 15) + 25, change: +(Math.random() * 6 - 3).toFixed(1), unit: "₹/kg" },
    ]
  };
};

const mockAPMCAPI = async () => {
  // Simulating fetching from APMC (Agricultural Produce Market Committee)
  return {
    source: "APMC",
    fruits: [
      { name: "Apple", price: Math.floor(Math.random() * 30) + 100, change: +(Math.random() * 6 - 3).toFixed(1), unit: "₹/kg" },
      { name: "Banana", price: Math.floor(Math.random() * 20) + 50, change: +(Math.random() * 6 - 3).toFixed(1), unit: "₹/dozen" },
      { name: "Mango", price: Math.floor(Math.random() * 40) + 120, change: +(Math.random() * 6 - 3).toFixed(1), unit: "₹/kg" },
    ]
  };
};

const mockGrainMarketAPI = async () => {
  // Simulating fetching from grain markets
  return {
    source: "Grain Market",
    grains: [
      { name: "Wheat", price: Math.floor(Math.random() * 8) + 25, change: +(Math.random() * 6 - 3).toFixed(1), unit: "₹/kg" },
      { name: "Rice", price: Math.floor(Math.random() * 10) + 40, change: +(Math.random() * 6 - 3).toFixed(1), unit: "₹/kg" },
      { name: "Maize", price: Math.floor(Math.random() * 5) + 20, change: +(Math.random() * 6 - 3).toFixed(1), unit: "₹/kg" },
    ]
  };
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse request parameters
    const { region, state, district } = await req.json();
    
    // Log request parameters
    console.log(`Fetching market data for ${region} in ${district}, ${state}`);
    
    // Fetch data from "external" sources in parallel
    const [agmarknetData, apmcData, grainMarketData] = await Promise.all([
      mockAgmarknetAPI(),
      mockAPMCAPI(),
      mockGrainMarketAPI()
    ]);
    
    // Combine the data
    const combinedData = {
      vegetables: agmarknetData.vegetables,
      fruits: apmcData.fruits,
      grains: grainMarketData.grains,
      sources: [agmarknetData.source, apmcData.source, grainMarketData.source],
      lastUpdated: new Date().toISOString()
    };
    
    // Return the data
    return new Response(JSON.stringify(combinedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching market data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch market data' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
