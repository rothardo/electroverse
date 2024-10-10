"use client";

import CatGroupRow from "@/components/admin/category/rowGroup/rowGroup";
import {
  TGetAllCategories,
  getAllCategories,
} from "@/actions/category/category";
import AddCategoryGroup from "@/components/admin/category/addCategoryGroup/addCategoryGroup";
import { useEffect, useState } from "react";

const Categories = () => {
  const [allCategories, setAllCategories] = useState<TGetAllCategories[]>([]);

  const getData = async () => {
    const data = await getAllCategories();
    if (data.res) setAllCategories(data.res);
  };

  useEffect(() => {
    getData();
  }, []);

  const groups: TGetAllCategories[] = [];
  const categories: TGetAllCategories[] = [];

  if (allCategories.length > 0) {
    allCategories.forEach((cat) => {
      cat.parentID === null ? groups.push(cat) : categories.push(cat);
    });
  }
  return (
    <div className="flex flex-col">
      <div className="w-full mt-3 flex gap-4 items-center">
        <h3 className="text-2xl font-light text-gray-800">Add:</h3>
        <AddCategoryGroup onReset={getData} />
      </div>
      <div className="mt-6">
        {groups.length > 0 &&
          groups.map((group) => (
            <div
              className="mb-7 rounded-lg border border-gray-200"
              key={group.id}
            >
              <CatGroupRow
                onReset={getData}
                data={group}
                categories={categories}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;