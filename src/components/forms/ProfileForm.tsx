import React, { useState } from "react";
import TextInput from "../ui/input/TextInput";
import DatePicker from "react-datepicker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "@/services/user.service";
import "react-datepicker/dist/react-datepicker.css";
import { DefaultButton, LoaderButton } from "../ui/button";

const validationSchema = z.object({
  fname: z.string().min(1, "First name is required."),
  lname: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email."),
  phoneNumber: z.string().min(10, "Phone number is required."), // simplified for intl
  dob: z.string().min(1, "Date of birth is required."),
});

type FormData = z.infer<typeof validationSchema>;

const ProfileEditForm = ({
  defaultValues,
  onComplete,
}: {
  defaultValues: FormData;
  onComplete: () => void;
}) => {

    
  const onError = (err: any) => {
    const message = err?.response?.data?.message ?? "Update failed";
    toast.error(message);
  };

  const onSuccess = (token: string | undefined) => {
    toast.success("Updated successfully");
    onComplete();
    reset();
  };

  const { mutate: updateMutate, isPending: isLoginPendding } = useUpdateProfile(
    {
      onError,
      onSuccess,
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      ...defaultValues,
      dob: defaultValues.dob || new Date().toISOString().split("T")[0],
    },
  });

  // Convert dob string to Date object for the DatePicker
  const [dobDate, setDobDate] = useState<Date | null>(
    defaultValues.dob ? new Date(defaultValues.dob) : null
  );

const onSubmit = (data: FormData) => {
  const { email, ...cleanData } = data;
  updateMutate(cleanData);
};

  return (
    <form id="profileEditForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-2 gap-4">
        <TextInput
          name="fname"
          label="First Name"
          type="text"
          className="mt-2"
          register={register}
          error={errors.fname}
        />

        <TextInput
          name="lname"
          label="Last Name"
          type="text"
          className="mt-2"
          register={register}
          error={errors.lname}
        />

        <TextInput
          name="email"
          label="Email"
          type="email"
          className="mt-2"
          register={register}
          error={errors.email}
          disabled // if email shouldn't be editable
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mt-2">
            Date of Birth
          </label>
          <DatePicker
            selected={dobDate}
            onChange={(date: Date | null) => {
              setDobDate(date); // Update local state
              if (date) {
                const dateString = date.toISOString().split("T")[0];
                setValue("dob", dateString, { shouldValidate: true });
              }
            }}
            isClearable={false}
            className="mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-green-400 w-full"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date of Birth"
          />
          {errors.dob && (
            <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
          )}
        </div>

        <TextInput
          name="phoneNumber"
          label="Phone Number"
          type="text"
          className="mt-2"
          register={register}
          error={errors.phoneNumber}
        />

        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
          <LoaderButton
            type="button"
            text="Cancel"
            onClick={onComplete}
            className="bg-red-700 text-white px-6 py-2 rounded-[5px] hover:bg-red-800 mr-2 font-semibold cursor-pointer"
          />
          <LoaderButton
            type="submit"
            text={isLoginPendding ? "Saving..." : "Save Changes"}
            className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
          />
        </div>
      </div>
    </form>
  );
};

export default ProfileEditForm;
