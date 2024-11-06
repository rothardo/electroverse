"use client";
import styles from "./productBoard.module.scss";

import Link from "next/link";
import { useState } from "react";

import { TProductBoard } from "@/types/product";

import AddToCartButton from "../addToCartButton";
import { StarIcon, HeartIcon } from "@/components/icons/svgIcons";
import { TCartItem } from "@/types/shoppingCart";
import Quantity from "../../common/quantity";

const ProductBoard = ({ boardData }: { boardData: TProductBoard }) => {
  const {
    name,
    id,
    isAvailable,
    specialFeatures,
    price,
    shortDesc,
    dealPrice,
    defaultQuantity,
  } = boardData;
  const [quantity, setQuantity] = useState(
    defaultQuantity > 1 ? defaultQuantity : 1
  );

  const handleQuantityChange = (isReducing: boolean) => {
    isReducing
      ? quantity === 1
        ? quantity
        : setQuantity(quantity - 1)
      : setQuantity(quantity + 1);
  };

  const cartItemData: TCartItem = {
    productId: id,
    quantity: quantity,
  };
  return (
    <div className="w-full relative flex flex-col">
      <button className="absolute top-0 right-0 p-4 bg-white border-none hover:text-gray-300 active:text-gray-400">
        <div style={{ height: "24px" }}>
          <HeartIcon width={24} fill="white" stroke="gray-600" />
        </div>

      </button>
      <section className="w-full">
        <div className="flex items-center">
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <Link href={"#"} className="ml-4 text-blue-600 text-lg">
            880 User Reviews
          </Link>
        </div>
      </section>
      <h1 className="text-3xl font-medium mt-6 mb-2 text-gray-800">{name}</h1>
      <span className="text-gray-600 text-lg mb-4">{shortDesc}</span>
      <hr className="my-4 border-gray-400" />
      <div className="flex flex-col gap-4 text-gray-500 text-xl mb-8">
        {specialFeatures &&
          specialFeatures?.map((feature, index) => (
            <span key={index}>{feature}</span>
          ))}
      </div>
      <h2 className="text-4xl font-medium text-gray-800 mb-4">
        {(dealPrice ? dealPrice : price).toLocaleString("en-us", {
          minimumIntegerDigits: 2,
          minimumFractionDigits: 2,
        })}{" "}
        €
      </h2>

      {dealPrice && (
        <div className="mb-4">
          <span className="text-white bg-red-600 px-4 py-1 rounded">
            {`Save ${(price - dealPrice).toLocaleString("en-us", {
              minimumIntegerDigits: 2,
              minimumFractionDigits: 2,
            })} €`}
          </span>
          <span className="block mt-2 text-gray-700">Was {price} €</span>
        </div>
      )}
      <hr className="my-4 border-gray-400" />

      {/* ----------------- ADD TO CART SECTION ----------------- */}
      <section className="flex items-center">
        <Quantity onChange={handleQuantityChange} quantity={quantity} />
        <AddToCartButton cartItemData={cartItemData} disabled={!isAvailable} />
      </section>
    </div>
  );
};

export default ProductBoard;
