"use client";

import { useState, useRef } from "react";

interface ImageCardProps {
  defaultAlt?: string;
  defaultSrc?: string;
}

export default function ImageCard({ defaultAlt = "exercise screenshot", defaultSrc }: ImageCardProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(defaultSrc ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageSrc(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    setImageSrc(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-dashed border-pink-200 bg-pink-50 flex items-center justify-center group"
      style={{ minHeight: "178px" }}
    >
      {imageSrc ? (
        <>
          <img
            src={imageSrc}
            alt={defaultAlt}
            className="w-full h-full object-cover"
            style={{ minHeight: "178px" }}
          />
          <div className="no-print absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 text-xs font-semibold bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Replace
            </button>
            <button
              onClick={handleRemove}
              className="px-3 py-1.5 text-xs font-semibold bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <div
          className="no-print flex flex-col items-center gap-2 cursor-pointer text-center select-none"
          onClick={() => inputRef.current?.click()}
        >
          <span className="text-2xl opacity-40">🖼️</span>
          <p className="text-xs font-semibold text-pink-400">Add screenshot</p>
          <p className="text-[10px] text-pink-300">JPG · PNG · GIF</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        aria-label="Upload image"
      />
    </div>
  );
}
