"use client";
import InputComponent from "@/components/UI/InputComponent";
import { ISearchSectionProps } from "@/types/types";
import { Form } from "antd";
import React, { useState } from "react";

interface SearchSectionProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (values: {
    isMarketplace: boolean;
    search: string;
    city?: string;
    zipCode?: string;
    state?: string;
    country?: string;
  }) => void;
  initialIsMarketplace?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch = () => {},
  initialIsMarketplace = false,
}) => {
  const [form] = Form.useForm();
  const [isMarketplace, setIsMarketplace] =
    useState<boolean>(initialIsMarketplace);
  // const [searchQuery, setSearchQuery] = useState<string>("");

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value); // Update state with input change
  //   onSearch({ isMarketplace, search: e.target.value });
  // };

  const handleSubmit = (values: ISearchSectionProps) => {
    onSearch({ isMarketplace, ...values });
    form.resetFields();
    return;
  };

  return (
    <section className="w-full md:container p-5 my-10">
      <div className="flex gap-5 items-center">
        <button
          className={`px-7 py-3 ${
            isMarketplace
              ? "bg-primary text-white"
              : "bg-[#EEEEEF] text-gray-500"
          } rounded-t-md`}
          onClick={() => setIsMarketplace(true)}
        >
          Marketplace
        </button>
        <button
          className={`px-6 py-3 ${
            !isMarketplace
              ? "bg-primary text-white"
              : "bg-[#EEEEEF] text-gray-500"
          } rounded-t-md`}
          onClick={() => setIsMarketplace(false)}
        >
          Locate a Business
        </button>
      </div>

      {/* Search Form */}
      <div className="w-full bg-primary rounded-b-md px-5 py-8">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          {/* Main Search Input */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Form.Item
              label={<h1 className="text-white">Search</h1>}
              name="search"
              className="w-full"
            >
              <InputComponent
                // value={searchQuery} // Bind value to state
                // onChange={handleSearchChange} // Handle input change
                placeholder={
                  isMarketplace
                    ? "Search for products (e.g., trees, plants, gardening tools)"
                    : "Search for horticulture specialists"
                }
              />
            </Form.Item>
            {/* Submit Button for Marketplace */}
            {isMarketplace && (
              <>
                <Form.Item
                  label={<h1 className="text-white">Category Name</h1>}
                  name="categoryName"
                  className="w-full "
                >
                  <InputComponent placeholder="category name" />
                </Form.Item>
                <Form.Item className="w-full md:w-auto">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-12 mt-2 md:mt-7 py-4 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors shadow"
                  >
                    Submit
                  </button>
                </Form.Item>
              </>
            )}
          </div>

          {/* Additional Inputs - Only Show When "Locate a Business" is Selected */}
          {!isMarketplace && (
            <div className="flex flex-col md:flex-row gap-4">
              <Form.Item
                label={<h1 className="text-white">Company Type</h1>}
                name="companyType"
                tooltip="Optional"
                className="w-full"
              >
                <InputComponent placeholder="company type" />
              </Form.Item>
              <Form.Item
                label={<h1 className="text-white">City</h1>}
                name="city"
                tooltip="Optional"
                className="w-full"
              >
                <InputComponent placeholder="New York" />
              </Form.Item>
              <Form.Item
                label={<h1 className="text-white">Zip Code</h1>}
                name="zipCode"
                tooltip="Optional"
                className="w-full"
              >
                <InputComponent placeholder="540045" />
              </Form.Item>

              <Form.Item
                label={<h1 className="text-white">State</h1>}
                name="state"
                tooltip="Optional"
                className="w-full"
              >
                <InputComponent placeholder="New York" />
              </Form.Item>

              {/* Added Country Field */}
              <Form.Item
                label={<h1 className="text-white">Country</h1>}
                name="country"
                tooltip="Optional"
                className="w-full"
              >
                <InputComponent placeholder="USA" />
              </Form.Item>

              <Form.Item>
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 mt-2 md:mt-7 py-4 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors shadow"
                >
                  Search
                </button>
              </Form.Item>
            </div>
          )}
        </Form>
      </div>
    </section>
  );
};

export default SearchSection;
