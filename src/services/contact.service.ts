import HttpService from "./http.service";
import { createMutationHook } from "@/hooks/useMutationHook";
import { ContactPayload } from "@/types/contactType";

const createContact = async (data: ContactPayload): Promise<void> => {
  const res = await HttpService.post("/contact", data);
  return res.data;
};

export const useCreateContact = createMutationHook(createContact);
