import Link from "next/link";
import styles from "./noItem.module.scss";

interface IProps {
  pageHeader: string;
}

const NoItem = ({ pageHeader }: IProps) => {
  return (
    <div className="w-full h-full min-h-[600px] flex flex-col gap-6 items-center mt-6 text-gray-300">
      <span> There is no product in {pageHeader} category!</span>
      <div className="flex flex-col gap-4">
        <span> You Can Check These Categories Instead:</span>
        <div className="flex gap-2 items-center justify-center">
          <Link
            href={"/list/pc-laptops/computer"}
            className="border border-gray-600 px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
          >
            Computers
          </Link>
          <Link
            href={"/list/pc-laptops/laptops"}
            className="border border-gray-600 px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
          >
            Laptop
          </Link>
          <Link
            href={"/list/smartphones"}
            className="border border-gray-600 px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
          >
            Mobile
          </Link>
          <Link
            href={"/list/tablets"}
            className="border border-gray-600 px-4 py-2 rounded-md transition-colors hover:bg-gray-100"
          >
            Tablet
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoItem;
