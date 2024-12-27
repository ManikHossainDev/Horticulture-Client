"use client";
import locateImage from "@/assets/markateplace/markateplace.png";
import { useGetPrivacyPolicyQuery } from "@/redux/features/settings/settingsApi";
import { motion } from "framer-motion";
import Image from "next/image";
const PrivacyPolicy = () => {
  const { data: responseData } = useGetPrivacyPolicyQuery(undefined);
  const privacyPolicyData = responseData?.data?.attributes;
  return (
    <section>
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
            alt="PrivacyPolicy"
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
            Privacy Policy
          </motion.h1>
        </div>
      </div>
      <div className="w-full md:container px-5 py-8 ">
        <h1 className="text-2xl md:text-3xl font-semibold mb-8">Privacy Policy</h1>
        <div
          dangerouslySetInnerHTML={{ __html: privacyPolicyData?.privacyPolicy }}
        ></div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
