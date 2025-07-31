import HttpService from "./http.service";
import { useMutationHook } from "@/hooks/useMutationHook";

export const signup = async (data: any): Promise<any> => {
    const res = await HttpService.post('/auth/register', data, { withCredentials: true });
    return res
};

export const useSignUp = useMutationHook(signup)