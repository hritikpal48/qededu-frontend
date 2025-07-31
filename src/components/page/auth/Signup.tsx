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
            label="Email"
            name="email"
            register={register}
            error={errors?.email}
          />
          <PasswordInputField
            label="Password"
            name="password"
            register={register}
            error={errors?.password}
          />
        </div>

        <LoaderButton
          text="Sign Up"
          type="submit"
          loading={isSubmitting}
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
