import MyFavorite from "@/components/Dashboard/User/MyFavorite/MyFavorite";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Wishlist - Dashboard | Horticulture Specialists",
  description: "This is the my wishlist page for our application",
  keywords: ["my wishlist", "page", "example"],
};
const page = () => {
  return <MyFavorite />;
};

export default page;
