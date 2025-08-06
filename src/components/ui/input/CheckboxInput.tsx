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

export default function Checkbox({
    id = generateUniqueId(),
    name,
    label,
    error,
    register,
    className = "",
}: InputFieldProps) {
    return (
        <div className={className}>
            <div className="w-full flex items-center gap-2">
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <input
                    id={id}
                    type='checkbox'
                    {...register(name)}
                    className=""
                />
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error?.message}</p>}
        </div>
    );
}