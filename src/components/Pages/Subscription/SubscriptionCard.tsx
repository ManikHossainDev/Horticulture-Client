/* eslint-disable react/prop-types */
import { IoCheckmarkOutline } from "react-icons/io5";
import { toast } from "sonner";
import { ISubscription } from "../../../types/subscription";
import { usePurchaseSubscriptionMutation } from "@/redux/features/subscription/subscriptionApi";

const SubscriptionCard = ({
  subscription,
}: {
  subscription: ISubscription;
}) => {
  const [buySubscription] = usePurchaseSubscriptionMutation();
  const handleBuySubscription = async () => {
    try {
      const res = await buySubscription({
        subscriptionId: subscription._id,
      }).unwrap();
      window.location.href = res.data.attributes;
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  const { _id, name, duration, price, maxListings, benefits } = subscription;
  return (
    <div className="w-full bg-primary text-white border rounded-lg ">
      <h2 className="text-4xl font-bold py-7 text-center">{name}</h2>
      <div className="border-b border-white"></div>
      {/* Pricing Section */}
      <div className="flex gap-2 py-3 justify-center items-center">
        <p className="text-3xl md:text-5xl font-bold">${price}</p>
        <div className="text-xl">
          <p className="font-bold">For {duration} Month</p>
        </div>
      </div>

      {/* Max Listings */}
      <div className="text-center py-3">
        <p className="text-lg font-semibold">Max Listings: {maxListings}</p>
      </div>

      <div className="p-8">
        <ul className="text-left space-y-4 text-white">
          {/* Benefits List */}
          {benefits?.map((benefit, index) => (
            <li key={index} className="flex items-center">
              <span className="size-8 rounded-full flex justify-center items-center bg-white text-primary">
                <IoCheckmarkOutline size={20} />
              </span>
              <span className="ml-2">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Buttons */}
      <div className="p-5">
        <button
          className="bg-white text-primary py-2 px-4 rounded-lg w-full"
          onClick={handleBuySubscription}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
