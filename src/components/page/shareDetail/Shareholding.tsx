"use client";
import { FaLinkedin } from "react-icons/fa";

// Shareholding Pattern Component
export const ShareholdingPattern = () => (
  <div className="mt-10">
    <h2 className="text-base font-semibold mb-2">Shareholding Pattern</h2>
    <div className="bg-white p-4 border border-[#e8e8e8] rounded-md">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>Promoters</span>
        <span>85.56%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full mb-4">
        <div className="bg-green-600 h-3 rounded-full w-[85.56%]"></div>
      </div>
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>Others</span>
        <span>14.44%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full">
        <div className="bg-yellow-500 h-3 rounded-full w-[14.44%]"></div>
      </div>
    </div>
  </div>
);

// Events Table Component
const events = [
  {
    name: "Buyback",
    detail: "AV Thomas Has Announced Buyback at Rs. 17000/Share",
    date: "09/02/2024",
  },
  {
    name: "Dividend",
    detail: "AV Thomas Has Given Final Dividend of INR 150/share",
    date: "30/05/2023",
  },
  {
    name: "Buyback",
    detail: "AV Thomas Has Announced Buyback at INR 13500/Share",
    date: "15/09/2022",
  },
  { name: "Dividend", detail: "", date: "30/07/2022" },
];

export const EventsTable = () => (
  <div className="mt-10">
    <h2 className="text-base font-semibold mb-2">Events</h2>
    <div className="overflow-x-auto border border-[#e8e8e8] rounded-md h-44">
      <table className="min-w-full text-sm overflow-auto">
        <thead className="bg-[#D5D5D5] text-left border-[#e8e8e8]">
          <tr>
            <th className="px-4 py-2 font-bold text-gray-500">Name</th>
            <th className="px-4 py-2 font-bold text-gray-500">Date</th>
            <th className="px-4 py-2 font-bold text-gray-500">Details</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {events.map((item, idx) => (
            <tr key={idx} className="border-t border-[#e8e8e8]">
              <td className="px-4 py-2 text-gray-700">{item.name}</td>
              <td className="px-4 py-2 text-gray-600">{item.date}</td>
              <td className="px-4 py-2 text-gray-600">{item.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Promoters Table Component
const promoters = [
  {
    name: "Mr. Ajit Thomas",
    role: "Executive Chairman",
    exp: "35 Yrs",
    linkedin: "#",
  },
  {
    name: "Mr. Dilip Thomas",
    role: "Executive Vice-Chairman",
    exp: "35 Yrs",
    linkedin: "#",
  },
];

export const PromotersTable = () => (
  <div className="mt-10">
    <h2 className="text-base font-semibold mb-2">Promoters or Management</h2>
    <div className="overflow-x-auto border-[#e8e8e8] border rounded-md">
      <table className="min-w-full text-sm">
        <thead className="bg-[#D5D5D5] text-left">
          <tr>
            <th className="px-4 py-2 font-bold text-gray-500">Name</th>
            <th className="px-4 py-2 font-bold text-gray-500">Designation</th>
            <th className="px-4 py-2 font-bold text-gray-500">Experience</th>
            <th className="px-4 py-2 font-bold text-gray-500">LinkedIn</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {promoters.map((person, idx) => (
            <tr key={idx} className="border-t border-[#e8e8e8]">
              <td className="px-4 py-2 text-gray-700">{person.name}</td>
              <td className="px-4 py-2 text-gray-600">{person.role}</td>
              <td className="px-4 py-2 text-gray-600">{person.exp}</td>
              <td className="px-4 py-2">
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600"
                >
                  <FaLinkedin size={18} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Download Section Component
export const DownloadSection = () => (
  <div className="mt-10">
    <h2 className="text-base font-semibold mb-2">Download</h2>
    <div className="border border-[#e8e8e8] p-4 rounded-md bg-white flex flex-wrap gap-4 items-center">
      <select className="border border-[#d7d7d7] rounded px-3 py-1 text-sm">
        <option>Financial Result</option>
      </select>
      <select className="border border-[#d7d7d7] rounded px-3 py-1 text-sm">
        <option>Select Year</option>
      </select>
      <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded cursor-pointer">
        Download
      </button>
    </div>
  </div>
);
