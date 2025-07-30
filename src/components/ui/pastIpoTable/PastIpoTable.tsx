"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import comlist1 from "../../../../public/images/companylist/comlist1.png";
import comlist2 from "../../../../public/images/companylist/comlist2.png";
import comlist3 from "../../../../public/images/companylist/comlist3.png";
import comlist4 from "../../../../public/images/companylist/comlist4.png";
import comlist5 from "../../../../public/images/companylist/comlist5.jpeg";
import comlist6 from "../../../../public/images/companylist/comlist6.jpeg";
import comlist7 from "../../../../public/images/companylist/comlist7.jpeg";
import comlist8 from "../../../../public/images/companylist/comlist8.png";
import comlist9 from "../../../../public/images/companylist/comlist9.jpeg";
import comlist10 from "../../../../public/images/companylist/comlist10.png";
import comlist11 from "../../../../public/images/companylist/comlist11.png";
import comlist12 from "../../../../public/images/companylist/comlist12.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

type IPORecord = {
  name: string;
  logo: string;
  unlistedPrice: string;
  ipoPrice: string;
  cmp: string;
  gainLoss: number;
  nameLink: string;
};

const ipoData: IPORecord[] = [
  {
    name: "Paytm",
    logo: comlist1,
    nameLink: "/",
    unlistedPrice: "₹ 800-3500",
    ipoPrice: "₹ 2150",
    cmp: "₹ 1072.3",
    gainLoss: -50.13,
  },
  {
    name: "Nazara Tech",
    logo: comlist2,
    nameLink: "/",
    unlistedPrice: "₹ 200-750",
    ipoPrice: "₹ 550",
    cmp: "₹ 1338.1",
    gainLoss: 143.29,
  },
  {
    name: "Barbeque Nation",
    logo: comlist3,
    nameLink: "/",
    unlistedPrice: "₹ 510-1000",
    ipoPrice: "₹ 500",
    cmp: "₹ 302.8",
    gainLoss: -39.44,
  },
  {
    name: "CSB",
    logo: comlist4,
    nameLink: "/",
    unlistedPrice: "₹ 150-210",
    ipoPrice: "₹ 195",
    cmp: "₹ 424.15",
    gainLoss: 117.51,
  },
  {
    name: "AGS Transact",
    logo: comlist5,
    nameLink: "/",
    unlistedPrice: "₹ 225-575",
    ipoPrice: "₹ 175",
    cmp: "₹ 4.9",
    gainLoss: -97.2,
  },
  {
    name: "Anand Rathi Wealth Services",
    logo: comlist6,
    nameLink: "/",
    unlistedPrice: "₹ 175-400",
    ipoPrice: "₹ 275",
    cmp: "₹ 2660.1",
    gainLoss: 867.31,
  },
  {
    name: "Aptus Value Housing Finance",
    logo: comlist7,
    nameLink: "/",
    unlistedPrice: "₹ 350-420",
    ipoPrice: "₹ 353",
    cmp: "₹ 330.65",
    gainLoss: -6.33,
  },
  {
    name: "Suryoday SFB",
    logo: comlist8,
    nameLink: "/",
    unlistedPrice: "₹ 175-350",
    ipoPrice: "₹ 305",
    cmp: "₹ 128.76",
    gainLoss: -57.78,
  },
  {
    name: "UTI AMC",
    logo: comlist9,
    nameLink: "/",
    unlistedPrice: "₹ 750-1100",
    ipoPrice: "₹ 554",
    cmp: "₹ 1321.3",
    gainLoss: 138.5,
  },
  {
    name: "Delhivery",
    logo: comlist10,
    nameLink: "/",
    unlistedPrice: "₹ 650-900",
    ipoPrice: "₹ 487",
    cmp: "₹ 427.1",
    gainLoss: -12.3,
  },
  {
    name: "Zomato",
    logo: comlist11,
    nameLink: "/",
    unlistedPrice: "₹ 200-400",
    ipoPrice: "₹ 76",
    cmp: "₹ 132.1",
    gainLoss: 73.82,
  },
  {
    name: "Nykaa",
    logo: comlist12,
    nameLink: "/",
    unlistedPrice: "₹ 250-600",
    ipoPrice: "₹ 1125",
    cmp: "₹ 145.5",
    gainLoss: -87.07,
  },
];

const GainLossBadge = ({ value }: { value: number }) => {
  const isPositive = value > 0;
  const badgeStyle = isPositive
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  return (
    <span
      className={`px-3 py-1 rounded-full text-[14px] font-semibold inline-flex items-center gap-2 ${badgeStyle}`}
    >
      {isPositive ? <FaCircleArrowUp /> : <FaCircleArrowDown />} {value}%
    </span>
  );
};

const PastIpoTable = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const total = ipoData.length;
  const pageCount = Math.ceil(total / perPage);

  const paginatedData = ipoData.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="bg-[#f7f7f7] py-12 px-4 md:px-10 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">
          Past IPO Performance
        </h2>
        <p className="text-center text-gray-600 mb-8 text-[20px]">
          Explore the Historical IPO Performance of Unlisted Shares to Inform
          Your Investment Strategy Today.
        </p>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 text-nowrap">
            <thead className="bg-gray-100 text-left">
              <tr>
                {[
                  "Name",
                  "Unlisted Share Price",
                  "IPO Price",
                  "CMP",
                  "Gain or Loss",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 font-semibold text-sm text-gray-700"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map(
                ({
                  name,
                  nameLink,
                  logo,
                  unlistedPrice,
                  ipoPrice,
                  cmp,
                  gainLoss,
                }) => (
                  <tr key={name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 flex items-center gap-2">
                      <Image
                        src={logo}
                        alt={name}
                        width={24}
                        height={24}
                        className="rounded-sm"
                      />
                      <Link
                        href={nameLink}
                        className="ml-2 text-sm font-medium text-dark hover:underline"
                      >
                        {name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm">{unlistedPrice}</td>
                    <td className="px-4 py-3 text-sm">{ipoPrice}</td>
                    <td className="px-4 py-3 text-sm">{cmp}</td>
                    <td className="px-4 py-3 text-sm">
                      <GainLossBadge value={gainLoss} />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          {/* Rows per page selector */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <label htmlFor="perPage">Rows per page:</label>
            <select
              id="perPage"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={perPage}
              onChange={(e) => {
                setPage(1); // Reset to page 1 when page size changes
                setPerPage(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Record range */}
          <p className="text-sm text-gray-500">
            Showing {1 + (page - 1) * perPage} to{" "}
            {Math.min(page * perPage, total)} of {total} records
          </p>

          {/* Page navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`w-9 h-9 rounded-full border text-sm flex items-center justify-center transition ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-600 border-gray-300"
              }`}
            >
              <FaArrowLeft />
            </button>

            {Array.from({ length: Math.ceil(total / perPage) }, (_, i) => {
              const current = i + 1;
              return (
                <button
                  key={current}
                  onClick={() => setPage(current)}
                  className={`w-9 h-9 rounded-full text-sm flex items-center justify-center transition ${
                    current === page
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {current}
                </button>
              );
            })}

            <button
              onClick={() =>
                setPage((p) => Math.min(p + 1, Math.ceil(total / perPage)))
              }
              disabled={page === Math.ceil(total / perPage)}
              className={`w-9 h-9 rounded-full border text-sm flex items-center justify-center transition ${
                page === Math.ceil(total / perPage)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-600 border-gray-300"
              }`}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastIpoTable;
