import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  SearchIcon,
  XIcon,
} from "@/components/icons/svgIcons";

const Footer = () => {
  return (
    <footer className="bg-white w-full flex flex-col border-t border-gray-300">
      <div className="flex flex-col items-center px-6 py-4 md:px-12 lg:flex-row lg:justify-between">
        <div className="flex items-center mb-6 lg:mb-0">
          <Link href={"/"}>
            <Image
              alt="Bitex Logo"
              src={"/images/logo.png"}
              width={125}
              height={40}
            />
          </Link>
          <div className="relative ml-8 w-full lg:w-auto">
            <input
              type="text"
              className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
              placeholder="Search"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
              <SearchIcon width={16} />
            </div>
          </div>
        </div>
        <section className="flex flex-col md:flex-row md:justify-between md:space-x-8 lg:space-x-12">
          <div>
            <h3 className="text-gray-200 font-medium text-lg mb-2">
              Contact Us
            </h3>
            <span className="text-gray-400 text-base block mb-2">
              Got Question? Call us 24/7
            </span>
            <h2 className="text-blue-500 font-medium text-lg mb-2">
              +49 30 575909881
            </h2>
            <span className="text-gray-400 text-base block mb-2">
              685 Market Street, San Francisco, CA 94105, US
            </span>
            <span className="text-gray-400 text-base block">
              nonamecompany@justportfolio.com
            </span>
          </div>
          <div>
            <h3 className="text-gray-200 font-medium text-lg mb-4">
              Categories
            </h3>
            <ul className="list-none p-0 mb-4">
              <li className="text-gray-100 text-base">
                <Link href={""}>Computer & Laptop</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Tablets & iPad</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Printer & Cameras</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Smart Phones</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>OLED Smart TVs</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Keyboard & Mouse</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Video Games</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Sports & Outdoors</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Smart Watches</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-200 font-medium text-lg mb-4">
              Customer Service
            </h3>
            <ul className="list-none p-0 mb-4">
              <li className="text-gray-100 text-base">
                <Link href={""}>Privacy Policy</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Refund Policy</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Shipping & Return</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Term & Conditions</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Advanced Search</Link>
              </li>
              <li className="text-gray-100 text-base">
                <Link href={""}>Store Locations</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-gray-200 font-medium text-lg mb-2">
              Sign Up to Newsletter
            </h3>
            <input
              type="text"
              placeholder="email address"
              className="w-64 py-2 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <button className="py-2 px-4 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-300 active:bg-gray-400 text-gray-100 active:text-gray-200">
              Subscribe
            </button>
          </div>
        </section>
      </div>
      <section className="bg-gray-200 py-4 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <span className="text-gray-400 text-base">
            © 2024 BITEX Store. All Rights Reserved.
          </span>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <ul className="flex space-x-4 text-gray-200 font-medium">
              <li>
                <Link href={""}>Conditions of Use & Sale</Link>
              </li>
              <li>
                <Link href={""}>Privacy Notice</Link>
              </li>
              <li>
                <Link href={""}>Imprint</Link>
              </li>
              <li>
                <Link href={""}>Cookies Notice</Link>
              </li>
              <li>
                <Link href={""}>Interest-Based Ads Notice</Link>
              </li>
            </ul>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href={"https://www.linkedIn.com"}>
              <div className="text-gray-400 hover:text-gray-100 transition-colors">
                <LinkedinIcon width={20} strokeWidth={0} />
              </div>
            </Link>
            <Link href={"https://www.twitter.com"}>
              <div className="text-gray-400 hover:text-gray-100 transition-colors">
                <XIcon width={20} />
              </div>
            </Link>
            <Link href={"https://www.instagram.com"}>
              <div className="text-gray-400 hover:text-gray-100 transition-colors">
                <InstagramIcon width={20} strokeWidth={0} />
              </div>
            </Link>
            <Link href={"https://www.facebook.com"}>
              <div className="text-gray-400 hover:text-gray-100 transition-colors">
                <FacebookIcon width={20} strokeWidth={0} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
