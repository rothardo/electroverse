"use client";
import { useToggleMenu } from "@/hooks/useToggleMenu";

import { TDropDown } from "@/types/uiElements";
import { useRef } from "react";
import { ArrowIcon } from "@/components/icons/svgIcons";

interface IProps {
  data: TDropDown[];
  width?: string;
  selectedIndex?: number;
  isSearch?: boolean;
  disabled?: boolean;
  onChange: (newIndex: number) => void;
  className?: string;
}

const DropDownList = ({
  data,
  width = "auto",
  selectedIndex = 0,
  onChange,
  className,
}: IProps) => {
  const optionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useToggleMenu(false, optionRef);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const handleChange = (newIndex: number) => {
    onChange(newIndex);
  };

  return (
    <button
      onClick={toggleMenu}
      className={`relative cursor-pointer flex justify-between items-center gap-8 p-1.5 px-4 rounded border border-gray-300 transition-colors duration-400 hover:bg-gray-100 active:bg-gray-200 ${
        isActive ? "isFocus" : ""
      } ${className}`}
      style={{ width: width }}
    >
      {data.length > 0 ? (
        <>
          <span className="text-base text-gray-700">
            {data[selectedIndex].text}
          </span>
          <ArrowIcon width={8} />
          <div
            className={`absolute top-9 right-0 w-full rounded overflow-hidden border border-gray-300 bg-white shadow-md transform scale-95 visibility-hidden opacity-0 transition-all duration-300 p-1 z-10 origin-top ${
              isActive ? "scale-100 visible opacity-100" : ""
            }`}
          >
            <div className="max-h-64 overflow-y-scroll flex flex-col">
              {data.map((option, index) => (
                <span
                  className={`block mb-0.5 p-2 px-4 text-base font-normal text-left text-gray-800 rounded transition-colors duration-300 ${
                    index === selectedIndex ? "bg-gray-200" : ""
                  }`}
                  key={option.value}
                  onClick={() => handleChange(index)}
                >
                  {option.text}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <span className="text-base text-gray-700">---</span>
          <ArrowIcon width={8} />
        </>
      )}
    </button>
  );
};

export default DropDownList;
