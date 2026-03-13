import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  label?: string;
  description?: string;
  value?: string | null;
  onChange: (file: File | null, previewUrl: string | null) => void;
  className?: string;
}

export function ImageUpload({ label, description, value, onChange, className = '' }: ImageUploadProps) {
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

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      {label && <h3 className="font-medium text-sm text-zinc-900 mb-1">{label}</h3>}
      {description && <p className="text-xs text-zinc-500 mb-3">{description}</p>}
      
      <div
        className={`relative flex flex-col items-center justify-center rounded-[var(--radius,0.5rem)] border-2 border-dashed transition-colors cursor-pointer overflow-hidden ${
          isDragging ? 'border-zinc-950 bg-zinc-50' : 'border-zinc-300 bg-zinc-50/50 hover:bg-zinc-50'
        } ${value ? 'p-1' : 'py-8 px-4'}`}
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
          className="hidden"
        />
        
        {value ? (
          <div className="relative w-full h-40 group">
            <img src={value} alt="Preview" className="w-full h-full object-contain rounded-[calc(var(--radius,0.5rem)-4px)]" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[calc(var(--radius,0.5rem)-4px)]">
              <button
                onClick={handleRemove}
                className="bg-white/90 text-red-600 p-2 rounded-full hover:bg-white hover:scale-105 transition-all shadow-sm"
                title="Remover imagem"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mb-3">
              <Upload className="h-5 w-5 text-zinc-500" />
            </div>
            <p className="text-sm font-medium text-zinc-900">Clique para fazer upload</p>
            <p className="text-xs text-zinc-500 mt-1">ou arraste e solte a imagem aqui</p>
            <p className="text-[10px] text-zinc-400 mt-2">PNG, JPG ou SVG (Max. 2MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}
