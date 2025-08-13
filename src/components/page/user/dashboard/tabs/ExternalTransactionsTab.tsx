import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";

export default function ExternalTransactionsTab() {
  return (
    <>
      <h2 className="text-[22px] font-semibold mb-4">External Transactions</h2>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          placeholder="Company name"
          className="border border-[#dee2e6] px-3 py-2 rounded w-full text-sm"
        />
        <select className="border border-[#dee2e6] px-3 py-2 rounded w-full text-sm text-gray-500">
          <option>Select Transaction Type</option>
          <option>Buy</option>
          <option>Sell</option>
          <option>Transfer</option>
        </select>
        <input
          type="date"
          placeholder="From Date"
          className="border border-[#dee2e6] px-3 py-2 rounded w-full text-sm"
        />
        <input
          type="date"
          placeholder="To Date"
          className="border border-[#dee2e6] px-3 py-2 rounded w-full text-sm"
        />
        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2">
          <button className="bg-green-900 hover:bg-green-800 text-white p-2 rounded cursor-pointer">
            <FaArrowDownLong />
          </button>
          <button className="bg-green-600 hover:bg-green-500 text-white p-2 rounded cursor-pointer">
            <FaArrowRightLong />
          </button>
          <button className="bg-red-600 hover:bg-red-500 text-white p-2 rounded cursor-pointer">
            <IoMdRefresh />
          </button>
        </div>
      </div>

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
            {/* Empty row */}
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
        <button className="text-gray-400 bg-gray-100 px-3 py-1 rounded">
          ◀
        </button>
      </div>
    </>
  );
}
