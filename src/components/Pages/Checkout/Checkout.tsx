"use client";
import locateImage from "@/assets/banner/marketeplce.webp";
import Button from "@/components/UI/Button";
import InputComponent from "@/components/UI/InputComponent";
import { Card, Divider, Form } from "antd";
import Image from "next/image";
import React from "react";
interface CheckoutFormValues {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const Checkout: React.FC = () => {
  const onFinish = (values: CheckoutFormValues) => {};

  return (
    <section className="w-full">
      {/* Header Section with Background Image */}
      <div className="relative w-full h-[200px] md:h-[300px]">
        <Image
          src={locateImage}
          alt="Marketplace"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-5">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            Checkout
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-5 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left side: Shipping Information */}
          <div>
            <Card
              title={
                <h1 className="text-xl font-semibold">Shipping Information</h1>
              }
              bordered={false}
            >
              <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  name: "",
                  address: "",
                  city: "",
                  postalCode: "",
                  country: "",
                }}
              >
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <InputComponent placeholder="Full Name" />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please enter your address" },
                  ]}
                >
                  <InputComponent placeholder="Address" />
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: "Please enter your city" },
                  ]}
                >
                  <InputComponent placeholder="City" />
                </Form.Item>

                <Form.Item
                  label="Postal Code"
                  name="postalCode"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your postal code",
                    },
                  ]}
                >
                  <InputComponent placeholder="Postal Code" />
                </Form.Item>

                <Form.Item
                  label="Country"
                  name="country"
                  rules={[
                    { required: true, message: "Please enter your country" },
                  ]}
                >
                  <InputComponent placeholder="Country" />
                </Form.Item>

                <Form.Item>
                  <Button>Place Order</Button>
                </Form.Item>
              </Form>
            </Card>
          </div>

          {/* Right side: Order Summary */}
          <div>
            <Card
              title={<h1 className="text-xl font-semibold">Order Summary</h1>}
              bordered={false}
            >
              <div className="flex justify-between mb-2 font-semibold text-[16px] ">
                <h1>Subtotal:</h1>
                <h1>$100.00</h1>
              </div>
              <div className="flex justify-between mb-2 font-semibold  text-[16px]">
                <h1>Shipping Fee:</h1>
                <h1>$10.00</h1>
              </div>
              <Divider />
              <div className="flex justify-between font-semibold">
                <h1 className="text-lg font-semibold">Total:</h1>
                <h1 className="text-lg font-semibold">$110.00</h1>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
