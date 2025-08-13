"use client";

import { useEffect, useState } from "react";
import { useFetchUserProfile } from "@/services/user.service";
import PortfolioTab from "./tabs/PortfolioTab";
import TransactionsTab from "./tabs/TransactionsTab";
import ExternalTransactionsTab from "./tabs/ExternalTransactionsTab";
import KycTab from "./tabs/KycTab";
import MyShareTab from "./tabs/MyShareTab";
import ProfileTab from "./tabs/ProfileTab.tsx";
import KycAlertTab from "./KycAlertTab";

export type TabKey =
  | "profile"
  | "portfolio"
  | "transactions"
  | "external"
  | "myshare"
  | "kyc";

export default function DashboardContent({ activeTab }: { activeTab: TabKey }) {
  const { data: userProfile } = useFetchUserProfile();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    phone: "",
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        fullName: `${userProfile.fname || ""} ${userProfile.lname || ""}`.trim(),
        email: userProfile.email || "",
        dob: "",
        phone: userProfile.phoneNumber || "",
      });
    }
  }, [userProfile]);

  return (
    <section className="flex-1 p-6">

      <KycAlertTab />

      {activeTab === "profile" && (
        <ProfileTab formData={formData} setFormData={setFormData} />
      )}
      {activeTab === "portfolio" && <PortfolioTab />}
      {activeTab === "kyc" && <KycTab />}
      {activeTab === "myshare" && <MyShareTab />}
      {activeTab === "transactions" && <TransactionsTab />}
      {activeTab === "external" && <ExternalTransactionsTab />}
    </section>
  );
}
