"use client";

import { useState } from "react";
import KycForm from "@/components/forms/KycForm";
import Image from "next/image";
import dummyImg from "../../../../../../public/images/dummyImg.jpg";
import { LoaderButton } from "@/components/ui/button";

type UserKyc = {
  _id: string;
  aadhaarNumber?: string;
  panNumber?: string;
  aadhaarFront?: string;
  aadhaarBack?: string;
  panImage?: string;
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

  const handleCancel = () => setIsEditMode(false);
  const editFormDefaultValues = {
    aadhaarNumber: userKyc?.aadhaarNumber ?? "",
    panNumber: userKyc?.panNumber ?? "",
  };

  return (
    <>
      {/* Toggle Buttons */}
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
        <form>
          {/* Aadhaar Section */}
          <h2 className="text-[20px] font-semibold mb-4">Aadhaar Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold">First Name</label>
              <p className="mt-1 text-gray-700">Sandeep</p>
            </div>
            <div>
              <label className="font-bold">Last Name</label>
              <p className="mt-1 text-gray-700">Kumar</p>
            </div>
            <div>
              <label className="font-bold">Aadhaar Number</label>
              <p className="mt-1 text-gray-700">1234-5678-9012</p>
            </div>
            <div>
              <label className="font-bold">Gender</label>
              <p className="mt-1 text-gray-700">Male</p>
            </div>
            <div>
              <label className="font-bold">Date of Birth</label>
              <p className="mt-1 text-gray-700">1995-08-10</p>
            </div>
            <div>
              <label className="font-bold">Address</label>
              <p className="mt-1 text-gray-700">Bangalore, Karnataka</p>
            </div>
            <div>
              <label className="font-bold">Country</label>
              <p className="mt-1 text-gray-700">India</p>
            </div>
            <div>
              <label className="font-bold">State</label>
              <p className="mt-1 text-gray-700">Karnataka</p>
            </div>
            <div>
              <label className="font-bold">Pin Code</label>
              <p className="mt-1 text-gray-700">560001</p>
            </div>
          </div>

          {/* Aadhaar Upload */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
              <label className="font-bold">Aadhaar Front Photo</label>
              <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden">
                <Image
                  src={dummyImg}
                  alt="Front Aadhaar"
                  width={300}
                  height={250}
                  className="object-contain"
                  loader={customLoader}
                />
              </div>
            </div>
            <div className="bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
              <label className="font-bold">Aadhaar Back Photo</label>
              <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden">
                <Image
                  src={dummyImg}
                  alt="Back Aadhaar"
                  width={300}
                  height={250}
                  className="object-contain"
                  loader={customLoader}
                />
              </div>
            </div>
          </div>

          {/* PAN Section */}
          <h2 className="text-[22px] font-semibold mt-10 mb-4">PAN Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold">PAN Number</label>
              <p className="mt-1 text-gray-700">ABCDE1234F</p>
            </div>
            <div>
              <label className="font-bold">Full Name</label>
              <p className="mt-1 text-gray-700">Sandeep Kumar</p>
            </div>
          </div>
          <div className="mt-6 bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
            <label className="font-bold">PAN Image</label>
            <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden">
              <Image
                src={dummyImg}
                alt="PAN Card"
                width={300}
                height={250}
                className="object-contain"
                loader={customLoader}
              />
            </div>
          </div>

          {/* Bank Section */}
          <h2 className="text-[22px] font-semibold mt-10 mb-4">Bank Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold">Account Name</label>
              <p className="mt-1 text-gray-700">Sandeep Kumar</p>
            </div>
            <div>
              <label className="font-bold">Account Number</label>
              <p className="mt-1 text-gray-700">123456789012</p>
            </div>
            <div>
              <label className="font-bold">IFSC Code</label>
              <p className="mt-1 text-gray-700">SBIN0001234</p>
            </div>
            <div>
              <label className="font-bold">Bank Name</label>
              <p className="mt-1 text-gray-700">State Bank of India</p>
            </div>
            <div>
              <label className="font-bold">Branch</label>
              <p className="mt-1 text-gray-700">MG Road</p>
            </div>
            <div>
              <label className="font-bold">Address</label>
              <p className="mt-1 text-gray-700">Bangalore</p>
            </div>
            <div>
              <label className="font-bold">Phone</label>
              <p className="mt-1 text-gray-700">9876543210</p>
            </div>
            <div>
              <label className="font-bold">District</label>
              <p className="mt-1 text-gray-700">Bangalore Urban</p>
            </div>
            <div>
              <label className="font-bold">Country</label>
              <p className="mt-1 text-gray-700">India</p>
            </div>
            <div>
              <label className="font-bold">State</label>
              <p className="mt-1 text-gray-700">Karnataka</p>
            </div>
          </div>
          <div className="mt-6 bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
            <label className="font-bold">Bank Proof Image</label>
            <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden">
              <Image
                src={dummyImg}
                alt="Bank Proof"
                width={300}
                height={250}
                className="object-contain"
                loader={customLoader}
              />
            </div>
          </div>
        </form>
      )}

      <div className="flex justify-end mt-5">
        {isEditMode ? (
          <>
            <LoaderButton
              type="close"
              text="Cancel"
              onClick={handleCancel}
              className="bg-red-700 text-white px-6 py-2 rounded-[5px] hover:bg-red-800 mr-2 font-semibold cursor-pointer"
            />

            <LoaderButton
              type="submit"
              text="Save KYC"
              onClick={() => setIsEditMode(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
            />
          </>
        ) : (
          <LoaderButton
            type="button"
            text="Edit"
            onClick={() => setIsEditMode(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
          />
        )}
      </div>
    </>
  );
}
