"use client";
import logo from "@/assets/logo/logo.svg";
import Button from "@/components/UI/Button";
import InputComponent from "@/components/UI/InputComponent";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { loggedUser, logoutUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LoginFormValues } from "@/types/authTypes";
import { Checkbox, Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const params = new URLSearchParams(window.location.search);
  const redirectUrl = params.get("redirectUrl");
  const logout = params.get("logout");
  const router = useRouter();
  const dispatch = useAppDispatch();

  if (logout) {
    dispatch(logoutUser());
  }
  const onFinish = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values).unwrap();
      if (res?.data?.attributes?.user?.role === "admin") {
        toast.error("You are not access the main website");
        return;
      }
      toast.success(res.message);
      dispatch(
        loggedUser({
          user: res?.data?.attributes?.user,
          token: res?.data?.attributes?.tokens?.accessToken,
          refreshToken: res?.data?.attributes?.tokens?.refreshToken,
        })
      );
      if (redirectUrl) {
        router.push(`/${redirectUrl}`);
      } else {
        router.push("/");
      }
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
                Welcome Back To Your Horticulture Hub
              </h1>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-950">
                Shop, Grow, and Thrive with us
              </h1>
            </div>
            <p className="text-gray-700 text-lg py-4 leading-relaxed sm:text-center md:text-left">
              As a valued member of our platform, you’re just a login away from
              accessing top-quality horticulture products, managing your
              business profile, and showcasing your offerings to a wider
              audience. Whether you’re here to shop for plants and supplies or
              promote your horticulture business, our platform is built to help
              you succeed in the green industry. If you have questions or need
              assistance, our dedicated support team is here to help. Let’s grow
              together—starting right here.
            </p>
            <div className="my-5 space-y-2">
              <h1>
                📩 Email Support:{" "}
                <a
                  href="mailto:horticulturespecialists@gmail.com"
                  className="text-blue-500"
                >
                  horticulturespecialists@gmail.com
                </a>
              </h1>
              <h1>
                🌐 Connect with us on{" "}
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
                to stay updated and engaged!”
              </h1>
            </div>
          </div>
          {/* Form Content */}
          <div className="w-full max-w-[500px] mx-auto px-4 md:px-0">
            <div className="bg-white shadow-lg rounded-lg">
              <div className="px-6 py-8 md:px-8 lg:px-10">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 pb-5 text-center md:text-left">
                  Log in to Your Account
                </h2>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-3"
                >
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
                  <div className="flex justify-between items-center">
                    <Form.Item name="remember" valuePropName="checked">
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Link
                      href="/forgot-password"
                      className="text-gray-600 hover:underline -mt-5"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button type="submit" loading={isLoading}>
                    Log In
                  </Button>
                </Form>
                <div className="mt-5 text-center">
                  <span className="text-gray-600 text-sm md:text-lg">
                    Don&apos;t have an account?
                  </span>
                  <Link
                    href="/register"
                    className="text-green-600 font-semibold hover:underline ml-1"
                  >
                    Sign up here!
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

export default Login;
