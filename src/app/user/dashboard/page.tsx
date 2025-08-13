"use client";

import DashboardContent from "@/components/page/user/dashboard/DashboardContent";
import Sidebar from "@/components/page/user/dashboard/Sidebar";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "portfolio" | "transactions" | "external" | "myshare" | "kyc"
  >("profile");

  const [formData, setFormData] = useState({
    fullName: "Santosh Kumar",
    email: "santosh.asvayuk@gmail.com",
    dob: "",
    phone: "+91 7854213265",
  });

  return (
    <main className="md:py-20 py-10 flex flex-col md:flex-row max-w-7xl mx-auto">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        // user={{ name: formData.fullName, email: formData.email }}
      />
      <DashboardContent
        activeTab={activeTab}
        formData={formData}
        setFormData={setFormData}
      />
    </main>
  );
}
