import loadingImage from "@/assets/loading/loading.gif";
import Image from "next/image";
import React from "react";

const Loading = ({ className }: { className?: React.ReactNode }) => {
  return (
    <div
      className={`w-full ${className} h-screen  bg-white flex justify-center items-center py-16`}
    >
      <Image
        src={loadingImage}
        alt="loading"
        width={130}
        height={130}
        className="mx-auto"
      />
    </div>
  );
};

export default Loading;
