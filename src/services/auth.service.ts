import HttpService from "./http.service";
import { useMutationHook } from "@/hooks/useMutationHook";
import { SignupPayload, LoginPayload, UserData } from "@/types/auth";

const signup = async (data: SignupPayload): Promise<UserData> => {
    const res = await HttpService.post('/auth/register', data, { withCredentials: true });
    return res.data.data
};

const login = async (data: LoginPayload): Promise<UserData> => {
    const res = await HttpService.post('/auth/login', data, { withCredentials: true });
    return res.data.data
};

const sendOtp = async (email: string): Promise<void> => {
    const res = await HttpService.post('/auth/send_otp_email', { email }, { withCredentials: true });
    return res.data.data
};

export const useSignUp = useMutationHook(signup)
export const useLogin = useMutationHook(login)
export const useSendOtp = useMutationHook(sendOtp)