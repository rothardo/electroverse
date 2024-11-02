"use client";
import { useSelector } from "react-redux";
import { ICartState, RootState } from "@/store/shoppingCart";

import styles from "./shoppingCart.module.scss";
import CartItem from "./_components/cartItem";
import { CloseIcon, ShoppingIconEmpty } from "@/components/icons/svgIcons";
import { useEffect, useState } from "react";
import { getCartProducts } from "@/actions/product/product";
import { TCartItemData } from "@/types/shoppingCart";
import { TCartListItemDB } from "@/types/product";

interface IProps {
  isVisible: boolean;
  quantity?: number;
  handleOnClose: () => void;
}

const ShoppingCart = ({ isVisible, quantity, handleOnClose }: IProps) => {
  const [cartItems, setCartItems] = useState<TCartItemData[]>();
  const localCartItems = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const convertDBtoCartItems = (rawData: TCartListItemDB[]) => {
      const cartListItem: TCartItemData[] = [];
      rawData.forEach((item) => {
        cartListItem.push({
          productId: item.id,
          imgUrl: process.env.IMG_URL + item.images[0],
          price: item.price,
          quantity:
            localCartItems.items.find(
              (f: { productId: string }) => f.productId === item.id
            )?.quantity || 0,
          productName: item.name,
          dealPrice: item.salePrice || undefined,
        });
      });
      if (cartListItem.length > 0) return cartListItem;
      return null;
    };
    const getProductsFromDB = async () => {
      const productsIDs = localCartItems.items.map(
        (s: { productId: any }) => s.productId
      );

      if (productsIDs?.length === 0) setCartItems([]);

      if (productsIDs) {
        const response = await getCartProducts(productsIDs);
        if (response.res) {
          const finalResult = convertDBtoCartItems(response.res);
          finalResult ? setCartItems(finalResult) : "";
        }
      }
    };

    if (localCartItems) {
      getProductsFromDB();
    }
  }, [localCartItems]);

  return (
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 z-20 cursor-default opacity-1 visible transition-all duration-300 ${
        !isVisible ? "invisible opacity-0" : ""
      }`}
    >
      <div
        className="absolute w-full h-full bg-black/60 cursor-pointer"
        onClick={handleOnClose}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-[400px] bg-white flex flex-col pb-14 transition-all duration-500 ease-out ${
          isVisible ? "right-0" : "right-[-400px]"
        }`}
      >
        <div className="w-auto p-0 my-0 mx-[24px] flex items-center justify-between border-b border-gray-300">
          <h2 className="text-gray-800 text-2xl font-light">
            Shopping Cart ({quantity})
          </h2>
          <button onClick={handleOnClose}>
            <CloseIcon width={18} />
          </button>
        </div>
        <div className="h-full overflow-y-auto">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                data={item}
                onLinkClicked={handleOnClose}
                key={item.productId}
              />
            ))
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="my-[80px] rounded-full p-[24px] bg-gray-200">
                <ShoppingIconEmpty width={36} />
              </div>
              <span className="text-center text-gray-600">
                Shopping Cart is Empty.
              </span>
            </div>
          )}
        </div>
        <div className="h-[140px] mx-[24px] border-t border-gray-300 bg-white absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-4">
          {cartItems && cartItems.length > 0 && (
            <button className="w-[80%] py-2 rounded-lg border border-gray-300 bg-gray-100 hover:border-gray-400 hover:bg-gray-200 active:border-gray-500 active:bg-gray-300 transition-all duration-300">
              CHECKOUT
            </button>
          )}
          <button
            onClick={handleOnClose}
            className="w-[80%] py-2 rounded-lg border border-gray-300 bg-gray-100 hover:border-gray-400 hover:bg-gray-200 active:border-gray-500 active:bg-gray-300 transition-all duration-300"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
