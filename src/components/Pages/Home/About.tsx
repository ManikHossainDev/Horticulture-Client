'use client';
import image2 from "@/assets/about/lawn.jpg";
import image1 from "@/assets/about/planting.jpg";
import image3 from "@/assets/about/stone.jpg";
import { useGetAboutUsQuery } from "@/redux/features/settings/settingsApi";
import Image from "next/image";
import { IoMdArrowDropright } from "react-icons/io";

const About = () => {
  return (
    <section className="w-full bg-[#FBFAFA] px-5 py-28">
      <div className="w-full md:container flex flex-col lg:flex-row gap-12">
        {/* Left Side: Introductory Text and Highlighted Box */}
        <div className="flex-1 space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            We are <span className="text-green-500">HS</span>
          </h2>
          <p className="italic text-gray-600 text-xl">
            Vestibulum quam pretium a consectetur hendrerit
          </p>

          <div className="bg-primary p-3 rounded-lg">
            <div className="border-2 border-spacing-4 border-dashed border-white p-10">
              <p className="text-white text-center text-xl italic">
                We provide service since 25 years and <br /> we are still top
                landscape company
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-lg">
            Vestibulum quam nisi, pretium a nibh sit amet, consectetur hendrerit
            dui. Aenean imperdiet lacus sit amet elit porta, et malesuada erat
            bibendum. Cras sed nunc massa. Quisque tempor dolor sit amet.
          </p>
        </div>

        {/* Right Side: Service Highlights */}
        <div className="flex-1">
          <div className="space-y-10">
            {/* Service Item */}
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="w-full md:w-[224px]">
                <Image
                  width={224}
                  height={128}
                  src={image1}
                  alt="Design & Planting"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Design & Planting</h3>
                <p className="text-gray-600">
                  Vestibulum quam nisi, pretium consectetur hendrerit mi. Aenean
                  imperdiet lacus sit erat amet elit
                </p>
                <a href="#" className="text-green-500 font-semibold">
                  Read More →
                </a>
              </div>
            </div>

            {/* Service Item */}
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="w-full md:w-[224px]">
                <Image
                  width={224}
                  height={128}
                  src={image2}
                  alt="Lawn Maintenance"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Lawn Maintenance</h3>
                <p className="text-gray-600">
                  Vestibulum quam nisi, pretium consectetur hendrerit mi. Aenean
                  imperdiet lacus sit erat amet elit
                </p>
                <a href="#" className="text-green-500 font-semibold">
                  Read More →
                </a>
              </div>
            </div>

            {/* Service Item */}
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="w-full md:w-[224px]">
                <Image
                  width={224}
                  height={128}
                  src={image3}
                  alt="Natural Stone Walks"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Natural Stone Walks</h3>
                <p className="text-gray-600">
                  Vestibulum quam nisi, pretium consectetur hendrerit mi. Aenean
                  imperdiet lacus sit erat amet elit
                </p>
                <a href="#" className="text-green-500 font-semibold">
                  Read More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
