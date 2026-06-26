"use client";

import { useState } from "react";
import { Upload, X, Loader, Video, Link as LinkIcon } from "lucide-react";
import { uploadImage } from "@/lib/supabase";

interface HeroVideoUploadProps {
  currentUrl?: string;
  currentType?: "upload" | "url";
  onChange: (url: string, type: "upload" | "url") => void;
}

export default function HeroVideoUpload({
  currentUrl,
  currentType,
  onChange,
}: HeroVideoUploadProps) {
  const [mode, setMode] = useState<"upload" | "url">(currentType || "url");
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(currentUrl || "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert("Video too large! Max 50MB allowed.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("video/")) {
      alert("Please upload a video file only!");
      return;
    }

    setUploading(true);

    try {
      // Use uploadImage function (works for videos too as it stores any file)
      const url = await uploadImage(file, "hero-videos", "hero-video");

      if (url) {
        onChange(url, "upload");
        alert("✅ Video uploaded!");
      } else {
        alert("Upload failed! Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      alert("Please enter a valid URL!");
      return;
    }
    onChange(urlInput.trim(), "url");
    alert("✅ Video URL saved!");
  };

  const handleRemove = () => {
    if (!confirm("Remove video?")) return;
    setUrlInput("");
    onChange("", "url");
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#2B2419] mb-1">🎬 Hero Video</h2>
      <p className="text-sm text-[#6B5D4A] mb-5">Add a video for your hero section (optional)</p>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setMode("url")}
          className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            mode === "url"
              ? "bg-[#D4AF37] text-white shadow-md"
              : "bg-[#FAF5EA] text-[#8B6F47] hover:bg-[#E8DCC4]"
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          Video URL
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            mode === "upload"
              ? "bg-[#D4AF37] text-white shadow-md"
              : "bg-[#FAF5EA] text-[#8B6F47] hover:bg-[#E8DCC4]"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload File
        </button>
      </div>

      {/* Current Video Preview */}
      {currentUrl && (
        <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-green-700 flex items-center gap-1">
              <Video className="w-3 h-3" />
              Current Video ({currentType === "upload" ? "Uploaded" : "External URL"})
            </span>
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-green-800 break-all bg-white p-2 rounded-lg border border-green-100">
            {currentUrl}
          </p>

          {/* Video Preview */}
          <div className="mt-3 rounded-lg overflow-hidden bg-black aspect-video">
            <video
              src={currentUrl}
              controls
              className="w-full h-full"
              preload="metadata"
            >
              Your browser does not support video.
            </video>
          </div>
        </div>
      )}

      {/* URL Mode */}
      {mode === "url" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-bold text-[#2B2419] mb-2">
              Video URL
            </label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/video.mp4"
              className="w-full px-4 py-3 bg-[#FAF5EA] border border-[#E8DEC8] rounded-xl outline-none focus:border-[var(--theme-primary)] transition-all text-sm"
            />
            <p className="text-xs text-[#6B5D4A] mt-1">
              YouTube, Vimeo, or direct .mp4 link
            </p>
          </div>
          <button
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
            className="w-full px-4 py-3bg-[var(--theme-primary)] hover:bg-[#C9A227] text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save URL
          </button>
        </div>
      )}

      {/* Upload Mode */}
      {mode === "upload" && (
        <div>
          <label className="cursor-pointer block">
            <div
              className={`border-2 border-dashed border-[#D4C29E] rounded-xl p-8 text-center hover:border-[var(--theme-primary)] hover:bg-[#FAF5EA] transition-all ${
                uploading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {uploading ? (
                <>
                  <Loader className="w-12 h-12text-[var(--theme-primary)] mx-auto mb-3 animate-spin" />
                  <p className="text-[#D4AF37] font-bold">Uploading video...</p>
                  <p className="text-xs text-[#6B5D4A] mt-1">Please wait, this may take a moment</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-[#FAF5EA] rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Video className="w-8 h-8text-[var(--theme-primary)]" />
                  </div>
                  <p className="text-[#D4AF37] font-bold mb-1">Click to upload video</p>
                  <p className="text-xs text-[#6B5D4A]">MP4, WebM, MOV (Max 50MB)</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-700">
          💡 <strong>Tip:</strong> Video will autoplay muted on the hero section. Keep it under 30 seconds for best performance.
        </p>
      </div>
    </div>
  );
}