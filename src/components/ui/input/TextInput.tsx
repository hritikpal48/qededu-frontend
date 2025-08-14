// components/ui/InputField.tsx
import { FieldError } from "react-hook-form";
import { generateUniqueId } from "@/utils/generateUniqueId";
type InputFieldProps = {
    id?: string;
    name: string;
    label: string;
    type?: string;
    error?: FieldError;
    register: any;
    className?: string;
};

export default function TextInput({
    id = generateUniqueId(),
    name,
    label,
    type = "text",
    error,
    register,
    className = "",
}: InputFieldProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                {...register(name)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-green-400"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error?.message}</p>}
        </div>
    );
}