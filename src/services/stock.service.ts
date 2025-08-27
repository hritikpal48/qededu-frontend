import HttpService from "./http.service";
import { useQueryHook } from "@/hooks/useMutationHook";
import {
  GetStockListApiParams,
  StockListApiRespone,
  StockData,
} from "@/types/stock";

const getStockList = async (
  params: GetStockListApiParams
): Promise<StockListApiRespone> => {
  const res = await HttpService.get("/stock", { params });
  console.log("dddd", res);

  return res?.data;
};

export const useFetchStockList = (params: GetStockListApiParams) =>
  useQueryHook({
    queryKey: ["stock_lits", params?.page?.toString()],
    queryFn: () => getStockList(params),
  });

const getStockDetails = async (id: string): Promise<StockData> => {
  const res = await HttpService.get(`/stock/${id}`);
  return res?.data?.data;
};

export const useFetchStockDetails = (id: string | null) =>
  useQueryHook({
    queryKey: ["stock_details", id ?? ""],
    queryFn: () => getStockDetails(id ?? ""),
    enabled: id ? true : false,
  });

//slug api

const getStockBySlug = async (slug: string): Promise<StockData> => {
  const res = await HttpService.get(`/stock/slug/${slug}`);
  return res?.data?.data;
};

export const useFetchStockBySlug = (slug: string | null) =>
  useQueryHook({
    queryKey: ["stock_details_slug", slug ?? ""],
    queryFn: () => getStockBySlug(slug ?? ""),
    enabled: !!slug,
  });
