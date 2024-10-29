"use client";
import { TDropDown } from "@/types/uiElements";
import styles from "./lineList.module.scss";

interface IProps {
  data: TDropDown[];
  selectedId: number;
  onChange: (newIndex: number) => void;
}

const LineList = ({ data, selectedId, onChange }: IProps) => {
  const handleChange = (newIndex: number) => {
    onChange(newIndex);
  };

  return (
    <div className="w-full flex items-center h-[30px]">
      {data.map((item, index) => (
        <button
          key={index}
          className={`text-gray-300 mr-6 inline-block font-normal text-lg transition-colors px-4 py-2 rounded-2xl ${
            selectedId === index
              ? "text-white cursor-default font-medium bg-gray-700 hover:bg-gray-700"
              : "hover:bg-gray-100"
          }`}
          onClick={() => handleChange(index)}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default LineList;
