import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-70 h-auto bg-white p-6 border-r border-gray-300">
      <h2 className="w-full text-gray-700 text-2xl font-light pb-5 mb-2 border-b border-gray-300">
        Dashboard
      </h2>
      <Link href={"/admin/categories"}>
        <a className="w-full block p-2 text-gray-800 text-lg font-normal rounded-lg transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200">
          Categories
        </a>
      </Link>
      <Link href={"/admin/products"}>
        <a className="w-full block p-2 text-gray-800 text-lg font-normal rounded-lg transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200">
          Products
        </a>
      </Link>
      <Link href={"/admin/brands"}>
        <a className="w-full block p-2 text-gray-800 text-lg font-normal rounded-lg transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200">
          Brands
        </a>
      </Link>
      <Link href={"/admin/trafficView"}>
        <a className="w-full block p-2 text-gray-800 text-lg font-normal rounded-lg transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200">
          Traffic View
        </a>
      </Link>
    </aside>
  );
};

export default Sidebar;
