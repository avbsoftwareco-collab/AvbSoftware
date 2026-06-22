"use client";

import { useState } from "react";
import { Upload, X, Loader, ImageIcon } from "lucide-react";
import { uploadImage } from "@/lib/supabase";

interface ImageUploadProps {
  currentImage?: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  subdomain: string;
type: 'logo' | 'hero' | 'product' | 'gallery' | 'team' | 'chef' | 'about' | 'specialty' | 'menu' | 'featured' | 'story';
  label: string;
}

export default function ImageUpload({ 
  currentImage, 
  onUpload, 
  onRemove,
  subdomain, 
  type,
  label 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large! Max 5MB allowed.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file only!");
      return;
    }

    if (!subdomain) {
      alert("Pehle Subdomain set karo!");
      return;
    }

    setUploading(true);

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    const url = await uploadImage(file, subdomain, type);

    if (url) {
      onUpload(url);
      setPreview(url);
    } else {
      alert("Upload failed! Try again.");
      setPreview(currentImage || null);
    }

    setUploading(false);
  };

  const handleRemove = () => {
    setPreview(null);
    if (onRemove) onRemove();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-[#2B2419]">
        {label}
      </label>

      {preview ? (
        <div className="relative group">
          <img 
            src={preview} 
            alt={label}
            className="w-full h-48 object-cover rounded-xl border border-[#E8DEC8]"
          />
          
          {/* Overlay buttons */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
            <label className="cursor-pointer bg-white text-[#8B6F47] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#FAF5EA] transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Replace
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
              />
            </label>
            
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          </div>

          {/* Uploading overlay */}
          {uploading && (
            <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center">
              <div className="text-center text-white">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p className="font-bold">Uploading...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <label className="cursor-pointer block">
          <div className={`
            border-2 border-dashed border-[#D4C29E] rounded-xl p-8 text-center
            hover:border-[#8B6F47] hover:bg-[#FAF5EA] transition-all
            ${uploading ? 'opacity-50 pointer-events-none' : ''}
          `}>
            {uploading ? (
              <>
                <Loader className="w-12 h-12 text-[#8B6F47] mx-auto mb-3 animate-spin" />
                <p className="text-[#8B6F47] font-bold">Uploading...</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-[#FAF5EA] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="w-8 h-8 text-[#8B6F47]" />
                </div>
                <p className="text-[#8B6F47] font-bold mb-1">Click to upload</p>
                <p className="text-xs text-[#6B5D4A]">PNG, JPG, WEBP (Max 5MB)</p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}