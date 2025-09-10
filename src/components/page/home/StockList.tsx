"use client";
import React from "react";
import StockTable from "@/components/ui/table/StockListTable";
import { StockData } from "@/types/stock";

type StockListProps = {
    homeData?: {
    title: string|undefined;
    subTitle: string|undefined;
  };
  data: StockData[];          // rows to display
  loading: boolean;
  page: number;               // current page (1-based)
  perPage: number;            // items per page
  totalItems: number;         // total items returned by API
  setPage: (p: number) => void;
  setPerPage: (n: number) => void;
};

export default function StockList({
  homeData,
  data,
  loading,
  page,
  perPage,
  totalItems,
  setPage,
  setPerPage,
}: StockListProps) {
  return (
    <StockTable
      homeData={homeData}
      data={data ?? []}
      page={page}
      perPage={perPage}
      totalPage={totalItems ?? 0} // StockTable expects totalPage prop (kept same as your existing API)
      setPage={setPage}
      setPerPage={setPerPage}
      loading={loading}
    />
  );
}
