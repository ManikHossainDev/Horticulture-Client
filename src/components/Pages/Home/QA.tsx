"use client";
import image from "@/assets/qa/qa.png";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { useGetFaqQuery } from "@/redux/features/faq/faqApi";
import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const QA = () => {
  const { data: responseData, isLoading, isError } = useGetFaqQuery(undefined);
  const faqAllData = responseData?.data?.attributes?.results;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (!isLoading && !isError && faqAllData?.length === 0) {
    content = <NoDataFound message="No Faq Found" />;
  } else {
    content = (
      <div className="space-y-4">
        {faqAllData?.map(
          (item: { question: string; answer: string }, index: number) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <p className="font-semibold text-gray-800">{item.question}</p>
                <div className="size-10 flex justify-center items-center bg-primary rounded-full">
                  {activeIndex === index ? (
                    <FaMinus size={14} className="text-white" />
                  ) : (
                    <FaPlus size={14} className="text-white" />
                  )}
                </div>
              </div>
              {activeIndex === index && (
                <p className="mt-2 text-gray-600">{item.answer}</p>
              )}
            </div>
          )
        )}
      </div>
    );
  }
  return (
    <section className="w-full px-5 py-20">
      <div className="w-full md:container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Responsive Image */}
        <div className="w-full mx-auto h-56 md:h-[400px] relative">
          <Image
            src={image}
            alt="QA Image"
            fill
            className="rounded-lg absolute object-cover"
          />
        </div>

        {/* Question & Answer Section */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left">
            Question & <span className="text-green-500">Answer</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mb-8 mx-auto md:mx-0"></div>
          {/* Questions List */}
          {content}
        </div>
      </div>
    </section>
  );
};

export default QA;
