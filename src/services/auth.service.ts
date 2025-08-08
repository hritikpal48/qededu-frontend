import HttpService from "./http.service";
import { createMutationHook } from "@/hooks/useMutationHook";
import {
  SignupPayload,
  LoginPayload,
  VerifyOtpPayload,
  ResendOtpPayload,
} from "@/types/auth";

const signup = async (data: SignupPayload): Promise<void> => {
  const res = await HttpService.post("/auth/register", data);
  return res.data.data;
};

const login = async (data: LoginPayload): Promise<void> => {
  const res = await HttpService.post("/auth/login", data);
  return res.data.data;
};

const resendOtp = async (data: ResendOtpPayload): Promise<void> => {
  const res = await HttpService.post("/otp/resend", data);
  return res.data.data;
};

const veroifyOtp = async (data: VerifyOtpPayload): Promise<void> => {
  const res = await HttpService.post("/otp/verify", data);
  return res.data.data;
};

const logout = async (): Promise<void> => {
  await HttpService.put("/auth/logout");
};

export const useSignUp = createMutationHook(signup);
export const useLogin = createMutationHook(login);
export const useResendOtp = createMutationHook(resendOtp);
export const useVerifyOtp = createMutationHook(veroifyOtp);
export const useLogout = createMutationHook(logout);
