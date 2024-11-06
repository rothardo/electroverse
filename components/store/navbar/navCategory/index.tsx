"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useToggleMenu } from "@/hooks/useToggleMenu";
import { ListIcon } from "@/components/icons/svgIcons";
import { getAllCategoriesJSON } from "@/actions/category/category";
import { TGroupJSON } from "@/types/categories";

interface IProps {
  isNavbarVisible: boolean;
}

const NavBarCategory = ({ isNavbarVisible: isNavbarHide }: IProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useToggleMenu(false, dropdownRef);
  const [categories, setCategories] = useState<TGroupJSON[]>([]);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  useEffect(() => {
    const getCategoriesDB = async () => {
      const result = await getAllCategoriesJSON();
      if (result.res) {
        setCategories(result.res);
      }
    };
    getCategoriesDB();
  }, []);

  if (!isNavbarHide && isActive) setIsActive(false);

  return (
    <div className="flex items-center mr-16 user-select-none relative">
      <button
        onClick={toggleMenu}
        className={`block border border-white rounded-md h-full transition-colors ${isActive ? "text-[#6A6A6A] border-[#007AFF] bg-[#007AFF] " : ""} `}
      >
        <ListIcon width={12} />
        <span className="ml-16 mr-16 font-normal text-lg">All Categories</span>
      </button>
      <div
        ref={dropdownRef}
        className={`absolute top-12 w-64 border border-[#D9D9D9] bg-white/90 backdrop-blur-5xl rounded-md shadow-md transition-all duration-300 transform scale-97 origin-top-left ${
          isActive ? "visible opacity-1 scale-100" : "invisible opacity-0 scale-97"
        }`}
      >
        {categories.map((item, index) => (
          <Link
            key={index}
            href={"/list/" + item.group.url}
            className="flex items-center w-full px-4 py-2 transition-all duration-300 text-lg font-normal text-[#6A6A6A] hover:pl-6 hover:bg-[#F2F2F2]"
          >
            {item.group.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBarCategory;
