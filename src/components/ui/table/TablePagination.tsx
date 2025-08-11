import React from 'react'
import {
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa6";

type Props = {
    totalPage: number;
    perPage: number;
    currentPage: number;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void
};

const usePagination = (totalPage: number, perPage: number, page: number) => {
    const total = totalPage
    const pageCount = Math.ceil(total / perPage);
    return {
        page,
        pageCount,
        total,
        start: 1 + (page - 1) * perPage,
        end: Math.min(page * perPage, total),
    };
};

export default function TablePagination({ totalPage, perPage, currentPage, setPage, setPerPage }: Props) {
    const { page, pageCount, total, start, end } = usePagination(totalPage, perPage, currentPage)
    return (
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
                    onClick={() => setPage(Math.max(page - 1, 1))}
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
                    onClick={() => setPage(Math.min(page + 1, pageCount))}
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
    )
}
