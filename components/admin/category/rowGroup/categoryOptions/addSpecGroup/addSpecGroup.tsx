"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import { addOptionSet, addSpecGroup } from "@/actions/category/categoryOptions";
import { TSpecGroup } from "@/types/common";

interface IProps {
  categorySpecGroupID: string;
  reloadRequest: () => void;
}

const AddSpecGroup = ({ categorySpecGroupID, reloadRequest }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  const handleAddOption = async () => {
    if (!title || title === "") return;

    const data: TSpecGroup = {
      id: categorySpecGroupID,
      specs: [],
      title,
    };

    setIsLoading(true);
    const result = await addSpecGroup(data);
    if (result.error) {
      setIsLoading(false);
      return;
    }
    if (result.res) {
      setTitle("");
      setIsLoading(false);
      reloadRequest();
    }
  };

  return (
    <div className="w-full flex items-center justify-between rounded-lg bg-gray-100 p-2 pl-4 my-1.5 relative">
      <div className="flex items-center">
        <span className="mr-2">Title:</span>
        <input
          type="text"
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
          disabled={isLoading}
          className="cursor-pointer rounded-md select-none p-1.5 px-4 transition-all mr-1 bg-white border border-gray-300 hover:bg-gray-200 disabled:cursor-default disabled:text-white disabled:bg-blue-500"
        />
      </div>
      <Button
        text="Add Spec Group"
        disabled={isLoading}
        onClick={() => handleAddOption()}
        className="w-40"
      />
    </div>
  );
};

export default AddSpecGroup;
