// components/ui/TextAreaInput.tsx
import { FieldError } from "react-hook-form";
import { generateUniqueId } from "@/utils/generateUniqueId";

type TextAreaInputProps = {
  id?: string;
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  error?: FieldError;
  register?: any;
  className?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextAreaInput({
  id = generateUniqueId(),
  name,
  label,
  placeholder = "",
  rows = 4,
  error,
  register,
  className = "",
  disabled = false,
  onChange,
}: TextAreaInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-bold text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...register?.(name)}
        disabled={disabled}
        onChange={onChange}
        className={`mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-green-400 ${
          disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : ""
        }`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error?.message}</p>}
    </div>
  );
}
