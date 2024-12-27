import AddCompany from "@/components/Dashboard/Businessman/AddCompany/AddCompany";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Company - Dashboard | Horticulture Specialists",
  description: "This is the add company page for our application",
  keywords: ["add company", "page", "example"],
};
const page = () => {
  return <AddCompany />;
};

export default page;
