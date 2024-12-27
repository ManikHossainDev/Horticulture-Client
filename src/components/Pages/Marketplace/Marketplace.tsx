"use client";
import SearchSection from "../Home/SearchSection";
import Image from "next/image";
import locateImage from "@/assets/markateplace/markateplace.png";
import MarketplaceCard from "./MarketplaceCard";
import PaginationComponent from "@/components/UI/PaginationComponent";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import { IProduct } from "@/types/productType";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination, Spin } from "antd";

// Component Definition
const Marketplace: React.FC = () => {
  const [allProductsData, setAllProductsData] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const categoryName = searchParams.get("categoryName");

  // Fetch products based on the current page and search parameters
  const {
    data: responseData,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery({
    page: currentPage,
    limit: 10,
    searchTerm,
    categoryName,
  });

  // Get the list of products and total pages from the API response
  const results = responseData?.data?.attributes?.results;
  const totalPages = responseData?.data?.attributes?.totalPages;
  const totalResults = responseData?.data?.attributes?.totalResults;

  // Update the products data when results change
  useEffect(() => {
    if (results) {
      setAllProductsData(results);
    }
  }, [results, isLoading, isError]);

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearch = (values: Record<string, any>) => {
    const {
      search,
      companyType,
      categoryName,
      isMarketplace,
      city,
      state,
      zipCode,
      country,
    } = values;
    if (!isMarketplace) {
      const queryParams: Record<string, string> = {};
      if (search) queryParams.searchTerm = search;
      if (companyType) queryParams.companyType = companyType;
      if (city) queryParams.city = city;
      if (zipCode) queryParams.zipCode = zipCode;
      if (state) queryParams.state = state;
      if (country) queryParams.country = country;
      const queryString = new URLSearchParams(queryParams).toString();
      router.push(`/locate?${queryString}`);
      return;
    }
    setCurrentPage(1);
    const queryParams = new URLSearchParams(window.location.search);
    if (search) {
      queryParams.set("searchTerm", search);
    } else {
      queryParams.delete("searchTerm");
    }
    if (categoryName) {
      queryParams.set("categoryName", categoryName);
    } else {
      queryParams.delete("categoryName");
    }
    window.history.pushState({}, "", `?${queryParams.toString()}`);
  };

  // Set loading, error, and no data content
  let content: React.ReactNode = null;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center py-10">
        <Spin />
      </div>
    );
  } else if (allProductsData.length === 0) {
    content = <NoDataFound />;
  } else {
    content = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProductsData?.map((productData: IProduct, index: number) => (
            <MarketplaceCard key={index} product={productData} />
          ))}
        </div>
      </>
    );
  }
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
            Marketplace
          </motion.h1>
        </div>
      </div>

      {/* Search Section */}
      <SearchSection onSearch={handleSearch} initialIsMarketplace />

      {/* Main Product Grid */}
      <div className="w-full md:container px-5 py-10">
        {content}{" "}
        <div className="flex justify-between items-center mt-20">
          <h1 className="text-xl font-semibold text-gray-600">
            Search Results
          </h1>
          <Pagination
            current={currentPage}
            total={totalResults}
            pageSize={10}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
