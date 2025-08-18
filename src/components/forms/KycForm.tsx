"use client";

import Image from "next/image";
import { FaUpload, FaTimes } from "react-icons/fa";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import TextInput from "../ui/input/TextInput";
import SelectInput from "../ui/input/SelectInput";
import { LoaderButton } from "../ui/button";

import { Country, State } from "country-state-city";

const validationSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  aadhaarNumber: z.string().min(12, "Aadhaar number must be 12 digits"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  pinCode: z.string().min(6, "Pin code must be at least 6 digits"),
  panNumber: z.string().min(1, "PAN Number is required"),
  panFullName: z.string().min(1, "PAN Full Name is required"),
  accountName: z.string().min(1, "Account Name is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  ifsc: z.string().min(1, "IFSC Code is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  branch: z.string().min(1, "Branch is required"),
  bankAddress: z.string().min(1, "Bank Address is required"),
  phone: z.string().min(10, "Phone is required"),
  district: z.string().min(1, "District is required"),
  bankCountry: z.string().min(1, "Country is required"),
  bankState: z.string().min(1, "State is required"),
});

const customLoader = ({ src }: { src: string }) =>
  src.startsWith("http") ? src : `${src}`;

type FormData = z.infer<typeof validationSchema>;

export default function KycForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const [dob, setDob] = useState<Date | null>(null);

  // Image states
  const [aadhaarFront, setAadhaarFront] = useState<string | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<string | null>(null);
  const [panImage, setPanImage] = useState<string | null>(null);
  const [bankImage, setBankImage] = useState<string | null>(null);

  // Preview modal state
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Country & State options
  const countries = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [states, setStates] = useState<any[]>([]);

  const [selectedBankCountry, setSelectedBankCountry] = useState<string>("");
  const [bankStates, setBankStates] = useState<any[]>([]);

  const onSubmit = (data: FormData) => {
    if (!aadhaarFront || !aadhaarBack || !panImage || !bankImage) {
      toast.error("Please upload all required images");
      return;
    }
    toast.success("KYC Form Submitted!");
    console.log("KYC Form Data:", data);
    reset();
    setAadhaarFront(null);
    setAadhaarBack(null);
    setPanImage(null);
    setBankImage(null);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "aadhaarFront" | "aadhaarBack" | "pan" | "bank"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "aadhaarFront") setAadhaarFront(url);
      if (type === "aadhaarBack") setAadhaarBack(url);
      if (type === "pan") setPanImage(url);
      if (type === "bank") setBankImage(url);
    }
  };

  const renderUploadBox = (
    label: string,
    image: string | null,
    onRemove: () => void,
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => (
    <div className="bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
      <div className="flex items-center gap-2 font-semibold">
        <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
          <FaUpload />
        </span>
        {label}
      </div>
      <input type="file" accept="image/*" onChange={onUpload} />
      <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden relative">
        {image ? (
          <>
            <Image
              src={image}
              alt={label}
              fill
              className="object-contain cursor-pointer"
              onClick={() => setPreviewImage(image)}
              loader={customLoader}
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <FaTimes />
            </button>
          </>
        ) : (
          <p className="text-gray-400">No Image Uploaded</p>
        )}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Aadhaar Section */}
      <h2 className="text-[20px] font-semibold mb-4">Aadhaar Details</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput
          name="firstName"
          label="First Name"
          register={register}
          error={errors.firstName}
        />
        <TextInput
          name="lastName"
          label="Last Name"
          register={register}
          error={errors.lastName}
        />
        <TextInput
          name="aadhaarNumber"
          label="Aadhaar Number"
          register={register}
          error={errors.aadhaarNumber}
        />
        <SelectInput
          name="gender"
          label="Gender"
          options={["Male", "Female", "Other"]}
          register={register}
          error={errors.gender}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <DatePicker
            selected={dob}
            onChange={(date) => {
              setDob(date);
              if (date) {
                setValue("dob", date.toISOString().split("T")[0], {
                  shouldValidate: true,
                });
              }
            }}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date"
            className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
          )}
        </div>

        <TextInput
          name="address"
          label="Address"
          register={register}
          error={errors.address}
        />

        {/* Dynamic Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            {...register("country")}
            onChange={(e) => {
              const countryCode = e.target.value;
              setSelectedCountry(countryCode);
              setStates(State.getStatesOfCountry(countryCode));
            }}
            className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Dynamic State */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            {...register("state")}
            className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>

        <TextInput
          name="pinCode"
          label="Pin Code"
          register={register}
          error={errors.pinCode}
        />
      </div>

      {/* Aadhaar Upload */}
      <h2 className="text-[20px] font-semibold mt-6 mb-4">Upload Aadhaar</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {renderUploadBox(
          "Upload Aadhaar Front",
          aadhaarFront,
          () => setAadhaarFront(null),
          (e) => handleImageUpload(e, "aadhaarFront")
        )}
        {renderUploadBox(
          "Upload Aadhaar Back",
          aadhaarBack,
          () => setAadhaarBack(null),
          (e) => handleImageUpload(e, "aadhaarBack")
        )}
      </div>

      {/* PAN Section */}
      <h2 className="text-[22px] font-semibold mt-10 mb-4">PAN Details</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput
          name="panNumber"
          label="PAN Number"
          register={register}
          error={errors.panNumber}
        />
        <TextInput
          name="panFullName"
          label="Full Name"
          register={register}
          error={errors.panFullName}
        />
      </div>
      <div className="mt-4">
        {renderUploadBox(
          "Upload PAN Card",
          panImage,
          () => setPanImage(null),
          (e) => handleImageUpload(e, "pan")
        )}
      </div>

      {/* Bank Section */}
      <h2 className="text-[22px] font-semibold mt-10 mb-4">Bank Details</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput
          name="accountName"
          label="Account Name"
          register={register}
          error={errors.accountName}
        />
        <TextInput
          name="accountNumber"
          label="Account Number"
          register={register}
          error={errors.accountNumber}
        />
        <TextInput
          name="ifsc"
          label="IFSC Code"
          register={register}
          error={errors.ifsc}
        />
        <TextInput
          name="bankName"
          label="Bank Name"
          register={register}
          error={errors.bankName}
        />
        <TextInput
          name="branch"
          label="Branch"
          register={register}
          error={errors.branch}
        />
        <TextInput
          name="bankAddress"
          label="Bank Address"
          register={register}
          error={errors.bankAddress}
        />
        <TextInput
          name="phone"
          label="Phone"
          register={register}
          error={errors.phone}
        />
        <TextInput
          name="district"
          label="District"
          register={register}
          error={errors.district}
        />

        {/* Dynamic Bank Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bank Country
          </label>
          <select
            {...register("bankCountry")}
            onChange={(e) => {
              const countryCode = e.target.value;
              setSelectedBankCountry(countryCode);
              setBankStates(State.getStatesOfCountry(countryCode));
            }}
            className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.bankCountry && (
            <p className="mt-1 text-sm text-red-600">
              {errors.bankCountry.message}
            </p>
          )}
        </div>

        {/* Dynamic Bank State */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bank State
          </label>
          <select
            {...register("bankState")}
            className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select State</option>
            {bankStates.map((s) => (
              <option key={s.isoCode} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.bankState && (
            <p className="mt-1 text-sm text-red-600">
              {errors.bankState.message}
            </p>
          )}
        </div>
      </div>

      {/* Bank Proof Upload */}
      <div className="mt-4">
        {renderUploadBox(
          "Upload Bank Proof (Passbook/Cheque)",
          bankImage,
          () => setBankImage(null),
          (e) => handleImageUpload(e, "bank")
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <LoaderButton type="submit">Submit KYC</LoaderButton>
      </div>

      {/* Fullscreen Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl w-full">
            <Image
              src={previewImage}
              alt="Preview"
              width={800}
              height={600}
              className="mx-auto rounded-lg shadow-lg object-contain"
            />
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
