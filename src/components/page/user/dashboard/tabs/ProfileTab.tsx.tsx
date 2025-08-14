"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/ui/input/TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { FaUpload, FaTimes } from "react-icons/fa";
import dummyImg from "../../../../../../public/images/dummyImg.jpg";
import { useFetchUserProfile } from "@/services/user.service";
import ProfileEditForm from "@/components/forms/ProfileForm";

const customLoader = ({ src }: { src: string }) =>
  src.startsWith("http") ? src : `${src}`;

export default function ProfileTab() {
  const { data: userProfile } = useFetchUserProfile();
  
  const [isEditMode, setIsEditMode] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [aadhaarFront, setAadhaarFront] = useState<string | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<string | null>(null);





  const handleCancel = () => {
    // reset(formData);
    // setSelectedDob(formData.dob ? new Date(formData.dob) : null);
    setIsEditMode(false);
  };





  // Prepare default values for ProfileEditForm
  const editFormDefaultValues = {
    fname: userProfile?.fname || "",
    lname: userProfile?.lname || "",
    email: userProfile?.email || "",
    phoneNumber: userProfile?.phoneNumber || "",
    dob: userProfile?.dob || "",
  };

  return (
    <>
      {/* Toggle Buttons */}
      <div className="flex justify-end mb-5">
        {isEditMode ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-700 text-white px-6 py-2 rounded-[5px] hover:bg-red-800 mr-2 font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditMode(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
          >
            Edit
          </button>
        )}
      </div>

      <h2 className="text-[22px] font-semibold mb-4">My Profile</h2>

      {isEditMode ? (
        <ProfileEditForm 
          defaultValues={editFormDefaultValues} 
          onComplete={() => setIsEditMode(false)}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold">Full Name</label>
            <p className="mt-2">{userProfile?.fname || "-"} {userProfile?.lname || ""}</p>
          </div>

          <div>
            <label className="font-bold">Email</label>
            <p className="mt-2">{userProfile?.email || "-"}</p>
          </div>

          <div>
            <label className="font-bold">Date of Birth</label>
            <p className="mt-2">{userProfile?.dob || "-"}</p>
          </div>

          <div>
            <label className="font-bold">Phone Number</label>
            <p className="mt-2">{userProfile?.phoneNumber || "-"}</p>
          </div>
        </div>
      )}
    </>
  );
}