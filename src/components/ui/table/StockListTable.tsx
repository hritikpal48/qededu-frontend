"use client";

import Image from "@/components/ui/Image";
import Link from "next/link";
import { FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";
import TablePagination from "./TablePagination";
import { StockData } from "@/types/stock";
import { TableLoadingBody } from "./TableSkeleton";
import { environmentVariables } from "@/config/app.config";

type Props = {
      homeData?: {
    title: string|undefined;
    subTitle: string|undefined;
  };
  data: StockData[];
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  setPerPage: (limit: number) => void;
  totalPage: number;
  loading?: boolean;
};

const TABLE_HEADERS = [
  "Name",
  "Unlisted Share Price",
  "IPO Price",
  "CMP",
  "Gain or Loss",
];

const GainLossBadge = ({ value }: { value: number }) => {
  const isPositive = value > 0;
  const badgeClass = isPositive
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-2 ${badgeClass}`}
    >
      {isPositive ? <FaCircleArrowUp /> : <FaCircleArrowDown />} {value}%
    </span>
  );
};

const StockTable = ({
  homeData,
  data,
  page,
  perPage,
  setPage,
  setPerPage,
  totalPage,
  loading,
}: Props) => {
  return (
    <section className="bg-[#f7f7f7] py-12 px-4 md:px-10 rounded-lg">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-2">
          {homeData?.title || "Past IPO Performance"}
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          {homeData?.subTitle || "Explore the Historical IPO Performance of Unlisted Shares to Inform Your Investment Strategy Today."}
        </p>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 text-nowrap">
            <thead className="bg-gray-100 text-left">
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 font-semibold text-sm text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            {loading ? (
              <TableLoadingBody />
            ) : (
              <tbody className="divide-y divide-gray-100">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={TABLE_HEADERS.length}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No IPO data found
                    </td>
                  </tr>
                ) : (
                  data.map((stock) => (
                    <tr key={stock._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <Image
                          src={`${environmentVariables.UPLOAD_URL}/stocks/${stock.image}`}
                          alt={stock?.name}
                          width={24}
                          height={24}
                          className="rounded-sm"
                        />
                        <Link
                          href={`/share/${stock.slug}`}
                          className="ml-2 text-sm font-medium text-dark hover:underline"
                        >
                          {stock.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm">{stock.price}</td>
                      <td className="px-4 py-3 text-sm">{stock.price}</td>
                      <td className="px-4 py-3 text-sm">{stock.price}</td>
                      <td className="px-4 py-3 text-sm">
                        <GainLossBadge value={stock.price} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
        {/* Pagination Controls */}
        <TablePagination
          currentPage={page}
          totalPage={totalPage}
          perPage={perPage}
          setPage={setPage}
          setPerPage={setPerPage}
        />
      </div>
    </section>
  );
};

export default StockTable;
