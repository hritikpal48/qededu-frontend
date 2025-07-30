// components/ui/PasswordInputField.tsx
import { useState } from "react";
import { FieldError } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { generateUniqueId } from "@/utils/generateUniqueId";

type PasswordInputFieldProps = {
    id?: string;
    name: string;
    label: string;
    register: any;
    error?: FieldError;
    className?: string;
};

export default function PasswordInputField({
    id = generateUniqueId(),
    name,
    label,
    register,
    error,
    className = "",
}: PasswordInputFieldProps) {
    const [show, setShow] = useState(false);

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <div className="relative mt-1">
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    {...register(name)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring focus:border-blue-400"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                    tabIndex={-1}
                >
                    {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
            </div>

            {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
        </div>
    );
}
