import SubscriptionSuccess from "@/components/Pages/Subscription/Success/SubscriptionSuccess";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Subscription Success | Horticulture Specialists",
  description: "This is the subscription success page for our application",
  keywords: ["subscription success", "page", "example"],
};
const page = () => {
  return <SubscriptionSuccess />;
};

export default page;
