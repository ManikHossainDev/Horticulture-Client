"use client";
import logo from "@/assets/logo/logo.svg";
import Button from "@/components/UI/Button";
import InputComponent from "@/components/UI/InputComponent";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { RegisterFormValues } from "@/types/authTypes";
import { Checkbox, Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { LuInstagram, LuYoutube } from "react-icons/lu";
import { TiSocialFacebook } from "react-icons/ti";
import { toast } from "sonner";
const Register = () => {
  const [role, setRole] = useState<"user" | "businessman">("user");
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const onFinish = async (values: RegisterFormValues) => {
    const registrationData = { ...values, role };

    try {
      const res = await registerUser(registrationData).unwrap();
      toast.success(res.message);
      router.push(
        `/verify-email?email=${registrationData.email}&type=register`
      );
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
          {/* Text content */}
          <div className="px-4 sm:px-6 md:px-0 hidden md:block">
            <div className="space-y-3 md:space-y-4 text-left">
              <h1 className="text-2xl md:text-3xl font-semibold leading-relaxed tracking-wide text-gray-900">
                🌿 Grow with Us! 🌿
              </h1>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-950">
                Your Ultimate Horticulture Hub
              </h1>
            </div>
            <p className="text-gray-700 text-lg py-4 leading-relaxed sm:text-center md:text-left">
              Whether you’re a plant lover shopping for quality horticulture
              products or a business looking to advertise in the green industry,
              our platform has everything you need to succeed.
              <h1>🌱 Shop Top-Quality Plants & Supplies</h1>
              <h1>🌱 Advertise Your Horticulture Business</h1>
              <h1>🌱 Connect with Local Experts</h1>
              Join us today for exclusive products, services, and advertising
              opportunities tailored to the horticulture community.
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
          {/* Form Content */}
          <div className="w-full max-w-[500px] mx-auto px-4 md:px-0">
            <div className="w-full flex justify-between gap-4 items-center mb-5">
              <button
                onClick={() => setRole("user")}
                className={`px-5 py-2.5 text-xs md:text-sm w-1/2 ${
                  role === "user"
                    ? "bg-primary text-white border border-primary"
                    : "bg-white text-gray-800 border border-gray-300"
                } rounded-lg`}
              >
                User
              </button>
              <button
                onClick={() => setRole("businessman")}
                className={`px-5 py-2.5 text-xs md:text-sm w-1/2 ${
                  role === "businessman"
                    ? "bg-primary text-white border border-primary"
                    : "bg-white text-gray-800 border border-gray-300"
                } rounded-lg`}
              >
                Business
              </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg">
              <div className="px-6 py-8 md:px-8 lg:px-10">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 pb-5 text-center md:text-left">
                  Register Your Account
                </h2>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-3"
                >
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <InputComponent placeholder="Full Name" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <InputComponent placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <InputComponent placeholder="Password" isPassword />
                  </Form.Item>
                  <Checkbox>Remember me</Checkbox>
                  <Form.Item>
                    <Button type="submit" loading={isLoading}>
                      Register
                    </Button>
                  </Form.Item>
                </Form>
                <div className="mt-5 text-center">
                  <span className="text-gray-600 text-sm md:text-lg">
                    Already have an account?
                  </span>
                  <Link
                    href="/login"
                    className="text-green-600 font-semibold hover:underline ml-1"
                  >
                    Log in here!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
