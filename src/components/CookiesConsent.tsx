"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
const CookiesConsent = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setIsVisible(true); // Show the banner if cookies are not accepted
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true"); // Store consent in localStorage
    setIsVisible(false); // Hide the banner
  };

  const handleRejectCookies = () => {
    localStorage.setItem("cookiesAccepted", "false"); // Store rejection in localStorage (optional)
    setIsVisible(false); // Hide the banner
  };

  if (!isVisible) return null; // If consent is already given, don't show the banner

  return (
    <div className="fixed w-full md:w-96 left-0-0  md:right-5 bottom-0 md:bottom-5 rounded-t md:rounded-lg bg-gray-100 text-gray-600 gap-5 p-4 flex flex-col justify-between  z-50">
      <p>
        This website uses cookies to enhance the user experience. By continuing
        to browse the site, you agree to our use of cookies.{" "}
        <Link href="/privacy-policy" className="text-blue-400 hover:underline">
          Learn more
        </Link>
        .
      </p>
      <div className="flex space-x-3">
        <button
          className="bg-primary px-4 py-2 text-white rounded"
          onClick={handleAcceptCookies}
        >
          Accept
        </button>
        <button
          className="bg-zinc-100 px-4 py-2 text-primary rounded "
          onClick={handleRejectCookies}
        >
         Decline
        </button>
      </div>
    </div>
  );
};

export default CookiesConsent;
