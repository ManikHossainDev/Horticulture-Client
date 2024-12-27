"use client";
import locateImage from "@/assets/markateplace/markateplace.png";
import BreadcrumbComponent from "@/components/UI/BreadcrumbComponent";
import Button from "@/components/UI/Button";
import useUser from "@/hook/useUser";
import {
  clearCart,
  decrementQuantity,
  ICartItem,
  incrementQuantity,
  removeFromCart,
  selectCart,
  selectTotalPrice,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Table, TableColumnsType } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import { PiArrowBendUpLeftLight } from "react-icons/pi";
import { toast } from "sonner";

const breadcrumbItems = [
  {
    href: "/",
    title: (
      <div className="flex gap-2 items-center">
        <HiOutlineHome size={18} />
        <span>Home</span>
      </div>
    ),
  },
  {
    title: "Cart",
  },
];

// Sample coupon codes with discounts
const validCoupons: Record<string, number> = {
  SAVE10: 10, // 10% discount
  SAVE20: 20, // 20% discount
  FREESHIP: 0, // Free shipping but no discount
};

const Cart = () => {
  const { user } = useUser();
  const cartData = useAppSelector(selectCart);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  // Calculate total price
  const totalCartPrice = useAppSelector(selectTotalPrice);
  const discountAmount = (totalCartPrice * discountPercentage) / 100;
  const finalTotalPrice = totalCartPrice - discountAmount;

  // Handle coupon code application
  const applyCouponCode = () => {
    if (validCoupons[couponCode]) {
      setDiscountPercentage(validCoupons[couponCode]);
      setErrorMessage("");
    } else {
      setDiscountPercentage(0);
      setErrorMessage("Invalid coupon code");
    }
  };

  // Define columns for the Table
  const columns: TableColumnsType<ICartItem> = [
    {
      title: <h1 className="uppercase">Product</h1>,
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="size-20 relative">
            <Image
              fill
              src={`${record.image}`}
              alt="productImage"
              className="rounded-lg absolute"
            />
          </div>
          <span className="font-semibold">{record.name}</span>
        </div>
      ),
    },
    {
      title: <h1 className="uppercase">Category</h1>,
      dataIndex: "category",
    },
    {
      title: <h1 className="uppercase">Size</h1>,
      dataIndex: "size",
    },
    {
      title: <h1 className="uppercase">Color</h1>,
      dataIndex: "color",
      render: (text, record) => (
        <div
          className="size-8 rounded-full"
          style={{ backgroundColor: record.color }}
        />
      ),
    },
    {
      title: <h1 className="uppercase">Price</h1>,
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <span className="font-semibold">${record.price}</span>
      ),
    },
    {
      title: <h1 className="uppercase">Quantity</h1>,
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div className="flex rounded-lg overflow-hidden">
          <button
            onClick={() => dispatch(decrementQuantity(record.id))}
            className="px-4 py-3 border-l border-t border-b rounded-l-md border-[#929292]"
          >
            <FiMinus className="size-3" />
          </button>
          <h1 className="border flex justify-center items-center px-5 py-2 text-sm border-[#929292]">
            {record.quantity}
          </h1>
          <button
            onClick={() => dispatch(incrementQuantity(record.id))}
            className="px-4 py-3 border-r border-t border-b rounded-r-md border-[#929292]"
          >
            <FiPlus className="size-3" />
          </button>
        </div>
      ),
    },
    {
      title: <h1 className="uppercase">Total</h1>,
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record) => (
        <span className="font-semibold">${record.totalPrice}</span>
      ),
    },
    {
      dataIndex: "id",
      key: "remove",
      render: (_, record) => (
        <button
          onClick={() => dispatch(removeFromCart(record.id))}
          className="text-white size-6 rounded-full bg-primary flex justify-center items-center"
        >
          <FiX size={14} />
        </button>
      ),
    },
  ];

  // Handle checkout
  const handleCheckout = async () => {
    if (!user) {
      router.push("/login?redirectUrl=cart");
      return;
    }
    const orderData = {
      items: cartData,
      totalAmount: finalTotalPrice,
    };

    try {
      // Create the order and get the response
      const response = await createOrder(orderData).unwrap();

      // Check if the response is successful
      if (response?.success) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.attributes.checkoutUrl;
      } else {
        toast.error("Failed to create order.");
      }
    } catch (error: any) {
      // Handle errors
      toast.error(error?.data?.message || "An error occurred.");
    }
  };

  return (
    <section className="w-full">
      {/* Header Section with Background Image */}
      <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "tween", duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={locateImage}
            alt="PrivacyPolicy"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </motion.div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-5">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold"
          >
            Cart
          </motion.h1>
        </div>
      </div>
      <div className="w-full md:container px-5 py-10">
        {/* Breadcrumb */}
        <BreadcrumbComponent items={breadcrumbItems} />
        {/* Responsive Table Wrapper */}
        <div className="shadow px-4 py-8 md:px-10 md:py-8 rounded-lg space-y-8 my-5">
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={cartData}
              pagination={false}
              rowKey="id"
            />
          </div>
          {/* Buttons Section */}
          <div className="w-full flex flex-wrap justify-between gap-10 border-b pb-8">
            <div className="flex flex-wrap gap-8 items-center">
              <Link href="/marketplace">
                <button className="px-5 py-2 rounded-lg border bg-primary text-white duration-300 transition-all flex justify-center items-center gap-3">
                  <PiArrowBendUpLeftLight size={20} />
                  <span>Continue Shopping</span>
                </button>
              </Link>
              <button
                onClick={() => dispatch(clearCart())}
                className="px-5 py-2 rounded-lg border hover:bg-primary hover:text-white duration-300 transition-all flex justify-center items-center gap-3"
              >
                <FiX />
                Clear Cart
              </button>
            </div>
            <div className="text-end">
              <h1 className="text-xl font-semibold">
                Sub Total : ${finalTotalPrice.toFixed(2)}
              </h1>
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-5">
            {/* <div className="w-full md:w-1/2 space-y-3">
              <h1>
                Excepteur sint occaecat cupidatat non proident sunt in culpa qui
                officia deserunt mollit lorem ipsum anim id est laborum
                perspiciatis unde
              </h1>
              <InputComponent
                placeholder="Enter Your Coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button
                onClick={applyCouponCode}
                className="px-8 py-2 rounded-lg border bg-primary text-white duration-300 transition-all"
              >
                Apply
              </button>
            </div> */}
            <div>
              <Button onClick={handleCheckout} loading={isLoading}>
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
