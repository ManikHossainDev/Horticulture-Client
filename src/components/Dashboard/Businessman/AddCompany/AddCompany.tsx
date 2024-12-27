/* eslint-disable no-undef */
"use client";
import React, { useState } from "react";
import { Form, message, Select } from "antd";
import InputComponent from "@/components/UI/InputComponent";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
import { PlusOutlined } from "@ant-design/icons";
import { useLoadScript } from "@react-google-maps/api";
import Button from "@/components/UI/Button";
import { useAddCompanyMutation } from "@/redux/features/company/companyApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
interface FormValues {
  companyName?: string;
  companyType?: string;
  companyLocation?: string;
  companyAbout?: string;
  companyDescription?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}
const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
  "places",
  "drawing",
  "geometry",
  "visualization",
];

const AddCompany: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [fileList, setFileList] = useState<File[]>([]);
  const [address, setAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  //api call
  const [addCompany, { isLoading }] = useAddCompanyMutation();
  // Handle file changes and enforce maximum upload limit
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const newFileList = [...files, ...fileList].slice(0, 10);
    setFileList(newFileList);
    if (newFileList.length > 10) {
      message.warning("You can only upload up to 10 images.");
    }
  };

  // Remove image from the list
  const handleRemoveImage = (index: number): void => {
    setFileList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const onFinish = async (values: FormValues) => {
    const {
      companyName,
      companyType,
      companyAbout,
      companyDescription,
      city,
      contactNumber,
      email,
      state,
      zipCode,
      website,
    } = values;
    const formData = new FormData();

    const companyLocation = {
      latitude,
      longitude,
    };

    const newCompanyInformation = {
      city: city,
      contactNumber: contactNumber,
      email: email,
      state: state,
      zipCode: zipCode,
      website: website ?? "",
      companyDescription: companyDescription ?? "",
      address: address,
    };

    //company name
    formData.append("companyName", companyName ?? "");
    //company location
    formData.append("companyLocation", JSON.stringify(companyLocation));
    //company type
    formData.append("companyType", companyType ?? "");
    //company about
    formData.append("companyAbout", companyAbout ?? "");
    //company information
    formData.append(
      "companyInformation",
      JSON.stringify(newCompanyInformation)
    );
    //company images
    for (let i = 0; i < fileList.length; i++) {
      formData.append("companyImages", fileList[i]);
    }
    try {
      const res = await addCompany(formData).unwrap();
      form.resetFields();
      toast.success(res.message);
      router.push("/dashboard/my-company");
    } catch (error: any) {
      toast.error(error?.data?.message);
      router.push("/subscription");
    }
  };

  const handlePlaceSelect = (
    autocomplete: google.maps.places.Autocomplete
  ): void => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      setLatitude(place.geometry.location?.lat() ?? null);
      setLongitude(place.geometry.location?.lng() ?? null);
      form.setFieldsValue({
        companyLocation: place.formatted_address ?? "",
      });
      setAddress(place.formatted_address ?? "");
      const addressComponents = place.address_components;
      const city =
        addressComponents?.find((component) =>
          component.types.includes("locality")
        )?.long_name ?? "";

      const state =
        addressComponents?.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name ?? "";
      let zipCode =
        addressComponents?.find((component) =>
          component.types.includes("postal_code")
        )?.long_name ?? "";

      if (!zipCode) {
        zipCode =
          addressComponents?.find((component) =>
            component.types.includes("administrative_area_level_2")
          )?.long_name ?? "";
      }

      form.setFieldsValue({
        city: city,
        state: state,
        zipCode: zipCode,
      });
    }
  };

  const handleLoadAutocomplete = (
    autocomplete: google.maps.places.Autocomplete
  ): void => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () =>
        handlePlaceSelect(autocomplete)
      );
    }
  };

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <section className="w-full">
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-3.5">
        Add Company
      </h1>
      <div className="mt-3">
        <p>Upload Company Images:</p>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex gap-3 my-2 flex-wrap">
          {fileList.map((file, index) => (
            <div key={index} className="relative">
              <div className="w-[100px] h-[100px] relative">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="rounded-lg absolute"
                  fill
                />
              </div>
              <TiDelete
                size={25}
                className="absolute top-[-10px] right-[-10px] text-red-600 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              />
            </div>
          ))}
          {fileList.length < 6 && (
            <label
              htmlFor="images"
              className="w-[100px] h-[100px] border border-dashed border-gray-950 flex flex-col justify-center items-center gap-1 cursor-pointer rounded-lg"
            >
              <PlusOutlined className="size-4" />
              <span>Upload</span>
            </label>
          )}
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10"
      >
        {/* Company Name */}
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: "Please enter the company name" }]}
        >
          <InputComponent placeholder="Enter company name" />
        </Form.Item>

        {/* Company Location */}
        <Form.Item
          label="Company Location"
          name="companyLocation"
          rules={[
            { required: true, message: "Please enter the company location" },
          ]}
        >
          <InputComponent
            type="text"
            onFocus={(e) => {
              const autocomplete = new window.google.maps.places.Autocomplete(
                e.target
              );
              handleLoadAutocomplete(autocomplete); // Load Autocomplete when focused
            }}
            placeholder="Enter location"
          />
        </Form.Item>
        <Form.Item label="Company Type" name="companyType">
          <Select
            placeholder="Select company type"
            size="large"
            options={[
              { value: "Private", label: "Private" },
              { value: "Public", label: "Public" },
            ]}
          />
        </Form.Item>
        {/* About the Company */}
        <Form.Item
          label="About the Company (Max 200)"
          name="companyAbout"
          rules={[
            {
              required: true,
              message: "Please provide information about the company",
            },
          ]}
        >
          <InputComponent
            isTextArea
            maxLength={200}
            placeholder="Enter about the company"
            rows={4}
          />
        </Form.Item>

        {/* Company Information */}
        <div className="col-span-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Company Description"
              name="companyDescription"
              rules={[
                {
                  required: true,
                  message: "Please enter the company description",
                },
              ]}
              className="col-span-full"
            >
              <InputComponent
                isTextArea
                placeholder="Enter description"
                rows={4}
              />
            </Form.Item>

            <Form.Item
              label="Contact Number"
              name="contactNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter a contact number",
                },
              ]}
            >
              <PhoneInput
                defaultCountry="US"
                value=""
                onChange={() => {}}
                style={{ width: "100%" }}
                international
                className={`w-full border border-gray-200 px-4 py-3 text-[16px] bg-white text-gray-700 rounded-lg focus:border-primary `}
                placeholder="Enter phone number"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter an email address",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <InputComponent placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label="Website"
              name="website"
              rules={[
                {
                  type: "url",
                  message: "Please enter a valid URL",
                },
                {
                  validator: (_, value) => {
                    if (value && !/^https:\/\//.test(value)) {
                      return Promise.reject(
                        new Error("Please enter a URL starting with https://")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputComponent placeholder="https://example.com" />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter a city" }]}
            >
              <InputComponent placeholder="Enter city" />
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please enter the state" }]}
            >
              <InputComponent placeholder="Enter state" />
            </Form.Item>

            <Form.Item label="ZIP Code" name="zipCode">
              <InputComponent placeholder="Enter ZIP code" />
            </Form.Item>
          </div>
        </div>

        <Form.Item className="col-span-full flex justify-end items-center">
          <div className="w-full md:w-56 mt-5">
            <Button type="submit" loading={isLoading}>
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </section>
  );
};

export default AddCompany;
