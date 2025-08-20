"use client";

import Image from "next/image";
import { FaUpload, FaTimes } from "react-icons/fa";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { environmentVariables } from "@/config/app.config";
import TextInput from "../ui/input/TextInput";
import SelectInput from "../ui/input/SelectInput";
import { LoaderButton } from "../ui/button";
import { Country, State, City, IState, ICity } from "country-state-city";
import { useCreateKyc } from "@/services/kyc.service";

const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

// All files are mandatory for create form
const fileSchema = z
    .instanceof(File)
    .refine(
        (file) => file.size <= maxFileSize,
        'File size must be less than 5MB'
    )
    .refine(
        (file) => allowedFileTypes.includes(file.type),
        'Only .jpg, .jpeg, .png and .pdf files are allowed'
    );

const validationSchema = z.object({
    // All files are required for create form
    aadharImageFront: fileSchema,
    aadharImageBack: fileSchema,
    panImage: fileSchema,
    bankImage: fileSchema,
    kycData: z.object({
        aadharDetails: z.object({
            fullName: z.string().min(1, "Full name is required"),
            aadharNo: z.string().min(12, "Aadhar number must be 12 digits").max(12),
            gender: z.string().min(1, "Gender is required"),
            dob: z.string().min(1, "Date of birth is required"),
            address: z.string().min(1, "Address is required"),
            pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
            country: z.string().min(1, "Country is required"),
            state: z.string().min(1, "State is required"),
        }),
        panDetails: z.object({
            name: z.string().min(1, "Name is required"),
            panNo: z.string().min(10, "PAN must be 10 characters").max(10)
                .regex(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN format"),
        }),
        bankDetails: z.object({
            name: z.string().min(1, "Account holder name is required"),
            accountNo: z.string().min(9, "Account number must be 9-18 digits").max(18),
            ifsc: z.string().min(11, "IFSC must be 11 characters").max(11)
                .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC format"),
            bankName: z.string().min(1, "Bank name is required"),
            branch: z.string().min(1, "Branch is required"),
            phone: z.string().min(10, "Phone number is required"),
            address: z.string().min(1, "Bank address is required"),
            country: z.string().min(1, "Country is required"),
            state: z.string().min(1, "State is required"),
            city: z.string().min(1, "District is required"),

        })
    })
});

const customLoader = ({ src }: { src: string }) =>
    src.startsWith("http") ? src : `${src}`;

type FormKYCData = z.infer<typeof validationSchema>;

interface KycCreateFormProps {
    onComplete: () => void;
}

export default function KycCreateForm({ onComplete }: KycCreateFormProps) {

    const onError = (err: any) => {
        console.log("error", err);
        const message = err?.response?.data?.message ?? "Something went wrong";
        toast.error(message);
    };
    const onSuccess = (result:any) => {
        console.log('result', result)
        toast.success('✅ KYC request submitted successfully. It will be reviewed shortly.');
        onComplete();
    };

    const { mutate, isPending } = useCreateKyc({ onError, onSuccess });

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        watch,
    } = useForm<FormKYCData>({
        resolver: zodResolver(validationSchema),
        // defaultValues: {
        //   kycData: {
        //     aadharDetails: {
        //       fullName: "",
        //       aadharNo: "",
        //       gender: "",
        //       dob: "",
        //       address: "",
        //       pincode: "",
        //       country: "",
        //       state: "",
        //     },
        //     panDetails: {
        //       name: "",
        //       panNo: "",
        //     },
        //     bankDetails: {
        //       name: "",
        //       accountNo: "",
        //       ifsc: "",
        //       bankName: "",
        //       branch: "",
        //       phone: "",
        //       address: "",
        //       city: "",
        //       country: "",
        //       state: "",
        //     }
        //   }
        // },
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
    const [states, setStates] = useState<IState[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);
    const [bankStates, setBankStates] = useState<IState[]>([]);
    const [bankCities, setBankCities] = useState<ICity[]>([]);

    // Watch for file changes to show validation errors
    const watchedFiles = watch(["aadharImageFront", "aadharImageBack", "panImage", "bankImage"]);

    const onSubmit = (data: FormKYCData) => {
        const formData = new FormData();

        // Append files - all are required for create form
        formData.append('aadharImageFront', data.aadharImageFront);
        formData.append('aadharImageBack', data.aadharImageBack);
        formData.append('panImage', data.panImage);
        formData.append('bankImage', data.bankImage);

        // Append the nested KYC data as JSON
        formData.append('kycData', JSON.stringify(data.kycData));

        console.log("Creating KYC data:", data);
                mutate(formData)

    };

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "aadhaarFront" | "aadhaarBack" | "pan" | "bank"
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            if (type === "aadhaarFront") {
                setAadhaarFront(url);
                setValue("aadharImageFront", file);
            }
            if (type === "aadhaarBack") {
                setAadhaarBack(url);
                setValue("aadharImageBack", file);
            }
            if (type === "pan") {
                setPanImage(url);
                setValue("panImage", file);
            }
            if (type === "bank") {
                setBankImage(url);
                setValue("bankImage", file);
            }
        }
    };

    const handleRemoveImage = (type: "aadhaarFront" | "aadhaarBack" | "pan" | "bank") => {
        if (type === "aadhaarFront") {
            setAadhaarFront(null);
            setValue("aadharImageFront", undefined as any);
        }
        if (type === "aadhaarBack") {
            setAadhaarBack(null);
            setValue("aadharImageBack", undefined as any);
        }
        if (type === "pan") {
            setPanImage(null);
            setValue("panImage", undefined as any);
        }
        if (type === "bank") {
            setBankImage(null);
            setValue("bankImage", undefined as any);
        }
    };

    const renderUploadBox = (
        label: string,
        image: string | null,
        type: "aadhaarFront" | "aadhaarBack" | "pan" | "bank",
        isRequired: boolean = true
    ) => {
        const fieldErrors = {
            aadhaarFront: errors.aadharImageFront,
            aadhaarBack: errors.aadharImageBack,
            pan: errors.panImage,
            bank: errors.bankImage
        };

        return (
            <div className="bg-white shadow rounded-[10px] p-5 border border-[#e9e9e9] flex flex-col gap-4">
                <div className="flex items-center gap-2 font-semibold">
                    <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
                        <FaUpload />
                    </span>
                    {label} {isRequired && <span className="text-red-500">*</span>}
                </div>
                <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleImageUpload(e, type)}
                    className="hidden"
                    id={`${type}-input`}
                />
                <label
                    htmlFor={`${type}-input`}
                    className="cursor-pointer text-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded"
                >
                    Choose File
                </label>
                {fieldErrors[type] && (
                    <p className="text-sm text-red-600">{fieldErrors[type]?.message}</p>
                )}
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
                                onClick={() => handleRemoveImage(type)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                            >
                                <FaTimes />
                            </button>
                        </>
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-400">No Image Uploaded</p>
                            {isRequired && <p className="text-red-500 text-sm">Required</p>}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Aadhaar Section */}
            <h2 className="text-[20px] font-semibold mb-4">Aadhaar Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                    name="kycData.aadharDetails.fullName"
                    label="Full Name"
                    register={register}
                    error={errors.kycData?.aadharDetails?.fullName}
                />

                <TextInput
                    name="kycData.aadharDetails.aadharNo"
                    label="Aadhaar Number"
                    register={register}
                    error={errors.kycData?.aadharDetails?.aadharNo}
                />

                <Controller
                    name="kycData.aadharDetails.gender"
                    control={control}
                    render={({ field }) => (
                        <SelectInput
                            name="kycData.aadharDetails.gender"
                            label="Gender"
                            value={field.value || ""}
                            onChange={field.onChange}
                            options={["Male", "Female", "Other"]}
                            error={errors.kycData?.aadharDetails?.gender}
                        />
                    )}
                />

                <Controller
                    name="kycData.aadharDetails.dob"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <DatePicker
                                selected={dob}
                                onChange={(date) => {
                                    setDob(date);
                                    if (date) field.onChange(date.toISOString().split("T")[0]);
                                }}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select Date"
                                className="mt-1 border border-gray-300 rounded-md px-3 py-2 w-full"
                                maxDate={new Date()}
                            />
                            {errors.kycData?.aadharDetails?.dob && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.kycData.aadharDetails.dob.message}
                                </p>
                            )}
                        </div>
                    )}
                />

                <TextInput
                    name="kycData.aadharDetails.address"
                    label="Address"
                    register={register}
                    error={errors.kycData?.aadharDetails?.address}
                />

                <Controller
                    name="kycData.aadharDetails.country"
                    control={control}
                    render={({ field }) => (
                        <SelectInput
                            name={field.name}
                            label="Country"
                            value={field.value ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const countryName = e.target.value;
                                field.onChange(countryName); // Save country name
                                const selectedCountry = countries.find(c => c.name === countryName);
                                if (selectedCountry) {
                                    setStates(State.getStatesOfCountry(selectedCountry.isoCode));
                                    setValue("kycData.aadharDetails.state", "");
                                }
                            }}
                            options={countries.map(c => c.name)}
                            error={errors.kycData?.aadharDetails?.country}
                        />
                    )}
                />

                <Controller
                    name="kycData.aadharDetails.state"
                    control={control}
                    render={({ field }) => (
                        <SelectInput
                            name={field.name}
                            label="State"
                            value={field.value ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const stateName = e.target.value;
                                field.onChange(stateName); // Save state name
                            }}
                            options={states.map(s => s.name)}
                            error={errors.kycData?.aadharDetails?.state}
                            disabled={!states.length}
                        />
                    )}
                />

                <TextInput
                    name="kycData.aadharDetails.pincode"
                    label="Pin Code"
                    register={register}
                    error={errors.kycData?.aadharDetails?.pincode}
                />
            </div>

            {/* Aadhaar Upload */}
            <h2 className="text-[20px] font-semibold mt-6 mb-4">Upload Aadhaar</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {renderUploadBox(
                    "Upload Aadhaar Front",
                    aadhaarFront,
                    "aadhaarFront",
                    true
                )}
                {renderUploadBox(
                    "Upload Aadhaar Back",
                    aadhaarBack,
                    "aadhaarBack",
                    true
                )}
            </div>

            {/* PAN Section */}
            <h2 className="text-[22px] font-semibold mt-10 mb-4">PAN Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                    name="kycData.panDetails.panNo"
                    label="PAN Number"
                    register={register}
                    error={errors.kycData?.panDetails?.panNo}
                />

                <TextInput
                    name="kycData.panDetails.name"
                    label="Full Name (as per PAN)"
                    register={register}
                    error={errors.kycData?.panDetails?.name}
                />
            </div>
            <div className="mt-4">
                {renderUploadBox(
                    "Upload PAN Card",
                    panImage,
                    "pan",
                    true
                )}
            </div>

            {/* Bank Section */}
            <h2 className="text-[22px] font-semibold mt-10 mb-4">Bank Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <TextInput
                    name="kycData.bankDetails.name"
                    label="Account Holder Name"
                    register={register}
                    error={errors.kycData?.bankDetails?.name}
                />

                <TextInput
                    name="kycData.bankDetails.accountNo"
                    label="Account Number"
                    register={register}
                    error={errors.kycData?.bankDetails?.accountNo}
                />

                <TextInput
                    name="kycData.bankDetails.ifsc"
                    label="IFSC Code"
                    register={register}
                    error={errors.kycData?.bankDetails?.ifsc}
                />

                <TextInput
                    name="kycData.bankDetails.bankName"
                    label="Bank Name"
                    register={register}
                    error={errors.kycData?.bankDetails?.bankName}
                />

                <TextInput
                    name="kycData.bankDetails.branch"
                    label="Branch"
                    register={register}
                    error={errors.kycData?.bankDetails?.branch}
                />

                <TextInput
                    name="kycData.bankDetails.phone"
                    label="Phone Number"
                    register={register}
                    error={errors.kycData?.bankDetails?.phone}
                />

                <TextInput
                    name="kycData.bankDetails.address"
                    label="Bank Address"
                    register={register}
                    error={errors.kycData?.bankDetails?.address}
                />

                <Controller
                    name="kycData.bankDetails.country"
                    control={control}
                    render={({ field }) => (
                        <SelectInput
                            name={field.name}
                            label="Country"
                            value={field.value ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const countryName = e.target.value;
                                field.onChange(countryName); // Save country name
                                const selectedCountry = countries.find(c => c.name === countryName);
                                if (selectedCountry) {
                                    setBankStates(State.getStatesOfCountry(selectedCountry.isoCode));
                                    setValue("kycData.bankDetails.state", "");
                                    setBankCities([]);
                                    setValue("kycData.bankDetails.city", "");
                                }
                            }}
                            options={countries.map(c => c.name)}
                            error={errors.kycData?.bankDetails?.country}
                        />
                    )}
                />

                <Controller
                    name="kycData.bankDetails.state"
                    control={control}
                    render={({ field }) => (
                        <SelectInput
                            name={field.name}
                            label="State"
                            value={field.value ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const stateName = e.target.value;
                                field.onChange(stateName); // Save state name
                                const selectedState = bankStates.find(s => s.name === stateName);
                                if (selectedState) {
                                    const selectedCountry = countries.find(c => c.name === watch("kycData.bankDetails.country"));
                                    if (selectedCountry) {
                                        const citiesList = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode) || [];
                                        setBankCities(citiesList);
                                        setValue("kycData.bankDetails.city", "");
                                    }
                                } else {
                                    setBankCities([]);
                                    setValue("kycData.bankDetails.city", "");
                                }
                            }}
                            options={bankStates.map(s => s.name)}
                            error={errors.kycData?.bankDetails?.state}
                            disabled={!bankStates.length}
                        />
                    )}
                />

                <Controller
                    name="kycData.bankDetails.city"
                    control={control}
                    render={({ field }) => (
                        <SelectInput
                            name={field.name}
                            label="City"
                            value={field.value ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const cityName = e.target.value;
                                field.onChange(cityName); // Save city name
                            }}
                            options={bankCities.map(c => c.name)}
                            error={errors.kycData?.bankDetails?.city}
                            disabled={!bankCities.length}
                        />
                    )}
                />
            </div>

            {/* Bank Proof Upload */}
            <div className="mt-4">
                {renderUploadBox(
                    "Upload Bank Proof (Passbook/Cheque)",
                    bankImage,
                    "bank",
                    true
                )}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end gap-3">
                <LoaderButton
                    type="button"
                    text="Cancel"
                    onClick={onComplete}
                    className="border border-white transition disabled:opacity-50 disabled:cursor-not-allowed bg-red-700 text-white px-6 py-2 rounded-[5px] hover:bg-red-800 font-semibold cursor-pointer"
                />
                <LoaderButton
                    type="submit"
                    text="Create KYC"
                    loading={isPending}
                    className="border border-white transition disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
                />
            </div>

            {/* Fullscreen Image Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="relative max-w-3xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={previewImage}
                            alt="Preview"
                            width={800}
                            height={600}
                            className="mx-auto rounded-lg shadow-lg object-contain"
                            loader={customLoader}
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