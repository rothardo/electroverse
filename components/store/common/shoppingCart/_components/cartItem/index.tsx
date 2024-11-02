"use client";
import Image from "next/image";
import styles from "./cartItem.module.scss";
import { TCartItemData } from "@/types/shoppingCart";
import { DeleteIcon, MinusIcon, PlusIcon } from "@/components/icons/svgIcons";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { add, modifyQuantity, remove } from "@/store/shoppingCart";
import Quantity from "../../../quantity";
import { useRouter } from "next/navigation";

interface IProps {
  data: TCartItemData;
  onLinkClicked: () => void;
}

const CartItem = ({ data, onLinkClicked }: IProps) => {
  const {
    productName,
    productId,
    imgUrl,
    price,
    dealPrice = 0,
    quantity,
  } = data;

  const dispatch = useDispatch();
  const router = useRouter();
  const handleQuantityChange = (isReduced: boolean) => {
    isReduced
      ? dispatch(modifyQuantity({ amount: -1, productId }))
      : dispatch(modifyQuantity({ amount: 1, productId }));
  };
  const currentPrice = dealPrice === 0 ? price : dealPrice;

  const handleGoToPage = () => {
    router.push("/product/" + productId);
    onLinkClicked();
  };
  return (
    <div className="flex justify-between items-center gap-16 border-b border-gray-200 p-4">
      <div className="flex-shrink-0 cursor-pointer" onClick={handleGoToPage}>
        <Image
          src={imgUrl}
          width={120}
          height={110}
          alt={productName}
          className="rounded-lg border border-gray-200 object-contain"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h2
          className="text-lg font-medium text-gray-800 cursor-pointer"
          onClick={handleGoToPage}
        >
          {productName}
        </h2>
        <div className="flex items-center justify-start mt-4">
          <span className="text-2xl font-bold text-gray-900">
            {(quantity * currentPrice).toLocaleString("en-us", {
              minimumFractionDigits: 2,
            })}{" "}
            €
          </span>
          <span className="text-base ml-4 text-gray-700">
            {quantity > 1
              ? `${quantity} x ${currentPrice.toLocaleString("en-us", {
                  maximumFractionDigits: 2,
                })} €`
              : ""}{" "}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Quantity
            onChange={handleQuantityChange}
            quantity={quantity}
            iconWidth={8}
          />
          <button
            onClick={() => dispatch(remove(productId))}
            className="w-10 h-10 rounded-md border border-white hover:border-gray-200 hover:bg-gray-100 active:border-gray-300 active:bg-gray-200"
          >
            <DeleteIcon width={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
