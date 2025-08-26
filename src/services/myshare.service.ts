import {
  OrderListResponse,
  GetMyshareParams,
  CreateOrderPayload,
  OrderResponse,
} from "@/types/myshareType";
import HttpService from "./http.service";
import { useQueryHook, createMutationHook } from "@/hooks/useMutationHook";

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


  //order create api 
  
  const createOrder = async (
    payload: CreateOrderPayload
  ): Promise<OrderResponse> => {
    const res = await HttpService.post("/order", payload);
    return res.data;
  };
export const useCreateOrder = createMutationHook(createOrder);
  