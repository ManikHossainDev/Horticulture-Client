"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import cancelImage from "@/assets/payment/cancle.webp";

const SubscriptionCancel = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/subscription"); // You can change the URL as per your routing setup
  };

  return (
    <div className="w-full h-full container py-10 text-center space-y-8 bg-white">
      <Image
        src={cancelImage}
        alt="Subscription Cancelled"
        className="w-72 h-56 mx-auto"
      />
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-red-500">
        No Subscription Found. Return to Main
      </h1>
      <p className="mt-4 text-center text-gray-600">
        We&apos;re sorry to see you go. Your subscription has been successfully
        cancelled.
      </p>
      <div className="mt-4">
        <button
          onClick={handleGoBack}
          className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Go Back to Subscriptions
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCancel;
