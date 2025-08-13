// src/services/user.service.ts
import HttpService from "./http.service";
import { createMutationHook, useQueryHook } from "@/hooks/useMutationHook";
import { UpdateAvatarPayload, UserProfile } from "@/types/userprofileType";
// ----------------------
// API Functions
// ----------------------
const getUserProfile = async () => {
  const res = await HttpService.get("/user/profile");
  return res.data.data; // adjust if your API's shape is different
};

// ----------------------
// Hooks
// ----------------------
export const useFetchUserProfile = () =>
  useQueryHook<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

const updateUserAvatar = async (data: UpdateAvatarPayload): Promise<void> => {
  const formData = new FormData();
  formData.append("avatar", data.avatar);

  const res = await HttpService.patch("/user/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

export const useUpdateUserAvatar = createMutationHook(updateUserAvatar);
