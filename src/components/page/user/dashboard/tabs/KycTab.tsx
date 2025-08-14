"use client";

import TextInput from "@/components/ui/input/TextInput";
import SelectInput from "@/components/ui/input/SelectInput";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload, FaTimes } from "react-icons/fa";
import dummyImg from "../../../../../../public/images/dummyImg.jpg";
import { Country, State } from "country-state-city";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function KycTab() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { register, handleSubmit } = useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const customLoader = ({ src }: { src: string }) =>
    src.startsWith("http") ? src : `${src}`;

  // Image states
  const [aadhaarFront, setAadhaarFront] = useState<string | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<string | null>(null);
  const [panImage, setPanImage] = useState<string | null>(null);
  const [bankProof, setBankProof] = useState<string | null>(null);

  // Form data
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

  const [selectedCountry, setSelectedCountry] = useState(formData.country);
  const [selectedState, setSelectedState] = useState(formData.state);
  const [selectedDob, setSelectedDob] = useState<Date | null>(
    formData.dob ? new Date(formData.dob) : null
  );

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: any
  ) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleImageError = (setImage: any) => {
    setImage("/image-not-found.png");
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
        {image ? (
          <Image
            src={image}
            alt={label}
            className="h-full object-contain"
            onError={() => handleImageError(setImage)}
            width={250}
            height={250}
            loader={customLoader}
          />
        ) : (
          <Image
            src={dummyImg}
            alt="no-image"
            className="h-full object-contain"
            width={300}
            height={250}
            loader={customLoader}
          />
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
          className="mt-1 w-full"
          register={register}
          value={formData[name]}
          onChange={(e) => handleInputChange(name, e.target.value)}
        />
      ) : (
        <p className="mt-2">{formData[name] || "-"}</p>
      )}
    </div>
  );

  const SelectField = ({ label, name, options, value, onChange }: any) => (
    <div>
      {isEditMode ? (
        <SelectInput
          name={name}
          label={label}
          value={value || formData[name]}
          onChange={(e) =>
            onChange
              ? onChange(e.target.value)
              : handleInputChange(name, e.target.value)
          }
          options={options}
          className="mt-1"
        />
      ) : (
        <>
          <label className="font-bold">{label}</label>
          <p className="mt-2">{formData[name] || "-"}</p>
        </>
      )}
    </div>
  );

  // Split full name
  const firstName = formData.fullName.split(" ")[0];
  const lastName = formData.fullName.split(" ").slice(1).join(" ");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end mb-4">
        {isEditMode ? (
          <>
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="bg-red-700 text-white px-6 py-2 rounded-[5px] hover:bg-red-800 mr-2 cursor-pointer font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 cursor-pointer font-semibold"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditMode(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 cursor-pointer font-semibold"
          >
            Edit
          </button>
        )}
      </div>

      {/* Aadhaar Section */}
      <h2 className="text-[22px] font-semibold mb-4">Aadhaar Details</h2>
      <div className={`grid ${isEditMode ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
        {/* Full Name */}
        {isEditMode ? (
          <>
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e: any) =>
                handleInputChange(
                  "fullName",
                  e.target.value + (lastName ? " " + lastName : "")
                )
              }
            />
            <InputField
              label="Last Name"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e: any) =>
                handleInputChange(
                  "fullName",
                  firstName + (e.target.value ? " " + e.target.value : "")
                )
              }
            />
          </>
        ) : (
          <div className="">
            <label className="font-bold">Full Name</label>
            <p className="mt-2">{formData.fullName || "-"}</p>
          </div>
        )}

        <InputField label="Aadhaar Number" name="aadhaarNumber" />
        <SelectField label="Gender" name="gender" options={["Male", "Female", "Other"]} />

        {/* Date Picker */}
        <div className="mt-1">
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

        <InputField label="Address" name="address" />

        {/* Country & State */}
        <SelectField
          label="Country"
          name="country"
          value={selectedCountry}
          onChange={(value: string) => {
            setSelectedCountry(value);
            setSelectedState("");
            handleInputChange("country", value);
          }}
          options={Country.getAllCountries().map((c) => c.name)}
        />
        <SelectField
          label="State"
          name="state"
          value={selectedState}
          onChange={(value: string) => {
            setSelectedState(value);
            handleInputChange("state", value);
          }}
          options={
            selectedCountry
              ? State.getStatesOfCountry(
                  Country.getAllCountries().find((c) => c.name === selectedCountry)?.isoCode || ""
                ).map((s) => s.name)
              : []
          }
        />
        <InputField label="Pin Code" name="pinCode" />
      </div>

      {/* Aadhaar Upload */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <UploadBox label="Upload Front Photo" image={aadhaarFront} setImage={setAadhaarFront} />
        <UploadBox label="Upload Back Photo" image={aadhaarBack} setImage={setAadhaarBack} />
      </div>

      {/* PAN Section */}
      <h2 className="text-[22px] font-semibold mt-10 mb-4">PAN Details</h2>
      <div className={`grid ${isEditMode ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
        <InputField label="PAN Number" name="panNumber" />
        <InputField label="Full Name" name="panFullName" />
      </div>
      <div className="mt-6">
        <UploadBox label="Upload PAN Image" image={panImage} setImage={setPanImage} />
      </div>

      {/* Bank Section */}
      <h2 className="text-[22px] font-semibold mt-10 mb-4">Bank Details</h2>
      <div className={`grid ${isEditMode ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
        <InputField label="Account Name" name="accountName" />
        <InputField label="Account Number" name="accountNumber" />
        <InputField label="IFSC Code" name="ifsc" />
        <InputField label="Bank Name" name="bankName" />
        <InputField label="Branch" name="branch" />
        <InputField label="Address" name="bankAddress" />
        <InputField label="Phone" name="phone" />
        <InputField label="District" name="district" />

        <SelectField
          label="Country"
          name="bankCountry"
          value={formData.bankCountry}
          onChange={(value: string) => handleInputChange("bankCountry", value)}
          options={Country.getAllCountries().map((c) => c.name)}
        />
        <SelectField
          label="State"
          name="bankState"
          value={formData.bankState}
          onChange={(value: string) => handleInputChange("bankState", value)}
          options={
            formData.bankCountry
              ? State.getStatesOfCountry(
                  Country.getAllCountries().find((c) => c.name === formData.bankCountry)?.isoCode || ""
                ).map((s) => s.name)
              : []
          }
        />
      </div>

      <div className="mt-6">
        <UploadBox label="Upload Bank Proof Image" image={bankProof} setImage={setBankProof} />
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-[#00000075] flex items-center justify-center z-50">
          <div className="relative max-w-[90%] max-h-[90%] bg-white p-5 rounded-3xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg cursor-pointer"
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
