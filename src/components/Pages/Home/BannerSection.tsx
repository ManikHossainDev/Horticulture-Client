"use client";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { useGetBannerImagesQuery } from "@/redux/features/bannerImage/bannerImageApi";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SearchSection from "./SearchSection";
import { useRouter } from "next/navigation";

interface Banner {
  _id: string;
  bannerImage: string;
  title: string;
  description: string;
}

const BannerSection: React.FC = () => {
  const router = useRouter();
  const { data: responseData } = useGetBannerImagesQuery(undefined);
  const bannerImages: Banner[] = responseData?.data?.attributes?.results || [];

  const handleSearch = (values: Record<string, any>): void => {
    const {
      search,
      isMarketplace,
      companyType,
      categoryName,
      city,
      country,
      state,
      zipCode,
    } = values;

    // Marketplace search query
    if (isMarketplace) {
      if (search) {
        router.push("/marketplace?searchTerm=" + search);
      }
      if (categoryName) {
        router.push("/marketplace?categoryName=" + categoryName);
      }

      return;
    } else {
      // Prepare the `locate` search query
      const queryParams: Record<string, string> = {};

      // Add optional params if they exist
      if (search) queryParams.searchTerm = search;
      if (companyType) queryParams.companyType = companyType;
      if (city) queryParams.city = city;
      if (state) queryParams.state = state;
      if (zipCode) queryParams.zipCode = zipCode;
      if (country) queryParams.country = country;

      // Build the query string dynamically
      const queryString = new URLSearchParams(queryParams).toString();

      router.push(`/locate?${queryString}`);
    }
  };

  const autoplay = useRef(Autoplay({ delay: 8000, stopOnInteraction: false }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);

    // Cleanup listener
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <>
      <section className="w-full relative overflow-hidden">
        <div className="embla h-56 md:h-[500px]" ref={emblaRef}>
          <div className="embla__container flex">
            {bannerImages.map((banner, index) => (
              <div
                className="embla__slide flex-[0_0_100%] relative"
                key={banner._id}
              >
                <motion.div className="relative w-full h-56 md:h-[500px]">
                  {/* Background Image */}
                  <Image
                    src={`${imageBaseUrl}${banner?.bannerImage}`}
                    alt={banner?.title}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="z-0"
                  />

                  {/* Overlay Content */}
                  <motion.div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-30 p-5">
                    <motion.h1
                      className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-4"
                      initial={{ opacity: 0, y: 100 }}
                      animate={
                        currentIndex === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0 }
                      }
                      transition={{ type: "spring", duration: 0.7 }}
                    >
                      {banner.title}
                    </motion.h1>
                    <motion.p
                      className="text-gray-200 mb-6"
                      initial={{ opacity: 0, y: 100 }}
                      animate={
                        currentIndex === index
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0 }
                      }
                      transition={{ type: "spring", duration: 0.9 }}
                    >
                      {banner.description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <SearchSection onSearch={handleSearch} initialIsMarketplace={true} />
      </section>
    </>
  );
};

export default BannerSection;
