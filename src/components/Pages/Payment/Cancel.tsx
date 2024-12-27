"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import cancelImage from "@/assets/payment/cancle.webp";
const Cancel = () => {
  const router = useRouter();

  const handleGoBack = () => {
    // Redirect the user back to their shopping cart page
    router.push("/cart");
  };

  return (
    <div className="w-full h-full container py-10 text-center space-y-8 bg-white">
      <Image src={cancelImage} alt="Success" className="w-72 h-56 mx-auto" />
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-red-500">
        Payment Cancelled
      </h1>
      <p className="mt-4 text-center text-gray-600">
        We&apos;re sorry, but your payment was not completed.
      </p>
      <div className="mt-4">
        <button
          onClick={handleGoBack}
          className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Go Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Cancel;
