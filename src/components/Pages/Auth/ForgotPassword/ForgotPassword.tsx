"use client";
import logo from "@/assets/logo/logo.svg";
import Button from "@/components/UI/Button";
import InputComponent from "@/components/UI/InputComponent";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { LuInstagram, LuYoutube } from "react-icons/lu";
import { TiSocialFacebook } from "react-icons/ti";
import { toast } from "sonner";

interface LoginFormValues {
  email: string;
}

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();
  const onFinish = async (values: LoginFormValues) => {
    try {
      const res = await forgotPassword({ email: values.email }).unwrap();
      toast.success(res.message);
      router.push(`/verify-email?email=${values.email}&type=forgot-password`);
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
              <h1 className="text-2xl md:text-3xl  font-semibold leading-relaxed tracking-wide text-gray-900">
                Need Help Accessing Your Account?
              </h1>
              <h1 className="text-2xl md:text-3xl  font-semibold text-gray-950">
                We&apos;re Here to Assist You
              </h1>
            </div>
            <p className="text-gray-700 text-lg py-4 leading-relaxed sm:text-center md:text-left">
              If you’re having trouble logging in, don’t worry. Simply enter
              your registered email address below, and we’ll send you a link to
              reset your password. It’s quick, secure, and allows you to regain
              access to your account with ease.
            </p>
            <p className="text-gray-700 text-lg py-4 leading-relaxed sm:text-center md:text-left">
              Our team is dedicated to ensuring a smooth and secure experience.
              If you have any questions or require further assistance, feel free
              to reach out. We’re here to help you get back on track quickly.
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
            <div className="bg-white shadow-lg rounded-lg">
              <div className="px-6 py-8 md:px-8 lg:px-10">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 pb-5 text-center md:text-left">
                  Forgot Your Password?
                </h2>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-5"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <InputComponent placeholder="Enter your email" />
                  </Form.Item>
                  <Button type="submit" loading={isLoading}>
                    Send OTP
                  </Button>
                </Form>
                <div className="mt-5 text-center">
                  <Link
                    href="/login"
                    className="text-green-600 font-semibold hover:underline ml-1"
                  >
                    Back to Login
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

export default ForgotPassword;
