"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/ui/input/TextInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { FaUpload, FaTimes } from "react-icons/fa";
import dummyImg from "../../../../../../public/images/dummyImg.jpg";

const customLoader = ({ src }: { src: string }) =>
  src.startsWith("http") ? src : `${src}`;

export default function ProfileTab({ formData, setFormData }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDob, setSelectedDob] = useState<Date | null>(
    formData.dob ? new Date(formData.dob) : null
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [aadhaarFront, setAadhaarFront] = useState<string | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: formData,
  });

  const firstName = formData.fullName.split(" ")[0];
  const lastName = formData.fullName.split(" ").slice(1).join(" ");

  const onSubmit = (data: any) => {
    data.dob = selectedDob ? selectedDob.toISOString().split("T")[0] : "";
    data.fullName = data.firstName + (data.lastName ? " " + data.lastName : "");
    setFormData(data);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    reset(formData);
    setSelectedDob(formData.dob ? new Date(formData.dob) : null);
    setIsEditMode(false);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: any) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const UploadBox = ({ label, image, setImage }: any) => (
    <div className="bg-white shadow border-[#e4e8eb] rounded-[10px] p-5 border flex flex-col gap-4">
      <div className="flex items-center gap-2 font-semibold">
        <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
          <FaUpload />
        </span>
        {label}
      </div>
      {isEditMode && (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setImage)}
          className="border border-[#f4f5f7] rounded-[8px] bg-[#f4f5f7] px-4 py-2 cursor-pointer"
        />
      )}
      <div
        className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] overflow-hidden cursor-pointer"
        style={{ height: "250px" }}
        onClick={() => image && setPreviewImage(image)}
      >
        <Image
          src={image || dummyImg}
          alt={label}
          className="h-full object-contain"
          width={300}
          height={250}
          loader={customLoader}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
            >
              Save Changes
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

      <div className="grid md:grid-cols-2 gap-4">
        {/* Full Name */}
        {isEditMode ? (
          <>
            <TextInput
              name="firstName"
              label="First Name"
              type="text"
              className="mt-2"
              register={register}
              value={firstName}
              onChange={(e: any) =>
                handleInputChange("fullName", e.target.value + (lastName ? " " + lastName : ""))
              }
            />
            <TextInput
              name="lastName"
              label="Last Name"
              type="text"
              className="mt-2"
              register={register}
              value={lastName}
              onChange={(e: any) =>
                handleInputChange("fullName", firstName + (e.target.value ? " " + e.target.value : ""))
              }
            />
          </>
        ) : (
          <div>
            <label className="font-bold">Full Name</label>
            <p className="mt-2">{formData.fullName || "-"}</p>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="font-bold">Email</label>
          {isEditMode ? (
            <input
              type="email"
              value={formData.email}
              disabled
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          ) : (
            <p className="mt-2">{formData.email || "-"}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="font-bold">Date of Birth</label>
          {isEditMode ? (
            <DatePicker
              selected={selectedDob}
              onChange={(date: Date) => {
                setSelectedDob(date);
                handleInputChange("dob", date.toISOString().split("T")[0]);
              }}
              className="mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-green-400 w-full"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
            />
          ) : (
            <p className="mt-2">{formData.dob || "-"}</p>
          )}
        </div>

        {/* Phone */}
        {isEditMode ? (
          <TextInput
            name="phone"
            label="Phone Number"
            type="text"
            className="mt-2"
            register={register}
            error={errors.phone}
          />
        ) : (
          <div>
            <label className="font-bold">Phone Number</label>
            <p className="mt-2">{formData.phone || "-"}</p>
          </div>
        )}
      </div>

      {/* Aadhaar Upload */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <UploadBox label="Upload Front Photo" image={aadhaarFront} setImage={setAadhaarFront} />
        <UploadBox label="Upload Back Photo" image={aadhaarBack} setImage={setAadhaarBack} />
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative max-w-[90%] max-h-[90%] bg-white p-5 rounded-3xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg"
            >
              <FaTimes size={18} />
            </button>
            <Image
              src={previewImage}
              alt="Preview"
              width={600}
              height={400}
              className="object-contain"
              loader={customLoader}
            />
          </div>
        </div>
      )}
    </form>
  );
}
