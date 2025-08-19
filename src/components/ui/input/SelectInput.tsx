import { FieldError } from "react-hook-form";

type SelectInputProps = {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  valueMap?: Record<string, string>; // Maps display names to values
  error?: FieldError;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function SelectInput({
  name,
  label,
  value,
  onChange,
  options,
  valueMap,
  error,
  className = "",
  disabled = false,
  required = false,
}: SelectInputProps) {
  // For valueMap, we need to find the display name for the stored value
  // The value coming from form is the mapped value (e.g., "IN" for India)
  // We need to show "India" in the select but the value should be "IN"
  const displayValue = valueMap 
    ? Object.keys(valueMap).find(key => valueMap[key] === value) || value
    : value;

  return (
    <div className={className}>
      <label htmlFor={name} className="block font-bold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={displayValue}
        onChange={(e) => {
          // Create a new event with the correct value
          const actualValue = valueMap ? valueMap[e.target.value] : e.target.value;
          const newEvent = {
            ...e,
            target: {
              ...e.target,
              value: actualValue
            }
          } as React.ChangeEvent<HTMLSelectElement>;
          onChange(newEvent);
        }}
        disabled={disabled}
        className={`mt-1 block w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-green-400 ${
          disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : ""
        }`}
        aria-invalid={error ? "true" : "false"}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option 
            key={option} 
            value={option} // The option value should be the display name
          >
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}