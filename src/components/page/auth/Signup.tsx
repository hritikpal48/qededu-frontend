"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchemaType, signSchema } from "@/validations/auth";
import TextInput from "@/components/ui/input/TextInput";
import PasswordInputField from "@/components/ui/input/PasswordInput";
import { LoaderButton } from "@/components/ui/button";
import Link from "next/link";
import Checkbox from "@/components/ui/input/CheckboxInput";
import PhoneNumberInput from "@/components/ui/input/PhoneInput";
import { useSignUp } from "@/services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset
  } = useForm<signupSchemaType>({
    resolver: zodResolver(signSchema),
  });
  const onError = (err: any) => {
    const message = err?.response?.data?.message ?? 'Resend OTP failed';
    toast.error(message)
  };
  const onSuccess = () => {
    toast.success('Please verify your email address')
    const email = getValues('email');
    router.push(`/auth/otp_verification?email=${email}`);
    reset()
  }
  const { mutate, isPending } = useSignUp({ onError, onSuccess })
  const onSubmit = async (data: signupSchemaType) => {
    mutate({ ...data, countryCode: "" })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex items-center justify-center bg-[#F7F7F7] px-4"
    >
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500">
          Join us and get started!
        </p>

        <div className="space-y-4">
          <TextInput
            label="First name"
            name="fname"
            register={register}
            error={errors?.fname}
          />
          <TextInput
            label="Last name"
            name="lname"
            register={register}
            error={errors?.lname}
          />
          <TextInput
            label="Email"
            name="email"
            register={register}
            error={errors?.email}
          />
          <PhoneNumberInput
            label="Phone number"
            name="phoneNumber"
            register={register}
            error={errors?.phoneNumber}
            control={control}
          />
          <PasswordInputField
            label="Password"
            name="password"
            register={register}
            error={errors?.password}
          />
          <Checkbox
            type="checkbox"
            label="Term & conditions"
            name="term_and_conditions"
            register={register}
            error={errors?.term_and_conditions}
          />
        </div>

        <LoaderButton
          text="Sign Up"
          type="submit"
          loading={isPending}
          className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-300"
        />

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
