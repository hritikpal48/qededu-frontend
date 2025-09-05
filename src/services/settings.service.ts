import HttpService from "./http.service";
import { useQueryHook } from "@/hooks/useMutationHook";
import { FaqData, ProcessData, SettingData } from "@/types/settingsType";

// ========================
// Get Fqa API
// ========================
const getFqaDetails = async (): Promise<FaqData> => {
  const res = await HttpService.get("/faq");
  return res?.data?.data;
};

export const useFqaDetails = () =>
  useQueryHook({
    queryKey: ["fqa_details"],
    queryFn: () => getFqaDetails(),
  });

// =======================
// Get Process API
// ========================

const getProcessDetails = async (): Promise<ProcessData> => {
  const res = await HttpService.get("/process");
  return res?.data?.data;
};

export const useProcessDetails = () =>
  useQueryHook({
    queryKey: ["process_details"],
    queryFn: () => getProcessDetails(),
  });

// =======================
// Get Media API
// ========================

// const getMediaDetails = async (): Promise<MediaData> => {
//   const res = await HttpService.get("/media");
//   return res?.data?.data;
// };

// export const useMediaDetails = () =>
//   useQueryHook({
//     queryKey: ["Media_details"],
//     queryFn: () => getMediaDetails(),
//   });

// =======================
// Get Settings API
// ========================

const getSettingDetails = async (): Promise<SettingData> => {
  const res = await HttpService.get("/setting");
  return res?.data?.data;
};

export const useSettingsDetails = () =>
  useQueryHook({
    queryKey: ["setting_details"],
    queryFn: () => getSettingDetails(),
  });
