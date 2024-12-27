"use client";
import useUser from "@/hook/useUser";
import Link from "next/link";
import React from "react";

const subNavLinks = [
  { label: "Home", href: "/" },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Locate",
    href: "/locate",
  },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

const SubNav = () => {
  const { user } = useUser() as any;
  return (
    <section className="w-full p-5 bg-[#EEEEEF]">
      <div className="w-full md:container flex justify-between items-center">
        <ul className="flex flex-wrap items-center gap-4">
          {subNavLinks.map((link, index) => (
            <React.Fragment key={link.label}>
              <li>
                <Link
                  href={link.href}
                  className="text-gray-500 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              </li>
              {index < subNavLinks.length - 1 && (
                <span className="text-gray-900">|</span>
              )}
            </React.Fragment>
          ))}
        </ul>
        {!!user && <h1 className="text-gray-500">Hi, {user?.fullName}!</h1>}
      </div>
    </section>
  );
};

export default SubNav;
