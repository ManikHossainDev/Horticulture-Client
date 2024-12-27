"use client";
import logo from "@/assets/logo/logo.svg";
import Button from "@/components/UI/Button";
import {
  useForgotPasswordMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { LuInstagram, LuYoutube } from "react-icons/lu";
import { TiSocialFacebook } from "react-icons/ti";
import OTPInput from "react-otp-input";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [oneTimeCode, setOneTimeCode] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "";

  // Handle OTP change
  const handleOtpChange = (otpValue: string) => {
    setOneTimeCode(otpValue);
  };

  // Handle form submission
  const onFinish = async () => {
    try {
      const res = await verifyEmail({ email, oneTimeCode }).unwrap();
      toast.success(res.message);
      router.push(
        `/${type === "register" ? "login" : `reset-password?email=${email}`}`
      );
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="w-full h-full px-4 py-10 md:px-6 lg:px-10">
      <div className="w-full max-w-7xl mx-auto">
        <Link href="/">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="rounded-full mb-8"
          />
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 py-10">
          {/* Left-Side Text Content */}
          <div className="px-4 sm:px-6 md:px-0 hidden md:block">
            <div className="space-y-3 md:space-y-4 text-left">
              <h1 className="text-2xl md:text-3xl font-semibold leading-relaxed tracking-wide text-gray-900">
                Verify Your Identity
              </h1>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-950">
                Secure Your Account
              </h1>
            </div>
            <p className="text-gray-700 text-lg py-4 leading-relaxed sm:text-center md:text-left">
              To ensure the security of your account, please enter the OTP sent
              to your registered email. This one-time password will confirm your
              identity and allow you to proceed.
            </p>
            <p className="text-gray-700 text-lg py-4 leading-relaxed sm:text-center md:text-left">
              If you didn’t receive the OTP, please check your spam folder or
              contact our support team for assistance.
            </p>
            <div className="my-5 space-y-2">
              <h1>
                📩 Contact us at:{" "}
                <a
                  href="mailto:horticulturespecialists@gmail.com"
                  className="text-blue-500"
                >
                  horticulturespecialists@gmail.com
                </a>
              </h1>
              <h1>
                🌐 Follow us on{" "}
                <a
                  href="https://www.facebook.com/HortSpec/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Facebook
                </a>{" "}
                ,{" "}
                <a
                  href="https://www.instagram.com/hortspec/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Instagram
                </a>
                , and{" "}
                <a
                  href="https://www.youtube.com/@hortspec9909"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  YouTube
                </a>{" "}
                for updates, tips, and more! 🌿
              </h1>
            </div>
          </div>
          {/* OTP Form Content */}
          <div className="w-full max-w-[450px] mx-auto px-4 md:px-0">
            <div className="bg-white shadow-lg rounded-lg">
              <div className="px-6 py-8 md:px-8 lg:px-10">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 pb-5 text-center md:text-left">
                  Enter Your OTP
                </h2>
                <OTPInput
                  value={oneTimeCode}
                  onChange={handleOtpChange}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  containerStyle="otp-container"
                  inputStyle={{
                    width: "100%",
                    maxWidth: "6.5rem",
                    height: "3rem",
                    margin: "0 0.5rem",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    borderBottom: "2px solid #4E4E4E",
                    textAlign: "center",
                    outline: "none",
                  }}
                />
                <div className="mt-5">
                  <Button type="submit" onClick={onFinish} loading={isLoading}>
                    Verify OTP
                  </Button>
                </div>
                <div className="mt-5 text-center">
                  <h1
                    onClick={handleResendOtp}
                    className="text-green-600 font-semibold hover:underline ml-1"
                  >
                    Resend OTP
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
