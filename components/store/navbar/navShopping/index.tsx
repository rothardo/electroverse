"use-client";
import styles from "./navShopping.module.scss";
import ShoppingCart from "../../common/shoppingCart";
import { ShoppingIconOutline } from "@/components/icons/svgIcons";
import { useDispatch, useSelector } from "react-redux";
import { ICartState, RootState } from "@/store/shoppingCart";
import { toggleCart } from "@/store/shoppingCart";
import { useEffect, useState } from "react";

const NavBarShopping = () => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState<ICartState>();
  const localCartData = useSelector((state: RootState) => state.cart);
  let cartItemQuantity = 0;

  useEffect(() => {
    if (localCartData) {
      setCartData(localCartData);
    }
  }, [localCartData]);

  if (cartData && cartData.items.length > 0) {
    cartData.items.map((item) => (cartItemQuantity += item.quantity));
  }

  const handleCartVisibility = (visibility: boolean) => {
    dispatch(toggleCart(visibility));
    visibility
      ? document.documentElement.classList.add("noScroll")
      : document.documentElement.classList.remove("noScroll");
  };

  return (
    <div className="flex items-center relative ml-36 mr-20 cursor-pointer">
      <button onClick={() => handleCartVisibility(true)}>
        <ShoppingIconOutline width={24} />
        <span
          className={`${
            cartItemQuantity === 0 ? 'text-[#F7F7F7]' : 'text-white'
          } absolute top-[-2px] right-[-12px] w-6 h-6 flex items-center justify-center rounded-full font-semibold text-xs`}
        >
          {cartItemQuantity}
        </span>
      </button>
      <ShoppingCart
        isVisible={cartData ? cartData.isVisible : false}
        quantity={cartItemQuantity}
        handleOnClose={() => handleCartVisibility(false)}
      />
    </div>
  );
};

export default NavBarShopping;
