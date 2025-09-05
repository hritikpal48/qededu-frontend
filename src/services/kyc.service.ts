// services/kyc.service.ts
import { KycData } from "@/types/kycType";
import HttpService from "./http.service";
import { createMutationHook, useQueryHook } from "@/hooks/useMutationHook";

// GET KYC details
const getKycDetails = async (): Promise<KycData> => {
  const res = await HttpService.get("/kyc");
  return res?.data?.data;
};

// const uploadScreenshot = async (data: FormData): Promise<any> => {
//   const res = await HttpService.post("/customers/payment-screenshot", data, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };

const createKyc = async (data: FormData): Promise<any> => {
  const res = await HttpService.post("/kyc", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res?.data?.data;
};

//update KYC
const updateKyc = async (data: FormData): Promise<any> => {
  const res = await HttpService.put("/kyc", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res?.data?.data;
};

// React Query hook
export const useFetchKycDetails = () =>
  useQueryHook({
    queryKey: ["kyc_details"],
    queryFn: () => getKycDetails(),
  });

export const useUpdateKyc = createMutationHook(updateKyc);
export const useCreateKyc = createMutationHook(createKyc);
