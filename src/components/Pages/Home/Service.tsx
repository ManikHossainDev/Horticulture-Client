"use client";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { useGetAllServiceQuery } from "@/redux/features/service/serviceApi";
import Image from "next/image";

export interface IService {
  _id: string;
  serviceName: string;
  serviceImage: string;
  serviceDescription: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
const Service = () => {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetAllServiceQuery(undefined);
  const allServices = responseData?.data?.attributes?.results;

  let content = null;

  if (isLoading) {
    content = <p>Loading...</p>;
  }else if (!isLoading && !isError && allServices?.length === 0) {
    content = <NoDataFound message="No Service Found" />;
  } else {
    content = (
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mx-auto p-5 ">
        {allServices?.map((service: IService) => {
          return (
            <div
              key={service?._id}
              className="flex items-center px-12 py-8  border relative rounded-lg"
            >
              <div className="size-16 bg-primary shadow-xl text-white flex items-center justify-center rounded-full  -left-8 top-14 absolute">
                <Image
                  width={26}
                  height={26}
                  src={`${imageBaseUrl}${service?.serviceImage}`}
                  alt="serviceImage"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {service?.serviceName}
                </h3>
                <p className="text-gray-800">
                  {service?.serviceDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section className="w-full p-5 py-16">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">
          Our <span className="text-pribg-primary">Services</span>
        </h1>
        <div className="w-20 h-1 bg-primary mx-auto mt-5"></div>
      </div>

      {content}
    </section>
  );
};

export default Service;
