import PrivacyPolicy from "@/components/Pages/PrivacyPolicy/PrivacyPolicy";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Privacy Policy | Horticulture Specialists",
  description: "This is the privacy policy page for our application",
  keywords: ["privacy policy", "page", "example"],
};
const page = () => {
  return <PrivacyPolicy />;
};

export default page;
