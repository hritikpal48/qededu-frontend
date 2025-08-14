"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import SelectInput from "@/components/ui/input/SelectInput";
import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import TextInput from "@/components/ui/input/TextInput";

type FormValues = {
  company: string;
  transactionType: string;
  fromDate: string;
  toDate: string;
};

export default function TransactionsTab() {
  const { register, handleSubmit, watch, reset } = useForm<FormValues>({
    defaultValues: {
      company: "",
      transactionType: "",
      fromDate: "",
      toDate: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div>
      <h2 className="text-[22px] font-semibold mb-4">Transactions</h2>

      {/* Filters */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4"
      >
        <TextInput
          name="company"
          label="Company"
          type="text"
          register={register}
        />

        <SelectInput
          name="transactionType"
          label="Transaction Type"
          value={watch("transactionType")}
          onChange={(e) => {
            const value = e.target.value;
            register("transactionType").onChange({ target: { value } } as any);
          }}
          options={["Buy", "Sell", "Transfer"]}
        />

        <TextInput
          name="fromDate"
          label="From Date"
          type="date"
          register={register}
        />

        <TextInput
          name="toDate"
          label="To Date"
          type="date"
          register={register}
        />

        {/* Action buttons */}
        <div className="flex items-end justify-end gap-2">
          <button
            type="submit"
            className="bg-green-900 hover:bg-green-800 text-white p-2 rounded cursor-pointer"
          >
            <FaArrowDownLong />
          </button>
          <button
            type="button"
            onClick={() => console.log("Apply filter")}
            className="bg-green-600 hover:bg-green-500 text-white p-2 rounded cursor-pointer"
          >
            <FaArrowRightLong />
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-red-600 hover:bg-red-500 text-white p-2 rounded cursor-pointer"
          >
            <IoMdRefresh />
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto border-t border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-white text-gray-700 font-medium">
            <tr>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Transaction Date</th>
              <th className="px-4 py-2">Price (₹)</th>
              <th className="px-4 py-2">Total (₹)</th>
              <th className="px-4 py-2">Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-400 text-center">
              <td className="px-4 py-3" colSpan={7}>
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <select className="border border-[#dee2e6] rounded px-2 py-1 text-sm">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          Showing no records
        </div>
        <button className="text-gray-400 bg-gray-100 px-3 py-1 rounded">◀</button>
      </div>
    </div>
  );
}
