import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Upload, Image, Link } from 'lucide-react';
import { usePresentationContext } from '../PresentationContext';

export const UploadsTab: React.FC = () => {
  const { uploadFile, addShapeElement, selectedElement, updateElement } = usePresentationContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleUrlUpload = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      const newElement = {
        id: Date.now().toString(),
        type: 'image' as const,
        content: url,
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        style: {}
      };
      // This would need to be handled by the context
      console.log('Add image from URL:', newElement);
    }
  };

  const stockImages = [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
    'https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  ];

  return (
    <div className="space-y-4 max-h-full overflow-y-auto">
      {/* Upload Options */}
      <div className="space-y-2">
        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
        
        <Button 
          className="w-full" 
          variant="outline"
          onClick={handleUrlUpload}
        >
          <Link className="h-4 w-4 mr-2" />
          Add from URL
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <Separator />

      {/* Stock Images */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Stock Images</h3>
        <div className="grid grid-cols-2 gap-2">
          {stockImages.map((imageUrl, index) => (
            <div
              key={index}
              className="aspect-video bg-gray-100 rounded cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
              onClick={() => {
                console.log('Add stock image:', imageUrl);
              }}
            >
              <img 
                src={imageUrl} 
                alt={`Stock image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Image Categories */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {[
            'Business',
            'Technology',
            'Nature',
            'People',
            'Abstract',
            'Architecture',
            'Food',
            'Travel'
          ].map((category) => (
            <Button
              key={category}
              variant="outline"
              className="w-full justify-start"
              onClick={() => console.log('Browse category:', category)}
            >
              <Image className="h-4 w-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Recent Uploads */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Recent Uploads</h3>
        <div className="text-sm text-gray-500 text-center py-8">
          No recent uploads
        </div>
      </div>
    </div>
  );
};
