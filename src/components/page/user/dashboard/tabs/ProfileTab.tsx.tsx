"use client";

import { useState } from "react";
import ProfileEditForm from "@/components/forms/ProfileForm";
import { dateFormat } from "@/utils";
import { LoaderButton } from "@/components/ui/button";
import Skeleton from "@/components/ui/SkeletonLoader";

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
  isPending = false,
  refetchUser,
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false);

  // const handleCancel = () => setIsEditMode(false);

  const editFormDefaultValues = {
    fname: userProfile?.fname ?? "",
    lname: userProfile?.lname ?? "",
    email: userProfile?.email ?? "",
    phoneNumber: userProfile?.phoneNumber ?? "",
    dob: userProfile?.dob ?? "",
  };

  // Skeleton component (small helper to keep JSX tidy)
  // const Skeleton = ({ className = "" }: { className?: string }) => (
  //   <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
  // );

  return (
    <>
      {/* Toggle Buttons */}
      <div className="flex justify-between items-center gap-2 mb-5">
        <h2 className="text-[22px] font-bold">My Profile</h2>

        {/* Hide edit button while loading */}
        {!isPending && !isEditMode && (
          <LoaderButton
            type="button"
            text="Edit"
            onClick={() => setIsEditMode(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-[5px] hover:bg-green-700 font-semibold cursor-pointer"
          />
        )}

        {/* When pending, show small skeleton instead of button to avoid layout shift */}
        {isPending && <Skeleton className="h-8 w-24" />}
      </div>

      {/* If loading, show skeleton placeholders first */}
      {isPending ? (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold">Full Name</label>
            <div className="mt-2">
              <div className="h-7 w-40 bg-gray-200 animate-pulse rounded mt-3"></div>
              <div className="h-5 w-56 bg-gray-200 animate-pulse rounded mt-2"></div>
            </div>
          </div>

          <div>
            <label className="font-bold">Email</label>
            <div className="mt-2">
              <div className="h-7 w-56 bg-gray-200 animate-pulse rounded mt-3"></div>
              <div className="h-5 w-40 bg-gray-200 animate-pulse rounded mt-2"></div>
            </div>
          </div>

          <div>
            <label className="font-bold">Date of Birth</label>
            <div className="mt-2">
              <div className="h-7 w-40 bg-gray-200 animate-pulse rounded mt-3"></div>
            </div>
          </div>

          <div>
            <label className="font-bold">Phone Number</label>
            <div className="mt-2">
              <div className="h-7 w-48 bg-gray-200 animate-pulse rounded mt-3"></div>
            </div>
          </div>
        </div>
      ) : isEditMode ? (
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
    </>
  );
}
