// services/kyc.service.ts
import HttpService from "./http.service";
import { useQueryHook } from "@/hooks/useMutationHook";
import { KycData } from "@/types/kycType";

// GET KYC details
const getKycDetails = async (): Promise<KycData> => {
  const res = await HttpService.get("/kyc");
  return res?.data?.data;
};

// React Query hook
export const useFetchKycDetails = () =>
  useQueryHook({
    queryKey: ["kyc_details"],
    queryFn: () => getKycDetails(),
  });
