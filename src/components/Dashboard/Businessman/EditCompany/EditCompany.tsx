/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { Form, Button as AntButton, message, Select } from "antd";
import InputComponent from "@/components/UI/InputComponent";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
import { PlusOutlined } from "@ant-design/icons";
import { useLoadScript } from "@react-google-maps/api";
import Button from "@/components/UI/Button";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  useDeleteCompanyImageMutation,
  useGetSingleCompanyQuery,
  useUpdateCompanyImagesMutation,
  useUpdateMyCompanyMutation,
} from "@/redux/features/company/companyApi";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import Loading from "@/components/Loading/Loading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CompanyInformation {
  companyDescription?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface FormValues {
  companyName?: string;
  companyType?: string;
  companyLocation?: string;
  companyAbout?: string;
  companyInformation?: CompanyInformation[];
}

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
  "places",
  "drawing",
  "geometry",
  "visualization",
];
const EditCompany = ({ id }: { id: string }) => {
  const { data: responseData } = useGetSingleCompanyQuery(id, {
    skip: !id,
  });

  const companyData = responseData?.data?.attributes?.company || {};
  const [form] = Form.useForm<FormValues>();
  const [companyImage, setCompanyImage] = useState<string[]>([]);
  const [address, setAddress] = useState<string>("");
  const router = useRouter();
  const [latitude, setLatitude] = useState<number | null>(
    companyData.companyLocation?.latitude ?? null
  );
  const [longitude, setLongitude] = useState<number | null>(
    companyData.companyLocation?.longitude ?? null
  );

  //
  const [updateCompanyImages] = useUpdateCompanyImagesMutation();
  const [removeCompanyImage] = useDeleteCompanyImageMutation();
  const [updateMyCompany, { isLoading }] = useUpdateMyCompanyMutation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  useEffect(() => {
    form.setFieldsValue({
      companyName: companyData.companyName || "",
      companyLocation: companyData?.companyInformation?.address || "",
      companyType: companyData.companyType || "",
      companyAbout: companyData.companyAbout || "",
      companyInformation: [
        {
          companyDescription:
            companyData.companyInformation?.companyDescription || "",
          contactNumber: companyData.companyInformation?.contactNumber || "",
          email: companyData.companyInformation?.email || "",
          website: companyData.companyInformation?.website || "",
          city: companyData.companyInformation?.city || "",
          state: companyData.companyInformation?.state || "",
          zipCode: companyData.companyInformation?.zipCode || "",
        },
      ],
    });
    setCompanyImage(companyData?.companyImages || []);
    setLatitude(companyData?.companyLocation?.latitude || null);
    setLongitude(companyData?.companyLocation?.longitude || null);
    setAddress(companyData?.companyInformation?.address || "");
  }, [companyData, form]);

  // Handle file changes and enforce maximum upload limit
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("companyId", companyData._id);
      files.forEach((file) => {
        formData.append("companyImages", file);
      });
      try {
        await updateCompanyImages(formData).unwrap();
      } catch (error: any) {
        toast.error(error?.data?.message || "Error updating company images");
      }
    }
  };

  // Remove image from the list
  const handleRemoveImage = async (imageName: string) => {
    try {
      await removeCompanyImage({
        companyId: companyData._id,
        imageName,
      }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const onFinish = async (values: FormValues) => {
    const { companyInformation } = values;
    if (!companyInformation) {
      toast.error("Please add company information");
    }
    // Transform companyInformation array into an object
    const transformedCompanyInformation = companyInformation
      ? companyInformation.reduce<CompanyInformation>((acc, curr) => {
          return { ...acc, ...curr };
        }, {})
      : {};

    const companyLocation = {
      latitude,
      longitude,
    };
    const newCompanyInformation = {
      ...transformedCompanyInformation,
      address: address,
    };
    try {
      const formData = new FormData();
      //company name
      formData.append("companyName", values?.companyName ?? "");
      //company type
      formData.append("companyType", values?.companyType ?? "");
      //company location
      formData.append("companyLocation", JSON.stringify(companyLocation));
      //company about
      formData.append("companyAbout", values.companyAbout ?? "");
      //company information
      formData.append(
        "companyInformation",
        JSON.stringify(newCompanyInformation)
      );
      const res = await updateMyCompany({
        id: companyData._id,
        data: formData,
      }).unwrap();
      toast.success(res.message);
      router.push("/dashboard/my-company");
    } catch (error: any) {
      toast.error(error?.data?.message);
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
        companyInformation: [
          {
            companyDescription:
              companyData.companyInformation?.companyDescription || "",
            contactNumber: companyData.companyInformation?.contactNumber || "",
            email: companyData.companyInformation?.email || "",
            website: companyData.companyInformation?.website || "",
            city: city,
            state: state,
            zipCode: zipCode,
          },
        ],
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
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-4">
        Edit Company
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
          {companyImage?.map((image, index) => (
            <div key={index} className="relative">
              <div className="w-[100px] h-[100px] relative">
                <Image
                  src={`${imageBaseUrl}${image}`}
                  alt="Preview"
                  className="rounded-lg absolute"
                  fill
                />
              </div>

              <TiDelete
                size={25}
                className="absolute top-[-10px] right-[-10px] text-red-600 cursor-pointer"
                onClick={() => handleRemoveImage(image)}
              />
            </div>
          ))}
          {companyImage?.length < 10 && (
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
            onChange={(e) => setAddress(e.target.value)}
            onFocus={(e) => {
              const autocomplete = new window.google.maps.places.Autocomplete(
                e.target
              );
              handleLoadAutocomplete(autocomplete);
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
          <Form.List name="companyInformation">
            {(fields) => (
              <div>
                {fields.map(({ key, name }) => (
                  <div
                    key={key}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <Form.Item
                      label="Company Description"
                      name={[name, "companyDescription"]}
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
                      name={[name, "contactNumber"]}
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
                      name={[name, "email"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter an email address",
                        },
                      ]}
                    >
                      <InputComponent placeholder="Enter email" />
                    </Form.Item>

                    <Form.Item
                      label="Website"
                      name={[name, "website"]}
                      rules={[
                        {
                          type: "url",
                          message: "Please enter a valid URL",
                        },
                        {
                          validator: (_, value) => {
                            if (value && !/^https:\/\//.test(value)) {
                              return Promise.reject(
                                new Error(
                                  "Please enter a URL starting with https://"
                                )
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
                      name={[name, "city"]}
                      rules={[
                        { required: true, message: "Please enter a city" },
                      ]}
                    >
                      <InputComponent placeholder="Enter city" />
                    </Form.Item>

                    <Form.Item
                      label="State"
                      name={[name, "state"]}
                      rules={[
                        { required: true, message: "Please enter the state" },
                      ]}
                    >
                      <InputComponent placeholder="Enter state" />
                    </Form.Item>

                    <Form.Item label="ZIP Code" name={[name, "zipCode"]}>
                      <InputComponent placeholder="Enter ZIP code" />
                    </Form.Item>
                  </div>
                ))}
              </div>
            )}
          </Form.List>
        </div>

        <Form.Item className="col-span-full flex justify-end items-center">
          <div className="w-full md:w-56 mt-5">
            <Button loading={isLoading} type="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </section>
  );
};

export default EditCompany;
