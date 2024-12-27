"use client";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import Slider from "react-slick";
import Image from "next/image"; // Optional for optimized images
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import Link from "next/link";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ICategory {
  _id: number;
  categoryName: string;
  categoryImage: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PopularCategory = () => {
  const { data: responseData } = useGetAllCategoryQuery(undefined);
  const categoryData = responseData?.data?.attributes?.results;

  // Slick settings for auto slide and responsive behavior
  const settings = {
    infinite: true,
    speed: 500,
    arrows: false, // Disable default arrows, we'll create custom ones
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Create a ref for the slider instance
  const sliderRef = useRef<Slider | null>(null);

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

  return (
    <section className="w-full p-5 py-16">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">
          Popular <span className="text-pribg-primary">Category</span>
        </h1>
        <div className="w-20 h-1 bg-primary mx-auto mt-5"></div>
      </div>

      <div className="w-full container mx-auto">
        <div className="relative">
          {/* Custom Previous Button */}
          <button
            className=" size-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full z-10"
            onClick={goToPrev}
          >
          <IoIosArrowBack size={24}/>
          </button>

          {/* Slick Slider */}
          <Slider {...settings} ref={sliderRef}>
            {categoryData?.map((category: ICategory, index: number) => (
              <div
                key={index}
                className="w-full flex flex-col items-center justify-center"
              >
                <Link href={`/marketplace?categoryName=${category?.categoryName}`}>
                  <div className="size-28 md:size-32 mx-auto overflow-hidden rounded-full flex justify-center items-center relative">
                    <Image
                      src={`${imageBaseUrl}${category?.categoryImage}`} // Replace with your image URL field
                      alt={category?.categoryName}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </Link>
                <p className="category-name mt-4 text-center">
                  {category?.categoryName}
                </p>
              </div>
            ))}
          </Slider>

          {/* Custom Next Button */}
          <button
            className="size-10 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 z-10"
            onClick={goToNext}
          >
          <IoIosArrowForward size={24}/>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;
