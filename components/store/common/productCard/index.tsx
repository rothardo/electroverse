import Image from "next/image";
import Link from "next/link";

import { TProductCard } from "@/types/common";

const ProductCard = ({
  name,
  imgUrl,
  price,
  dealPrice = undefined,
  specs,
  url,
  isAvailable = true,
  staticWidth = false,
}: TProductCard) => {
  return (
    <Link
      href={url}
      className={`relative group ${staticWidth ? 'min-w-[256px]' : ''} bg-white rounded-2xl p-4 transition-all duration-500`}
    >
      {!isAvailable && (
        <div className="absolute inset-4 bg-white/40 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
          <span className="mt-12 text-lg text-white font-light px-6 py-2 backdrop-blur-lg rounded-md shadow-lg bg-black/60">Out of Stock</span>
        </div>
      )}
      <div className="w-full h-[225px] relative rounded-lg border border-gray-300 overflow-hidden group-hover:border-gray-400 transition-all duration-500">
        <Image src={imgUrl[0]} alt={name} fill sizes="(max-width: 240px)" className="object-contain transition-all duration-400 ease-out"/>
        <Image src={imgUrl[1]} alt={name} fill sizes="(max-width: 240px)" className="object-contain transition-all duration-400 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"/>
      </div>
      <span className="text-lg font-normal text-gray-800 mt-4 ml-4">{name}</span>
      <div className="mt-2 ml-4">
        {specs.map((spec, index) => (
          <span key={index} className="block text-base text-gray-700 ml-4">{spec}</span>
        ))}
      </div>
      <div className="flex items-center mt-4 ml-4">
        <div className="flex-grow relative">
          {dealPrice ? (
            <>
              <div className="absolute top-[-26px] flex justify-start w-auto">
                <span className="font-medium text-base text-red-500 bg-red-100 rounded-md px-2 py-1">
                  -{(100 - (dealPrice / price) * 100).toLocaleString("en-us", {
                    maximumFractionDigits: 0,
                  })}
                  %
                </span>
                <span className="text-base text-gray-700 ml-2 line-through">
                  was {price.toLocaleString("en-us", { minimumFractionDigits: 2 })}€
                </span>
              </div>
              <span className="text-xl font-medium text-gray-900">
                {dealPrice.toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                })}
                €
              </span>
            </>
          ) : (
            <span className="text-xl font-medium text-gray-900">
              {price.toLocaleString("en-us", { minimumFractionDigits: 2 })}€
            </span>
          )}
        </div>
        <div className="flex-grow text-right ml-4">
          <button className="cursor-pointer w-10 h-10 bg-no-repeat bg-center bg-[url('/images/icons/heartIcon.svg')] bg-contain rounded-md opacity-60 hover:opacity-100" />
        </div>
      </div>
    </Link>

  );
};

export default ProductCard;
