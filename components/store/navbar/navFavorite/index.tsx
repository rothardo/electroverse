import { HeartIcon } from "@/components/icons/svgIcons";

const NavBarFavorite = () => {
  return (
    <div className="flex items-center relative ml-6 cursor-pointer">
      <div className="fill-white stroke-[1.5px] stroke-[#d9d9d9] transition-all duration-300 hover:stroke-[#64748b]">
        <HeartIcon width={20} />
      </div>
      <span className="absolute top-[-2px] right-[-12px] w-6 h-6 flex items-center justify-center text-center text-xs rounded-full bg-[#d9d9d9]">
        0
      </span>
    </div>
  );
};

export default NavBarFavorite;
