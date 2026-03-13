import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface MultiImageUploadProps {
  images: string[];
  onAddImages: (newImages: string[]) => void;
  onRemoveImage: (index: number) => void;
  className?: string;
}

export function MultiImageUpload({ images, onAddImages, onRemoveImage, className = '' }: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFiles = (files: FileList | File[]) => {
    const newImages: string[] = [];
    let processed = 0;
    
    Array.from(files).forEach(file => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          processed++;
          if (processed === files.length) {
            onAddImages(newImages);
          }
        };
        reader.readAsDataURL(file);
      } else {
        processed++;
        if (processed === files.length && newImages.length > 0) {
          onAddImages(newImages);
        }
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <div
        className={`relative flex flex-col items-center justify-center rounded-[var(--radius,1rem)] border-2 border-dashed transition-colors cursor-pointer overflow-hidden py-12 ${
          isDragging ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-300 bg-zinc-50/50 hover:bg-zinc-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
        
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
            <ImageIcon className="h-6 w-6 text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-900">Arraste fotos aqui ou clique para selecionar</p>
          <p className="text-xs text-zinc-500 mt-1">As imagens serão enviadas para a Mídia do WP</p>
          <p className="text-[10px] text-zinc-400 mt-2">PNG, JPG ou SVG (Max. 5MB por arquivo)</p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {images.map((img, index) => (
            <div key={index} className="aspect-square rounded-[var(--radius,0.5rem)] bg-zinc-200 overflow-hidden relative group shadow-sm border border-zinc-200">
              <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => onRemoveImage(index)}
                  className="bg-white/90 text-red-600 p-2 rounded-full hover:bg-white hover:scale-105 transition-all shadow-sm"
                  title="Remover imagem"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
