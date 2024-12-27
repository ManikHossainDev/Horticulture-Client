"use client";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/UI/Button";
import InputComponent from "@/components/UI/InputComponent";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import useUser from "@/hook/useUser";
import { Image as AntImage } from "antd";
import {
  useAddCompanyReviewMutation,
  useGetSingleCompanyQuery,
} from "@/redux/features/company/companyApi";
import { ICompany } from "@/types/horticultureType";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Form, Rate } from "antd";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaGlobe, FaPhone, FaRegStar, FaRegUser, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import Slider from "react-slick"; // Importing react-slick for the carousel
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { toast } from "sonner";

const LocateDetails = ({ id }: { id: string }) => {
  const { user } = useUser();
  const [form] = Form.useForm();
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);
  const sliderRef = useRef<Slider | null>(null);
  const router = useRouter();
  const [addReview, { isLoading: isReviewLoading }] =
    useAddCompanyReviewMutation();
  const { data: responseData, isLoading } = useGetSingleCompanyQuery(id, {
    skip: !id,
  });

  const companyData: ICompany = responseData?.data?.attributes?.company;
  const reviewsData = responseData?.data?.attributes?.company?.reviews;
  const isUserAddReview = reviewsData?.some(
    (review: { userId: { _id: string } }) => review.userId?._id === user?._id
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  if (!isLoaded) return <Loading />;
  const handleMarkerIcon = () => {
    if (typeof window !== "undefined" && window.google) {
      return new window.google.maps.Size(40, 40);
    }
    return null; // Fallback in case google maps is not available
  };

  // Function to go to the next slide
  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Function to go to the previous slide
  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const handleAddReview = async (values: {
    rating: number;
    comment: string;
  }) => {
    if (!user) {
      router.push(`/login?redirectUrl=locate/${id}`);
      return;
    }
    const data = {
      rating: values.rating,
      comment: values.comment,
      companyId: id,
    };

    try {
      const res = await addReview(data).unwrap();
      toast.success(res.message);
      form.resetFields();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else {
    const settingsMain = {
      asNavFor: nav2,
      ref: (slider: Slider) => setNav1(slider),
      arrows: false,
      dots: false,
    };

    const settingsThumbs = {
      asNavFor: nav1,
      ref: (slider: Slider) => setNav2(slider),
      slidesToShow: 4,
      swipeToSlide: true,
      focusOnSelect: true,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    };

    content = (
      <div className="w-full md:container mx-auto p-4 sm:p-6 md:p-8">
        {/* Header Section */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center sm:text-left">
          Locate Horticulture Specialist
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 my-7">
          {/* Company Details Section */}
          <div className="bg-zinc-50 p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 rounded-t-md border-b-2 border-dashed border-gray-300 gap-5">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-600">
                {companyData?.companyName}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg text-gray-600">
                  {companyData?.avgRating || 0} Rating
                </span>
                {[...Array(5)]?.map((_, i) => {
                  const ratingValue = companyData?.avgRating;
                  if (i + 1 <= ratingValue) {
                    return (
                      <FaStar key={i} size={16} className="text-yellow-400" />
                    );
                  } else if (i < ratingValue && i + 1 > ratingValue) {
                    return (
                      <FaStar
                        key={i}
                        size={16}
                        className="text-yellow-400"
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                      />
                    );
                  } else {
                    return (
                      <FaRegStar
                        key={i}
                        size={16}
                        className="text-yellow-400"
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start my-3 gap-5">
              <div className="w-full md:w-1/2 flex flex-col gap-3">
                {/* Tumble Carousel */}
                <Slider {...settingsMain} ref={sliderRef}>
                  {companyData?.companyImages?.map(
                    (image: string, index: number) => (
                      <AntImage
                        key={index}
                        src={`${imageBaseUrl}${image}`}
                        alt={`Product image ${index + 1}`}
                        width={350}
                        height={250}
                        className="w-full h-full rounded-lg absolute"
                      />
                    )
                  )}
                </Slider>
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                <h1 className="text-lg sm:text-xl">
                  Company Name:{" "}
                  <span className="text-primary">
                    {companyData?.companyName}
                  </span>
                </h1>
                <h1 className="flex gap-1 items-center">
                  <FaRegUser className="text-primary" size={20} />
                  <span>{companyData?.authorId?.fullName}</span>
                </h1>
                <div>
                  <h1 className="text-lg font-semibold">About</h1>
                  <p>{companyData?.companyAbout}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <button
                className="size-8 absolute -left-3 top-1/2 transform -translate-y-1/2 bg-primary border text-white rounded-full p-2 z-10 "
                onClick={goToPrev}
              >
                <IoIosArrowBack size={16} />
              </button>
              <Slider {...settingsThumbs} className="mt-2">
                {companyData?.companyImages?.map(
                  (image: string, index: number) => (
                    <div key={index} className="px-2">
                      <div className="w-full h-20 rounded-lg relative">
                        <Image
                          src={`${imageBaseUrl}${image}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="cursor-pointer rounded-lg absolute"
                          fill
                        />
                      </div>
                    </div>
                  )
                )}
              </Slider>
              <button
                className="size-8 rounded-full absolute -right-3 top-1/2 transform -translate-y-1/2 bg-primary border text-white p-2 z-10"
                onClick={goToNext}
              >
                <IoIosArrowForward size={16} />
              </button>
            </div>
          </div>
          {/* Map Section */}
          <div className="w-full h-64 lg:h-auto relative rounded-lg overflow-hidden">
            <GoogleMap
              zoom={15}
              center={{
                lat: companyData?.companyLocation?.latitude ?? 0,
                lng: companyData?.companyLocation?.longitude ?? 0,
              }}
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
            >
              <Marker
                position={{
                  lat: companyData?.companyLocation?.latitude ?? 0,
                  lng: companyData?.companyLocation?.longitude ?? 0,
                }}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker icon
                  scaledSize: handleMarkerIcon(), // Ensuring the size is applied only when google is available
                }}
              />
            </GoogleMap>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 my-10 md:my-16">
          <div className="space-y-8">
            <div className="bg-zinc-50 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Company Information</h2>
              <p className="text-gray-700 mt-3">
                {companyData?.companyInformation.companyDescription}
              </p>
            </div>
            {
              <div className="bg-zinc-50 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Reviews</h2>

                {companyData?.authorId?._id !== user?._id &&
                  !isUserAddReview && (
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleAddReview}
                      className="space-y-4 mt-3"
                    >
                      <Form.Item
                        name="rating"
                        label="Your Rating"
                        rules={[
                          {
                            required: true,
                            message: "Please provide a rating",
                          },
                        ]}
                      >
                        <Rate allowHalf />
                      </Form.Item>

                      <Form.Item
                        name="comment"
                        label="Your Comment"
                        rules={[
                          {
                            required: true,
                            message: "Please provide your comment",
                          },
                          {
                            min: 10,
                            message:
                              "Comment must be at least 10 characters long",
                          },
                        ]}
                      >
                        <InputComponent
                          isTextArea
                          rows={3}
                          placeholder="Enter your comment"
                        />
                      </Form.Item>

                      <Button loading={isReviewLoading} type="submit">
                        Leave a Review
                      </Button>
                    </Form>
                  )}

                {/* Display Existing Reviews */}
                <div
                  className={`w-full space-y-5 mt-6 h-full  ${
                    reviewsData?.length && "h-[400px]"
                  } overflow-y-scroll scrollbar-hidden`}
                >
                  {reviewsData?.map(
                    (
                      review: {
                        rating: number;
                        userId: { image: string; fullName: string };
                        comment: string;
                        createdAt: string;
                      },
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="flex flex-col items-start gap-4 bg-zinc-100 px-2 py-3 rounded-lg"
                      >
                        <div className="size-[60px] rounded-full relative">
                          <Image
                            src={`${imageBaseUrl}${review?.userId?.image}`}
                            alt={review?.userId?.fullName}
                            fill
                            className="object-cover rounded-full absolute"
                          />
                        </div>
                        <div className="w-full space-y-2">
                          <div className="flex justify-between items-center gap-4">
                            <p className="font-semibold">
                              {review?.userId?.fullName}
                            </p>
                            <h1 className="text-sm">
                              {review?.createdAt
                                ? moment(review.createdAt).format("DD MMM YYYY")
                                : "N/A"}
                            </h1>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)]?.map((_, i) => {
                              const ratingValue = review.rating;
                              if (i + 1 <= ratingValue) {
                                return (
                                  <FaStar
                                    key={i}
                                    size={16}
                                    className="text-yellow-400"
                                  />
                                );
                              } else if (
                                i < ratingValue &&
                                i + 1 > ratingValue
                              ) {
                                return (
                                  <FaStar
                                    key={i}
                                    size={16}
                                    className="text-yellow-400"
                                    style={{ clipPath: "inset(0 50% 0 0)" }}
                                  />
                                );
                              } else {
                                return (
                                  <FaRegStar
                                    key={i}
                                    size={16}
                                    className="text-yellow-400"
                                  />
                                );
                              }
                            })}
                          </div>
                          <p className="text-gray-700 mt-1 text-sm break-words">
                            {review?.comment}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            }
          </div>

          <div className="space-y-10">
            <div className="bg-zinc-50 p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <div className="space-y-2 mt-5">
                <p className="flex items-center gap-2">
                  <FaPhone className="text-primary" />{" "}
                  {companyData?.companyInformation?.contactNumber}
                </p>
                <p className="flex items-center gap-2">
                  <FaGlobe className="text-primary" />{" "}
                  <a
                    href={companyData?.companyInformation?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {companyData?.companyInformation?.website}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <SiGmail className="text-primary" />{" "}
                  {companyData?.companyInformation?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default LocateDetails;
