"use client";

import { useEffect, useState } from "react";

import CategoryListItem from "./_components/catListItem";
import { TGroupJSON } from "@/types/categories";
import { getAllCategoriesJSON } from "@/actions/category/category";
import { SK_Box } from "@/components/ui/Skeleton";

const HomeCategoryList = () => {
  const [categories, setCategories] = useState<TGroupJSON[]>([]);
  useEffect(() => {
    const getCategoriesDB = async () => {
      const result = await getAllCategoriesJSON();
      if (result.res) {
        setCategories(result.res);
      }
    };
    getCategoriesDB();
  }, []);

  return (
    <div className="min-w-[256px] absolute h-[500px] bg-white mr-16 rounded-2xl p-0 px-24 text-[24px] font-normal text-[#F2F2F7] shadow-[0_2px_4px_rgba(0,0,0,0.15)] z-3">
      <ul>
        {!categories || categories.length === 0 ? (
          <div className="flex flex-col gap-28 justify-center mt-22">
            {Skeletons()}
          </div>
        ) : (
          categories.map((item, index) => (
            <CategoryListItem key={index} categoryData={item} />
          ))
        )}
      </ul>
    </div>

  );
};

const Skeletons = () => {
  const skeletons: React.ReactNode[] = [];
  for (let i = 0; i <= 10; i++) {
    skeletons.push(<SK_Box key={i} width="100%" height="16px" />);
  }
  return skeletons;
};

export default HomeCategoryList;
