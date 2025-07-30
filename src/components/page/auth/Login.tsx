"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/validations/auth";
import TextInput from "@/components/ui/input/TextInput";
import PasswordInputField from "@/components/ui/input/PasswordInput";
import { LoaderButton } from "@/components/ui/button";
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
            className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
        >
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <TextInput label="Email" name="email" error={errors?.email} register={register} />
            <PasswordInputField label="Password" name="password" error={errors?.password} register={register} />
            <LoaderButton text="Login" type="submit" loading={isSubmitting} className="w-full" />
        </form>
    );
}
