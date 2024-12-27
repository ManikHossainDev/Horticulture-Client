import EditCompany from "@/components/Dashboard/Businessman/EditCompany/EditCompany";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Company - Dashboard | Horticulture Specialists",
  description: "This is the edit company page for our application",
  keywords: ["edit company", "page", "example"],
};
const page = ({ params }: { params: { id: string } }) => {
  return <EditCompany id={params.id} />;
};

export default page;
