"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import Image from "next/image";
import {
  IWishlistItem,
  removeFromWishlist,
} from "@/redux/features/wishlist/wishlistSlice"; // Update import path
import { addToCart } from "@/redux/features/cart/cartSlice"; // Assuming this is imported for adding to cart
import NoDataFound from "@/components/NoDataFound/NoDataFound";

const MyFavorite: React.FC = () => {
  const dispatch = useDispatch();

  // Access wishlist from Redux state
  const wishlist = useSelector((state: any) => state.wishlist.wishlist); // Get wishlist from Redux state

  const handleAddToCart = (item: IWishlistItem) => {
    // You would dispatch the item to your cart here
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      category: item.category,
    };
    dispatch(addToCart(cartItem));
    dispatch(removeFromWishlist(item.id));
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    dispatch(removeFromWishlist(itemId)); // Dispatch remove action from Redux wishlist slice
  };

  return (
    <section className="w-full">
      <h1 className="text-2xl md:text-4xl font-semibold border-b py-3.5">
        My Wishlist
      </h1>

      <div>
        {wishlist.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((item: IWishlistItem) => (
              <div key={item.id} className="border rounded-lg shadow-lg">
                <div className="w-full h-56 relative ">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-lg absolute"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-xl">{item.name}</h3>
                  <p className="text-gray-600">Category: {item.category}</p>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600 flex gap-2 items-center">Color: <div className="size-5 rounded-full" style={{ backgroundColor: item.color }}></div></p>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>

                  <div className="mt-4 flex justify-between">
                    <button
                      className="px-5 py-3 border border-gray-300 bg-primary text-white rounded-lg flex justify-center items-center gap-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaShoppingCart className="size-5" />
                      Add to Cart
                    </button>
                    <button
                      className="px-5 py-3 border border-primary text-primary rounded-lg flex justify-center items-center gap-2"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <FaTrash className="size-5" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
    </section>
  );
};

export default MyFavorite;
