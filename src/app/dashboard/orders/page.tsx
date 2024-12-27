import Orders from "@/components/Dashboard/User/Orders/Orders";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Orders - Dashboard | Horticulture Specialists",
  description: "This is the orders page for our application",
  keywords: ["orders", "page", "example"],
};

const page = () => {
  return <Orders />;
};

export default page;
