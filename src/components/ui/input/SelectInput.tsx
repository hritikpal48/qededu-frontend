type SelectInputProps = {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    className?: string;
  };
  
  export default function SelectInput({
    name,
    label,
    value,
    onChange,
    options,
    className = "",
  }: SelectInputProps) {
    return (
      <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2 focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
  