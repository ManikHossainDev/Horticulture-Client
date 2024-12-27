'use client';
import React, { useEffect, useState } from "react";
import { useCompleteSubscriptionPaymentMutation } from "@/redux/features/subscription/subscriptionApi";
import { toast } from "sonner";
import Loading from "@/components/Loading/Loading";
import Image from "next/image";
import successImage from "@/assets/payment/payment-success.gif";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { updatedUser } from "@/redux/features/auth/authSlice";

const SubscriptionSuccess = () => {
  const params = new URLSearchParams(window.location.search);
  const session_id = params.get("session_id");
  const subscriptionId = params.get("subscriptionId");
  const [completePayment] = useCompleteSubscriptionPaymentMutation();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const asyncFunction = async () => {
      if (session_id && subscriptionId) {
        const paymentData = {
          sessionId: session_id as string,
          subscriptionId: subscriptionId as string,
        };

        try {
          const res = await completePayment(paymentData).unwrap();
          dispatch(updatedUser(res?.data?.attributes));
        } catch (error) {
          toast.error("Payment failed. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    asyncFunction();
  }, [session_id, subscriptionId, completePayment, dispatch]); // Added dispatch here

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full container py-10 text-center space-y-8 bg-white">
      <Image src={successImage} alt="Success" className="w-72 h-56 mx-auto" />
      <h1 className="text-4xl font-semibold text-green-600">
        Payment Successful!
      </h1>
      <p className="text-xl text-gray-700">
        Your subscription has been activated successfully. Thank you for
        subscribing!
      </p>

      {/* Subscription Summary */}
      <div className="bg-gray-50 max-w-3xl mx-auto p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-medium text-gray-800">
          Subscription Summary
        </h2>
        <div className="flex justify-between text-gray-700">
          <span>Subscription ID:</span>
          <span className="font-semibold">{subscriptionId}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Status:</span>
          <span className="font-semibold text-green-600">Active</span>
        </div>
      </div>

      {/* Confirmation Message */}
      <div>
        <p className="text-lg text-gray-700">
          You now have access to all premium features. We hope you enjoy your
          subscription!
        </p>
      </div>

      <div className="mt-4">
        <Link href="/">
          <button className="px-8 py-3 bg-primary text-white rounded-lg transition duration-200">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
