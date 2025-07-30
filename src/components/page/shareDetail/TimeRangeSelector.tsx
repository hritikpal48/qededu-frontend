export const TimeRangeSelector = () => (
    <div className="flex gap-2 mt-4">
      {['1M', '6M', '1Y', '3Y', '5Y', 'Max'].map(label => (
        <button key={label} className="border px-2 py-1 rounded text-sm hover:bg-green-100">
          {label}
        </button>
      ))}
    </div>
  );