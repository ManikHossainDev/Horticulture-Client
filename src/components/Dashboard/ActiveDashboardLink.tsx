"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveDashboardLink = ({
  href,
  label,
  icon,
  closeDrawer, // Add closeDrawer function as prop
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  closeDrawer: () => void; // Define closeDrawer function type
}) => {
  const pathName = usePathname();
  const isActive = pathName == href;

  return (
    <Link
      href={href}
      onClick={closeDrawer} // Close the drawer when the link is clicked
      className={`px-10 py-5 flex items-center gap-3 ${
        isActive ? "bg-primary text-white" : "bg-white text-black"
      }  hover:bg-primary/70 hover:text-white transition-all duration-300`}
    >
      {icon}
      {label}
    </Link>
  );
};

export default ActiveDashboardLink;
