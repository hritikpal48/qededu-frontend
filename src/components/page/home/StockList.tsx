"use client";
import React, { useEffect, useState } from "react";
import StockTable from "@/components/ui/table/StockListTable";
import { GetStockListApiParams } from "@/types/stock";
import { useFetchStockList } from "@/services/stock.service";
import { useDebounce } from "@/hooks/useDebounce";
type Props = {
  searchKeyword?: string;
};
export default function StockList({ searchKeyword }: Props) {
  const [params, setParams] = useState<GetStockListApiParams>({
    page: 1,
    limit: 10,
    keyword: searchKeyword ?? "",
  });
  const debouncedSearch = useDebounce(params, 400);
  const handlePageChnage = (page: number) =>
    setParams((curr) => ({ ...curr, page }));

<<<<<<< HEAD
  const handleLimitChnage = (limit: number) =>
    setParams((curr) => ({ ...curr, limit }));
=======

    useEffect(() => {
        handleSearchChnage(searchKeyword ?? '')
    }, [searchKeyword]);
>>>>>>> 517095bb465b98282f25504d42808b68775aff85

  const handleSearchChnage = (keyword: string) =>
    setParams((curr) => ({ ...curr, keyword }));
  const { data, isLoading, refetch } = useFetchStockList(debouncedSearch);

  console.log("dsandjlksad", data);

  useEffect(() => {
    handleSearchChnage(searchKeyword ?? "");
  }, [searchKeyword]);

  useEffect(() => {
    refetch();
  }, [debouncedSearch]);
  return (
    <StockTable
      data={data?.data ?? []}
      page={params?.page}
      perPage={params?.limit}
      totalPage={data?.totalItems ?? 0}
      setPage={handlePageChnage}
      setPerPage={handleLimitChnage}
      loading={isLoading}
    />
  );
}
