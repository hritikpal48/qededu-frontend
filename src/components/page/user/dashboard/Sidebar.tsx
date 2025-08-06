"use client";

import Image from "next/image";
import {
  FaUser,
  FaClipboardList,
  FaFileAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import userImg from "../../../../../public/images/user.png";
import React from "react";

type TabKey = "profile" | "portfolio" | "transactions" | "external";

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
  user: { name: string; email: string };
}

export default function Sidebar({
  activeTab,
  onTabChange,
  user,
}: SidebarProps) {
  const tabs: { key: TabKey; label: string; icon: React.ReactElement }[] = [
    { key: "profile", label: "My Profile", icon: <FaUser /> },
    { key: "portfolio", label: "My Portfolio", icon: <FaClipboardList /> },
    { key: "transactions", label: "Transactions", icon: <FaFileAlt /> },
    {
      key: "external",
      label: "External Transactions",
      icon: <FaExchangeAlt />,
    },
  ];

  return (
    <aside className="w-full md:w-80 bg-white border-r border-[#efefef] p-6">
      <div className="flex flex-col items-center mb-6 pb-4 border-b border-[#efefef]">
        <div className="w-40 h-40 bg-gray-200 rounded-full mb-3 overflow-hidden">
          <Image src={userImg} alt="User" width={160} height={160} />
        </div>
        <h2 className="text-gray-700 font-semibold text-2xl">{user.name}</h2>
        <p className="text-lg text-gray-500 ">{user.email}</p>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 cursor-pointer rounded
                ${activeTab === tab.key
                ? "bg-gradient-to-r from-[#d1efcf] to-white text-[#000] font-medium text-[16px]"
                : "hover:bg-gray-50 text-gray-700"
              }`}
          >
            <span className="text-[#5d7d5b]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
