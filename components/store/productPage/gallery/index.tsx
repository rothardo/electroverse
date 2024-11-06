"use client";
import { CloseIcon } from "@/components/icons/svgIcons";

import Image from "next/image";
import { useState } from "react";
import { SK_Box } from "@/components/ui/Skeleton";

interface IProps {
  images?: string[];
}

const Gallery = ({ images }: IProps) => {
  const [showZoom, setShowZoom] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="flex">
      <div className="flex flex-col gap-4 mr-4">
        {images ? (
          images.map((image, index) => (
            <Image
              src={process.env.IMG_URL + image}
              alt=""
              width={64}
              height={64}
              key={index}
              className={`cursor-pointer rounded-md border border-gray-300 transition-colors ${
                index === selectedIndex
                  ? "cursor-default border-2 border-gray-600"
                  : ""
              } hover:${index !== selectedIndex ? "border-gray-600" : ""}`}
              onClick={() => setSelectedIndex(index)}
            />
          ))
        ) : (
          <>
            <SK_Box width="64px" height="64px" />
            <SK_Box width="64px" height="64px" />
            <SK_Box width="64px" height="64px" />
          </>
        )}
      </div>
      <div className="relative w-full h-[540px]">
        {images ? (
          <Image
            src={process.env.IMG_URL + images[selectedIndex]}
            alt=""
            fill
            sizes="(max-width:700px)"
            className="cursor-zoom-in object-contain rounded-2xl border border-white transition-colors hover:border-gray-300"
            onClick={() => setShowZoom(true)}
          />
        ) : (
          <SK_Box width="90%" height="90%" />
        )}
      </div>
      {images && showZoom && (
        <div className="fixed left-0 right-0 top-0 bottom-0 z-19 flex flex-col justify-between items-center p-0 pb-10">
          <div
            className="absolute left-0 right-0 top-0 bottom-0 backdrop-blur-5xl bg-black/60"
            onClick={() => setShowZoom(false)}
          />
          <div className="flex w-[90%] h-[85%] bg-white rounded-2xl relative">
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 p-2 rounded-md transition-colors hover:bg-gray-100 active:bg-gray-200"
            >
              <div className="fill-gray-800">
                <CloseIcon width={16} />
              </div>
            </button>
            <Image
              src={process.env.IMG_URL + images[selectedIndex]}
              alt=""
              fill
              sizes="(max-width:700px)"
              className="object-contain"
            />
          </div>
          <div className="flex justify-center items-center gap-4 rounded-lg p-2 bg-white/50 z-20">
            {images.map((image, index) => (
              <Image
                src={process.env.IMG_URL + image}
                alt=""
                width={64}
                height={64}
                key={index}
                className={`cursor-pointer rounded-md border border-gray-300 transition-colors ${
                  index === selectedIndex
                    ? "cursor-default border-2 border-gray-600"
                    : ""
                } hover:${index !== selectedIndex ? "border-gray-600" : ""}`}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
