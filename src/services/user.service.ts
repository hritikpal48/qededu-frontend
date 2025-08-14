// src/services/user.service.ts
import HttpService from "./http.service";
import { createMutationHook, useQueryHook } from "@/hooks/useMutationHook";
import { UpdateAvatarPayload, updateUserProfileData, UserProfile } from "@/types/userprofileType";
// ----------------------
// API Functions
// ----------------------


//Get user Profile
const getUserProfile = async () => {
  const res = await HttpService.get("/user/profile");
  return res.data.data; // adjust if your API's shape is different
};

// update user avatar
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


//update user Profile
const updateUserProfile = async (payload:updateUserProfileData):Promise<string | undefined>  => {
  const res = await HttpService.patch("/user/profile", payload);
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
export const useUpdateProfile = createMutationHook(updateUserProfile);


export const useUpdateUserAvatar = createMutationHook(updateUserAvatar);
