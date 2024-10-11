"use client";

import { useEffect, useState } from "react";

import AddOption from "./AddOption/AddOption";

// -------- ACTIONS --------
import {
  getOptionSetByCatID,
  getSpecGroupByCatID,
} from "@/actions/category/categoryOptions";
import { TOptionSet, TSpecGroup } from "@/types/common";
import OptionSet from "./optionSet/optionSet";
import Button from "@/components/ui/Button";
import AddSpecGroup from "./addSpecGroup/addSpecGroup";
import SpecGroup from "./specGroup/specGroup";

interface IProps {
  categoryName: string;
  categoryID: string;
}

const CategoryOptions = ({ categoryName, categoryID }: IProps) => {
  const [isOption, setIsOption] = useState(true);
  const [optionSetList, setOptionSetList] = useState<TOptionSet[]>([]);
  const [specGroupList, setSpecGroupList] = useState<TSpecGroup[]>([]);

  const getCategoryOptionSet = async () => {
    if (categoryID) {
      const response = await getOptionSetByCatID(categoryID);
      if (response.res) {
        setOptionSetList(response.res);
      }
    }
  };

  const getCategorySpecGroup = async () => {
    if (categoryID) {
      const response = await getSpecGroupByCatID(categoryID);
      if (response.res) {
        setSpecGroupList(response.res);
      }
    }
  };

  useEffect(() => {
    const getOptionAndSpecs = async () => {
      if (categoryID) {
        const optionsResponse = await getOptionSetByCatID(categoryID);
        const specResponse = await getSpecGroupByCatID(categoryID);
        if (optionsResponse.res) {
          setOptionSetList(optionsResponse.res);
        }
        if (specResponse.res) {
          setSpecGroupList(specResponse.res);
        }
      }
    };
    getOptionAndSpecs();
  }, [categoryID]);

  const handleReloadOptions = async () => {
    getCategoryOptionSet();
  };
  const handleReloadSpecs = async () => {
    getCategorySpecGroup();
  };

  return (
    <div className="relative flex flex-col h-[500px] bg-white z-10 text-[1.4rem]">
      <div className="flex items-center justify-between text-gray-800">
        <h2 className="flex-grow font-normal text-[1.6rem] h-full pt-[6px] border-b border-gray-300">
          {categoryName}
        </h2>
        <div className="flex">
          <h3
            className={`${
              isOption
                ? "cursor-default text-gray-900 border-b-2 border-blue-500"
                : "text-gray-500 cursor-pointer"
            } rounded-tl-lg rounded-tr-lg font-normal text-[1.4rem] p-[12px_16px] transition-colors duration-300 border-b border-gray-300 hover:bg-gray-100`}
            onClick={() => setIsOption(true)}
          >
            Options
          </h3>
          <h3
            className={`${
              !isOption
                ? "cursor-default text-gray-900 border-b-2 border-blue-500"
                : "text-gray-500 cursor-pointer"
            } rounded-tl-lg rounded-tr-lg font-normal text-[1.4rem] p-[12px_16px] transition-colors duration-300 border-b border-gray-300 hover:bg-gray-100`}
            onClick={() => setIsOption(false)}
          >
            Specifications
          </h3>
        </div>
      </div>

      {isOption ? (
        // ------------------ OPTIONS SECTION ------------------
        <div className="flex flex-col h-full overflow-hidden">
          <AddOption
            categoryOptionId={categoryID}
            reloadRequest={handleReloadOptions}
          />
          <div className="flex flex-col gap-4 h-full overflow-y-scroll p-3">
            {optionSetList.length > 0 ? (
              <>
                {optionSetList.map((optionSet) => (
                  <OptionSet
                    key={optionSet.id}
                    data={optionSet}
                    reloadRequest={handleReloadOptions}
                  />
                ))}
              </>
            ) : (
              <div className="mt-10 flex flex-col items-center justify-center">
                <span className="text-center mb-7 w-[300px]">
                  There is no Options for this category
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        // ------------------ SPECIFICATION SECTION ------------------
        <div className="flex flex-col h-full overflow-hidden">
          <AddSpecGroup
            categorySpecGroupID={categoryID}
            reloadRequest={handleReloadSpecs}
          />
          <div className="flex flex-col gap-4 h-full overflow-y-scroll p-3">
            {specGroupList.length > 0 ? (
              <>
                {specGroupList.map((specGroup) => (
                  <SpecGroup
                    key={specGroup.id}
                    data={specGroup}
                    reloadRequest={handleReloadSpecs}
                  />
                ))}
              </>
            ) : (
              <div className="mt-10 flex flex-col items-center justify-center">
                <span className="text-center mb-7 w-[300px]">
                  There is no Specification for this category
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryOptions;
