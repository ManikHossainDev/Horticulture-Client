"use client";
import React, { useEffect } from "react";
import useUser from "@/hook/useUser";
import { useRouter } from "next/navigation";

const AuthValidationProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { user }: { user: any } = useUser();

  // Redirect user to login if they are an admin
  useEffect(() => {
    if (user && user.role === "admin") {
      router.push("/login");
    }
  }, [user, router]);

  if (user && user.role === "admin") {
    return null;
  }

  // If user is not an admin, render the children
  return <>{children}</>;
};

export default AuthValidationProviders;
