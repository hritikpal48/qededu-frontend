"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import dummyImg from "../../../../../../public/images/dummyImg.jpg";
import { useFetchKycDetails } from "@/services/kyc.service";
import { KycData } from "@/types/kycType";

export default function KycTab() {
  const { handleSubmit } = useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // API call
  const { data, isLoading, isError } = useFetchKycDetails();

  // Local state for form fields
  const [formData, setFormData] = useState<Partial<KycData>>({});
  const [aadhaarFront, setAadhaarFront] = useState<string | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<string | null>(null);
  const [panImage, setPanImage] = useState<string | null>(null);
  const [bankProof, setBankProof] = useState<string | null>(null);

  // Load data into state when fetched
  useEffect(() => {
    if (data) {
      setFormData({
        fullName: data.aadharDetails?.fullName || "",
        aadharNo: data.aadharDetails?.aadharNo || "",
        gender: data.aadharDetails?.gender || "",
        dob: data.aadharDetails?.dob || "",
        address: data.aadharDetails?.address || "",
        pincode: data.aadharDetails?.pincode || "",
        country: data.aadharDetails?.country || "",
        state: data.aadharDetails?.state || "",
        panName: data.panDetails?.name || "",
        panNo: data.panDetails?.panNo || "",
        bankName: data.bankDetails?.bankName || "",
        accountNo: data.bankDetails?.accountNo || "",
        ifsc: data.bankDetails?.ifsc || "",
        branch: data.bankDetails?.branch || "",
        bankAddress: data.bankDetails?.address || "",
        phone: data.bankDetails?.phone || "",
        district: data.bankDetails?.district || "",
        bankState: data.bankDetails?.state || "",
        bankCountry: data.bankDetails?.country || "",
      });

      // // Set images
      // setAadhaarFront(data.aadharDetails?.frontImage || null);
      // setAadhaarBack(data.aadharDetails?.backImage || null);
      // setPanImage(data.panDetails?.image || null);
      // setBankProof(data.bankDetails?.proofImage || null);
    }
  }, [data]);

  const customLoader = ({ src }: { src: string }) =>
    src.startsWith("http") ? src : `${src}`;

  const UploadBox = ({
    label,
    image,
  }: {
    label: string;
    image: string | null;
  }) => (
    <div className="bg-white shadow border-[#e4e8eb] rounded-[10px] p-5 border flex flex-col gap-4">
      <div className="flex items-center gap-2 font-semibold">{label}</div>
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

  const TextField = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => (
    <div>
      <label className="font-bold">{label}</label>
      <p className="mt-2">{value || "-"}</p>
    </div>
  );

  if (isLoading) return <p>Loading KYC details...</p>;
  if (isError) return <p>Failed to load KYC details.</p>;

  return (
    <form onSubmit={handleSubmit(() => {})}>
      {/* Aadhaar Section */}
      <h2 className="text-[22px] font-semibold mb-4">Aadhaar Details</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <TextField label="Full Name" value={formData.fullName} />
        <TextField label="Aadhaar Number" value={formData.aadharNo} />
        <TextField label="Gender" value={formData.gender} />
        <TextField label="Date of Birth" value={formData.dob} />
        <TextField label="Address" value={formData.address} />
        <TextField label="Country" value={formData.country} />
        <TextField label="State" value={formData.state} />
        <TextField label="Pin Code" value={formData.pincode} />
      </div>

      {/* Aadhaar Upload */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <UploadBox label="Front Photo" image={aadhaarFront} />

        <UploadBox label="Back Photo" image={aadhaarBack} />
      </div>

      {/* PAN Section */}
      <h2 className="text-[22px] font-semibold mt-10 mb-4">PAN Details</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <TextField label="PAN Number" value={formData.panNo} />
        <TextField label="Full Name" value={formData.panName} />
      </div>
      <div className="mt-6">
        <UploadBox label="PAN Image" image={panImage} />
      </div>

      {/* Bank Section */}
      <h2 className="text-[22px] font-semibold mt-10 mb-4">Bank Details</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <TextField label="Account Name" value={formData.bankName} />
        <TextField label="Account Number" value={formData.accountNo} />
        <TextField label="IFSC Code" value={formData.ifsc} />
        <TextField label="Bank Name" value={formData.bankName} />
        <TextField label="Branch" value={formData.branch} />
        <TextField label="Address" value={formData.bankAddress} />
        <TextField label="Phone" value={formData.phone} />
        <TextField label="District" value={formData.district} />
        <TextField label="Country" value={formData.bankCountry} />
        <TextField label="State" value={formData.bankState} />
      </div>
      <div className="mt-6">
        <UploadBox label="Bank Proof Image" image={bankProof} />
      </div>

      {/* Image Preview */}
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
