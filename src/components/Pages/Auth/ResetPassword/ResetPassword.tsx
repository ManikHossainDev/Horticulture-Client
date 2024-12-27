"use client";
import logo from "@/assets/logo/logo.svg";
import Button from "@/components/UI/Button";
import InputComponent from "@/components/UI/InputComponent";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { LuInstagram, LuYoutube } from "react-icons/lu";
import { TiSocialFacebook } from "react-icons/ti";
import { toast } from "sonner";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const onFinish = async (values: ResetPasswordFormValues) => {
    try {
      const res = await resetPassword({
        email,
        newPassword: values.password,
      }).unwrap();
      toast.success(res.message);
      router.push("/login");
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
              <h1 className="text-2xl md:text-3xl  font-semibold leading-relaxed tracking-wide text-gray-900">
                Set Your New Password
              </h1>
              <h1 className="text-2xl md:text-3xl  font-semibold text-gray-950">
                Keep Your Account Secure
              </h1>
            </div>
            <p className="text-gray-700 text-lg py-4 leading-relaxed sm:text-center md:text-left">
              To complete your password reset, please enter a new password for
              your account. Make sure it’s something secure and easy for you to
              remember.
            </p>
            <p className="text-gray-700 text-lg py-4 leading-relaxed sm:text-center md:text-left">
              If you encounter any issues, don’t hesitate to reach out to our
              support team. We’re here to help ensure the safety of your
              account.
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
          {/* Reset Password Form Content */}
          <div className="w-full max-w-[450px] mx-auto px-4 md:px-0">
            <div className="bg-white shadow-lg rounded-lg">
              <div className="px-6 py-8 md:px-8 lg:px-10">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 pb-5 text-center md:text-left">
                  Reset Your Password
                </h2>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-5"
                >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a new password",
                      },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                    ]}
                    hasFeedback
                  >
                    <InputComponent isPassword placeholder="New Password" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password",
                      },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match")
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <InputComponent
                      isPassword
                      placeholder="Confirm New Password"
                    />
                  </Form.Item>
                  <Button loading={isLoading} type="submit">
                    Reset Password
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

export default ResetPassword;
