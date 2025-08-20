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
    <div className="fixed inset-0 z-50 bg-[#000000c9] bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-white md:px-10 md:pt-10 md:pb-1  px-2 pt-2 pb-0 rounded-2xl  w-[800px] md:min-h-[500px] min-h-[350px]">
        <div className="relative h-100 rounded-2xl overflow-hidden">
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
        </div>

        <div className="flex justify-between md:py-4 py-2">
          <LoaderButton
            text="Cancel"
            className="transition bg-red-700 text-white px-6 py-2 rounded-[5px] hover:bg-red-800 mr-2 font-semibold cursor-pointer border-0"
            onClick={onCancel}
            // disabled={isUploading}
          />

          <LoaderButton
            className="px-4 py-1 rounded transition cursor-pointer bg-green-600 hover:bg-green-700 text-white border-0"
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
