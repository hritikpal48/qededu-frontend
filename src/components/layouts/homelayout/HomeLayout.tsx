"use client";

import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Toaster } from "react-hot-toast";
import { useSettingsDetails } from "@/services/settings.service";
import { SettingData } from "@/types/settingsType";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: settings, isLoading: SettingsLoading } = useSettingsDetails();
  const logo = settings?.logo ?? "default-logo.png";

  return (
    <>
      <Header logo={logo} />
      <main>{children}</main>
      <Footer
        data={settings ?? ({} as SettingData)}
        isLoading={SettingsLoading}
      />
      <Toaster position="top-right" />
    </>
  );
};

export default HomeLayout;
