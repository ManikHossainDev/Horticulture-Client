"use client";
import React from "react";
import { Form } from "antd";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/UI/InputComponent";
import Button from "@/components/UI/Button";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

const Settings = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handleSaveChanges = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const { currentPassword, newPassword } = values;
    try {
      const res = await changePassword({
        currentPassword,
        newPassword,
      }).unwrap();
      toast.success("Password updated successfully");
      router.push("/login");
    } catch (error:any) {
      toast.error(error?.data?.message || "Couldn't save changes to password");
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-3.5">
        Settings
      </h1>

      <Form
        form={form}
        layout="vertical"
        className="w-full grid grid-cols-1 gap-5 my-8"
        onFinish={handleSaveChanges} // Ant Design onFinish method
      >
        <Form.Item
          label="Current Password"
          name="currentPassword"
          rules={[
            { required: true, message: "Please enter your current password" },
          ]}
        >
          <InputComponent isPassword />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please enter your new password" },
            {
              min: 6,
              message: "Password must be at least 6 characters long",
            },
          ]}
        >
          <InputComponent isPassword />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <InputComponent isPassword />
        </Form.Item>

        <div className="flex justify-end">
          <Button type="submit" loading={isLoading}>
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
