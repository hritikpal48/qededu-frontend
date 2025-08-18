"use client";

import { useState } from "react";
import KycForm from "@/components/forms/KycForm";
import Image from "next/image";
import dummyImg from "../../../../../../public/images/dummyImg.jpg";

type UserKyc = {
  _id: string;
  firstName?: string;
  lastName?: string;
  aadhaarNumber?: string;
  gender?: string;
  dob?: string;
  address?: string;
  country?: string;
  state?: string;
  pinCode?: string;
  panNumber?: string;
  panFullName?: string;
  accountName?: string;
  accountNumber?: string;
  ifsc?: string;
  bankName?: string;
  branch?: string;
  bankAddress?: string;
  phone?: string;
  district?: string;
  bankCountry?: string;
  bankState?: string;
  aadhaarFront?: string;
  aadhaarBack?: string;
  panImage?: string;
  bankImage?: string;
};

type Props = {
  userKyc?: UserKyc;
  isPending?: boolean;
  refetchKyc?: () => any;
};

const customLoader = ({ src }: { src: string }) =>
  src.startsWith("http") ? src : `${src}`;

export default function KycTab({ userKyc, isPending, refetchKyc }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCancel = () => setIsEditMode(false);

  const editFormDefaultValues = {
    ...userKyc,
  };

  const openPreview = (src: string) => setPreviewImage(src);
  const closePreview = () => setPreviewImage(null);

  const renderImageBox = (label: string, src?: string) => (
    <div className="bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
      <label className="font-bold">{label}</label>
      <div
        className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden cursor-pointer"
        onClick={() => src && openPreview(src)}
      >
        <Image
          src={src || dummyImg}
          alt={label}
          width={300}
          height={250}
          className="object-contain"
          loader={customLoader}
        />
      </div>
    </div>
  );

  const renderField = (label: string, value?: string) => (
    <div>
      <label className="font-bold">{label}</label>
      <p className="mt-1 text-gray-700">{value || "-"}</p>
    </div>
  );

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
            <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
            >
              Save KYC
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

      <h2 className="text-[22px] font-bold mb-4">KYC Details</h2>

      {isEditMode ? (
        <KycForm
          defaultValues={editFormDefaultValues}
          onComplete={() => {
            setIsEditMode(false);
            refetchKyc?.();
          }}
        />
      ) : (
        <>
          {/* Aadhaar Section */}
          <h2 className="text-[20px] font-semibold mb-4">Aadhaar Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {renderField("First Name", userKyc?.firstName)}
            {renderField("Last Name", userKyc?.lastName)}
            {renderField("Aadhaar Number", userKyc?.aadhaarNumber)}
            {renderField("Gender", userKyc?.gender)}
            {renderField("Date of Birth", userKyc?.dob)}
            {renderField("Address", userKyc?.address)}
            {renderField("Country", userKyc?.country)}
            {renderField("State", userKyc?.state)}
            {renderField("Pin Code", userKyc?.pinCode)}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {renderImageBox("Aadhaar Front Photo", userKyc?.aadhaarFront)}
            {renderImageBox("Aadhaar Back Photo", userKyc?.aadhaarBack)}
          </div>

          {/* PAN Section */}
          <h2 className="text-[22px] font-semibold mt-10 mb-4">PAN Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {renderField("PAN Number", userKyc?.panNumber)}
            {renderField("Full Name", userKyc?.panFullName)}
          </div>
          <div className="mt-6">{renderImageBox("PAN Image", userKyc?.panImage)}</div>

          {/* Bank Section */}
          <h2 className="text-[22px] font-semibold mt-10 mb-4">Bank Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {renderField("Account Name", userKyc?.accountName)}
            {renderField("Account Number", userKyc?.accountNumber)}
            {renderField("IFSC Code", userKyc?.ifsc)}
            {renderField("Bank Name", userKyc?.bankName)}
            {renderField("Branch", userKyc?.branch)}
            {renderField("Bank Address", userKyc?.bankAddress)}
            {renderField("Phone", userKyc?.phone)}
            {renderField("District", userKyc?.district)}
            {renderField("Bank Country", userKyc?.bankCountry)}
            {renderField("Bank State", userKyc?.bankState)}
          </div>
          <div className="mt-6">{renderImageBox("Bank Proof Image", userKyc?.bankImage)}</div>
        </>
      )}

      {/* Modal for Preview */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closePreview}
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
              onClick={closePreview}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
