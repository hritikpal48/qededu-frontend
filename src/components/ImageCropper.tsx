// components/ImageCropper.tsx
"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./page/user/dashboard/cropImageHelper";
import { LoaderButton } from "./ui/button";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: File) => void;
  onCancel: () => void;
  isUploading: boolean;
}

export default function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
  isUploading,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(
    null
  );

  const onCropCompleteCallback = useCallback(
    (_: CropArea, croppedAreaPixels: CropArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropAndUpload = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedBlob) throw new Error("Failed to crop image");

      const croppedFile = new File([croppedBlob], "avatar.png", {
        type: "image/png",
      });

      onCropComplete(croppedFile);
    } catch (err) {
      console.error("Error cropping image:", err);
      throw err;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm h-[350px] bg-white rounded-md p-4 flex flex-col">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteCallback}
        />

        <div className="flex justify-between mt-4">
          <LoaderButton
            text="Cancel"
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={onCancel}
            // disabled={isUploading}
          />
          
          <LoaderButton
            className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
            onClick={handleCropAndUpload}
            // disabled={isUploading}
            text={isUploading ? "Uploading..." : "Crop & Upload"}
            loading={isUploading}
          />
           
        </div>
      </div>
    </div>
  );
}