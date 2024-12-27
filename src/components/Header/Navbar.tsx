"use client";
import logo from "@/assets/logo/logo.svg";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import useUser from "@/hook/useUser";
import { logoutUser } from "@/redux/features/auth/authSlice";
import { selectTotalCount } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdCart } from "react-icons/io";
import ActiveLink from "./ActiveLink";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();
  const totalCartQuantity = useAppSelector(selectTotalCount);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLink = [
    {
      href: "/marketplace",
      label: "Marketplace",
    },
    {
      href: "/locate",
      label: "Locate",
    },
  ];
  if (user?.role === "businessman") {
    navLink.push({
      href: "/subscription",
      label: "Subscription",
    });
  }
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
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  //menu item
  const menuItems = [
    {
      key: "1",
      label: (
        <Link href="/dashboard" className="cursor-pointer px-4 py-1">
          Dashboard
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/dashboard/orders" className="cursor-pointer px-4 py-1">
          Order
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link href="/dashboard/settings" className="cursor-pointer px-4 py-1">
          Settings
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <div onClick={handleLogout} className="cursor-pointer px-4 py-1">
          Logout
        </div>
      ),
    },
  ];

  return (
    <nav className="w-full py-2 border-b">
      <div className="md:container flex justify-between items-center px-5">
        {/* logo */}
        <Link href="/">
          <Image
            src={logo}
            width={80}
            height={80}
            alt="logo"
            className="rounded-full"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-10">
          {navLink.map((link) => (
            <li key={link.href}>
              <ActiveLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>
        <div className=" hidden md:flex items-center gap-8">
          <Link href="/cart">
            <div className="relative">
              <IoMdCart className="size-9 text-primary" />
              <div className="size-[20px] bg-primary rounded-full flex justify-center items-center absolute -top-2 -right-1">
                <h1 className="text-xs text-white">{totalCartQuantity}</h1>
              </div>
            </div>
          </Link>
          {user ? (
            <Dropdown
              menu={{
                items: menuItems,
              }}
              placement="top"
              arrow
            >
              {user && (
                <div className="size-[50px] rounded-full bg-yellow-200 relative">
                  <Image
                    fill
                    src={`${imageBaseUrl}${user?.image}`}
                    alt="User Image"
                    className="rounded-full cursor-pointer ring ring-primary absolute"
                  />
                </div>
              )}
            </Dropdown>
          ) : (
            <>
              <Link href="/login">
                <button className="text-white bg-primary hover:bg-green-600 px-10 py-3 rounded-lg">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="px-8 py-3 border border-primary text-primary rounded-lg">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Drawer Button */}
        <Button
          type="text"
          className="md:hidden"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        {/* Drawer for Mobile Navigation */}
        <Drawer
          title="Horticulture Specialists"
          placement="right"
          onClose={closeDrawer}
          open={isDrawerOpen}
        >
          <ul className="flex flex-col gap-4">
            {subNavLinks?.map((link) => (
              <li key={link?.href}>
                <Link
                  href={link?.href}
                  className="text-gray-500 hover:text-gray-900"
                  onClick={closeDrawer} // Close the drawer on link click
                >
                  {link?.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 mt-5">
            <Link href="/cart">
              <div className="relative size-12" onClick={closeDrawer}>
                {/* Close the drawer on cart click */}
                <IoMdCart className="size-9 text-primary" />
                <div className="size-[20px] bg-primary rounded-full flex justify-center items-center absolute -top-2 -right-1">
                  <h1 className="text-xs text-white">{totalCartQuantity ? totalCartQuantity : 0 }</h1>
                </div>
              </div>
            </Link>
            {user?.fullName ? (
              <>
                <Link href="/dashboard">
                  <div
                    className="size-[60px] rounded-full bg-yellow-200 relative "
                    onClick={closeDrawer}
                  >
                    {" "}
                    {/* Close on dashboard click */}
                    <Image
                      fill
                      src={`${imageBaseUrl}${user?.image}`}
                      alt="User Image"
                      className="rounded-full cursor-pointer ring ring-primary absolute"
                    />
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-primary hover:bg-green-600 px-10 py-3 rounded-lg mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-4 ">
                <Link href="/login" onClick={closeDrawer}>
                  {" "}
                  {/* Close on login click */}
                  <button className="text-white bg-primary hover:bg-green-600 px-10 py-3 rounded-lg">
                    Login
                  </button>
                </Link>
                <Link href="/register" onClick={closeDrawer}>
                  {" "}
                  {/* Close on register click */}
                  <button className="px-8 py-3 border border-primary text-primary rounded-lg">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
