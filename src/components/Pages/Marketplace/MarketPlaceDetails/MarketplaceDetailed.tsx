"use client";
import BreadcrumbComponent from "@/components/UI/BreadcrumbComponent";
import Button from "@/components/UI/Button";
import { imageBaseUrl } from "@/config/imageBaseUrl";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct, ISize } from "@/types/productType";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import MarketplaceCard from "../MarketplaceCard";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { addToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { useRouter } from "next/navigation";
import useUser from "@/hook/useUser";
import { toast } from "sonner";
import Loading from "@/components/Loading/Loading";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MarketplaceDetailPage = ({ id }: { id: string }) => {
  const { data: responseData, isLoading } = useGetSingleProductQuery(id, {
    skip: !id,
  });
  //redux
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useUser();
  const sliderRef = useRef<Slider | null>(null);
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);

  // Product data and related products from the API response
  const productData = responseData?.data?.attributes?.product;
  const relatedProducts = responseData?.data?.attributes?.relatedProducts;

  // States for selected size, color, and price
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);

  const cart = useAppSelector((state) => state.cart.cart); // Get cart state from Redux
  const wishlist = useAppSelector((state) => state.wishlist.wishlist); // Get wishlist state from Redux

  useEffect(() => {
    if (productData?.sizes?.length > 0) {
      setSelectedSize(productData.sizes[0].size);
      setPrice(productData.sizes[0].price);
      setSelectedColor(productData.sizes[0].colors[0]); // Set default color based on the first size
    }
  }, [productData]);

  // Handle size change and update the price based on the selected size
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const selectedProductSize = productData?.sizes.find(
      (s: ISize) => s.size === size
    );
    if (selectedProductSize) {
      setPrice(selectedProductSize.price);
      setSelectedColor(selectedProductSize.colors[0]); // Reset to the first color of the selected size
    }
  };

  // Handle color selection
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }
    const cartItem = {
      id: productData?._id,
      name: productData?.productName,
      price: price,
      image: `${imageBaseUrl}${productData?.productImages[0]}`,
      size: selectedSize,
      color: selectedColor || "N/A",
      quantity: quantity,
      category: productData?.category,
    };
    dispatch(addToCart(cartItem));
  };

  // Add to wishlist functionality
  const handleAddToWishlist = () => {
    if (!user) {
      router.push("/login?redirectUrl=/dashboard/my-wishlist");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    const wishlistItem = {
      id: productData?._id,
      name: productData?.productName,
      price: price,
      image: `${imageBaseUrl}${productData?.productImages[0]}`,
      size: selectedSize,
      color: selectedColor || "N/A",
      quantity: quantity,
      category: productData?.category,
    };

    dispatch(addToWishlist(wishlistItem)); // Dispatch the action to add to wishlist
  };

  // Check if the item is already in the cart or wishlist
  const isInCart = cart?.some((item) => item?.id === productData?._id);
  const isInWishlist = wishlist?.some((item) => item?.id === productData?._id);

  // Redirect to cart or wishlist if the item is already there
  const handleViewCart = () => {
    router.push("/cart"); // Redirect to cart page
  };

  const handleViewWishlist = () => {
    router.push("/dashboard/my-wishlist");
  };

  const breadcrumbItems = [
    {
      href: "/",
      title: (
        <div className="flex gap-2 items-center">
          <HiOutlineHome size={18} />
          <span>Home</span>
        </div>
      ),
    },
    {
      href: "/product",
      title: "Products",
    },
    {
      title: productData?.productName || "Product",
    },
  ];

  const settingsMain = {
    asNavFor: nav2,
    ref: (slider: Slider) => setNav1(slider),
    arrows: false,
    dots: false,
  };

  const settingsThumbs = {
    asNavFor: nav1,
    ref: (slider: Slider) => setNav2(slider),
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // Function to go to the next slide
  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Function to go to the previous slide
  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  if (isLoading) return <Loading />;
  return (
    <section className="w-full px-5 py-16">
      <div className="w-full md:container mx-auto">
        {/* Breadcrumb */}
        <BreadcrumbComponent items={breadcrumbItems} />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          <div>
            {/* Left Side - Image Carousel */}
            <Slider {...settingsMain} ref={sliderRef} className="rounded-lg">
              {productData?.productImages?.map(
                (image: string, index: number) => (
                  <div
                    key={index}
                    className="w-full h-56 md:h-[470px] relative rounded-lg"
                  >
                    <Image
                      src={`${imageBaseUrl}${image}`}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="w-full h-full rounded-lg absolute"
                    />
                  </div>
                )
              )}
            </Slider>
            <div className="relative">
              <button
                className="size-8 absolute -left-3 top-1/2 transform -translate-y-1/2 bg-primary border text-white rounded-full p-2 z-10 "
                onClick={goToPrev}
              >
                <IoIosArrowBack size={16} />
              </button>
              <Slider {...settingsThumbs} className="mt-2">
                {productData?.productImages?.map(
                  (image: string, index: number) => (
                    <div key={index} className="px-2">
                      <div className="w-full h-20 rounded-lg relative">
                        <Image
                          src={`${imageBaseUrl}${image}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="cursor-pointer rounded-lg absolute"
                          fill
                        />
                      </div>
                    </div>
                  )
                )}
              </Slider>
              <button
                className="size-8 rounded-full absolute -right-3 top-1/2 transform -translate-y-1/2 bg-primary border text-white p-2 z-10"
                onClick={goToNext}
              >
                <IoIosArrowForward size={16} />
              </button>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="w-full space-y-4">
            <h1 className="text-3xl font-bold">{productData?.productName}</h1>
            <div className="flex justify-between items-center">
              <h1>
                <strong>Category:</strong> {productData?.category}
              </h1>
            </div>
            <p className="text-2xl font-semibold text-green-600">
              {price
                ? `$${price.toFixed(2)}`
                : `$${productData?.sizes?.[0].price}`}
            </p>

            <p className="text-gray-700">{productData?.productDescription}</p>

            {/* Size Selection */}
            <div className="mt-6">
              <p>
                <strong>Select Size:</strong>
              </p>
              <div className="flex gap-4 mt-2">
                {productData?.sizes?.map((size: ISize) => (
                  <div
                    key={size._id}
                    onClick={() => handleSizeChange(size.size)}
                    className={`border px-3 py-1 rounded-lg  flex justify-center items-center cursor-pointer ${
                      selectedSize === size.size
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {size.size}
                  </div>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mt-4">
              <p>
                <strong>Select Color:</strong>
              </p>
              <div className="flex gap-4 mt-2">
                {selectedSize &&
                  // Check if colors exist for the selected size
                  (productData?.sizes?.find(
                    (size: ISize) => size.size === selectedSize
                  )?.colors.length ? (
                    // If colors are available, render them
                    productData?.sizes
                      ?.find((size: ISize) => size.size === selectedSize)
                      ?.colors.map((color: string, index: number) => (
                        <div
                          key={index}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                          className={`size-8 rounded-full flex justify-center items-center cursor-pointer border-2 ${
                            selectedColor === color
                              ? "border-gray-700"
                              : "border"
                          }`}
                        ></div>
                      ))
                  ) : (
                    // If no colors are available, show "Not Available"
                    <p className="text-gray-500">Not color available</p>
                  ))}
              </div>
            </div>
            <div className="mt-4">
              <p>
                <strong>Select Quantity:</strong>
              </p>
              <div className="flex rounded-lg overflow-hidden mt-2">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="px-4 py-3 border-l border-t border-b rounded-l-md border-[#929292]"
                >
                  <FiMinus className="size-3" />
                </button>
                <h1 className="border flex justify-center items-center px-5 py-2 text-sm border-[#929292]">
                  {quantity}
                </h1>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 border-r border-t border-b rounded-r-md border-[#929292]"
                >
                  <FiPlus className="size-3" />
                </button>
              </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
              {/* Add to Cart or View Cart Button */}
              <button
                onClick={isInCart ? handleViewCart : handleAddToCart}
                className="w-full md:w-fit px-8 py-3 rounded-lg text-white bg-primary transition-all duration-300 flex justify-center items-center gap-2"
              >
                <FaShoppingCart className="text-lg size-6" />
                {isInCart ? "View in Cart" : "Add to Cart"}
              </button>

              {/* Add to Wishlist or View Wishlist Button */}
              <button
                onClick={
                  isInWishlist ? handleViewWishlist : handleAddToWishlist
                }
                className="w-full md:w-fit px-5 rounded-lg text-white py-3 transition-all duration-300 flex bg-secondary justify-center items-center gap-2"
              >
                <FaHeart className="text-lg size-6" />
                {isInWishlist ? "View in Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          {relatedProducts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts?.map((product: IProduct) => (
                <div key={product?._id}>
                  <MarketplaceCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketplaceDetailPage;
