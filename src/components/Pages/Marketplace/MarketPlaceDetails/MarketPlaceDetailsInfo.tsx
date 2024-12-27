"use client";
import Button from "@/components/UI/Button";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  productImages: string[];
  stockQuantity: number;
  brandName?: string;
  description: string;
  plantType?: string;
  location?: string;
}

const MarketPlaceDetailsInfo: React.FC<{ product: Product }> = ({
  product,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // dispatch(
    //   addToCart({
    //     id: product.id,
    //     name: product.productName,
    //     image: product.productImages[0],
    //     price: product.productPrice,
    //     quantity: quantity,
    //   })
    // );
    // Swal.fire({
    //   title: "Item added to cart!",
    //   text: "Would you like to view your cart?",
    //   icon: "success",
    //   showCancelButton: true,
    //   confirmButtonText: "View Cart",
    //   cancelButtonText: "Continue Shopping",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     router.push("/cart");
    //   }
    // });
  };

  return (
    <div className="w-full border-gray-300">
      <div className="border p-4 rounded-lg">
        {/* Price and Title */}
        <h1 className="text-2xl font-bold">${product.productPrice}</h1>
        <h2 className="text-xl font-semibold my-2">{product.productName}</h2>
        <div className="space-y-2">
          <p>
            Availability :{" "}
            <span className="text-green-600 font-semibold">
              {product.stockQuantity > 0
                ? `In Stock (${product.stockQuantity})`
                : "Out Of Stock"}
            </span>
          </p>
          {product.plantType && (
            <p>
              Plant Type :{" "}
              <span className="text-green-600 font-semibold">
                {product.plantType}
              </span>
            </p>
          )}
          {product.location && (
            <p>
              Location :
              <span className="text-green-600 font-semibold">
                {product.location}
              </span>
            </p>
          )}
        </div>

        {/* Product Description */}
        <p className="text-gray-600 my-4">{product.description}</p>
        <hr />

        {/* Quantity Selection */}
        <div className="my-4">
          <h3 className="text-lg font-semibold">Quantity</h3>
          <div className="flex mt-2">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="px-4 py-3 border-l border-t border-b rounded-l-md border-[#929292]"
            >
              <FiMinus className="size-3" />
            </button>
            <h1 className="border flex justify-center items-center px-5 py-2 text-sm border-[#929292]">
              {quantity}
            </h1>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="px-4 py-3 border-r border-t border-b rounded-r-md border-[#929292] bg-[#0D3676]"
            >
              <FiPlus className="size-3 text-white" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-4">
          <div>
            <Button border={false} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceDetailsInfo;
