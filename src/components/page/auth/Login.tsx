"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/validations/auth";
import TextInput from "@/components/ui/input/TextInput";
import { LoaderButton } from "@/components/ui/button";
import Link from "next/link";
import { useLogin } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import PasswordInputField from "@/components/ui/input/PasswordInput";
import toast from "react-hot-toast";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const onError = (err: any) => {
    const message = err?.response?.data?.message ?? 'Resend OTP failed';
    toast.error(message)
  }
  const onSuccess = () => {
    toast.success('Login succesfully')
    router.push('/user/dashboard');
    reset();
  }
  const { mutate: loginMutate, isPending: isLoginPendding } = useLogin({ onError, onSuccess });
  const onSubmit = async (data: LoginSchemaType) => loginMutate(data)
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
          <PasswordInputField
            label="Password"
            name="password"
            error={errors?.password}
            register={register}
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 gap-2 sm:gap-0">
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox rounded text-green-600"
              />
              <span>Remember me</span>
            </label>
          </div>
          <LoaderButton
            text="Login"
            type="submit"
            loading={isLoginPendding}
            className="w-full bg-green-600 text-white "
          />
        </div>
        <p className="text-sm sm:text-base text-center text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-green-600 hover:text-green-700 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
