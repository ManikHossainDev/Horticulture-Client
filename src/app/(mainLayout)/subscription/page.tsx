import Subscription from "@/components/Pages/Subscription/Subscription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription | Horticulture Specialists",
  description: "This is the subscription page for our application",
  keywords: ["subscription", "page", "example"],
};
const page = () => {
  return <Subscription />;
};

export default page;
