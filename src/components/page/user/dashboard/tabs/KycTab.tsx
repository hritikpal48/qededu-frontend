"use client";

import TextInput from "@/components/ui/input/TextInput";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

export default function KycTab() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // Image states
  const [aadhaarFront, setAadhaarFront] = useState<string | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<string | null>(null);
  const [panImage, setPanImage] = useState<string | null>(null);
  const [bankProof, setBankProof] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    aadhaarNumber: "1234 5678 9012",
    gender: "Male",
    dob: "1990-01-01",
    address: "123 Main Street",
    state: "Karnataka",
    pinCode: "560001",
    country: "India",
    panNumber: "ABCDE1234F",
    panFullName: "John Doe",
    accountName: "John Doe",
    accountNumber: "1234567890",
    ifsc: "SBIN0000123",
    bankName: "State Bank of India",
    branch: "MG Road",
    bankAddress: "MG Road, Bangalore",
    phone: "9876543210",
    district: "Bangalore",
    bankState: "Karnataka",
    bankCountry: "India",
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageError = (setImage: any) => {
    setImage("/image-not-found.png");
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7]"
        style={{ height: "250px" }}
      >
        {image ? (
          <Image
            src={image}
            alt={label}
            className="h-full object-contain"
            onError={() => handleImageError(setImage)}
            width={250}
            height={250}
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>
    </div>
  );

  const InputField = ({ label, name, type = "text" }: any) => (
    <div>
      <label className="font-bold">{label}</label>
      {isEditMode ? (
        <TextInput
          type={type}
          name={name}
          value={formData[name]}
          // onChange={(e) => handleInputChange(name, e.target.value)}
          className="mt-2"
          register={register}
        />
      ) : (
        <p className="mt-2">{formData[name] || "-"}</p>
      )}
    </div>
  );

  const SelectField = ({ label, name, options }: any) => (
    <div>
      <label className="font-bold">{label}</label>
      {isEditMode ? (
        <select
          name={name}
          value={formData[name]}
          // onChange={(e) => handleInputChange(name, e.target.value)}
          className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
        >
          <option value="">Select {label}</option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <p className="mt-2">{formData[name] || "-"}</p>
      )}
    </div>
  );

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end mb-4">
          {isEditMode ? (
            <>
              <button
                onClick={() => setIsEditMode(false)}
                className="bg-red-700 text-white px-6 py-2 rounded-[5px] hover:bg-red-800 mr-2 cursor-pointer font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 cursor-pointer font-semibold"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 cursor-pointer font-semibold"
            >
              Edit
            </button>
          )}
        </div>

        {/* Aadhaar Section */}
        <h2 className="text-[22px] font-semibold mb-4">Aadhaar Details</h2>
        <div
          className={`grid ${
            isEditMode ? "md:grid-cols-2" : "md:grid-cols-3"
          } gap-4`}
        >
          <InputField label="Full Name" name="fullName" />
          <InputField label="Aadhaar Number" name="aadhaarNumber" />
          <SelectField
            label="Gender"
            name="gender"
            options={["Male", "Female", "Other"]}
          />
          <InputField label="Date of Birth" name="dob" type="date" />
          <InputField label="Address" name="address" />
          <InputField label="State" name="state" />
          <InputField label="Pin Code" name="pinCode" />
          <InputField label="Country" name="country" />
        </div>

        {/* Aadhaar Upload */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <UploadBox
            label="Upload Front Photo"
            image={aadhaarFront}
            setImage={setAadhaarFront}
          />
          <UploadBox
            label="Upload Back Photo"
            image={aadhaarBack}
            setImage={setAadhaarBack}
          />
        </div>

        {/* PAN Section */}
        <h2 className="text-[22px] font-semibold mt-10 mb-4">PAN Details</h2>
        <div
          className={`grid ${
            isEditMode ? "md:grid-cols-2" : "md:grid-cols-3"
          } gap-4`}
        >
          <InputField label="PAN Number" name="panNumber" />
          <InputField label="Full Name" name="panFullName" />
        </div>
        <div className="mt-6">
          <UploadBox
            label="Upload PAN Image"
            image={panImage}
            setImage={setPanImage}
          />
        </div>

        {/* Bank Section */}
        <h2 className="text-[22px] font-semibold mt-10 mb-4">Bank Details</h2>
        <div
          className={`grid ${
            isEditMode ? "md:grid-cols-2" : "md:grid-cols-3"
          } gap-4`}
        >
          <InputField label="Account Name" name="accountName" />
          <InputField label="Account Number" name="accountNumber" />
          <InputField label="IFSC Code" name="ifsc" />
          <InputField label="Bank Name" name="bankName" />
          <InputField label="Branch" name="branch" />
          <InputField label="Address" name="bankAddress" />
          <InputField label="Phone" name="phone" />
          <InputField label="District" name="district" />
          <InputField label="State" name="bankState" />
          <InputField label="Country" name="bankCountry" />
        </div>
        <div className="mt-6">
          <UploadBox
            label="Upload Bank Proof Image"
            image={bankProof}
            setImage={setBankProof}
          />
        </div>
      </form>
    </>
  );
}
