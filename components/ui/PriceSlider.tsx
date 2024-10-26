"use client";
import { TPageStatus } from "@/types/list";
import { SK_Box } from "../ui/Skeleton";

type TValue = [number, number];

interface IProps {
  sliderValues: [number, number];
  minMaxLimit: [number, number];
  pageStatus: TPageStatus;
  onChange: (value: TValue) => void;
}

const PriceSlider = ({
  sliderValues,
  minMaxLimit,
  pageStatus,
  onChange,
}: IProps) => {
  if (pageStatus === "pageLoading") {
    return (
      <div className="flex flex-col gap-16 w-full mb-26 items-start">
        <SK_Box width="100%" height="30px" />
        <SK_Box width="60%" height="20px" />
      </div>
    );
  }

  if (pageStatus === "categoryHasNoProduct") {
    return (
      <div className="flex flex-col gap-16 w-full mb-26 items-start" />
    );
  }
  const range = minMaxLimit[1] - minMaxLimit[0];
  const gapValue = range / 20;

  const handleChangeValue = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
    isSliderData: boolean
  ) => {
    const newValue = isSliderData
      ? (parseFloat(e.currentTarget.value) / 100) * range + minMaxLimit[0]
      : parseInt(e.currentTarget.value);
    if (index === 0) {
      if (newValue < sliderValues[1] - gapValue) {
        onChange([Math.floor(newValue), sliderValues[1]]);
      }
    }
    if (index === 1) {
      if (newValue > sliderValues[0] + gapValue) {
        onChange([sliderValues[0], Math.floor(newValue)]);
      }
    }
  };
  const convertToPercent = (n: number) => {
    return Math.floor(((n - minMaxLimit[0]) / range) * 100);
  };
  return (
    <div className="relative w-full flex flex-col pt-12 gap-24">
      <div className="w-full relative">
        <div className="absolute h-4 bg-[#E0E7FF] left-0 right-0 rounded-full" />
        <div
          className="absolute h-4 bg-[#4B6AEB] ml-6"
          style={{
            left: convertToPercent(sliderValues[0]) + "%",
            right: 100 - convertToPercent(sliderValues[1]) + "%",
          }}
        />
        <input
          type="range"
          value={convertToPercent(sliderValues[0])}
          onChange={(e) => handleChangeValue(0, e, true)}
          className="absolute left-0 top-[-10px] w-full transform-origin-center pointer-events-none appearance-none"
        />
        <input
          type="range"
          value={convertToPercent(sliderValues[1])}
          onChange={(e) => handleChangeValue(1, e, true)}
          className="absolute left-0 top-[-10px] w-full transform-origin-center pointer-events-none appearance-none"
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            pointer-events: auto;
            appearance: none;
            -webkit-appearance: none;
            background-color: #fff;
            border: 2px solid #4B6AEB;
          }
          input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            pointer-events: auto;
            appearance: none;
            -moz-appearance: none;
            background-color: #fff;
            border: 2px solid #4B6AEB;
          }
        `}</style>
      </div>

      <div className="flex gap-12">
        <div>
          <label className="block w-full text-[1.4rem] text-[#A0AEC0] mb-8">
            From
          </label>
          <input
            type="number"
            value={sliderValues[0]}
            onChange={(e) => handleChangeValue(0, e, false)}
            className="w-full h-30px rounded-6 px-12 border border-[#A0AEC0] hover:border-[#D1D5DB]"
          />
        </div>
        <hr className="h-20px mt-30 opacity-50" />
        <div>
          <label className="block w-full text-[1.4rem] text-[#A0AEC0] mb-8">
            To
          </label>
          <input
            type="number"
            value={sliderValues[1]}
            onChange={(e) => handleChangeValue(1, e, false)}
            className="w-full h-30px rounded-6 px-12 border border-[#A0AEC0] hover:border-[#D1D5DB]"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
