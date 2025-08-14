"use client";
import { FaUpload } from "react-icons/fa";
import { useForm } from "react-hook-form";
import TextInput from "@/components/ui/input/TextInput";

export default function ProfileTab({ formData, setFormData }) {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    setFormData(data); // sync local state with form data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-[22px] font-semibold mb-4">My Profile</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput
          name="fullName"
          label="Full Name"
          type="text"
          className="mt-2"
          register={register}
          error={errors.fullName}
        />

        <TextInput
          name="email"
          label="Email"
          type="email"
          className="mt-2"
          register={register}
          error={errors.email}
        />

        <TextInput
          name="dob"
          label="Date of Birth"
          type="date"
          className="mt-2"
          register={register}
          error={errors.dob}
        />

        <TextInput
          name="phone"
          label="Phone Number"
          type="text"
          className="mt-2"
          register={register}
          error={errors.phone}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-[22px] font-semibold mb-4">My Documents</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {["PAN", "CMR"].map((doc) => (
            <div
              key={doc}
              className="bg-white shadow border-[#e4e8eb] rounded-[10px] p-5 border flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-[#000] font-semibold">
                <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
                  <FaUpload />
                </span>
                {doc}
              </div>
              <input
                type="file"
                className="border border-[#f4f5f7] rounded-[8px] bg-[#f4f5f7] px-4 py-2 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-right">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-[14px] hover:bg-green-700 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
