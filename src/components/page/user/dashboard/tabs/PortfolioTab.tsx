"use client";

import React, { useState, useEffect } from "react";
import { useFetchUserHoldings } from "@/services/myshare.service";
import { LoaderButton } from "@/components/ui/button";
import TextInput from "@/components/ui/input/TextInput";
import { useRouter } from "next/navigation";
import { Holding, GetUserHoldingsParams } from "@/types/myshareType";
import { Controller, useForm } from "react-hook-form";

export default function PortfolioTab() {
  const [page, setPage] = useState<number>(1);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const { control, watch } = useForm<GetUserHoldingsParams>({
    defaultValues: { keyword: "" },
  });

  const keyword = watch("keyword") || "";
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [keyword]);

  const {
    data: response,
    isLoading,
    error,
  } = useFetchUserHoldings({
    keyword: debouncedKeyword,
    page,
  });

  const router = useRouter();

  useEffect(() => {
    if (response) {
      setHoldings((prev) =>
        page === 1 ? response.data : [...prev, ...response.data]
      );
      setTotalPages(response.totalPages || 1);
    }
  }, [response, page]);

  const loadMore = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (isLoading && page === 1) return <p>Loading portfolio...</p>;
  if (error) return <p className="text-red-500">Failed to load holdings.</p>;

  return (
    <>
      <h2 className="text-[22px] font-semibold mb-4">My Portfolio</h2>

      <div className="flex gap-4 mb-4 flex-wrap">
        <Controller
          name="keyword"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Search"
              name={field.name}
              register={() => field}
            />
          )}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-4">
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
            {holdings.length === 0 ? (
              <tr className="text-gray-400">
                <td className="px-4 py-3" colSpan={8}>
                  No investments found.
                </td>
              </tr>
            ) : (
              holdings.map((h) => {
                const pl = h.currentValue - h.totalInvestment;
                const plPercent =
                  h.totalInvestment > 0
                    ? ((pl / h.totalInvestment) * 100).toFixed(2)
                    : "0.00";
                return (
                  <tr key={h._id}>
                    <td className="px-4 py-2">{h.name}</td>
                    <td className="px-4 py-2">{h.quantity}</td>
                    <td className="px-4 py-2">{h.avgPrice.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      {(h.currentValue / h.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      {h.totalInvestment.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">{h.currentValue.toFixed(2)}</td>
                    <td
                      className={`px-4 py-2 ${
                        pl >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {pl.toFixed(2)} ({plPercent}%)
                    </td>
                    <td className="px-4 py-2">
                      <LoaderButton
                        type="button"
                        text="Sell"
                        onClick={() => router.push(`/share/${h.slug}`)}
                        loading={isLoading}
                        className="border border-white bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Load More button */}
      {page < totalPages && (
        <div className="text-center">
          <LoaderButton
            text="Read More"
            onClick={loadMore}
            loading={isLoading}
            className="border border-white bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold cursor-pointer"
          />
        </div>
      )}
    </>
  );
}
