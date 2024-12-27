"use client";
import React, { useState } from "react";
import { Table, Tag, Modal } from "antd";
import { TbEyeClosed } from "react-icons/tb";
import type { ColumnsType } from "antd/es/table";
import { useGetUserOrderQuery } from "@/redux/features/order/orderApi";
import Image from "next/image";
import { imageBaseUrl } from "@/config/imageBaseUrl";

interface IOrder {
  createdAt: string | number | Date;
  userId: any;
  key: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  orderStatus: string;
  orderDate: string;
  items: any[];
}

const Orders: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);

  // Fetch data for the current page
  const { data: responseData, isLoading } = useGetUserOrderQuery(currentPage);

  const orders = responseData?.data?.attributes?.results || [];

  const columns: ColumnsType<IOrder> = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Amount ($)",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "cyan"
              : status === "processing"
              ? "yellow"
              : status === "shipped"
              ? "orange"
              : status === "delivered"
              ? "green"
              : "red"
          }
          className="text-white px-2 py-1 rounded-lg uppercase"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <h1
          className="text-gray-600 cursor-pointer"
          onClick={() => handleViewOrder(record)}
        >
          <TbEyeClosed size={23} />
        </h1>
      ),
    },
  ];

  // Handle view order modal
  const handleViewOrder = (order: IOrder) => {
    setOrder(order);
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setOrder(null);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="w-full">
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-3.5">
        My Orders
      </h1>

      {/* Table displaying orders */}
      <Table
        columns={columns}
        dataSource={orders.map(
          (order: IOrder, index: { toString: () => any }) => ({
            ...order,
            key: index.toString(),
            customerName: order.userId.fullName,
            customerEmail: order.userId.email,
            orderDate: new Date(order.createdAt).toLocaleDateString(),
          })
        )}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: responseData?.data?.attributes?.totalResults || 0,
          onChange: handlePageChange,
        }}
        loading={isLoading}
        scroll={{ x: "max-content" }}
        className="mt-5"
      />

      {/* Modal for Order Details */}
      <Modal
        title={
          <h1 className="text-2xl font-semibold text-center">Order Details</h1>
        }
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        centered
      >
        <div className="space-y-6 mt-5">
          <div className="size-24 flex mx-auto justify-center items-center relative">
            <Image
              src={`${imageBaseUrl}${order?.userId?.image}`}
              fill
              alt="User Profile"
              className="rounded-full absolute"
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold">{order?.customerName}</h1>
            <h1 className="text-lg"> {order?.customerEmail}</h1>
          </div>
          <div className="">
            <h1>Order Items</h1>
            <Table
              columns={[
                {
                  title: "Product Name",
                  dataIndex: "productName",
                  key: "productName",
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                },
                {
                  title: "Size",
                  dataIndex: "size",
                  key: "size",
                },
                {
                  title: "Color",
                  dataIndex: "color",
                  key: "color",
                  render: (color) => (
                    <div
                      className="size-5 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  ),
                },
                {
                  title: "Price ($)",
                  dataIndex: "price",
                  key: "price",
                  render: (price) => `$${price.toFixed(2)}`,
                },
              ]}
              dataSource={order?.items.map((item: any) => ({
                ...item,
                key: item.id,
                productName: item?.name,
                quantity: item?.quantity,
                size: item?.size,
                color: item?.color,
                price: item?.price,
              }))}
              pagination={false}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Orders;
