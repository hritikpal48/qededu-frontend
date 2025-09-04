import {
  OrderListResponse,
  GetMyshareParams,
  CreateOrderPayload,
  OrderResponse,
  GetUserHoldingsParams,
  GetUserHoldingsResponse,
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

export const useFetchMyshareDetails = (params: GetMyshareParams) =>
  useQueryHook({
    queryKey: ["myshare_details"],
    queryFn: () => getMyshareDetails(params),
    enabled: !!params.orderType,
  });

// ---------------- Order Create  APIs ----------------
const createOrder = async (
  payload: CreateOrderPayload
): Promise<OrderResponse> => {
  const res = await HttpService.post("/order", payload);
  return res.data;
};

export const useCreateOrder = createMutationHook(createOrder);

// ---------------- User Holding APIs ----------------

const getUserHoldings = async (
  params: GetUserHoldingsParams
): Promise<GetUserHoldingsResponse> => {
  const res = await HttpService.get(`/user-holding`, { params });
  return res.data;
};

// -------- Hook --------
export const useFetchUserHoldings = (params: GetUserHoldingsParams) =>
  useQuery<GetUserHoldingsResponse>({
    queryKey: ["user_holdings", params], // ✅ always array
    queryFn: () => getUserHoldings(params),
    enabled: !!params.page, // optional condition
  });
