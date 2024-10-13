"use client";
import { deleteProduct } from "@/actions/product/product";

import Button from "@/components/ui/Button";
import Popup from "@/components/ui/Popup";
import { TProductListItem } from "@/types/product";
import { useState } from "react";

interface IProps {
  data: TProductListItem;
  requestReload: () => void;
}

const ProductListItem = ({ data, requestReload }: IProps) => {
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteProduct(data.id);
    if (response.error) {
      setIsLoading(false);
    }
    if (response.res) {
      setIsLoading(false);
      requestReload();
    }
  };

  return (
    <div className="w-full h-12 px-4 flex justify-between items-center text-lg text-gray-800 rounded-lg transition-colors duration-300 select-none hover:bg-gray-100">
      <span className="w-48">{data.name}</span>
      <span className="w-48 text-left">{data.category.name}</span>
      <div>
        <Button
          text="edit"
          onClick={() => console.log("edit product")}
          className="bg-white ml-4"
        />
        <Button
          text="delete"
          onClick={() => setShowDelete(true)}
          className="bg-white ml-4"
        />
      </div>
      {showDelete && (
        <Popup
          content={
            <span className="block text-center p-6 text-xl pb-10">
              Are You Sure?
            </span>
          }
          width="300px"
          isLoading={isLoading}
          onCancel={() => setShowDelete(false)}
          onClose={() => setShowDelete(false)}
          onSubmit={() => handleDelete()}
          cancelBtnText="NO"
          confirmBtnText="YES"
        />
      )}
    </div>
  );
};

export default ProductListItem;
