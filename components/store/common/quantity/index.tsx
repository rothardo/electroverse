"use client";
import { MinusIcon, PlusIcon } from "@/components/icons/svgIcons";
import styles from "./quantity.module.scss";

interface IProps {
  quantity: number;
  iconWidth?: number;
  onChange: (isReducing: boolean) => void;
}

const Quantity = ({ onChange, quantity, iconWidth = 12 }: IProps) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onChange(true)}
        disabled={quantity === 1}
        className="w-8 h-8 flex justify-center items-center rounded-full cursor-pointer border-none transition-all duration-300 hover:bg-gray-200 active:bg-gray-300 disabled:cursor-default disabled:hover:bg-gray-100"
      >
        <div className="stroke-gray-400">
          <MinusIcon width={iconWidth} />
        </div>
      </button>
      <span
        style={{
          fontSize: iconWidth * 2,
          width: iconWidth * 1.6,
        }}
        className="user-select-none w-6 text-center mx-4 text-gray-600"
      >
        {quantity}
      </span>
      <button
        onClick={() => onChange(false)}
        className="w-8 h-8 flex justify-center items-center rounded-full cursor-pointer border-none transition-all duration-300 hover:bg-gray-200 active:bg-gray-300"
      >
        <div className="stroke-gray-400">
          <PlusIcon width={iconWidth} />
        </div>
      </button>
    </div>
  );
};

export default Quantity;
