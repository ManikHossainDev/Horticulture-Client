"use client";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import useUser from "@/hook/useUser";
import { updatedUser } from "@/redux/features/auth/authSlice";
import {
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
  
} from "@/redux/features/profile/profileApi";
import { useAppDispatch } from "@/redux/hooks";
import { Form } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { IoCameraReverse } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { toast } from "sonner";
import InputComponent from "../UI/InputComponent";
import { Input} from "antd";
interface FormValues {
  fullName: string;
  email: string;
  phone: string;
}

const Dashboard = () => {
  const { user } = useUser();
  const [initialValues, setInitialValues] = useState<any>(null); // State to hold initial values
  const [isEditing, setIsEditing] = useState(false);
  const [isPreviewImage, setPreviewImage] = useState<string>("");
  const [updateProfile] = useUpdateProfileMutation();
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setInitialValues({
        fullName: user?.fullName || "John Doe",
        email: user?.email || "john.doe@example.com",
        phone: user?.phoneNumber || "N/A",
      });
    }
  }, [user]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      try {
        const formData = new FormData();
        formData.append("profileImage", file);
        const res = await updateProfileImage(formData).unwrap();
        dispatch(updatedUser(res?.data?.attributes));
        toast.success("Profile image changed successfully");
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    }
  };

  const onFinish = async (values: FormValues) => {
    try {
      const updatedData = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phone,
      };
      const res = await updateProfile(updatedData).unwrap();
      dispatch(updatedUser(res?.data?.attributes));
      toast.success(res.message);
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const onCancel = () => {
    setIsEditing(false); // Revert to read-only mode
  };

  return (
    <section className="w-full">
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-3.5">
        My Profile
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 py-10">
        <div className="col-span-full md:col-span-3 border py-8 rounded-lg">
          <div className="flex justify-center items-center flex-col gap-3 relative">
            {/* Image preview */}
            <div className="size-[110px] relative group">
              <Image
                src={isPreviewImage || `${imageBaseUrl}${user?.image}`}
                fill
                alt="logo"
                className="rounded-full absolute ring-4 ring-primary"
              />
              {/* Hover change label */}
              <label
                htmlFor="profileImage"
                className="absolute flex justify-center items-center  rounded-full bg-primary text-white size-9  top-16 -right-2 cursor-pointer"
              >
                <IoCameraReverse className="size-6" />
              </label>
            </div>
            {/* Hidden file input */}
            <input
              id="profileImage"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <h1 className="text-2xl font-semibold">{`${user?.fullName}`}</h1>
            <p className="text-gray-600">{`${
              user?.role === "businessman" ? "Business" : "User"
            }`}</p>
          </div>
          <div className="w-full h-[1px] bg-gray-200 mt-5"></div>
          <div className="p-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="size-12 flex justify-center items-center bg-primary rounded-full">
                <MdEmail className="size-5 text-white" />
              </div>
              <p>{`${user?.email}`}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-12 flex justify-center items-center bg-primary rounded-full">
                <IoIosCall className="size-5 text-white" />
              </div>
              <p>{`${user?.phoneNumber ? user?.phoneNumber : "N/A"}`}</p>
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-9 border p-5 rounded-lg">
          <div className="flex flex-col md:flex-row gap-5 justify-between  items-start md:items-center">
            <h1 className="text-xl font-semibold">
              {isEditing ? "Edit Profile" : "My Profile"}
            </h1>
            {!isEditing ? (
              <button
                className="px-8 rounded-lg py-2 bg-primary text-white"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  className="px-8 rounded-lg py-2 bg-primary text-white"
                  form="profileForm"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="px-8 rounded-lg py-2 bg-red-600 text-white"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {initialValues &&
            (isEditing ? (
              <Form
              id="profileForm"
              layout="vertical"
              initialValues={initialValues}
              onFinish={onFinish}
              className="mt-5"
            >
              <div className="flex flex-col gap-2">
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  className="space-y-1"
                >
                  <input type="text" className="w-full rounded-lg px-4 py-3 border border-primary outline-none" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  className="space-y-1"
                  rules={[
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <input
                    className="w-full rounded-lg px-4 py-3 border border-primary outline-none"
                    readOnly
                    placeholder="Enter email address"
                  />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  className="space-y-1"
                >
                  <input className="w-full rounded-lg px-4 py-3 border border-primary outline-none" placeholder="Enter phone number" />
                </Form.Item>
              </div>
            </Form>
            ) : (
              <Form
                id="profileForm"
                layout="vertical"
                initialValues={initialValues}
                className="mt-5"
              >
                <div className="flex flex-col gap-2">
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    className="space-y-1"
                  >
                    <InputComponent readOnly placeholder="Enter full name" />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    className="space-y-1"
                    rules={[
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <InputComponent
                      readOnly
                      placeholder="Enter email address"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    className="space-y-1"
                  >
                    <InputComponent readOnly placeholder="Enter phone number" />
                  </Form.Item>
                </div>
              </Form>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
