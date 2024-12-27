import Success from "@/components/Pages/Payment/Success";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Payment Success | Horticulture Specialists",
  description: "This is the payment success page for our application",
  keywords: ["payment success", "page", "example"],
};
const page = () => {
  return <Success />;
};

export default page;
