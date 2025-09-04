"use client";

import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Toaster } from "react-hot-toast";
import { useSettingsDetails } from "@/services/settings.service";
import { SettingData } from "@/types/settingsType";

const defaultSettings: SettingData = {
  _id: "",
  logo: null,
  phoneNo: "",
  email: "",
  address: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  telegram: "",
  instagram: "",
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: settings, isLoading: SettingsLoading } = useSettingsDetails();

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer data={settings ?? defaultSettings} isLoading={SettingsLoading} />
      <Toaster position="top-right" />
    </>
  );
};

export default HomeLayout;
