import MyCompany from "@/components/Dashboard/Businessman/MyCompany/MyCompany";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Company - Dashboard | Horticulture Specialists",
  description: "This is the my company page for our application",
  keywords: ["my company", "page", "example"],
};
const page = () => {
  return <MyCompany />;
};

export default page;
