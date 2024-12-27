"use client";
import useUser from "@/hook/useUser";
import Image from "next/image";
import logo from "@/assets/logo/logo.svg";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import Link from "next/link";
const DashboardHeader = () => {
  const { user } = useUser();

  return (
    <div className="w-full py-4 px-5 bg-[#42B244]  text-white sticky top-0 left-0 z-10 ">
      <div className="flex justify-between items-center gap-3 space-y-1 md:space-y-0">
        <div className="hidden md:flex items-center gap-3">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={70}
              height={70}
              className="object-cover rounded-full"
            />
          </Link>
          <h1 className="text-lg italic">Horticulture Specialists</h1>
        </div>
        <div>
          
        </div>
        <div className="size-14 relative">
          <Image
            src={`${imageBaseUrl}${user?.image}`}
            fill
            className="rounded-full cursor-pointer object-cover  absolute"
            alt="User Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
