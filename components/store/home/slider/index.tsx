"use client";

import Image from "next/image";
import Link from "next/link";
import { SlidesData } from "@/data/homepageData";
import { ArrowIcon } from "@/components/icons/svgIcons";
import { useEffect, useState } from "react";
import { TSlide } from "@/types/common";

const HomeSlider = () => {
  const [activeSlideNum, setActiveSlideNum] = useState(0);
  const touchPos = {
    start: 0,
    end: 0,
  };
  let isDragging = false;

  useEffect(() => {
    const autoSliding = setTimeout(() => {
      handleSliding(activeSlideNum + 1);
    }, 5000);

    return () => {
      clearInterval(autoSliding);
    };
  });

  const handleSliding = (slideNum: number) => {
    if (slideNum > activeSlideNum) {
      activeSlideNum === SlidesData.length - 1
        ? setActiveSlideNum(0)
        : setActiveSlideNum(slideNum);
    } else if (slideNum < activeSlideNum) {
      activeSlideNum === 0
        ? setActiveSlideNum(SlidesData.length - 1)
        : setActiveSlideNum(slideNum);
    }
  };

  function touchStart(event: React.TouchEvent) {
    isDragging = true;
    touchPos.start = event.touches[0].clientX;
  }
  function touchMove(event: React.TouchEvent) {
    if (isDragging) {
      touchPos.end = event.touches[0].clientX;
    }
  }

  const handleTouchEnd = () => {
    isDragging = false;
    if (touchPos.start !== touchPos.end && touchPos.end !== 0) {
      if (touchPos.start < touchPos.end) {
        handleSliding(activeSlideNum + 1);
      } else {
        handleSliding(activeSlideNum - 1);
      }
    }
  };

  function mouseStart(event: React.MouseEvent) {
    isDragging = true;
    touchPos.start = event.pageX;
  }
  function mouseMouse(event: React.MouseEvent) {
    if (isDragging) {
      touchPos.end = event.pageX;
    }
  }

  return (
    <div className="relative w-full h-[500px] ml-[272px] rounded-2xl overflow-hidden">
      <div className="absolute top-0 bottom-0 flex justify-center items-center opacity-0 transition-opacity left-[30px] z-20">
        <button
          onClick={() => handleSliding(activeSlideNum - 1)}
          className="rounded-full p-[2px_0_0_3px] w-[50px] h-[50px] border-none cursor-pointer border-[1px] border-white/0 bg-white/25 transition-bg"
        >
          <ArrowIcon width={10} strokeWidth={1} />
        </button>
      </div>
      <div className="absolute top-0 bottom-0 flex justify-center items-center opacity-0 transition-opacity right-[30px] z-20">
        <button
          onClick={() => handleSliding(activeSlideNum + 1)}
          className="rounded-full p-[2px_0_0_3px] w-[50px] h-[50px] border-none cursor-pointer border-[1px] border-white/0 bg-white/25 transition-bg"
        >
          <ArrowIcon width={10} strokeWidth={1} />
        </button>
      </div>
      <div className="relative h-full rounded-2xl transform translate-z-0 user-select-none">
        {SlidesData.map((slide: TSlide, index: number) => (
          <div
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={mouseStart}
            onMouseMove={mouseMouse}
            onMouseUp={handleTouchEnd}
            key={index}
            className={`${
              index === activeSlideNum
                ? "opacity-1 visible animate-newSlide"
                : "opacity-0 invisible animate-oldSlide"
            } absolute top-0 left-0 w-full h-full transition-opacity duration-1000 rounded-2xl`}
          >
            <Image
              src={slide.imgUrl}
              alt=""
              fill
              sizes="(max-width:1080px)"
              priority
              draggable={false}
              className="transition-transform duration-400 ease-out object-cover"
            />
            {slide.msg && (
              <div
                className={`${
                  index === activeSlideNum
                    ? "visible top-0"
                    : "invisible top-[40px]"
                } absolute left-0 top-[40px] bottom-0 w-[50%] flex flex-col items-center text-white transition-top duration-1500`}
              >
                <h2 className="text-[3.2rem] font-light">{slide.msg.title}</h2>
                {slide.msg.desc && (
                  <span className="mt-[40px] text-[1.4rem] transition-margin duration-1600">
                    {slide.msg.desc}
                  </span>
                )}
                <Link
                  href={slide.url}
                  className="mt-[80px] text-[1.6rem] font-medium px-[24px] py-[12px] rounded-[6px] bg-black/80 transition-all duration-300 hover:font-bold hover:text-white hover:bg-white/20"
                >
                  {slide.msg.buttonText}
                </Link>
              </div>
            )}
            <span
              className={`${
                index === activeSlideNum ? "visible w-full" : "invisible"
              } absolute top-0 h-[8px] bg-white/30 transition-width duration-100 animate-autoSlide`}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-[20px] left-0 right-0 flex justify-center items-center gap-[8px]">
        {SlidesData.map((slide: any, index: number | null | undefined) => (
          <div
            onClick={() => handleSliding(index as number)}
            key={index}
            className={`${
              index === activeSlideNum ? "cursor-default p-[6px] active" : ""
            } flex`}
          >
            <span
              className={`${
                index === activeSlideNum
                  ? "border-white/40 bg-white/10"
                  : "border-white/30 bg-white/40"
              } w-[30px] h-[30px] rounded-full border-[1px] transition-all duration-200 hover:bg-white/80`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
