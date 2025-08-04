"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/validations/auth";
import TextInput from "@/components/ui/input/TextInput";
import { LoaderButton } from "@/components/ui/button";
import Link from "next/link";
import { useLogin, useSendOtp } from "@/services/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [otpStatus, setOtpStatus] = useState(false);
  const { mutate: loginMutate, isPending: isLoginPendding } = useLogin({
    onError: (err: any) => {
      const message = err?.response?.data?.message ?? 'Login failed';
      setError('email', {
        message
      });
    },
    onSuccess: (data: any) => {
      router.push('/user/dashboard')
    }
  });
  const { mutate: sendOtpMutate, isPending: isSendPendding } = useSendOtp({
    onError: (err: any) => {
      const message = err?.response?.data?.message ?? 'Otp send failed try again.';
      setError('email', message);
    },
    onSuccess: () => setOtpStatus(true)
  })
  const onSubmit = async (data: LoginSchemaType) => loginMutate(data)
  const hanndeSendOtp = () => sendOtpMutate(getValues('email'));
  return (
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
          {otpStatus && (
            <TextInput
              label="OTP"
              name="otp"
              error={errors?.otp}
              register={register}
            />
          )}
        </div>
        {otpStatus && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 gap-2 sm:gap-0">
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox rounded text-green-600"
              />
              <span>Remember me</span>
            </label>
          </div>
        )}
        <LoaderButton
          text={otpStatus ? "Resend OTP" : "Get OTP"}
          type="button"
          loading={isSendPendding}
          className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-300"
          onClick={hanndeSendOtp}
        />
        {otpStatus && (
          <LoaderButton
            text="Login"
            type="submit"
            loading={isLoginPendding}
            className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-300"
          />
        )}
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
