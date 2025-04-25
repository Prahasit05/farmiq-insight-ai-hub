
import React, { useState } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type DetectionStatus = 'idle' | 'uploading' | 'processing' | 'complete';

const DiseaseDetection = () => {
  const [status, setStatus] = useState<DetectionStatus>('idle');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setStatus('uploading');
        
        // Simulate upload and processing
        setTimeout(() => {
          setStatus('processing');
          setTimeout(() => {
            setStatus('complete');
          }, 2000);
        }, 1500);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const resetUpload = () => {
    setStatus('idle');
    setSelectedImage(null);
  };

  return (
    <section id="disease-detection" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">AI Crop Disease Detection</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Upload an image of your crop and our AI will identify diseases and suggest remedies to protect your harvest.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <Card className="w-full card-shadow">
              <CardHeader>
                <CardTitle>Upload Your Crop Image</CardTitle>
                <CardDescription>
                  Take a clear photo of the affected plant part (leaves, stems, fruits).
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedImage ? (
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Selected crop" 
                      className="w-full h-64 object-cover rounded-md"
                    />
                    {status === 'uploading' && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                        <div className="text-white flex flex-col items-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mb-2"></div>
                          <p>Uploading...</p>
                        </div>
                      </div>
                    )}
                    {status === 'processing' && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                        <div className="text-white flex flex-col items-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mb-2"></div>
                          <p>Analyzing image...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center">
                {status === 'complete' ? (
                  <Button variant="outline" onClick={resetUpload}>Upload New Image</Button>
                ) : (
                  <div className="relative">
                    <Button 
                      className="btn-primary flex items-center gap-2"
                      disabled={status === 'uploading' || status === 'processing'}
                    >
                      <Upload size={16} />
                      Upload Image
                    </Button>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                      accept="image/*"
                      disabled={status === 'uploading' || status === 'processing'}
                    />
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card className={`w-full h-full card-shadow ${status === 'complete' ? 'border-farmiq-green-light border-2' : ''}`}>
              <CardHeader>
                <CardTitle>Detection Results</CardTitle>
                <CardDescription>
                  {status === 'complete' ? 'Analysis complete' : 'Upload an image to see results'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {status === 'complete' ? (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Check className="h-5 w-5 text-farmiq-green" />
                      </div>
                      <div>
                        <h4 className="font-medium">Crop Identified</h4>
                        <p className="text-muted-foreground">Rice (Oryza sativa)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Disease Detected</h4>
                        <p className="text-muted-foreground">Rice Blast (Magnaporthe oryzae)</p>
                        <p className="text-sm text-amber-600 font-medium mt-1">Moderate Severity</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Recommended Solution:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Apply fungicide containing Tricyclazole at 0.6g/L of water</li>
                        <li>Ensure proper drainage in the field</li>
                        <li>Reduce nitrogen application</li>
                        <li>Maintain field sanitation by removing affected plants</li>
                        <li>Consider resistant varieties for next planting season</li>
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-muted-foreground">
                      Upload a crop image to get AI-powered disease detection and treatment recommendations
                    </p>
                  </div>
                )}
              </CardContent>
              {status === 'complete' && (
                <CardFooter>
                  <Button className="w-full btn-secondary">
                    Get Detailed Report
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseaseDetection;
