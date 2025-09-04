import React from "react";
import { ChartRange } from "@/types/myshareType";

type TimeRangeSelectorProps = {
  selected: ChartRange;
  onSelect: (range: ChartRange) => void;
};

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selected,
  onSelect,
}) => {
  const ranges: { label: string; value: ChartRange }[] = [
    { label: "1M", value: ChartRange.ONE_MONTH },
    { label: "6M", value: ChartRange.SIX_MONTHS },
    { label: "1Y", value: ChartRange.ONE_YEAR },
    { label: "Max", value: ChartRange.MAX },
  ];

  return (
    <div className="flex gap-2 mt-4">
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => onSelect(r.value)}
          className={`border px-2 py-1 rounded text-sm transition ${
            selected === r.value ? "bg-green-600 text-white" : "hover:bg-green-100"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
};
