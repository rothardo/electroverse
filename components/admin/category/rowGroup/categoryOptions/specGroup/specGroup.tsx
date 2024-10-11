"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { TSingleSpec, TSpecGroup } from "@/types/common";
import {
  addSingleSpec,
  deleteSingleSpec,
  deleteSpecGroup,
} from "@/actions/category/categoryOptions";

interface IProps {
  data: TSpecGroup;
  reloadRequest: () => void;
}

const SpecGroup = ({ data, reloadRequest }: IProps) => {
  const { id, title, specs } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [specToAdd, setSpecToAdd] = useState("");
  const handleDeleteSpecGroup = async () => {
    if (!id) return;
    setIsLoading(true);
    const response = await deleteSpecGroup(id);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      reloadRequest();
    }
  };

  const handleAddSingleSpec = async () => {
    if (!id || !specToAdd || specToAdd === "") return;

    setIsLoading(true);
    const data: TSingleSpec = {
      specGroupID: id,
      value: specToAdd,
    };

    const response = await addSingleSpec(data);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      setSpecToAdd("");
      reloadRequest();
    }
  };

  const handleDeleteSingleSpec = async (spec: string) => {
    if (!id || !spec || spec === "") return;

    setIsLoading(true);
    const data: TSingleSpec = {
      specGroupID: id,
      value: spec,
    };

    const response = await deleteSingleSpec(data);
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
    <div className="w-full flex flex-col rounded-lg border border-gray-300 pb-2">
      <div className="w-full p-3 flex justify-between border-b border-gray-200 mb-1.5">
        <div>
          <span>{title}</span>
          <Button
            disabled={isLoading}
            text="delete"
            onClick={() => handleDeleteSpecGroup()}
            className="ml-3"
          />
        </div>
        <div>
          <input
            disabled={isLoading}
            type="text"
            value={specToAdd}
            onChange={(e) => setSpecToAdd(e.currentTarget.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <Button
            disabled={isLoading}
            text="Add Spec"
            onClick={() => handleAddSingleSpec()}
            className="ml-3"
          />
        </div>
      </div>
      {specs.length > 0 ? (
        <>
          {specs.map((spec: string, index: number) => (
            <div
              className="flex p-2.5 mx-2 justify-between items-center rounded-md transition-colors duration-300 hover:bg-gray-100"
              key={index}
            >
              <span>{spec}</span>
              <Button
                disabled={isLoading}
                text="delete"
                onClick={() => handleDeleteSingleSpec(spec)}
                className="ml-3 opacity-60 transition-opacity duration-800 hover:opacity-100"
              />
            </div>
          ))}
        </>
      ) : (
        <div className="flex p-2.5 mx-2 justify-between items-center rounded-md">
          <span>There is no specification!</span>
        </div>
      )}
    </div>
  );
};

export default SpecGroup;
