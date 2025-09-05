import HttpService from "./http.service";
import { useQueryHook } from "@/hooks/useMutationHook";
import {
  FaqData,
  ProcessData,
  MediaData,
  SettingData,
  AboutResponse,
} from "@/types/settingsType";

// ========================
// Get Fqa API
// ========================
const getFaqDetails = async (): Promise<FaqData> => {
  const res = await HttpService.get("/faq");
  return res?.data?.data;
};

export const useFaqDetails = () =>
  useQueryHook({
    queryKey: ["faq"],
    queryFn: () => getFaqDetails(),
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
    queryKey: ["process"],
    queryFn: () => getProcessDetails(),
  });

// =======================
// Get Media API
// ========================

const getMediaDetails = async (): Promise<MediaData> => {
  const res = await HttpService.get("/media");
  return res?.data?.data;
};

export const useMediaDetails = () =>
  useQueryHook({
    queryKey: ["media"],
    queryFn: () => getMediaDetails(),
  });

// =======================
// Get Settings API
// ========================

const getSettingDetails = async (): Promise<SettingData> => {
  const res = await HttpService.get("/setting");
  return res?.data?.data;
};

export const useSettingsDetails = () =>
  useQueryHook({
    queryKey: ["setting"],
    queryFn: () => getSettingDetails(),
  });

// =======================
// Get About API
// ========================

const getAboutDetails = async (): Promise<AboutResponse> => {
  const res = await HttpService.get("/about");
  return res?.data?.data;
};

export const useFetchAbout = () =>
  useQueryHook({
    queryKey: ["about"],
    queryFn: () => getAboutDetails(),
  });
