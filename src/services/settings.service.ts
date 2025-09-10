import HttpService from "./http.service";
import { useQueryHook } from "@/hooks/useMutationHook";
import {
  FaqData,
  ProcessData,
  MediaData,
  SettingData,
  AboutResponse,
  HomeData,
  InvRelData,
  InvResData,
  UnlistedData,
  InvestorData,
} from "@/types/settingsType";


const getHomeDetails = async (): Promise<HomeData> => {
  const res = await HttpService.get("/setting/home");
  return res?.data?.data;
};


const getInvRelationDetails = async (): Promise<InvRelData> => {
  const res = await HttpService.get("/setting/invrelation");
  return res?.data?.data;
};

const getInvResourcesDetails = async (): Promise<InvResData> => {
  const res = await HttpService.get("/setting/invresources");
  return res?.data?.data;
};

const getUnlistedDetails = async (): Promise<UnlistedData> => {
  const res = await HttpService.get("/setting/unlisted");
  return res?.data?.data;
};

const getInvestorDetails = async (): Promise<InvestorData> => {
  const res = await HttpService.get("/setting/investor");
  return res?.data?.data;
};





// ========================
// Get Faq API
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

export const useFetchMedia = () =>
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

//Hooks  
export const useFetchHome = () =>
  useQueryHook({
    queryKey: ["home"],
    queryFn: () => getHomeDetails(),
  });

  export const useFetchInvRelation = () =>
  useQueryHook({
    queryKey: ["InvRelation"],
    queryFn: () => getInvRelationDetails(),
  });

   export const useFetchInvResources = () =>
  useQueryHook({
    queryKey: ["InvResources"],
    queryFn: () => getInvResourcesDetails(),
  });

  
  export const useFetchUnlisted = () =>
  useQueryHook({
    queryKey: ["InvRelation"],
    queryFn: () => getUnlistedDetails(),
  });

  export const useFetchInvestor = () =>
  useQueryHook({
    queryKey: ["investor"],
    queryFn: () => getInvestorDetails(),
  });


  

