"use client";

import { useState } from "react";
import { TOptionSet, TSingleOption } from "@/types/common";
import Button from "@/components/ui/Button";

// -------------- ACTIONS --------------
import {
  addSingleOption,
  deleteOptionSet,
  deleteSingleOption,
} from "@/actions/category/categoryOptions";

interface IProps {
  data: TOptionSet;
  reloadRequest: () => void;
}

const OptionSet = ({ data, reloadRequest }: IProps) => {
  const { id, name, options, type } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [nameValuePair, setNameValuePair] = useState<[string, string]>([
    "",
    "",
  ]);

  const handleDeleteOptionSet = async () => {
    if (!id) return;
    setIsLoading(true);
    const response = await deleteOptionSet(id);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      reloadRequest();
    }
  };

  const handleAddSingleOption = async () => {
    if (nameValuePair[0] === "" || nameValuePair[1] === "") return;

    const data: TSingleOption = {
      optionSetID: id,
      name: nameValuePair[0],
      value: nameValuePair[1],
    };

    setIsLoading(true);
    const response = await addSingleOption(data);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      setNameValuePair(["", ""]);
      reloadRequest();
    }
  };

  const handleDeleteSingleOption = async (data: TSingleOption) => {
    const { name, value, optionSetID } = data;
    if (
      !name ||
      name === "" ||
      !value ||
      value === "" ||
      !optionSetID ||
      optionSetID === ""
    )
      return;

    setIsLoading(true);
    const response = await deleteSingleOption(data);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      reloadRequest();
    }
  };

  return (
    <div className="w-full flex justify-between rounded-lg p-3 border border-gray-300" key={id}>
      <div className="text-gray-700 text-lg min-w-[150px]">
      <span>{name}</span>
      <Button
        text="delete"
        disabled={isLoading}
        onClick={() => handleDeleteOptionSet()}
        className="ml-4"
      />
      </div>
      <div className="flex flex-col">
      {options.map((singleOption: TSingleOption, index: number) => (
        <div className="flex items-center justify-between p-1 rounded-md transition-colors duration-300 select-none hover:bg-gray-100" key={index}>
        <div className="ml-4">
          <span className="w-[100px] text-center mr-2">{singleOption.name}</span>
          <span> -- </span>
          <span className="w-[100px] text-center mr-2">{singleOption.value}</span>
        </div>
        <div>
          <Button
          text="delete"
          onClick={() =>
            handleDeleteSingleOption({
            name: singleOption.name,
            value: singleOption.value,
            optionSetID: id,
            })
          }
          className="opacity-60 ml-2 transition-opacity duration-800"
          />
        </div>
        </div>
      ))}
      <div className="pt-3 mt-3 border-t border-gray-200">
        <div className="ml-2">
        <input
          type="text"
          value={nameValuePair[0]}
          onChange={(e) =>
          setNameValuePair([e.currentTarget.value, nameValuePair[1]])
          }
          className="ml-4 w-[90px]"
        />
        <input
          type="text"
          value={nameValuePair[1]}
          onChange={(e) =>
          setNameValuePair([nameValuePair[0], e.currentTarget.value])
          }
          className="ml-4 w-[90px]"
        />
        </div>
        <Button
        text="Add"
        disabled={isLoading}
        onClick={() => handleAddSingleOption()}
        className="w-[200px] m-2"
        />
      </div>
      </div>
    </div>
  );
};

export default OptionSet;
