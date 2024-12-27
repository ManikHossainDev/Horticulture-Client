"use client";
import locateImage from "@/assets/locate/locate.png";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { useGetAllSubscriptionQuery } from "@/redux/features/subscription/subscriptionApi";
import { ISubscription } from "@/types/subscription";
import { Spin } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
  const { data: responseData, isLoading } =
    useGetAllSubscriptionQuery(undefined);
  const allSubscriptions = responseData?.data?.attributes?.results;
  console.log(allSubscriptions);
  let content = null;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center py-10">
        <Spin />
      </div>
    );
  } else if (!allSubscriptions?.length) {
    content = <NoDataFound />;
  } else {
    content = (
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 pb-10">
        {allSubscriptions?.map((subscription: ISubscription, i: number) => (
          <SubscriptionCard key={i} subscription={subscription} />
        ))}
      </div>
    );
  }
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
            Subscription
          </motion.h1>
        </div>
      </div>
      <div className="w-full md:container px-5 py-20">{content}</div>
    </section>
  );
};

export default Subscription;
