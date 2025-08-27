"use client";

import { useEffect, useState } from "react";
import KycEditForm from "@/components/forms/KycEditForm";
import KycCreateForm from "@/components/forms/KycCreateForm";
import Image from "next/image";
import dummyImg from "../../../../../../public/images/dummyImg.jpg";
import { useFetchKycDetails } from "@/services/kyc.service";
import SpinnerLoader from "@/components/ui/loader/SpinerLoader";
import { canEditKYC, getKYCStatusIconColor, getKYCStatusText } from "@/utils";
import { LoaderButton } from "@/components/ui/button";
import { environmentVariables } from "@/config/app.config";

const customLoader = ({ src }: { src: string }) =>
  src.startsWith("http") ? src : `${src}`;

export default function KycTab() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: kycData, isLoading, refetch } = useFetchKycDetails();
  console.log("kycData", kycData);
  // useEffect(() => {
  //   refetch();
  // }, []);

  const handleCancel = () => setIsEditMode(false);
  const handleStartKYC = () => setIsEditMode(true);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  // No KYC data exists
  if (!kycData) {
    return (
      <div>
        {/* Agar edit mode off hai tabhi ye show hoga */}
        {!isEditMode && (
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
        )}

        {/* Agar edit mode true hai to sirf form dikhega */}
        {isEditMode && (
          <KycCreateForm
            onComplete={() => {
              setIsEditMode(false);
              refetch(); // KYC data refresh karega
            }}
          />
        )}
      </div>
    );
  }

  return (
    <>
      {/* Status Display */}
      <div className="w-[100%] mb-5">
        {!isEditMode && (
          <div className="w-full flex items-center justify-center gap-3">
            {/* Static Circle Check Icon with dynamic color */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-8 h-8 ${getKYCStatusIconColor(kycData.status)}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>

            <p
              className={`${getKYCStatusIconColor(
                kycData.status
              )} px-4 py-2 rounded-[5px] text-sm font-bold text-center`}
            >
              {getKYCStatusText(kycData.status)}
            </p>
          </div>
        )}
      </div>

      {/* Rejection Reason Alert */}
      {kycData.rejectionReason && (
        <div className="w-[100%] mb-5">
          <div className="w-full">
            <p className="bg-red-100 text-red-800 px-4 py-3 rounded-[5px] text-sm font-bold w-full block">
              <span className="text-black">Rejection Reason:</span>{" "}
              {kycData.rejectionReason}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between gap-1.5 items-center">
        {!isEditMode && (
          <h2 className="text-[22px] font-bold mb-4">KYC Details</h2>
        )}
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

      {isEditMode ? (
        // Use KycEditForm when data exists and in edit mode
        <KycEditForm
          defaultValues={kycData}
          onComplete={() => {
            setIsEditMode(false);
            refetch(); // Edit ke baad latest KYC data fetch karega
          }}
        />
      ) : (
        <>
          {/* Aadhaar Section */}
          <h2 className="text-[20px] font-semibold mb-4">Aadhaar Details</h2>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
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
              <label className="font-bold">State</label>
              <p className="mt-1 text-gray-700">
                {kycData.aadharDetails?.state || "N/A"}
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
                    src={`${environmentVariables.UPLOAD_URL}/kyc/${kycData.aadharDetails.aadharFrontImage}`}
                    alt="Front Aadhaar"
                    width={300}
                    height={250}
                    className="object-contain text-center"
                    loader={customLoader}
                  />
                ) : (
                  <Image
                    src={dummyImg}
                    alt="Front Aadhaar"
                    width={300}
                    height={250}
                    className="object-contain text-center"
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
                    src={`${environmentVariables.UPLOAD_URL}/kyc/${kycData.aadharDetails.aadharBackImage}`}
                    alt="Back Aadhaar"
                    width={300}
                    height={250}
                    className="object-contain text-center"
                    loader={customLoader}
                  />
                ) : (
                  <Image
                    src={dummyImg}
                    alt="Back Aadhaar"
                    width={300}
                    height={250}
                    className="object-contain text-center"
                    loader={customLoader}
                  />
                )}
              </div>
            </div>
          </div>

          {/* PAN Section */}
          <h2 className="text-[20px] font-semibold mb-4 pt-8">PAN Details</h2>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
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
                  src={`${environmentVariables.UPLOAD_URL}/kyc/${kycData.panDetails.panImage}`}
                  alt="PAN Card"
                  width={300}
                  height={250}
                  className="object-contain text-center"
                  loader={customLoader}
                />
              ) : (
                <Image
                  src={dummyImg}
                  alt="PAN Card"
                  width={300}
                  height={250}
                  className="object-contain text-center"
                  loader={customLoader}
                />
              )}
            </div>
          </div>

          {/* Bank Section */}
          <h2 className="text-[20px] font-semibold mb-4 pt-8">Bank Details</h2>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
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
              <label className="font-bold">Country</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.country || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">State</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.state || "N/A"}
              </p>
            </div>
            <div>
              <label className="font-bold">City</label>
              <p className="mt-1 text-gray-700">
                {kycData.bankDetails?.city || "N/A"}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
            <label className="font-bold">Bank Proof Image</label>
            <div className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-[#F4F5F7] h-[250px] overflow-hidden">
              {kycData.bankDetails?.bankImage ? (
                <Image
                  src={`${environmentVariables.UPLOAD_URL}/kyc/${kycData.bankDetails.bankImage}`}
                  alt="Bank Proof"
                  width={300}
                  height={250}
                  className="object-contain text-center"
                  loader={customLoader}
                />
              ) : (
                <Image
                  src={dummyImg}
                  alt="Bank Proof"
                  width={300}
                  height={250}
                  className="object-contain text-center"
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
