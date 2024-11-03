"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ClockIcon } from "@/components/icons/svgIcons";

interface IProps {
  productName: string;
  newPrice: number;
  oldPrice: number;
  image: [string, string];
  dealEndTime: Date;
  spec?: string[];
  url: string;
}

const TodayDealCard = ({
  productName,
  newPrice,
  oldPrice,
  image,
  dealEndTime,
  spec = [],
  url,
}: IProps) => {
  const saveAmount = oldPrice - newPrice;
  const [remainedTime, setRemainedTime] = useState(dealEndTime);

  setTimeout(() => {
    setRemainedTime(new Date(remainedTime.getTime() - 1000));
  }, 1000);

  return (
    <div className="min-w-[256px] h-[400px] relative p-4 bg-white rounded-2xl">
      <Link href={url} className="relative w-full h-[220px] overflow-hidden rounded-lg border border-[#f0f0f0] group">
        <Image alt="" src={image[0]} fill sizes="(max-width:240px)" className="object-contain transition-all duration-400 group-hover:scale-105" />
        <Image alt="" src={image[1]} fill sizes="(max-width:240px)" className="object-contain transition-all duration-400 absolute top-0 left-0 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-105" />
      </Link>
      <div className="absolute top-4 left-4 rounded-md px-3 py-2 bg-[#ff4d4f]">
        <span className="text-white text-lg">Save </span>
        <span className="text-white text-lg font-medium tracking-widest">
          {saveAmount.toLocaleString("en-us", { minimumFractionDigits: 2 })} €
        </span>
      </div>
      <Link href={url}>
        <h3 className="text-xl font-normal mt-4 ml-4 text-[#666666]">{productName}</h3>
      </Link>
      <div className="ml-4 mt-2">
        {spec.length > 0 &&
          spec.map((item, index) => (
            <span key={index} className="block h-5 mb-1 text-base text-[#999999]">
              {item}
            </span>
          ))}
      </div>
      <div className="flex justify-between mt-4 ml-4 mr-4">
        <div className="mt-2">
          <span className="block text-base text-[#999999] mb-1">
            was{" "}
            {oldPrice.toLocaleString("en-us", {
              useGrouping: true,
              minimumFractionDigits: 2,
            })}{" "}
            €
          </span>
          <span className="text-xl font-medium text-[#333333]">
            {newPrice.toLocaleString("en-us", {
              useGrouping: true,
              minimumFractionDigits: 2,
            })}{" "}
            €
          </span>
        </div>
        <div className="text-center text-[#ff4d4f]">
          <div className="mx-auto mb-1">

          <ClockIcon width={14}  />
          </div>
          <span className="inline-block w-24 h-6 text-base font-medium text-center rounded border border-red-500">
            {`${remainedTime
              .getHours()
              .toLocaleString("en-us", { minimumIntegerDigits: 2 })}
            :
            ${remainedTime
              .getMinutes()
              .toLocaleString("en-us", { minimumIntegerDigits: 2 })}
            :
            ${remainedTime
              .getSeconds()
              .toLocaleString("en-us", { minimumIntegerDigits: 2 })}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodayDealCard;
