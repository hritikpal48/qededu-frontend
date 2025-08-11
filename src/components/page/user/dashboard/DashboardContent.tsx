"use client";

import { FaArrowDown, FaUpload } from "react-icons/fa";
import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";

type TabKey =
  | "profile"
  | "portfolio"
  | "transactions"
  | "external"
  | "myshare"
  | "kyc";

interface DashboardContentProps {
  activeTab: TabKey;
  formData: {
    fullName: string;
    email: string;
    dob: string;
    phone: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      dob: string;
      phone: string;
    }>
  >;
}

export default function DashboardContent({
  activeTab,
  formData,
  setFormData,
}: DashboardContentProps) {
  return (
    <section className="flex-1 p-6">
      <div className="bg-[#d1efcf] border border-[#badbb8] text-green-700 px-4 py-3 rounded mb-6 text-sm flex justify-between items-center">
        <div className="flex align-center gap-1">
          <span>
            <IoShieldCheckmarkSharp className="mt-1" />
          </span>
          Kindly complete your KYC to continue.
        </div>
        <div className="flex align-center gap-1">
          <span>
            <MdAccessTime className="mt-1" />
          </span>
          It will only take a few minutes
        </div>
      </div>

      {activeTab === "profile" && (
        <>
          <h2 className="text-[22px] font-semibold mb-4">My Profile</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={formData.email}
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
                disabled
              />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-[22px] font-semibold mb-4">My Documents</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {["PAN", "CMR"].map((doc) => (
                <div
                  key={doc}
                  className="bg-white shadow border-[#e4e8eb] rounded-[10px] p-5 border flex flex-col gap-4"
                >
                  <div className="flex items-center gap-2 text-[#000] font-semibold">
                    <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
                      <FaUpload />
                    </span>
                    {doc}
                  </div>
                  <input
                    type="file"
                    className="border border-[#f4f5f7] rounded-[8px] bg-[#f4f5f7] px-4 py-2 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-right">
            <button className="bg-green-600 text-white px-6 py-2 rounded-[14px] hover:bg-green-700 cursor-pointer">
              Save Changes
            </button>
          </div>
        </>
      )}

      {activeTab === "portfolio" && (
        <div>
          <h2 className="text-[22px] font-semibold mb-4">My Portfolio</h2>

          {/* Summary box */}
          <div className="bg-[#f8fff7] text-sm text-gray-700 border border-[#f8fff7] rounded-lg mb-6 p-4 flex flex-col sm:flex-row gap-6 sm:justify-between">
            <div>
              <p className="text-gray-500">Total Investments</p>
              <p className="text-lg font-semibold">0.00</p>
            </div>
            <div>
              <p className="text-gray-500">Current Value</p>
              <p className="text-lg font-semibold">0.00</p>
            </div>
            <div>
              <p className="text-gray-500">Total P&L</p>
              <p className="text-lg font-semibold text-green-600">0.00 (0%)</p>
            </div>
          </div>

          {/* Current Investments */}
          <h3 className="text-lg font-medium mb-2">Current Investments</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-left border-t border-gray-200">
              <thead className="bg-white text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-2">Name of Share</th>
                  <th className="px-4 py-2">Qty.</th>
                  <th className="px-4 py-2">Avg. Price (₹)</th>
                  <th className="px-4 py-2">Cur. Price (₹)</th>
                  <th className="px-4 py-2">Total Investment (₹)</th>
                  <th className="px-4 py-2">Cur. Value (₹)</th>
                  <th className="px-4 py-2">P&L</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Empty state row */}
                <tr className="text-gray-400">
                  <td className="px-4 py-3" colSpan={8}>
                    No investments found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* External Investments */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">External Investments</h3>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium">
              + Add External Share
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-t border-gray-200">
              <thead className="bg-white text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Qty.</th>
                  <th className="px-4 py-2">Avg. Price (₹)</th>
                  <th className="px-4 py-2">Current Price (₹)</th>
                  <th className="px-4 py-2">Investment (₹)</th>
                  <th className="px-4 py-2">Current Value (₹)</th>
                  <th className="px-4 py-2">P&L</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Empty state row */}
                <tr className="text-gray-400">
                  <td className="px-4 py-3" colSpan={8}>
                    No external investments found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "transactions" && (
        <div>
          <h2 className="text-[22px] font-semibold mb-4">Transactions</h2>

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
              <button className="bg-blue-900 hover:bg-blue-800 text-white p-2 rounded cursor-pointer">
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
        </div>
      )}

      {activeTab === "external" && (
        <div>
          <h2 className="text-[22px] font-semibold mb-4">
            External Transactions
          </h2>
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
              <button className="bg-blue-900 hover:bg-blue-800 text-white p-2 rounded cursor-pointer">
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
        </div>
      )}

      {activeTab === "kyc" && (
        <>
          {/* Aadhaar Section */}
          <h2 className="text-[22px] font-semibold mb-4">Aadhaar Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Gender</label>
              <select className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                placeholder="Enter State"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Pin Code</label>
              <input
                type="text"
                placeholder="Enter Pin Code"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                placeholder="Enter Country"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
          </div>

          {/* Aadhaar Upload */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow border-[#e4e8eb] rounded-[10px] p-5 border flex flex-col gap-4">
              <div className="flex items-center gap-2 font-semibold">
                <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
                  <FaUpload />
                </span>
                Upload Front Photo
              </div>
              <input
                type="file"
                className="border border-[#f4f5f7] rounded-[8px] bg-[#f4f5f7] px-4 py-2 cursor-pointer"
              />
            </div>
            <div className="bg-white shadow border-[#e4e8eb] rounded-[10px] p-5 border flex flex-col gap-4">
              <div className="flex items-center gap-2 font-semibold">
                <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
                  <FaUpload />
                </span>
                Upload Back Photo
              </div>
              <input
                type="file"
                className="border border-[#f4f5f7] rounded-[8px] bg-[#f4f5f7] px-4 py-2 cursor-pointer"
              />
            </div>
          </div>

          {/* PAN Section */}
          <h2 className="text-[22px] font-semibold mt-10 mb-4">PAN Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>PAN Number</label>
              <input
                type="text"
                placeholder="Enter PAN Number"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
          </div>

          {/* PAN Upload */}
          <div className="mt-6 bg-white shadow border-[#e4e8eb] rounded-[10px] p-5 border flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
                <FaUpload />
              </span>
              Upload PAN Image
            </div>
            <input
              type="file"
              className="border border-[#f4f5f7] rounded-[8px] bg-[#f4f5f7] px-4 py-2 cursor-pointer"
            />
          </div>

          {/* Bank Section */}
          <h2 className="text-[22px] font-semibold mt-10 mb-4">Bank Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Account Name</label>
              <input
                type="text"
                placeholder="Enter Account Name"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Account Number</label>
              <input
                type="text"
                placeholder="Enter Account Number"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>IFSC Code</label>
              <input
                type="text"
                placeholder="Enter IFSC Code"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Bank Name</label>
              <input
                type="text"
                placeholder="Enter Bank Name"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Branch</label>
              <input
                type="text"
                placeholder="Enter Branch"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>District</label>
              <input
                type="text"
                placeholder="Enter District"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                placeholder="Enter State"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                placeholder="Enter Country"
                className="border border-[#dee2e6] rounded-[8px] px-[15px] py-[12px] w-full mt-2"
              />
            </div>
          </div>

          {/* Bank Upload */}
          <div className="mt-6 bg-white shadow border-[#e4e8eb] rounded-[10px] p-5 border flex flex-col gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="p-3 text-[14px] rounded-[10px] bg-green-600 text-white">
                <FaUpload />
              </span>
              Upload Bank Proof Image
            </div>
            <input
              type="file"
              className="border border-[#f4f5f7] rounded-[8px] bg-[#f4f5f7] px-4 py-2 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-right">
            <button className="bg-green-600 text-white px-6 py-2 rounded-[14px] hover:bg-green-700 cursor-pointer">
              Save Changes
            </button>
          </div>
        </>
      )}

      {activeTab === "myshare" && (
        <>
          <h2 className="text-[22px] font-semibold mb-4">My Share</h2>

          {/* Table */}
          <div className="overflow-x-auto border-t border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-white text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Transaction Date</th>
                  <th className="px-4 py-2">Total (₹)</th>
                  <th className="px-4 py-2">
                    <button>Details</button>
                  </th>
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
      )}
    </section>
  );
}
