"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "@/components/ui/Image";
import { environmentVariables } from "@/config/image.config";
import userImg from "../../../../../public/images/user.png";
import { 
  useUpdateUserAvatar, 
  useFetchUserProfile 
} from "@/services/user.service";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import ImageCropper from "@/components/ImageCropper";
import { FaRegUserCircle } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { TbUserScan } from "react-icons/tb";
import { LiaListUlSolid } from "react-icons/lia";
import { BiTransfer } from "react-icons/bi";
import { GrDocumentTransfer } from "react-icons/gr";

type TabKey =
  | "profile"
  | "portfolio"
  | "transactions"
  | "kyc"
  | "myshare"
  | "external";

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
  isPending: boolean | undefined;
  avatar: string | undefined;
}

const tabs: { key: TabKey; label: string; icon: React.ReactElement }[] = [
  { key: "profile", label: "My Profile", icon: <FaRegUserCircle /> },
  { key: "portfolio", label: "My Portfolio", icon: <CgWebsite /> },
  { key: "kyc", label: "KYC", icon: <TbUserScan /> },
  { key: "myshare", label: "My Share", icon: <LiaListUlSolid /> },
  // { key: "transactions", label: "Transactions", icon: <BiTransfer /> },
  // { key: "external", label: "External Transactions", icon: <GrDocumentTransfer /> },
];

export default function Sidebar({ activeTab, onTabChange, isPending, avatar }: SidebarProps) {
  const { data: user, isLoading: isUserLoading } = useFetchUserProfile();
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (selectedFileUrl) {
        URL.revokeObjectURL(selectedFileUrl);
      }
    };
  }, [selectedFileUrl]);

  const onSuccess = useCallback(() => {
    toast.success("Profile updated successfully!");
    setShowCropper(false);
    setSelectedFileUrl(null);
  }, []);

  const onError = useCallback((err: any) => {
    toast.error("Failed to update profile.");
    console.error("Failed to update avatar", err);
  }, []);

  const { mutate: updateAvatar, isPending: isUpdating } = useUpdateUserAvatar({
    onError,
    onSuccess,
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedFileUrl(url);
      setShowCropper(true);
    }
  };

  const handleCropComplete = useCallback((croppedFile: File) => {
    updateAvatar({ avatar: croppedFile });
  }, [updateAvatar]);

  const handleCancelCrop = useCallback(() => {
    setShowCropper(false);
    if (selectedFileUrl) {
      URL.revokeObjectURL(selectedFileUrl);
      setSelectedFileUrl(null);
    }
  }, [selectedFileUrl]);

  const avatarUrl = avatar 
    ? `${environmentVariables.UPLOAD_URL}/profile/${avatar}`
    : userImg;

  return (
    <aside className="w-full md:w-80 bg-white border-r border-[#efefef] px-6 pb-5 md:pt-5 pt-0">
      <div className="flex flex-col items-center mb-6 pb-4 border-b border-[#efefef] relative">
        <div className="relative w-40 h-40">
          {isUserLoading ? (
            <div className="w-40 h-40 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400">Loading...</span>
            </div>
          ) : (
            <>
              <div className="overflow-hidden h-40 w-40 rounded-full group cursor-pointer">
                <Image
                  src={avatarUrl}
                  alt="User"
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
              />
            </>
          )}
        </div>

        {isUserLoading ? (
          <>
            <div className="h-7 w-40 bg-gray-200 animate-pulse rounded mt-3"></div>
            <div className="h-5 w-56 bg-gray-200 animate-pulse rounded mt-2"></div>
          </>
        ) : (
          <>
            <h2 className="text-gray-700 font-semibold text-2xl mt-3">
              {user?.name}
            </h2>
            <p className="text-lg text-gray-500">{user?.email}</p>
          </>
        )}
      </div>

      {showCropper && selectedFileUrl && (
        <ImageCropper
          imageSrc={selectedFileUrl}
          onCropComplete={handleCropComplete}
          onCancel={handleCancelCrop}
          isUploading={isUpdating}
        />
      )}
      
      <nav className="space-y-2 mt-6 md:block flex flex-nowrap text-nowrap overflow-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 cursor-pointer rounded
              ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-[#d1efcf] to-white text-[#000] font-medium text-[16px]"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
          >
            <span className="text-[#5d7d5b] text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}