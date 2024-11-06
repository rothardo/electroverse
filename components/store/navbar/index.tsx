"use client";
import Image from "next/image";
import Link from "next/link";
import NavBarProfile from "./navProfile";
import NavBarFavorite from "./navFavorite";
import NavBarShopping from "./navShopping";
import NavBarCategory from "./navCategory";
import { useEffect, useState } from "react";
import AddVisit from "../common/addVisit";

const StoreNavBar = () => {
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    let prevPositionY = 0;
    if (typeof window !== "undefined") prevPositionY = window.scrollY;
    const handleScroll = () => {
      //---handle auto hiding navbar
      if (typeof window !== "undefined") {
        prevPositionY < window.scrollY && window.scrollY > 100
          ? setHideNavbar(true)
          : setHideNavbar(false);
        prevPositionY = window.scrollY;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 z-9 bg-white w-full flex flex-col border-b border-gray-200 transition-all duration-600 ${
        hideNavbar ? "top-[-180px]" : ""
      }`}
    >
      <section>
        <div className={`flex justify-between items-center p-4 storeContainer`}>
          <Link href={"/"}>
            <Image
              alt="Bitex Logo"
              src={"/images/logo.png"}
              width={125}
              height={40}
              quality={100}
            />
          </Link>
          <div className="relative w-full max-w-xs md:max-w-lg lg:max-w-xl mx-auto">
            <input
              type="text"
              className="w-full h-10 px-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-gray-700"
              placeholder="Search"
            />
            <Image
              src={"/images/icons/searchIcon.svg"}
              width={16}
              height={16}
              alt="Search"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-500">
            <NavBarProfile />
            <NavBarFavorite />
            <NavBarShopping />
          </div>
        </div>
      </section>
      <section className="border-b border-gray-300">
        <div className={`flex justify-between items-center p-4 storeContainer`}>
          <div className="flex flex-col">
            <NavBarCategory isNavbarVisible={!hideNavbar} />
            <hr className="my-2 border-l border-gray-200 h-6" />
            <ul className="flex flex-wrap gap-2 ml-4">
              <li>
                <Link
                  href={"/list/pc-laptops/computer"}
                  className="block px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                >
                  Computer
                </Link>
              </li>
              <li>
                <Link
                  href={"/list/pc-laptops/laptops"}
                  className="block px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                >
                  Laptop
                </Link>
              </li>
              <li>
                <Link
                  href={"/list/smartphones"}
                  className="block px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                >
                  Mobile
                </Link>
              </li>
              <li>
                <Link
                  href={"/list/tvs"}
                  className="block px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                >
                  TV
                </Link>
              </li>
              <li>
                <Link
                  href={"/list/video-games"}
                  className="block px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                >
                  Gaming
                </Link>
              </li>
              <li>
                <Link
                  href={"/list/photography/cameras"}
                  className="block px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                >
                  Camera
                </Link>
              </li>
              <li>
                <Link
                  href={"/list/tablets"}
                  className="block px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                >
                  Tablet
                </Link>
              </li>
              <li>
                <Link
                  href={"/list/watches"}
                  className="block px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
                >
                  Watch
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={""}
              className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700"
            >
              PC Configuration
            </Link>
            <Link
              href={""}
              className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-red-500"
            >
              <Image
                src={"/images/icons/discountIcon.svg"}
                alt="Top Deals"
                width={18}
                height={18}
              />
              Top Deals
            </Link>
          </div>
        </div>
      </section>
      <AddVisit />
    </nav>
  );
};

export default StoreNavBar;
