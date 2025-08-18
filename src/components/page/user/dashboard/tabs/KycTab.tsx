"use client";

import { useEffect, useState } from "react";
import KycForm from "@/components/forms/KycForm";
import Image from "next/image";
import dummyImg from "../../../../../../public/images/dummyImg.jpg";
import { useFetchKycDetails } from "@/services/kyc.service";
import SpinnerLoader from "@/components/ui/loader/SpinerLoader";
import { canEditKYC, getKYCStatusText } from "@/utils";
import { LoaderButton } from "@/components/ui/button";

const customLoader = ({ src }: { src: string }) =>
  src.startsWith("http") ? src : `${src}`;

export default function KycTab() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: kycData, isLoading, refetch } = useFetchKycDetails();

  useEffect(() => {
    refetch();
  }, []);

  const handleCancel = () => setIsEditMode(false);
  const handleStartKYC = () => setIsEditMode(true);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  // No KYC data exists
  if (!kycData) {
    return (
      <div className="text-center py-10">
        <h2 className="text-[22px] font-bold mb-4">KYC Details</h2>
        <p className="text-gray-500 mb-6">
          To buy or sell unlisted shares, pre-IPO shares, ESOP buy and sell,
          please complete your KYC information
        </p>
        <LoaderButton
          text="Click here to fill KYC"
          type="button"
          onClick={handleStartKYC}
          className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
        />
      </div>
    );
  }

  // KYC exists but can't be edited
  if (!canEditKYC(kycData.status)) {
    return (
      <div className="text-center py-10">
        <h2 className="text-[22px] font-bold mb-2">KYC Details</h2>
        <p className="text-gray-700 mb-2">
          Status:{" "}
          <span className="font-semibold">
            {getKYCStatusText(kycData.status)}
          </span>
        </p>
        <p className="text-gray-500 mb-6">
          Your KYC is currently being processed. Editing is not available at
          this time.
        </p>

        {/* Display read-only KYC data here if needed */}
      </div>
    );
  }

  return (
    <>
      {/* Toggle Buttons */}
      <div className="flex justify-end mb-5">
        <div className="flex justify-between items-center w-[100%]">
          {/* Status Display */}
          <div className="">
            <h2 className="text-[25px] font-bold inline-block mr-4">
              KYC Status
            </h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
              {getKYCStatusText(kycData.status)}
            </span>
          </div>

          {/* Edit Button (only shown when allowed) */}
          {canEditKYC(kycData.status) && (
            <div className="flex justify-end mb-5">
              {!isEditMode && (
                <LoaderButton
                  type="button"
                  text="Edit"
                  onClick={() => setIsEditMode(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <h2 className="text-[22px] font-bold mb-4">KYC Details</h2>

      {isEditMode ? (
        <KycForm onComplete={() => setIsEditMode(false)} />
      ) : (
        <>
          {/* Aadhaar Section */}
          <h2 className="text-[20px] font-semibold mb-4">Aadhaar Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold">Full Name</label>
              <p className="mt-1 text-gray-700">
                {kycData.aadharDetails?.fullName || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Aadhaar Number</label>
              <p className="mt-1 text-gray-700">
                {kycData.aadharDetails?.aadharNo || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Gender</label>
              <p className="mt-1 text-gray-700">
                {kycData.aadharDetails?.gender || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Date of Birth</label>
              <p className="mt-1 text-gray-700">
                {kycData.aadharDetails?.dob || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Address</label>
              <p className="mt-1 text-gray-700">
                {kycData.aadharDetails?.address || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Country</label>
              <p className="mt-1 text-gray-700">
                {kycData.aadharDetails?.country || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Pin Code</label>
              <p className="mt-1 text-gray-700">
                {kycData.aadharDetails?.pincode || "N/A"}
              </p>
            </div>
          </div>

          {/* Aadhaar Upload */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
              <label className="font-bold">Aadhaar Front Photo</label>
              <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden">
                {kycData.aadharDetails?.aadharFrontImage ? (
                  <Image
                    src={`/uploads/${kycData.aadharDetails.aadharFrontImage}`}
                    alt="Front Aadhaar"
                    width={300}
                    height={250}
                    className="object-contain"
                    loader={customLoader}
                  />
                ) : (
                  <Image
                    src={dummyImg}
                    alt="Front Aadhaar"
                    width={300}
                    height={250}
                    className="object-contain"
                    loader={customLoader}
                  />
                )}
              </div>
            </div>
            <div className="bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
              <label className="font-bold">Aadhaar Back Photo</label>
              <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden">
                {kycData.aadharDetails?.aadharBackImage ? (
                  <Image
                    src={`/uploads/${kycData.aadharDetails.aadharBackImage}`}
                    alt="Back Aadhaar"
                    width={300}
                    height={250}
                    className="object-contain"
                    loader={customLoader}
                  />
                ) : (
                  <Image
                    src={dummyImg}
                    alt="Back Aadhaar"
                    width={300}
                    height={250}
                    className="object-contain"
                    loader={customLoader}
                  />
                )}
              </div>
            </div>
          </div>

          {/* PAN Section */}
          <h2 className="text-[22px] font-semibold mt-10 mb-4">PAN Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold">PAN Number</label>
              <p className="mt-1 text-gray-700">
                {kycData.panDetails?.panNo || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Full Name</label>
              <p className="mt-1 text-gray-700">
                {kycData.panDetails?.name || "N/A"}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
            <label className="font-bold">PAN Image</label>
            <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden">
              {kycData.panDetails?.panImage ? (
                <Image
                  src={`/uploads/${kycData.panDetails.panImage}`}
                  alt="PAN Card"
                  width={300}
                  height={250}
                  className="object-contain"
                  loader={customLoader}
                />
              ) : (
                <Image
                  src={dummyImg}
                  alt="PAN Card"
                  width={300}
                  height={250}
                  className="object-contain"
                  loader={customLoader}
                />
              )}
            </div>
          </div>

          {/* Bank Section */}
          <h2 className="text-[22px] font-semibold mt-10 mb-4">Bank Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold">Account Name</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.name || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Account Number</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.accountNo || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">IFSC Code</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.ifsc || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Bank Name</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.bankName || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Branch</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.branch || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Phone</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.phone || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Address</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.address || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">District</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.district || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">Country</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.country || "N/A"}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
            <label className="font-bold">Bank Proof Image</label>
            <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden">
              {kycData.bankDetails?.bankImage ? (
                <Image
                  src={`/uploads/${kycData.bankDetails.bankImage}`}
                  alt="Bank Proof"
                  width={300}
                  height={250}
                  className="object-contain"
                  loader={customLoader}
                />
              ) : (
                <Image
                  src={dummyImg}
                  alt="Bank Proof"
                  width={300}
                  height={250}
                  className="object-contain"
                  loader={customLoader}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
