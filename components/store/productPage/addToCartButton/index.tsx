"use client";
import styles from "./addToCartButton.module.scss";

import { useDispatch } from "react-redux";

import { ShoppingIconFill } from "@/components/icons/svgIcons";
import { TCartItem } from "@/types/shoppingCart";
import { add } from "@/store/shoppingCart";

interface IProps {
  disabled: boolean;
  cartItemData: TCartItem;
}

const AddToCartButton = ({ cartItemData, disabled }: IProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(add({ ...cartItemData }));
    document.documentElement.classList.add("noScroll");
  };

  return (
    <button
      disabled={disabled}
      className="flex justify-center items-center gap-2 cursor-pointer ml-40 font-medium text-lg px-10 py-3 bg-[#fc4335] rounded-lg text-white transition-all duration-300 hover:bg-[#ff5d52] active:bg-[#dc4e44] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-[#fc4335] sm:ml-0 sm:px-5 sm:text-base"
    >
      {disabled ? (
        "not Available"
      ) : (
        <>
          <ShoppingIconFill width={16} />
          Add to Cart
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
