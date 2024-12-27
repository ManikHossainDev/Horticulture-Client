import Cancel from "@/components/Pages/Payment/Cancel";
import { Metadata } from "next";
import React from "react";

export const metadata : Metadata = {
  title: "Payment Cancel | Horticulture Specialists",
  description: "This is the payment cancel page for our application",
  keywords: ["payment cancel", "page", "example"],
}

const page = () => {
  return <Cancel />;
};

export default page;
