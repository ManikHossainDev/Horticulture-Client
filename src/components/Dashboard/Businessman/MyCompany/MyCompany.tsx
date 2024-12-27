"use client";
import React, { useState } from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useDeleteMyCompanyMutation,
  useGetMyCompanyQuery,
} from "@/redux/features/company/companyApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";
import Swal from "sweetalert2"; // Import SweetAlert2

interface Company {
  key: string;
  companyName: string;
  location: string;
  authorName: string;
  contactNumber: string;
  email: string;
  avgRating: number;
  state: string;
  city: string;
  zipCode: string;
  isDeleted: boolean;
}

const MyCompany: React.FC = () => {
  const { data: responseData, isLoading } = useGetMyCompanyQuery(undefined);
  const [deleteCompany] = useDeleteMyCompanyMutation();
  const myCompanies = responseData?.data?.attributes?.results;
  const totalResults = responseData?.data?.attributes?.totalResults || 0;
  const pageSize = 10; // Number of items per page

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasDeleted, setHasDeleted] = useState<Set<string>>(new Set()); // Track deleted companies

  // Map the API response to the format used in the table
  const tableData: Company[] =
    myCompanies?.map(
      (company: {
        _id: string;
        companyName: string;
        companyLocation: { latitude: number; longitude: number };
        authorId: { fullName: string };
        companyInformation: {
          address: string;
          contactNumber: string;
          email: string;
          state: string;
          city: string;
          zipCode: string;
        };
        avgRating: number;
        isDeleted: boolean;
      }) => ({
        key: company?._id,
        companyName: company?.companyName,
        address: company?.companyInformation?.address || "N/A",
        companyEmail: company?.companyInformation?.email || "N/A",
        contactNumber: company?.companyInformation?.contactNumber || "N/A",
        avgRating: company?.avgRating || 0,
        state: company?.companyInformation?.state || "N/A",
        city: company?.companyInformation?.city || "N/A",
        zipCode: company?.companyInformation?.zipCode || "N/A",
        isDeleted: company?.isDeleted,
      })
    ) || [];

  const columns: ColumnsType<Company> = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Company Email",
      dataIndex: "companyEmail",
      key: "companyEmail",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "ZIP Code",
      dataIndex: "zipCode",
      key: "zipCode",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Average Rating",
      dataIndex: "avgRating",
      key: "avgRating",
      render: (rating) => <span>{rating}/5</span>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <button>
            <Link href={`/dashboard/edit-company/${record.key}`}>
              <FaEdit className="size-5 text-primary" />
            </Link>
          </button>
          <button onClick={() => handleDelete(record.key)}>
            <FaTrash className="size-4 text-rose-500" />
          </button>
        </div>
      ),
    },
  ];

  // Pagination handler
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    if (!hasDeleted.has(id)) {
      // Show SweetAlert2 for the first-time deletion
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this company.",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#DD6B55",
        confirmButtonColor: "#3FB249",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        try {
          const res = await deleteCompany(id).unwrap();
          toast.success(res.message);
          setHasDeleted((prev) => new Set(prev.add(id))); // Mark this company as deleted
        } catch (error: any) {
          toast.error(error?.data?.message);
        }
      }
    } else {
      // Proceed with deletion if already confirmed once
      try {
        const res = await deleteCompany(id).unwrap();
        toast.success(res.message);
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <section className="w-full">
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-3.5">
        My Companies
      </h1>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={tableData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalResults,
          onChange: handlePageChange, // Update the current page on page change
        }}
      />
    </section>
  );
};

export default MyCompany;
