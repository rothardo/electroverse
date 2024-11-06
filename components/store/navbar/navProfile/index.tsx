"use-client";
import styles from "./navProfile.module.scss";

import { useRef } from "react";
import { ProfileIcon } from "@/components/icons/svgIcons";
import { useToggleMenu } from "@/hooks/useToggleMenu";

const NavBarProfile = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useToggleMenu(false, menuRef);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className={`flex cursor-pointer h-10 mt-4 px-4 items-center border border-white rounded-lg gap-4 ${
          isActive ? "text-white border-blue-600 bg-blue-600" : ""
        } `}
      >
        <ProfileIcon width={16} />
        <span>Account</span>
      </button>
      <div
        ref={menuRef}
        className={`absolute top-12 right-0 w-44 rounded-lg overflow-hidden flex flex-col items-center border border-gray-300 bg-white shadow-md  transform scale-97 transition-all duration-300 origin-top-right  ${
          isActive
            ? "scale-100 visible opacity-100"
            : "opacity-0 invisible scale-97"
        }`}
      >
        <button className="w-full px-4 py-2 transition-all duration-300 font-medium text-gray-800 hover:bg-gray-200 rounded-md">
          Sign In
        </button>
        <button className="w-full px-4 py-2 transition-all duration-300 font-medium text-gray-800 hover:bg-gray-200 rounded-md">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavBarProfile;
