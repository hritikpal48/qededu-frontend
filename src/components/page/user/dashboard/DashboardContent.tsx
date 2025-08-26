"use client";

import PortfolioTab from "./tabs/PortfolioTab";
import TransactionsTab from "./tabs/TransactionsTab";
import ExternalTransactionsTab from "./tabs/ExternalTransactionsTab";
import KycTab from "./tabs/KycTab";
import MyShareTab from "./tabs/MyShareTab";
import ProfileTab from "./tabs/ProfileTab.tsx";
import KycAlertTab from "./KycAlertTab";
import { UserProfile } from "@/types/userprofileType";

export type TabKey =
  | "profile"
  | "portfolio"
  | "transactions"
  | "external"
  | "myshare"
  | "kyc";


type Props = {
  activeTab: TabKey;
  userProfile?: UserProfile;
  isPending?: boolean;
  refetchUser?: () => any;
};

export default function DashboardContent({
  activeTab,
  userProfile,
  isPending,
  refetchUser,
}: Props) {
  return (
    <section className="flex-1 p-6">
      {userProfile?.kycStatus === 0 && <KycAlertTab />}
      
      {activeTab === "profile" && (
        <ProfileTab
          userProfile={userProfile}
          isPending={isPending}
          refetchUser={refetchUser}
        />
      )}
      {activeTab === "portfolio" && <PortfolioTab />}
      {activeTab === "kyc" && <KycTab />}
      {activeTab === "myshare" && <MyShareTab />}
      {activeTab === "transactions" && <TransactionsTab />}
      {activeTab === "external" && <ExternalTransactionsTab />}
    </section>
  );
}
