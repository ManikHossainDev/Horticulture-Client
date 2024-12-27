import Settings from "@/components/Dashboard/User/Settings/Settings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Settings - Dashboard | Horticulture Specialists",
  description: "This is the settings page for our application",
  keywords: ["settings", "page", "example"],
};
const page = () => {
  return <Settings />;
};

export default page;
