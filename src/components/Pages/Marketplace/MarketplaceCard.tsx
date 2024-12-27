import { imageBaseUrl } from "@/config/imageBaseUrl";
import { IProduct } from "@/types/productType";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";

const MarketplaceCard = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      id: product?._id,
      name: product?.productName,
      price: product?.sizes[0].price,
      image: `${imageBaseUrl}${product?.productImages[0]}`,
      size: product?.sizes[0].size,
      color: product?.sizes[0].colors[0] || "N/A",
      quantity: 1,
      category: product?.category,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="bg-white border rounded-lg flex flex-col justify-between">
      <div className="w-full h-[220px] relative">
        <Link href={`/marketplace/${product?._id}`}>
          <Image
            src={`${imageBaseUrl}${product?.productImages[0]}`}
            alt={product.productName}
            layout="fill"
            objectFit="cover"
            className=" absolute rounded-t-md"
          />
        </Link>
      </div>
      <div className="px-5 pt-3">
        <h2 className="text-2xl font-semibold text-primary mb-2">
          {product?.productName}
        </h2>
        <h1 className="text-lg font-semibold">About</h1>
        <p className="text-gray-600">
          {typeof product?.productDescription === "string" &&
          product.productDescription.length > 124 ? (
            <>
              {product.productDescription.substring(0, 124)}{" "}
              <Link
                href={`/marketplace/${product?._id}`}
                className="text-primary underline"
              >
                Read More
              </Link>
            </>
          ) : (
            product?.productDescription
          )}
        </p>

        <h1 className=" py-2 font-semibold text-gray-700">
          Category : {product?.category}
        </h1>
      </div>
      <div className="px-5 pb-4">
        <div className="flex justify-between  items-center mt-2">
          <span className="text-xl font-bold text-green-500">
            ${product?.sizes[0]?.price}
          </span>
        </div>
        <div className="flex justify-between items-center gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            className={`bg-secondary text-white py-2 px-4 rounded-lg w-full mt-2`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
