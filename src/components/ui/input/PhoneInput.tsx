// components/ui/InputField.tsx
import { FieldError, Controller } from "react-hook-form";
import { generateUniqueId } from "@/utils/generateUniqueId";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';

type InputFieldProps = {
    id?: string;
    name: string;
    label: string;
    error?: FieldError;
    register?: any;
    className?: string;
    control: any
};

export default function PhoneNumberInput({
    id = generateUniqueId(),
    name,
    label,
    error,
    register,
    className = "",
    control
}: InputFieldProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <PhoneInput
                        value={value}
                        onChange={onChange}
                        error={error?.message}
                        defaultCountry="IN"
                        {...register}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        numberInputProps={{
                            className:"focus:outline-none"
                        }}
                    />
                )}
            />

            {error && <p className="text-sm text-red-500 mt-1">{error?.message}</p>}
        </div>
    );
}
