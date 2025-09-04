import {
  OrderListResponse,
  GetMyshareParams,
  CreateOrderPayload,
  OrderResponse,
  GetUserHoldingsParams,
  GetUserHoldingsResponse,
  StockChartData,
  ChartRange,
} from "@/types/myshareType";

import HttpService from "./http.service";
import { useQueryHook, createMutationHook } from "@/hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";

// ---------------- MyShare APIs ----------------
const getMyshareDetails = async (
  params: GetMyshareParams
): Promise<OrderListResponse> => {
  const res = await HttpService.get(`/order/user`, { params });
  return res?.data;
};


const getStockChart = async (id: string,range: ChartRange = ChartRange.MAX // ✅ Default "max"
): Promise<StockChartData> => {
  console.log(id, range, 'service')
  const res = await HttpService.get(`/stock/chart/${id}`, {
    params: { range },
  });

  return res?.data?.data;
};


// ---------------- Order Create  APIs ----------------
const createOrder = async (
  payload: CreateOrderPayload
): Promise<OrderResponse> => {
  const res = await HttpService.post("/order", payload);
  return res.data;
};


// ---------------- User Holding APIs ----------------

const getUserHoldings = async (
  params: GetUserHoldingsParams
): Promise<GetUserHoldingsResponse> => {
  const res = await HttpService.get(`/user-holding`, { params });
  return res.data;
};

// -------- Hook --------
export const useCreateOrder = createMutationHook(createOrder);

export const useFetchMyshareDetails = (params: GetMyshareParams) =>
  useQueryHook({
    queryKey: ["myshare_details"],
    queryFn: () => getMyshareDetails(params),
    enabled: !!params.orderType,
  });

export const useFetchUserHoldings = (params: GetUserHoldingsParams) =>
  useQuery<GetUserHoldingsResponse>({
    queryKey: ["user_holdings", params], // ✅ always array
    queryFn: () => getUserHoldings(params),
    enabled: !!params.page, // optional condition
  });
  
export const useFetchStockChart = (
  id?: string,
  range: ChartRange = ChartRange.MAX
) =>
  useQueryHook({
    queryKey: ["get_stock-chart", id ?? "", range], // ✅ empty string fallback
    queryFn: async () => {
      if (!id) return null; // ✅ No API call without ID
      return getStockChart(id, range);
    },
    enabled: !!id, // ✅ Query only runs when id is present
  });

