"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import { addOptionSet } from "@/actions/category/categoryOptions";
import { TOptionSet } from "@/types/common";

interface IProps {
  categoryOptionId: string;
  reloadRequest: () => void;
}

const AddOption = ({ categoryOptionId, reloadRequest }: IProps) => {
  const [isColor, setIsColor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const handleAddOption = async () => {
    if (!name || name === "") return;

    const data: TOptionSet = {
      id: categoryOptionId,
      name,
      options: [],
      type: isColor ? "COLOR" : "TEXT",
    };

    setIsLoading(true);
    const result = await addOptionSet(data);
    if (result.error) {
      setIsLoading(false);
      return;
    }
    if (result.res) {
      setName("");
      setIsLoading(false);
      reloadRequest();
    }
  };

  return (
    <div className="w-full flex items-center justify-between rounded-lg bg-gray-100 p-2 pl-4 my-1.5 relative">
      <div className="flex items-center">
        <span className="mr-2">Name:</span>
        <input
          type="text"
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          disabled={isLoading}
          className="p-1 border border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center">
        <span className="mr-2">Type:</span>
        <option
          disabled={!isColor}
          onClick={() => setIsColor(false)}
          className={`cursor-pointer rounded-md select-none p-1 px-4 transition-all mr-1 bg-white border border-gray-300 ${
            !isColor
              ? "hover:bg-gray-200"
              : "cursor-default text-white bg-blue-500"
          }`}
        >
          Text
        </option>
        <option
          disabled={isColor}
          onClick={() => setIsColor(true)}
          className={`cursor-pointer rounded-md select-none p-1 px-4 transition-all mr-1 bg-white border border-gray-300 ${
            isColor
              ? "hover:bg-gray-200"
              : "cursor-default text-white bg-blue-500"
          }`}
        >
          Color
        </option>
      </div>
      <Button
        text="Add Option"
        disabled={isLoading}
        onClick={() => handleAddOption()}
        className="w-40"
      />
    </div>
  );
};

export default AddOption;
