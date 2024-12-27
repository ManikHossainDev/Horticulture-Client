"use client";
import locateImage from "@/assets/markateplace/markateplace.png";
import image from "@/assets/banner/contactus.png";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { useGetAllServiceQuery } from "@/redux/features/service/serviceApi";
import { motion } from "framer-motion";
import Image from "next/image";
import { IService } from "../Home/Service";
import { useGetAboutUsQuery } from "@/redux/features/settings/settingsApi";

const AboutUs = () => {
  const { data: aboutUsData } = useGetAboutUsQuery(undefined);
  const { data: responseData } = useGetAllServiceQuery(undefined);
  const allServices = responseData?.data?.attributes?.results;
  const aboutData = aboutUsData?.data?.attributes;
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
            alt="About Us"
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
            About Us
          </motion.h1>
        </div>
      </div>

      {/* Introductory Section */}
      {/* <div className="w-full md:container mx-auto px-5 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div dangerouslySetInnerHTML={{ __html: aboutData?.aboutUs }}></div>
      </div> */}
      {/* Introductory Section */}
      <div className="w-full md:container mx-auto px-5 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-[30%] h-[200px] md:h-[500px] relative">
          <Image
            src={image}
            alt="About Us"
            layout="fill"
            objectFit="cover"
            className="absolute rounded-lg"
          />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-12 justify-between items-center gap-8">
          <div className="col-span-full md:col-span-7">
            <h3 className="text-2xl md:text-4xl lg:text-5xl mb-4 text-gray-700 font-semibold">
              The Story Behind Our Horticulture Love
            </h3>
            <p className="text-gray-600 mb-4">
              We are a team of horticulture professionals, here to assist with
              your residential or commercial needs. Hort Spec has become the
              go-to Horticultural Consultant, Advertising/Marketing, and
              E-commerce platform, with a variety of satisfied clients in the
              Central New Jersey area. Since 2020, Hort Spec has built a
              reputation of reliability and value with our commitment to meeting
              the requirements of our clients. Creating connections between
              homeowners and businesses is what we do best, always done with our
              signature touch.
            </p>
            <ul className="list-disc ml-5 space-y-2 text-primary">
              <li>Promote local businesses. </li>
              <li>Top quality products on our marketplace.</li>
              <li>Providing free plant care tips and guides.</li>
            </ul>
          </div>
          <div className=" col-span-full md:col-span-5 space-y-4">
            <div className="w-full h-56 relative">
              <Image
                src={locateImage}
                alt="About Us"
                layout="fill"
                objectFit="cover"
                className="w-full h-full rounded-lg absolute"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-600">Company History</h3>
            <p className="text-gray-600">
              Founded in 2020, Hort Spec began as an online e-commerce platform
              designed to help local businesses, including seasonal startups,
              veteran-owned companies, and mom-and-pop shops, advertise their
              products and services more effectively
            </p>
          </div>
        </div>
      </div>

      {/* Icon Section */}
      <div className="bg-gray-100 py-20">
        <div className="w-full md:container mx-auto p-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
            Our Services
          </h1>
          <div className="px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {allServices?.map((service: IService) => {
              return (
                <div
                  key={service?._id}
                  className="flex flex-col px-12 py-8  border rounded-lg gap-5"
                >
                  <div className="size-16 bg-primary shadow-xl text-white flex items-center justify-center rounded-full">
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
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
