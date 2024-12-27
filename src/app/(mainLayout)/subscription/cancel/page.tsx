import SubscriptionCancel from "@/components/Pages/Subscription/Cancel/Cancel";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Subscription Cancel | Horticulture Specialists",
  description: "This is the subscription cancel page for our application",
  keywords: ["subscription cancel", "page", "example"],
};
const page = () => {
  return <SubscriptionCancel />;
};

export default page;
