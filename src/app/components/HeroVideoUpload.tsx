"use client";

import { useState } from "react";
import { Upload, Video, Link as LinkIcon, X, Loader } from "lucide-react";
import { uploadImage } from "@/lib/supabase";

interface Props {
  currentUrl?: string;
  currentType?: string;
  onChange: (url: string, type: 'upload' | 'url') => void;
}

export default function HeroVideoUpload({ currentUrl, currentType, onChange }: Props) {
  const [mode, setMode] = useState<'upload' | 'url'>(currentType as any || 'url');
  const [urlInput, setUrlInput] = useState(currentUrl || "");
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (50MB max for videos)
    if (file.size > 50 * 1024 * 1024) {
      alert("❌ Video file too large! Max 50MB allowed.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      alert("❌ Please upload a video file only (MP4, WebM)");
      return;
    }

    setUploading(true);

    try {
      // Upload to Supabase Storage using existing uploadImage function
      // (it works for videos too since it accepts any file)
      const url = await uploadImage(file, 'videos', 'hero');

      if (url) {
        setUrlInput(url);
        onChange(url, 'upload');
        alert("✅ Video uploaded successfully!");
      } else {
        alert("❌ Upload failed! Please try again.");
      }
    } catch (error) {
      console.error("Video upload error:", error);
      alert("❌ Upload failed! Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (newUrl: string) => {
    setUrlInput(newUrl);
    onChange(newUrl, 'url');
  };

  const useFreeVideo = (videoUrl: string) => {
    setUrlInput(videoUrl);
    onChange(videoUrl, 'url');
    setMode('url');
  };

  const removeVideo = () => {
    setUrlInput("");
    onChange("", 'url');
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-[#2B2419] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          🎬 Hero Video (Background)
        </h3>
        <p className="text-sm text-[#6B5D4A]">
          Add a beautiful video to your hero section. Recommended: cake making, decoration, or bakery ambiance.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            mode === 'url'
              ? "bg-[#8B6F47] text-white"
              : "bg-[#FAF5EA] text-[#8B6F47] hover:bg-[#E8DCC4]"
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          Video URL
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            mode === 'upload'
              ? "bg-[#8B6F47] text-white"
              : "bg-[#FAF5EA] text-[#8B6F47] hover:bg-[#E8DCC4]"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload Video
        </button>
      </div>

      {/* URL Mode */}
      {mode === 'url' && (
        <div>
          <label className="block text-sm font-bold text-[#2B2419] mb-2">
            Video URL
          </label>
          <input
            type="url"
            value={urlInput}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com/video.mp4 OR /videos/cake-hero.mp4"
            className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[#8B6F47] text-sm"
          />

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-semibold text-blue-800 mb-1">✅ Local Video</p>
              <p className="text-xs text-blue-700">
                Save video in <code className="bg-white px-1.5 py-0.5 rounded">public/videos/</code> folder, then use path like <code className="bg-white px-1.5 py-0.5 rounded">/videos/yourname.mp4</code>
              </p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs font-semibold text-green-800 mb-1">🌐 Online Video</p>
              <p className="text-xs text-green-700">
                Use direct .mp4 URLs from Pexels, Cloudinary, or your CDN. YouTube URLs don&apos;t work.
              </p>
            </div>
          </div>

          {/* Suggested free videos */}
          <div className="mt-3">
            <p className="text-xs font-bold text-[#6B5D4A] mb-2">📥 Free Cake Videos (Click to use):</p>
            <div className="space-y-1.5">
              {[
                { name: "Cake Decoration", url: "https://videos.pexels.com/video-files/3196284/3196284-uhd_2560_1440_25fps.mp4" },
                { name: "Preparing Cake", url: "https://videos.pexels.com/video-files/4252136/4252136-uhd_2560_1440_30fps.mp4" },
                { name: "Baker Working", url: "https://videos.pexels.com/video-files/4254018/4254018-uhd_2560_1440_30fps.mp4" },
              ].map((video) => (
                <button
                  key={video.name}
                  type="button"
                  onClick={() => useFreeVideo(video.url)}
                  className="w-full text-left px-3 py-2 bg-[#FAF5EA] hover:bg-[#E8DCC4] rounded-lg text-xs flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Video className="w-3 h-3 text-[#8B6F47]" />
                    {video.name}
                  </span>
                  <span className="text-[#8B6F47] font-semibold">Use →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div>
          <label className="block cursor-pointer">
            <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              uploading 
                ? "border-blue-300 bg-blue-50 cursor-wait" 
                : "border-[#D4C29E] hover:border-[#8B6F47] hover:bg-[#FAF5EA] cursor-pointer"
            }`}>
              {uploading ? (
                <>
                  <Loader className="w-12 h-12 text-blue-500 mx-auto mb-3 animate-spin" />
                  <p className="font-bold text-blue-700 mb-1">Uploading Video...</p>
                  <p className="text-xs text-blue-600">Please wait, this may take 30 seconds</p>
                </>
              ) : (
                <>
                  <Video className="w-12 h-12 text-[#8B6F47] mx-auto mb-3" />
                  <p className="font-bold text-[#2B2419] mb-1">Click to upload video</p>
                  <p className="text-xs text-[#6B5D4A]">MP4, WebM format • Max 50MB</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="video/mp4,video/webm"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>

          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              💡 <strong>Tip:</strong> Upload video to Supabase Storage. Best size: 720p or 1080p. Compress videos for faster loading.
            </p>
          </div>
        </div>
      )}

      {/* Preview */}
      {urlInput && (
        <div className="mt-4">
          <p className="text-xs font-bold text-[#6B5D4A] mb-2">📹 Current Video Preview:</p>
          <div className="relative">
            <video
              src={urlInput}
              controls
              muted
              className="w-full rounded-xl border border-[#E8DEC8] bg-black"
              style={{ maxHeight: '300px' }}
              key={urlInput} // Force reload when URL changes
            >
              Your browser doesn&apos;t support video preview.
            </video>
          </div>
          <button
            type="button"
            onClick={removeVideo}
            className="mt-2 text-xs text-red-600 hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Remove video
          </button>
          <p className="text-[10px] text-[#6B5D4A] mt-2 italic break-all">
            URL: {urlInput}
          </p>
        </div>
      )}
    </div>
  );
}