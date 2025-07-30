"use client";

import { useState } from "react";
import Image from "@/components/ui/Image";
import Link from "next/link";
import {
    FaCircleArrowUp,
    FaCircleArrowDown,
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa6";

type Stock = {
    name: string;
    logo: string;
    unlistedPrice: string;
    ipoPrice: string;
    cmp: string;
    gainLoss: number;
    nameLink: string;
};

type Props = {
    data: Stock[];
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

const usePagination = (data: Stock[], perPage: number) => {
    const [page, setPage] = useState(1);
    const total = data.length;
    const pageCount = Math.ceil(total / perPage);
    const currentPageData = data.slice((page - 1) * perPage, page * perPage);

    return {
        page,
        setPage,
        pageCount,
        currentPageData,
        total,
        start: 1 + (page - 1) * perPage,
        end: Math.min(page * perPage, total),
    };
};

const StockTable = ({ data }: Props) => {
    const [perPage, setPerPage] = useState(10);
    const {
        page,
        setPage,
        pageCount,
        currentPageData,
        total,
        start,
        end,
    } = usePagination(data, perPage);

    return (
        <section className="bg-[#f7f7f7] py-12 px-4 md:px-10 rounded-lg">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-center mb-2">Past IPO Performance</h2>
                <p className="text-center text-gray-600 mb-8 text-lg">
                    Explore the Historical IPO Performance of Unlisted Shares to Inform Your Investment Strategy Today.
                </p>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-xl shadow">
                    <table className="min-w-full divide-y divide-gray-200 text-nowrap">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                {TABLE_HEADERS.map((header) => (
                                    <th key={header} className="px-4 py-3 font-semibold text-sm text-gray-700">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentPageData.map((stock) => (
                                <tr key={stock.name} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        <Image
                                            src={stock.logo}
                                            alt={stock.name}
                                            width={24}
                                            height={24}
                                            className="rounded-sm"
                                        />
                                        <Link href={stock.nameLink} className="ml-2 text-sm font-medium text-dark hover:underline">
                                            {stock.name}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{stock.unlistedPrice}</td>
                                    <td className="px-4 py-3 text-sm">{stock.ipoPrice}</td>
                                    <td className="px-4 py-3 text-sm">{stock.cmp}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <GainLossBadge value={stock.gainLoss} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                    {/* Per Page Selector */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <label htmlFor="perPage">Rows per page:</label>
                        <select
                            id="perPage"
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            value={perPage}
                            onChange={(e) => {
                                setPage(1);
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

                    {/* Record Info */}
                    <p className="text-sm text-gray-500">
                        Showing {start} to {end} of {total} records
                    </p>

                    {/* Page Navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center ${page === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white hover:bg-gray-100 text-gray-600 border-gray-300"
                                }`}
                        >
                            <FaArrowLeft />
                        </button>

                        {Array.from({ length: pageCount }, (_, i) => {
                            const current = i + 1;
                            return (
                                <button
                                    key={current}
                                    onClick={() => setPage(current)}
                                    className={`w-9 h-9 rounded-full text-sm flex items-center justify-center ${current === page
                                        ? "bg-green-600 text-white"
                                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                                        }`}
                                >
                                    {current}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
                            disabled={page === pageCount}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center ${page === pageCount
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

export default StockTable;
