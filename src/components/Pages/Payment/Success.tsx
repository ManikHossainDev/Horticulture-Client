/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { useUpdateOrderMutation } from "@/redux/features/order/orderApi"; // Use your order mutation
import { toast } from "sonner";
import successImage from "@/assets/payment/payment-success.gif";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";

const Success = () => {
  const [orderDetails, setOrderDetails] = useState<any>(null); // Store order details
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [updateOrder, { isLoading: updatingOrder, error }] =
    useUpdateOrderMutation();
  const dispatch = useDispatch();

  const [sessionId, setSessionId] = useState<string | null>(null); // Store session ID

  // Use effect to get session_id from the URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Parse the query params from the URL
    const sessionId = params.get("session_id"); // Get 'session_id' from the URL
    if (sessionId) {
      setSessionId(sessionId); // Set session_id if it exists in the URL
    }
  }, []);

  const handlePaymentSuccess = async (sessionId: string) => {
    try {
      setLoading(true);
      const response = await updateOrder(sessionId).unwrap(); // Call mutation hook to update order
      setOrderDetails(response);
      dispatch(clearCart());
    } catch (err: any) {
      toast.error(err?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger API call when session_id is found
  useEffect(() => {
    if (sessionId) {
      handlePaymentSuccess(sessionId);
    }
  }, [sessionId]);

  if (loading || updatingOrder) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-xl text-red-500">
        <h1>Error</h1>
        <p>
          We couldn&apos;t retrieve your order details. Please contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full container py-10 text-center space-y-8 bg-white">
      <Image src={successImage} alt="Success" className="w-72 h-56 mx-auto" />
      {/* Title */}
      <h1 className="text-4xl font-semibold text-green-600">
        Payment Successful!
      </h1>
      <p className="text-xl text-gray-700">Thank you for your order!</p>

      {/* Order Summary */}
      <div className="bg-gray-50 max-w-3xl mx-auto p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-medium text-gray-800">Order Summary</h2>
        <div className="flex justify-between text-gray-700">
          <span>Order ID:</span>
          <span className="font-semibold">
            {orderDetails?.data?.attributes._id}
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Status:</span>
          <span className="font-semibold text-green-600">
            {orderDetails?.data?.attributes.paymentStatus}
          </span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Total Amount:</span>
          <span className="font-semibold">
            ${orderDetails?.data?.attributes.totalAmount}
          </span>
        </div>
      </div>
      {/* Confirmation Message */}
      <div>
        <p className="text-lg text-gray-700">
          Your order is being processed and will be shipped soon. We will notify
          you once your order has shipped.
        </p>
        <p className="mt-4 text-xl font-semibold text-gray-900">
          Thank you for shopping with us!
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

export default Success;
