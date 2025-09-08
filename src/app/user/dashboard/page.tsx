"use client";

import DashboardContent from "@/components/page/user/dashboard/DashboardContent";
import Sidebar from "@/components/page/user/dashboard/Sidebar";
import SpinnerLoader from "@/components/ui/loader/SpinerLoader";
import { useFetchUserProfile } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "portfolio" | "transactions" | "external" | "myshare" | "kyc"
  >("profile");

  const { data: userProfile, isPending, refetch } = useFetchUserProfile();

  useEffect(() => {
    refetch();
  }, []);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerLoader size={40} color="#00A63E" />
      </div>
    );
  }

  return (
    <main className="md:py-20 py-10 flex flex-col md:flex-row max-w-7xl mx-auto">
      <Sidebar
        activeTab={activeTab}
        isPending={isPending}
        avatar={userProfile?.avatar}
        onTabChange={setActiveTab}
      />
      <DashboardContent
        activeTab={activeTab}
        userProfile={userProfile}
        isPending={isPending}
        refetchUser={refetch}
      />
    </main>
  );
}
