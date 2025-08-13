"use client";

<<<<<<< HEAD
import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "@/components/ui/Image";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImageHelper";
import { environmentVariables } from "@/config/image.config";
import {
  FaUser,
  FaClipboardList,
  FaFileAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import userImg from "../../../../../public/images/user.png";
import {
  useUpdateUserAvatar,
  useFetchUserProfile,
} from "@/services/user.service";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
type TabKey = "profile" | "portfolio" | "transactions" | "external";
=======
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import userImg from "../../../../../public/images/user.png";
import React from "react";
import { CgWebsite } from "react-icons/cg";
import { BiTransfer } from "react-icons/bi";
import { GrDocumentTransfer } from "react-icons/gr";
import { TbUserScan } from "react-icons/tb";
import { LiaListUlSolid } from "react-icons/lia";

type TabKey =
  | "profile"
  | "portfolio"
  | "transactions"
  | "external"
  | "kyc"
  | "myshare";
>>>>>>> 517095bb465b98282f25504d42808b68775aff85

type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  // Fetch user profile data using hook
  const {
    data: user,
    refetch: refetchUser,
    isLoading: isUserLoading,
  } = useFetchUserProfile();

  const [preview, setPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(
    null
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

  const [showCropper, setShowCropper] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create object URL for preview when file selected
  useEffect(() => {
    if (!selectedFile) {
      setSelectedFileUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setSelectedFileUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  // Cleanup preview URL on unmount or change
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Mutation hook for updating avatar

  const onSuccess = (data: any) => {
    toast.success("Profile updated successfully!");
    setShowCropper(false);
    setSelectedFile(null);
    setSelectedFileUrl(null);
    setPreview(null);
    refetchUser(); // Refresh user data after update
  };

  const onError = (err: any) => {
    toast.error("Failed to update profile.");
    console.error("Failed to update avatar", err);
  };

  // const { mutate: updateAvatar } = updateUserAvatarMutation;
  const { mutate: updateAvatar, isPending: isUpdating } = useUpdateUserAvatar({
    onError,
    onSuccess,
  });
  const onCropComplete = useCallback(
    (croppedArea: CropArea, croppedAreaPixels: CropArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowCropper(true);
    }
  };

  const handleUploadCroppedImage = async () => {
    if (!selectedFile || !selectedFileUrl || !croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(
        selectedFileUrl,
        croppedAreaPixels
      );

      if (!croppedBlob) throw new Error("Failed to crop image");

      const croppedFile = new File([croppedBlob], selectedFile.name, {
        type: selectedFile.type,
      });

      setPreview(URL.createObjectURL(croppedFile));

      updateAvatar({ avatar: croppedFile });
    } catch (err) {
      console.error(err);
      toast.error("Error cropping or uploading image.");
    }
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactElement }[] = [
    { key: "profile", label: "My Profile", icon: <FaRegUserCircle /> },
    { key: "portfolio", label: "My Portfolio", icon: <CgWebsite /> },
    { key: "kyc", label: "KYC", icon: <TbUserScan /> },
    { key: "myshare", label: "My Share", icon: <LiaListUlSolid /> },
    { key: "transactions", label: "Transactions", icon: <BiTransfer /> },
    {
      key: "external",
      label: "External Transactions",
      icon: <GrDocumentTransfer />,
    },
  ];

  if (isUserLoading) {
    return (
      <aside className="w-full md:w-80 bg-white border-r border-[#efefef] p-6 flex justify-center items-center">
        Loading user profile...
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-80 bg-white border-r border-[#efefef] p-6">
<<<<<<< HEAD
      <div className="flex flex-col items-center mb-6 pb-4 border-b border-[#efefef] relative">
        <div className="relative w-40 h-40">
          <div className="overflow-hidden h-40 w-40 rounded-full group cursor-pointer">
            <Image
              src={
                preview ||
                (user?.avatar
                  ? `${environmentVariables.UPLOAD_URL}/profile/${user.avatar}`
                  : userImg)
              }
              alt="User"
              // width={160}
              // height={160}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-[10px] right-[0px] z-10 bg-black bg-opacity-60 p-2 rounded-full text-white
               opacity-70 group-hover:opacity-100
               transform translate-y-0 group-hover:-translate-y-1
               cursor-pointer
               transition-all duration-300 ease-in-out"
            title="Change Avatar"
          >
            <FiEdit size={18} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
=======
      <div className="flex flex-col items-center mb-6 pb-4 border-b border-[#efefef]">
        <div className="w-40 h-40 bg-gray-200 rounded-full mb-3 overflow-hidden">
          <Image
            src={userImg}
            alt="User"
            width={160}
            height={160}
            loader={() => userImg.src}
>>>>>>> 517095bb465b98282f25504d42808b68775aff85
          />
        </div>

        <h2 className="text-gray-700 font-semibold text-2xl mt-3">
          {user?.name}
        </h2>
        <p className="text-lg text-gray-500">{user?.email}</p>
      </div>

<<<<<<< HEAD
      {/* Cropper Modal */}
      {showCropper && selectedFile && selectedFileUrl && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm h-[350px] bg-white rounded-md p-4 flex flex-col">
            <Cropper
              image={selectedFileUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => {
                  setShowCropper(false);
                  setSelectedFile(null);
                  setSelectedFileUrl(null);
                }}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleUploadCroppedImage}
                disabled={isUpdating}
              >
                {isUpdating ? "Uploading..." : "Crop & Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="space-y-2 mt-6">
=======
      <nav className="space-y-2 md:block flex overflow-auto flex-nowrap text-nowrap gap-3">
>>>>>>> 517095bb465b98282f25504d42808b68775aff85
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 cursor-pointer rounded
<<<<<<< HEAD
              ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-[#d1efcf] to-white text-[#000] font-medium text-[16px]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
=======
                ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#d1efcf] to-white text-[#000] font-medium text-[16px]"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
>>>>>>> 517095bb465b98282f25504d42808b68775aff85
          >
            <span className="text-[#5d7d5b] text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
