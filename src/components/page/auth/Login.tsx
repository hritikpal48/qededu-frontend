"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/validations/auth";
import TextInput from "@/components/ui/input/TextInput";
import PasswordInputField from "@/components/ui/input/PasswordInput";
import { LoaderButton } from "@/components/ui/button";
import Link from "next/link";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    console.log("Validated Data", data);
  };

  return (
    // <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    // >
    //     <h2 className="text-2xl font-bold text-center">Login</h2>
    //     <TextInput label="Email" name="email" error={errors?.email} register={register} />
    //     <PasswordInputField label="Password" name="password" error={errors?.password} register={register} />
    //     <LoaderButton text="Login" type="submit" loading={isSubmitting} className="w-full" />
    // </form>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex items-center justify-center bg-[#F7F7F7] px-4 sm:px-6 md:px-8"
    >
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-1">
          Welcome Back
        </h2>
        <p className="text-sm sm:text-base text-center text-gray-500">
          Please enter your login details
        </p>

        <div className="space-y-4">
          <TextInput
            label="Email"
            name="email"
            error={errors?.email}
            register={register}
          />
          <PasswordInputField
            label="Password"
            name="password"
            error={errors?.password}
            register={register}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 gap-2 sm:gap-0">
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox rounded text-green-600"
            />
            <span>Remember me</span>
          </label>
          <Link href="#" className="text-green-600 hover:underline text-right">
            Forgot password?
          </Link>
        </div>

        <LoaderButton
          text="Login"
          type="submit"
          loading={isSubmitting}
          className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-300"
        />

        <p className="text-sm sm:text-base text-center text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-green-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
