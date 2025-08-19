import { ContactParams } from "@/types/contactType";
import HttpService from "./http.service";
import { createMutationHook } from "@/hooks/useMutationHook";

const createContact = async (data: ContactParams): Promise<void> => {
  const res = await HttpService.post("/contact", data);
  return res.data;
};
export const useCreateContact = createMutationHook(createContact);