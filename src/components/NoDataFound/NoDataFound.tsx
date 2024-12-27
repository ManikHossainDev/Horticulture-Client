import Image from "next/image";
import noData from "@/assets/nodata/no-data-found.jpg";

const NoDataFound = ({ message }: { message?: string }) => {
  return (
    <div>
      <Image
        src={noData}
        width={200}
        height={100}
        alt="No Data Found"
        className="mx-auto"
      />
      <p className="text-center text-gray-600 font-semibold">
        {message || "No Data Found"}
      </p>
    </div>
  );
};

export default NoDataFound;
