import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  existingImages?: string[];
  onImagesUploaded: (urls: string[]) => void;
  onImageRemove?: (index: number) => void;
  multiple?: boolean;
}

export default function ImageUpload({ 
  existingImages = [], 
  onImagesUploaded, 
  onImageRemove,
  multiple = true 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    validFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      const imageUrls = data.images.map((img: any) => img.url);
      onImagesUploaded(imageUrls);
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(error.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Existing Images Preview */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {existingImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-[#d5c37d] bg-[#fafaf3]">
                {/*<img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />*/}
                <div className="aspect-square rounded-lg overflow-hidden border border-[#d5c37d] bg-[#fafaf3] flex items-center justify-center">
  
                    {image ? (
                        <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/placeholder.png";
                        }}
                        />
                    ) : (
                        <img
                        src="/images/placeholder.png"
                        alt="placeholder"
                        className="w-10 h-10 opacity-60 grayscale"
                        />
                    )}

                    </div>
              </div>
                  {onImageRemove && (
                <button
                  type="button"
                  onClick={() => onImageRemove(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`inline-flex items-center space-x-2 px-4 py-2 bg-[#e8b924] text-[#0e0e10] rounded-lg hover:bg-[#ddc25d] transition cursor-pointer ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload Images</span>
            </>
          )}
        </label>
        <p className="text-sm text-[#4d4d4d] mt-2">
          Supported formats: JPG, PNG, GIF, WebP (Max 5MB each)
        </p>
      </div>
    </div>
  );
}