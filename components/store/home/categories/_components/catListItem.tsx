import Image from "next/image";
import Link from "next/link";

import { TGroupJSON } from "@/types/categories";

const CategoryListItem = ({ categoryData }: { categoryData: TGroupJSON }) => {
  const { categories, group } = { ...categoryData };
  return (
    <li className="w-full h-[50px] flex justify-between items-center relative border-b border-gray-300 cursor-pointer">
      <Link href={"/list/" + group.url}>
        <div className="w-[28px] inline-block">
          <Image
            src={"images/icons/" + group.iconUrl + ".svg"}
            alt={group.name}
            width={group.iconSize[0]}
            height={group.iconSize[1]}
          />
        </div>
        {group.name}
      </Link>
      <div>
        {categories && categories.length > 0 && (
          <Image
            className="arrow"
            src={"images/icons/arrowIcon01.svg"}
            width={6}
            height={10}
            alt=""
          />
        )}
      </div>
      {categories && categories.length > 0 && (
        <div className="absolute w-[300px] z-[12] left-[200px] top-0 flex flex-col p-4 bg-white rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)] transition-all duration-400 invisible opacity-0">
          {categories.map((item, index) => (
            <div className="w-full flex flex-col" key={index}>
              <Link href={"/list/" + group.url + "/" + item.category.url}>
                {item.category.name}
              </Link>

              {item.subCategories && item.subCategories?.length > 0 ? (
                <div className="flex flex-col">
                  {item.subCategories.map((link, index) => (
                    <Link
                      key={index}
                      href={
                        "/list/" +
                        group.url +
                        "/" +
                        item.category.url +
                        "/" +
                        link.url
                      }
                      className="text-gray-400 p-2 border border-white rounded-md transition-all duration-300 hover:border-gray-300 hover:bg-gray-100"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default CategoryListItem;
