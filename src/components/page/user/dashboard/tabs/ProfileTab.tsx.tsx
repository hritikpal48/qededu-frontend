"use client";

import { useState } from "react";
import ProfileEditForm from "@/components/forms/ProfileForm";
import { dateFormat } from "@/utils";
import { LoaderButton } from "@/components/ui/button";

type UserProfile = {
  _id: string;
  fname?: string;
  lname?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string; // ISO string
  avatar?: string;
};

type Props = {
  userProfile?: UserProfile;
  isPending?: boolean;
  refetchUser?: () => any;
};

export default function ProfileTab({
  userProfile,
  isPending,
  refetchUser,
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleCancel = () => setIsEditMode(false);

  const editFormDefaultValues = {
    fname: userProfile?.fname ?? "",
    lname: userProfile?.lname ?? "",
    email: userProfile?.email ?? "",
    phoneNumber: userProfile?.phoneNumber ?? "",
    dob: userProfile?.dob ?? "",
  };

  return (
    <>
      <h2 className="text-[22px] font-semibold mb-4">My Profile</h2>

      {isEditMode ? (
        <ProfileEditForm
          defaultValues={editFormDefaultValues}
          onComplete={() => {
            setIsEditMode(false);
            refetchUser?.(); // refresh parent data after update
          }}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold">Full Name</label>
            <p className="mt-2">
              {userProfile?.fname ?? "-"} {userProfile?.lname ?? ""}
            </p>
          </div>

          <div>
            <label className="font-bold">Email</label>
            <p className="mt-2">{userProfile?.email ?? "-"}</p>
          </div>

          <div>
            <label className="font-bold">Date of Birth</label>
            <p className="mt-2">
              {userProfile?.dob ? dateFormat(userProfile.dob) : "-"}
            </p>
          </div>

          <div>
            <label className="font-bold">Phone Number</label>
            <p className="mt-2">{userProfile?.phoneNumber ?? "-"}</p>
          </div>
        </div>
      )}

      {/* Toggle Buttons */}
      <div className="flex justify-end mb-5">
        {isEditMode ? (
          <></>
        ) : (
          <LoaderButton
            type="button"
            text="Edit"
            onClick={() => setIsEditMode(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
          />
        )}
      </div>
    </>
  );
}
